import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    if (!url) return NextResponse.json({ error: "No URL provided" }, { status: 400 });

    // The Next.js app now delegates the complex cryptography scanning 
    // to our custom-built PQC-capable Microservice.
    // In Docker, we use the service name. For local proxying, we use 5005.
    // Ensure we are hitting the correct endpoint even if the Env Var is just the base URL
    let baseUrl = process.env.SCANNER_API_URL || "http://pqc-scanner:5000";
    if (baseUrl.endsWith("/")) baseUrl = baseUrl.slice(0, -1);
    const SCANNER_ENDPOINT = baseUrl.includes("/deep-scan") ? baseUrl : `${baseUrl}/deep-scan`;

    const response = await fetch(SCANNER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
        "Bypass-Tunnel-Reminder": "true",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        return NextResponse.json({ 
            error: errData.error || "The Deep Scanner Microservice is currently offline or unreachable." 
        }, { status: 502 });
    }

    const result = await response.json();
    
    // LIVE AUDIT PERSISTENCE: Save the scan result to the database
    const { prisma } = require("@/lib/prisma");
    await prisma.pqcEvent.create({
      data: {
        eventType: "Quantum Scan",
        target: url,
        algorithm: result.data.keyExchange || "Unknown",
        isQuantumSafe: result.data.isQuantumSafe || false,
        status: "Verified",
        timestamp: new Date()
      }
    });

    // We pass the authentic cryptographic results directly back to the UI
    return NextResponse.json(result, { status: 200 });

  } catch (error: any) {
    console.error("Scanner Bridge Error:", error);
    return NextResponse.json({ 
        error: "Failed to communicate with the Quantum Analysis Engine." 
    }, { status: 500 });
  }
}
