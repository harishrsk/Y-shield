"use client";

import { useState, useEffect } from "react";
import { KeyRound, Shield, Clock, Fingerprint, AlertTriangle } from "lucide-react";

interface KeyHandle {
  handleId: string;
  algorithm: string;
  hsmBinding: string;
  issuedAt: string;
  expiresAt: string;
  fingerprint: string;
  status: "ACTIVE" | "EXPIRED" | "REVOKED";
}

export function ZeroKnowledgePanel() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [issuing, setIssuing] = useState(false);

  const fetchHandles = async () => {
    try {
      const res = await fetch("/api/key-handle");
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error("ZK fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHandles();
    const interval = setInterval(fetchHandles, 10000);
    return () => clearInterval(interval);
  }, []);

  const issueHandle = async () => {
    setIssuing(true);
    try {
      await fetch("/api/key-handle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ algorithm: "ML-KEM-768", ttlMinutes: 30 }),
      });
      await fetchHandles();
    } catch (e) {
      console.error("Issue error:", e);
    } finally {
      setIssuing(false);
    }
  };

  if (loading) return <div className="animate-pulse bg-gray-900 rounded-2xl h-64" />;

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-violet-500/10 rounded-xl border border-violet-500/20">
              <KeyRound className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Zero-Knowledge Key Infrastructure</h3>
              <p className="text-sm text-gray-500">Private keys never leave client hardware</p>
            </div>
          </div>
          <button
            onClick={issueHandle}
            disabled={issuing}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition"
          >
            {issuing ? "Issuing..." : "Issue Key Handle"}
          </button>
        </div>

        {/* Security Guarantees */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Shield, label: "Provider Key Access", value: "ZERO", color: "emerald" },
            { icon: Fingerprint, label: "HSM Binding", value: "TEE BOUND", color: "violet" },
            { icon: Clock, label: "Handle TTL", value: "30 MIN", color: "amber" },
            { icon: AlertTriangle, label: "Key Escrow", value: "IMPOSSIBLE", color: "red" },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
              <Icon className={`w-4 h-4 text-${color}-400 mb-2`} />
              <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
              <div className={`text-sm font-bold text-${color}-400 mt-1`}>{value}</div>
            </div>
          ))}
        </div>

        {/* Active Handles */}
        <div className="bg-black/40 rounded-xl border border-gray-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-mono text-gray-400">Active Key Handles</span>
            <span className="text-xs text-violet-400 font-mono">{data?.activeHandles || 0} live</span>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {(data?.handles || []).slice(-8).reverse().map((h: KeyHandle) => (
              <div
                key={h.handleId}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono ${
                  h.status === "ACTIVE"
                    ? "bg-emerald-950/30 border border-emerald-900/30 text-emerald-400"
                    : h.status === "REVOKED"
                    ? "bg-red-950/30 border border-red-900/30 text-red-400"
                    : "bg-gray-900/30 border border-gray-800 text-gray-500"
                }`}
              >
                <span>{h.handleId.substring(0, 24)}...</span>
                <span>{h.algorithm}</span>
                <span className="uppercase">{h.status}</span>
              </div>
            ))}
            {(!data?.handles || data.handles.length === 0) && (
              <div className="text-center text-gray-600 py-4">No handles issued yet. Click &quot;Issue Key Handle&quot; to generate.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
