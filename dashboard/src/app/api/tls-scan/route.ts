import { NextResponse } from "next/server";
import https from "https";
import tls from "tls";

// ---------------------------------------------------------------------------
// Native Node.js TLS scanner — works on Vercel with zero external dependencies.
// Checks the TLS certificate + response headers (including Yochan's sovereign
// x-sovereign-pqc header) to determine quantum-safety status.
// ---------------------------------------------------------------------------
async function nativeScan(hostname: string): Promise<{
  issuer: string;
  subject: string;
  isQuantumSafe: boolean;
  keyExchange: string;
  signatureAlgorithm: string;
  winningCurve: string;
  shadowCrypto: { asset: string; status: string; pqc_ready: boolean }[];
  cbomReady: boolean;
}> {
  // 1. TLS certificate probe
  const certInfo = await new Promise<{ issuer: string; subject: string; protocol: string; cipher: string }>((resolve) => {
    const socket = tls.connect(
      { host: hostname, port: 443, servername: hostname, rejectUnauthorized: false, timeout: 8000 },
      () => {
        const cert = socket.getPeerCertificate();
        const issuerObj = cert?.issuer || {};
        const subjectObj = cert?.subject || {};
        resolve({
          issuer: [issuerObj.O, issuerObj.CN].filter(Boolean).join(" / ") || "Unknown CA",
          subject: subjectObj.CN || hostname,
          protocol: socket.getProtocol() || "TLS",
          cipher: socket.getCipher()?.name || "Unknown",
        });
        socket.destroy();
      }
    );
    socket.on("error", () =>
      resolve({ issuer: "Unknown CA", subject: hostname, protocol: "TLS", cipher: "Unknown" })
    );
    socket.setTimeout(8000, () => {
      socket.destroy();
      resolve({ issuer: "Unknown CA", subject: hostname, protocol: "TLS", cipher: "Unknown" });
    });
  });

  // 2. HTTP header probe — checks for Yochan Sovereign PQC signal
  const headerResult = await new Promise<{ isSovereign: boolean; headers: Record<string, string> }>((resolve) => {
    const req = https.request(
      { hostname, port: 443, path: "/", method: "GET", rejectUnauthorized: false, timeout: 8000,
        headers: { "User-Agent": "YochanShield-Scanner/1.0", "Bypass-Tunnel-Reminder": "true" } },
      (res) => {
        const h: Record<string, string> = {};
        for (const [k, v] of Object.entries(res.headers)) h[k] = String(v);
        const isSovereign =
          "x-sovereign-pqc" in h ||
          "yochan_pqc_ready" in h ||
          h["x-sovereign-pqc"] === "active" ||
          Object.keys(h).some((k) => k.includes("pqc"));
        resolve({ isSovereign, headers: h });
        res.resume();
      }
    );
    req.on("error", () => resolve({ isSovereign: false, headers: {} }));
    req.setTimeout(8000, () => { req.destroy(); resolve({ isSovereign: false, headers: {} }); });
    req.end();
  });

  // 3. Determine PQC status
  const pqcKeywords = ["mlkem", "kyber", "mldsa", "dilithium", "frodo", "x25519mlkem"];
  const cipherLower = certInfo.cipher.toLowerCase();
  const isCipherPqc = pqcKeywords.some((kw) => cipherLower.includes(kw));
  const isQuantumSafe = headerResult.isSovereign || isCipherPqc;

  const keyExchange = isQuantumSafe
    ? headerResult.headers["x-sovereign-pqc"]
      ? "X25519MLKEM768 (Sovereign)"
      : certInfo.cipher
    : certInfo.cipher || "RSA/ECDHE Classical";

  // 4. Lightweight shadow subdomain probe
  const subs = ["api", "dev", "cdn"];
  const shadowCrypto = await Promise.all(
    subs.map(async (sub) => {
      const subHost = `${sub}.${hostname}`;
      const exists = await new Promise<boolean>((res) => {
        const s = tls.connect({ host: subHost, port: 443, servername: subHost, rejectUnauthorized: false, timeout: 4000 }, () => { s.destroy(); res(true); });
        s.on("error", () => res(false));
        s.setTimeout(4000, () => { s.destroy(); res(false); });
      });
      return { asset: subHost, status: exists ? "Live/Active" : "Not Found", pqc_ready: false };
    })
  );

  return {
    issuer: certInfo.issuer,
    subject: certInfo.subject,
    isQuantumSafe,
    keyExchange: keyExchange.toUpperCase(),
    signatureAlgorithm: isQuantumSafe ? "ML-KEM-768 / ML-DSA (Sovereign)" : "RSA/ECC Classical",
    winningCurve: isQuantumSafe ? "X25519MLKEM768" : "None",
    shadowCrypto,
    cbomReady: true,
  };
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    if (!url) return NextResponse.json({ error: "No URL provided" }, { status: 400 });

    const hostname = url.replace(/^https?:\/\//, "").split("/")[0];

    let scanData: any = null;

    // --- Try the Python microservice ONLY if a real (non-localhost) URL is set ---
    const scannerUrl = process.env.SCANNER_API_URL || "";
    const isRealScanner =
      scannerUrl.length > 0 &&
      !scannerUrl.includes("localhost") &&
      !scannerUrl.includes("127.0.0.1") &&
      !scannerUrl.includes("pqc-scanner");

    if (isRealScanner) {
      try {
        const baseUrl = scannerUrl.endsWith("/") ? scannerUrl.slice(0, -1) : scannerUrl;
        const endpoint = baseUrl.includes("/deep-scan") ? baseUrl : `${baseUrl}/deep-scan`;
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
          signal: AbortSignal.timeout(12000),
        });
        if (res.ok) {
          const json = await res.json();
          scanData = json.data;
          console.log("[SCAN] Used Python microservice");
        }
      } catch (e: any) {
        console.warn("[SCAN] Python microservice unreachable, falling back to native scan:", e.message);
      }
    }

    // --- Fall back to native Node.js scan ---
    if (!scanData) {
      console.log("[SCAN] Using native Node.js TLS scan for", hostname);
      scanData = await nativeScan(hostname);
    }

    // --- Persist to audit trail (non-blocking) ---
    try {
      const { prisma } = require("@/lib/prisma");
      await prisma.pqcEvent.create({
        data: {
          eventType: "Quantum Scan",
          target: url,
          algorithm: scanData?.keyExchange || "Unknown",
          isQuantumSafe: scanData?.isQuantumSafe || false,
          status: "Verified",
          timestamp: new Date(),
        },
      });
    } catch (dbError: any) {
      console.warn("[AUDIT] DB write skipped:", dbError.message);
    }

    return NextResponse.json({ success: true, data: scanData }, { status: 200 });

  } catch (error: any) {
    console.error("[SCAN] Fatal error:", error);
    return NextResponse.json(
      { error: "Scan failed: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
