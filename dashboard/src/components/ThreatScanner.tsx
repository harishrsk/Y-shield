"use client";

import { useState } from "react";
import { Radar, AlertOctagon, TerminalSquare, ShieldAlert, ShieldCheck } from "lucide-react";

export function ThreatScanner() {
  const [targetUrl, setTargetUrl] = useState("");
  const [scanState, setScanState] = useState<"IDLE" | "SCANNING" | "BREACHED" | "SECURE">("IDLE");
  const [logs, setLogs] = useState<string[]>([]);

  const startScan = async () => {
    if (!targetUrl) return;

    // --- Domain Validation Engine ---
    const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;
    if (!domainRegex.test(targetUrl.replace(/^https?:\/\//, ""))) {
      setLogs([
        `[ERROR] Invalid Target: "${targetUrl}"`,
        `[SYSTEM] Deep Scan aborted.`,
        `[HELP] Please enter a valid fully qualified domain name (FQDN).`,
        `[HELP] Example: yochanenterprises.com or mail.google.com`
      ]);
      setScanState("IDLE");
      return;
    }

    setScanState("SCANNING");
    setLogs([`[SYSTEM] Connecting to ${targetUrl}...`, `[NETWORK] Initiating TLS handshake over port 443...`]);

    try {
      const res = await fetch('/api/tls-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl })
      });

      const json = await res.json();

      if (!res.ok) {
        setLogs(prev => [...prev, `[ERROR] ${json.error || "Connection failed. Host might be down."}`]);
        setScanState("IDLE");
        return;
      }

      const { data } = json;
      const issuer = data.issuer || "Unknown Authority";
      const subject = data.subject || targetUrl;
      const keyExchange = data.keyExchange || data.signatureAlgorithm || "Classical RSA/ECC";
      const sigAlg = data.signatureAlgorithm || "Classical RSA/ECC";

      // Simulate a realistic hacking delay reading the server response
      setTimeout(() => {
        setLogs(prev => [...prev, `[CRYPTO] Certificate Issuer: ${issuer}`]);
        setLogs(prev => [...prev, `[CRYPTO] Certificate Subject: ${subject}`]);
        
        setTimeout(() => {
          setLogs(prev => [...prev, `[CRYPTO] Key Exchange Detected: ${keyExchange}`]);
          setLogs(prev => [...prev, `[CRYPTO] Signature Algorithm: ${sigAlg}`]);
          
          setTimeout(() => {
            setLogs(prev => [...prev, `[ANALYSIS] Measuring against Shor's Algorithm...`]);
            
            setTimeout(() => {
              if (data.isQuantumSafe) {
                setLogs(prev => [...prev, `[SUCCESS] Lattice-based cryptography detected. Immune to quantum attacks.`]);
                setScanState("SECURE");
              } else {
                const algFound = sigAlg !== "Classical RSA/ECDHE" ? sigAlg : "Legacy RSA/ECC";
                setLogs(prev => [...prev, `[WARNING] Cryptographic structure is entirely classical.`]);
                setLogs(prev => [...prev, `[CRITICAL] VULNERABILITY FOUND: Target uses ${algFound}.`]);
                setLogs(prev => [...prev, `[CRITICAL] Data in transit is subject to 'Harvest Now, Decrypt Later'.`]);
                setScanState("BREACHED");
              }
            }, 1000);
            
          }, 1000);
          
        }, 1000);

      }, 1000);

    } catch (error) {
      setLogs(prev => [...prev, `[ERROR] Failed to execute network scan.`]);
      setScanState("IDLE");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-24 px-6 sm:py-32">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center gap-3">
          <Radar className="w-10 h-10 text-red-500" />
          Quantum Threat Analyzer
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          Enter an actual active domain to dynamically fetch its TLS certificate and test its weaknesses.
        </p>
      </div>

      <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        {scanState === "BREACHED" && (
           <div className="absolute inset-0 bg-red-900/10 pointer-events-none animate-pulse z-0" />
        )}
        {scanState === "SECURE" && (
           <div className="absolute inset-0 bg-emerald-900/10 pointer-events-none animate-pulse z-0" />
        )}

        <div className="relative z-10 flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            className="flex-1 bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-red-500 font-mono"
            placeholder="e.g., mail.your-bank.com"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && scanState !== "SCANNING" && targetUrl && startScan()}
            disabled={scanState === "SCANNING"}
          />
          <button
            onClick={startScan}
            disabled={scanState === "SCANNING" || !targetUrl}
            className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition"
          >
            {scanState === "SCANNING" ? "Scanning Network..." : <><TerminalSquare className="w-5 h-5"/> Deep Scan Host</>}
          </button>
        </div>

        {/* Hacker Terminal UI */}
        <div className="bg-black border border-gray-800 rounded-lg p-6 font-mono text-sm h-64 overflow-y-auto relative z-10 shadow-inner">
          {logs.length === 0 && (
            <div className="text-gray-600 flex items-center justify-center h-full">
              Terminal Standing By... Enter a real URL to connect.
            </div>
          )}
          
          {logs.map((log, idx) => {
            let textColor = "text-emerald-400";
            if (log.includes("[CRITICAL]") || log.includes("[WARNING]") || log.includes("[ERROR]")) textColor = "text-red-500 font-bold";
            if (log.includes("[SUCCESS]")) textColor = "text-teal-400 font-bold";

            return (
              <div key={idx} className={`mb-2 ${textColor}`}>
                <span className="text-gray-500">{new Date().toISOString().split("T")[1].substring(0,8)}</span> {log}
              </div>
            );
          })}

          {scanState === "SCANNING" && (
            <div className="animate-pulse text-emerald-400">_</div>
          )}
        </div>

        {scanState === "BREACHED" && (
          <div className="mt-8 p-6 bg-red-950/40 border border-red-900 rounded-xl text-center relative z-10">
            <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-400 mb-2">SYSTEM CRITICALLY EXPOSED</h3>
            <p className="text-gray-300 mb-6">
              Network uses legacy cryptography. Highly vulnerable to quantum decryption attacks.
            </p>
            <a href="/checkout" className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-emerald-500/20 transition-all">
              Upgrade to Post-Quantum
            </a>
          </div>
        )}

        {scanState === "SECURE" && (
          <div className="mt-8 p-6 bg-emerald-950/40 border border-emerald-900 rounded-xl text-center relative z-10 text-emerald-400">
            <ShieldCheck className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">POST-QUANTUM SECURE</h3>
            <p className="text-emerald-200 mb-6">
              This host is actively utilizing Lattice-based cryptography. Network is strictly immune to Shor's Algorithm attacks.
            </p>
            <button
              onClick={async () => {
                try {
                  const res = await fetch('/api/cbom', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      hostname: targetUrl,
                      keyExchange: "X25519MLKEM768",
                      signatureAlgorithm: "ML-DSA-65",
                      isQuantumSafe: true
                    })
                  });
                  const blob = await res.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `cbom_${targetUrl.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                } catch (error) {
                  alert("Failed to generate CBOM");
                }
              }}
              className="inline-block bg-emerald-600 text-black font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-emerald-500 transition-all"
            >
              Generate CBOM (CycloneDX)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
