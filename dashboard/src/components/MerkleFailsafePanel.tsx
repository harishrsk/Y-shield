import React from "react";
import { ShieldCheck, Zap, Server, Shield } from "lucide-react";

export function MerkleFailsafePanel() {
  return (
    <div className="bg-gray-900/50 border border-violet-900/20 rounded-xl p-8 backdrop-blur-sm">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-xl font-bold text-violet-400 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6" /> Tiered Cryptography Routing
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Select your cryptographic enforcement tier. Premium Tier uses stateless hash-based failsafes (SLH-DSA/SPHINCS+).
          </p>
        </div>
        <div className="px-3 py-1 bg-violet-950/30 border border-violet-500/30 rounded-full">
          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Active Tier: Standard</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tier 1: Standard */}
        <div className="border border-emerald-900/20 bg-emerald-950/5 p-6 rounded-lg group hover:border-emerald-500/50 transition-all cursor-pointer">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-emerald-400 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Standard PQC
            </h4>
            <div className="text-[10px] bg-emerald-500 text-black px-2 py-0.5 rounded font-bold">ACTIVE</div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Uses ML-DSA (Dilithium) for high-throughput traffic. Optimized for sub-1ms overhead and minimal RAM footprint. Ideal for high-frequency trading and low-latency APIs.
          </p>
          <div className="mt-4 flex gap-4 text-[10px] font-mono text-gray-500">
            <span>PROTOCOL: TLS 1.3</span>
            <span>PORT: 443</span>
            <span>MEM: 16KB</span>
          </div>
        </div>

        {/* Tier 2: Premium Merkle Failsafe */}
        <div className="border border-violet-900/20 bg-violet-950/5 p-6 rounded-lg group hover:border-violet-500/50 transition-all cursor-pointer border-dashed">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-violet-400 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Merkle Failsafe (SLH-DSA)
            </h4>
            <div className="text-[10px] border border-violet-500 text-violet-400 px-2 py-0.5 rounded font-bold group-hover:bg-violet-500 group-hover:text-black transition-all">OPT-IN</div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Stateless Hash-Based signatures (SPHINCS+). Immune to potential future lattice vulnerabilities. Requires isolated high-memory buffers (128KB) to handle massive signatures.
          </p>
          <div className="mt-4 flex gap-4 text-[10px] font-mono text-gray-500">
            <span>PROTOCOL: TLS 1.3 + Merkle</span>
            <span>PORT: 8443</span>
            <span>MEM: 128KB</span>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-black/40 border border-gray-800 rounded text-[11px] font-mono text-gray-500 flex gap-4 items-center">
        <Server className="w-4 h-4 text-violet-500" />
        <span>PROVISIONING LOG: Tiered listeners active. Premium block isolated on 8443 with 128k buffers. Standard block on 443 active with ML-DSA.</span>
      </div>
    </div>
  );
}
