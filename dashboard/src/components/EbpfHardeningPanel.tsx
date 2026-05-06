"use client";

import { Shield, Cpu, Activity, ServerCrash, Lock } from "lucide-react";
import { useState, useEffect } from "react";

export function EbpfHardeningPanel() {
  const [synCount, setSynCount] = useState(0);
  const [droppedCount, setDroppedCount] = useState(0);
  const [isFlooding, setIsFlooding] = useState(false);

  // Simulate a DDoS attack for the UI
  const triggerDDoS = () => {
    if (isFlooding) return;
    setIsFlooding(true);
    let iterations = 0;
    
    const interval = setInterval(() => {
      iterations++;
      setSynCount(prev => prev + Math.floor(Math.random() * 5000) + 1000);
      setDroppedCount(prev => prev + Math.floor(Math.random() * 4900) + 900);
      
      if (iterations > 20) {
        clearInterval(interval);
        setIsFlooding(false);
      }
    }, 200);
  };

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 relative overflow-hidden">
      {/* Ambient glow */}
      {isFlooding ? (
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      ) : (
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />
      )}

      {/* Enterprise Grade Overlay */}
      <div className="absolute top-4 right-4 z-20">
        <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          Tier-1 Enterprise Evaluator Node
        </span>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-900 rounded-xl border border-gray-800">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                eBPF / XDP Kernel Defense
                <span className="text-xs font-mono text-emerald-500/70">[NIC DRIVER ATTACHED]</span>
              </h3>
              <p className="text-sm text-gray-500">Lattice-Flood Protection & Protocol Downgrade Hardening</p>
            </div>
          </div>
          <button
            onClick={triggerDDoS}
            disabled={isFlooding}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition flex items-center gap-2 ${
              isFlooding 
                ? 'bg-red-900/50 text-red-400 border border-red-500/30' 
                : 'bg-red-600 hover:bg-red-500 text-white'
            }`}
          >
            <ServerCrash className="w-4 h-4" />
            {isFlooding ? "Absorbing Flood..." : "Simulate ML-KEM Flood"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Active Status */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">XDP Engine</span>
            </div>
            <div className="text-2xl font-mono text-white">ACTIVE</div>
            <div className="text-xs text-gray-500 mt-1">eth0 Interface</div>
          </div>

          {/* Dropped Packets */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 md:col-span-2">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 text-red-400" />
              Malicious SYNs Dropped (Kernel Space)
            </div>
            <div className="flex items-end gap-3">
              <div className="text-4xl font-bold font-mono text-white">
                {droppedCount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 mb-1">
                / {synCount.toLocaleString()} total
              </div>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1 mt-3">
              <div 
                className="h-1 rounded-full bg-red-500 transition-all duration-300" 
                style={{ width: synCount === 0 ? '0%' : `${Math.min(100, (droppedCount / synCount) * 100)}%` }} 
              />
            </div>
          </div>

          {/* CPU Load */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 flex flex-col justify-center">
             <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Proxy CPU Load</span>
            </div>
            <div className="text-2xl font-mono text-white flex items-baseline gap-1">
              {isFlooding ? '1.2' : '0.4'} <span className="text-sm text-gray-500">%</span>
            </div>
            <div className="text-[10px] text-emerald-500 mt-1 uppercase tracking-widest">
              Bypassing User-Space
            </div>
          </div>
        </div>

        {/* Enterprise Hardening Checks */}
        <div className="bg-black/40 border border-gray-800 rounded-xl p-5">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-4 font-bold flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-400" /> Architecture Security Matrix
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <div>
                <div className="text-sm text-white font-bold">PQC-Strict HSTS</div>
                <div className="text-xs text-gray-500">Downgrade/Stripping Prevention</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <div>
                <div className="text-sm text-white font-bold">Atomic Socket Handoff</div>
                <div className="text-xs text-gray-500">Zero-Drop SO_REUSEPORT</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <div>
                <div className="text-sm text-white font-bold">Jumbo PMTUD</div>
                <div className="text-xs text-gray-500">1.2KB ML-KEM Fragment Tuning</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
