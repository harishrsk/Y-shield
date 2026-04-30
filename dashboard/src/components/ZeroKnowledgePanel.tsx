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

  if (loading) return <div className="animate-pulse bg-gray-900 rounded-2xl h-64" />;

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 relative overflow-hidden group">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Enterprise Overlay for non-active demo */}
      <div className="absolute top-4 right-4 z-20">
        <span className="px-3 py-1 bg-violet-500/10 border border-violet-500/30 text-violet-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
          Enterprise Upgrade
        </span>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-violet-500/10 rounded-xl border border-violet-500/20">
              <KeyRound className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Zero-Knowledge Key Infrastructure
                <span className="text-xs font-mono text-violet-500/70">[ROADMAP v2.1]</span>
              </h3>
              <p className="text-sm text-gray-500">Stateless key handles bound to local HSM hardware</p>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 text-sm font-bold rounded-lg transition border border-gray-700 cursor-not-allowed"
          >
            Request HSM Integration
          </button>
        </div>

        {/* Security Guarantees */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Shield, label: "Provider Key Access", value: "ZERO", color: "emerald", status: "VERIFIED" },
            { icon: Fingerprint, label: "HSM Binding", value: "TEE BOUND", color: "violet", status: "PENDING HARDWARE" },
            { icon: Clock, label: "Handle TTL", value: "30 MIN", color: "amber", status: "ACTIVE" },
            { icon: AlertTriangle, label: "Key Escrow", value: "IMPOSSIBLE", color: "red", status: "VERIFIED" },
          ].map(({ icon: Icon, label, value, color, status }) => (
            <div key={label} className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <Icon className={`w-4 h-4 text-${color}-400`} />
                <span className="text-[8px] font-mono opacity-50">{status}</span>
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
              <div className={`text-sm font-bold text-${color}-400 mt-1`}>{value}</div>
            </div>
          ))}
        </div>

        {/* Active Handles */}
        <div className="bg-black/40 rounded-xl border border-gray-800 p-4 opacity-50 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-mono text-gray-400">Key Handle Orchestration Layer</span>
            <span className="text-xs text-violet-400 font-mono">Requires Sovereign+ License</span>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto italic text-center py-6 text-gray-600 font-mono text-xs">
            Connect a FIPS-certified HSM to enable live key-handle issuance.
            <br />
            <span className="text-violet-500/40 mt-2 block tracking-widest uppercase">Stateless mode standing by...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
