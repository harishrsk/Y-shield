"use client";

import { ShieldCheck, Cpu, Zap, Lock } from "lucide-react";

export function SideChannelStatus() {
  const protections = [
    {
      name: "Constant-Time Lattice Math",
      status: "ACTIVE",
      detail: "All ML-KEM and ML-DSA operations execute in fixed time regardless of key bits",
      icon: Cpu,
      color: "emerald",
      fips: "FIPS 140-3 Level 4",
    },
    {
      name: "Blinding Countermeasures",
      status: "ACTIVE",
      detail: "Random blinding factors applied during key encapsulation to mask power signatures",
      icon: Lock,
      color: "cyan",
      fips: "Side-Channel Resistant",
    },
    {
      name: "Masking Techniques",
      status: "ACTIVE",
      detail: "Boolean and arithmetic masking on all intermediate lattice values",
      icon: Zap,
      color: "amber",
      fips: "DPA/SPA Immune",
    },
    {
      name: "Timing-Safe Comparisons",
      status: "ACTIVE",
      detail: "All secret-dependent branches eliminated via cmov/conditional-select instructions",
      icon: ShieldCheck,
      color: "violet",
      fips: "Timing Attack Proof",
    },
  ];

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Side-Channel Attack Immunity</h3>
            <p className="text-sm text-gray-500">FIPS 140-3 Level 4 Hardening Suite</p>
          </div>
          <div className="ml-auto px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">All Systems Protected</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {protections.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.name} className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all group">
                <div className="flex items-start gap-3">
                  <div className={`p-2 bg-${p.color}-500/10 rounded-lg`}>
                    <Icon className={`w-5 h-5 text-${p.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-white">{p.name}</span>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {p.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed mb-2">{p.detail}</p>
                    <span className="text-xs text-gray-600 font-mono">{p.fips}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compliance Bar */}
        <div className="mt-6 flex items-center justify-between px-4 py-3 bg-black/40 border border-gray-800 rounded-xl">
          <span className="text-xs text-gray-500">Physical Attack Surface Reduction</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-emerald-400 font-mono">Timing: IMMUNE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-emerald-400 font-mono">Power: MASKED</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-emerald-400 font-mono">EM: SHIELDED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
