"use client";

import { useState } from "react";
import { Scan, AlertOctagon, ShieldAlert, ShieldCheck, Activity, Zap } from "lucide-react";

interface QDPIData {
  target: string;
  timestamp: string;
  handshakeAnalysis: {
    protocol: string;
    cipherSuite: string;
    keyExchange: string;
    entropyScore: number;
    algorithmStrength: string;
  };
  anomalyDetection: {
    downgradeAttempt: boolean;
    handshakeTampering: boolean;
    algorithmAnomaly: boolean;
    certificateAnomaly: boolean;
    entropyAnomaly: boolean;
    replayAttack: boolean;
  };
  threatLevel: string;
  threatScore: number;
  recommendations: string[];
  killSwitchTriggered: boolean;
}

export function QDPIMonitor() {
  const [targetUrl, setTargetUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<QDPIData | null>(null);

  const runInspection = async () => {
    if (!targetUrl) return;
    setScanning(true);
    setResult(null);

    try {
      const res = await fetch("/api/qdpi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });
      const json = await res.json();
      if (json.success) setResult(json.data);
    } catch (e) {
      console.error("Q-DPI error:", e);
    } finally {
      setScanning(false);
    }
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case "CRITICAL": return "red";
      case "HIGH": return "orange";
      case "MEDIUM": return "amber";
      case "LOW": return "yellow";
      default: return "emerald";
    }
  };

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-64 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
            <Scan className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Quantum-Deep Packet Inspection
              <span className="text-xs font-mono text-orange-500/70">[BETA]</span>
            </h3>
            <p className="text-sm text-gray-500">Heuristic Threat Hunter — Real-time Handshake Analysis</p>
          </div>
        </div>

        {/* Scan Input */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            className="flex-1 bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-orange-500 font-mono text-sm"
            placeholder="Enter domain for deep packet inspection..."
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !scanning && targetUrl && runInspection()}
            disabled={scanning}
          />
          <button
            onClick={runInspection}
            disabled={scanning || !targetUrl}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-bold rounded-lg flex items-center gap-2 transition text-sm"
          >
            {scanning ? (
              <><Activity className="w-4 h-4 animate-pulse" /> Inspecting...</>
            ) : (
              <><Zap className="w-4 h-4" /> Run Q-DPI</>
            )}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            {/* Threat Level Banner */}
            <div
              className={`flex items-center justify-between p-4 rounded-xl border ${
                result.threatLevel === "CLEAR"
                  ? "bg-emerald-950/30 border-emerald-900/30"
                  : result.threatLevel === "CRITICAL"
                  ? "bg-red-950/40 border-red-900/40 animate-pulse"
                  : "bg-amber-950/30 border-amber-900/30"
              }`}
            >
              <div className="flex items-center gap-3">
                {result.threatLevel === "CLEAR" ? (
                  <ShieldCheck className="w-8 h-8 text-emerald-400" />
                ) : (
                  <ShieldAlert className={`w-8 h-8 text-${getThreatColor(result.threatLevel)}-400`} />
                )}
                <div>
                  <div className={`text-lg font-bold text-${getThreatColor(result.threatLevel)}-400`}>
                    Threat Level: {result.threatLevel}
                  </div>
                  <div className="text-xs text-gray-400 font-mono">
                    Score: {result.threatScore}/100 — {result.target}
                  </div>
                </div>
              </div>
              {result.killSwitchTriggered && (
                <div className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded animate-pulse">
                  KILL SWITCH TRIGGERED
                </div>
              )}
            </div>

            {/* Handshake Analysis */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Protocol", value: result.handshakeAnalysis.protocol },
                { label: "Cipher Suite", value: result.handshakeAnalysis.cipherSuite },
                { label: "Key Exchange", value: result.handshakeAnalysis.keyExchange },
                { label: "Entropy", value: result.handshakeAnalysis.entropyScore.toFixed(3) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-900/60 border border-gray-800 rounded-lg p-3">
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
                  <div className="text-sm font-mono text-white mt-1 truncate">{value}</div>
                </div>
              ))}
            </div>

            {/* Anomaly Detection Grid */}
            <div className="bg-black/40 border border-gray-800 rounded-xl p-4">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Anomaly Detection Matrix</div>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(result.anomalyDetection).map(([key, detected]) => (
                  <div
                    key={key}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono ${
                      detected
                        ? "bg-red-950/30 border border-red-900/30 text-red-400"
                        : "bg-emerald-950/20 border border-emerald-900/20 text-emerald-400"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${detected ? "bg-red-400 animate-pulse" : "bg-emerald-400"}`} />
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-2">
              {result.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className={`text-xs font-mono px-4 py-2 rounded-lg ${
                    rec.startsWith("URGENT") || rec.startsWith("CRITICAL")
                      ? "bg-red-950/30 text-red-400 border border-red-900/20"
                      : rec.startsWith("VERIFIED")
                      ? "bg-emerald-950/30 text-emerald-400 border border-emerald-900/20"
                      : "bg-gray-900/40 text-gray-400 border border-gray-800"
                  }`}
                >
                  {rec}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Idle State */}
        {!result && !scanning && (
          <div className="text-center py-12 text-gray-600 font-mono text-sm">
            <AlertOctagon className="w-8 h-8 mx-auto mb-3 opacity-30" />
            Q-DPI engine standing by. Enter a domain to begin deep packet inspection.
          </div>
        )}
      </div>
    </div>
  );
}
