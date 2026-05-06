"use client";

import React from "react";

export function KillSwitchPanel() {
  return (
    <div className="rounded-2xl border border-red-500/20 bg-red-950/10 p-8">
      <h3 className="text-xl font-bold text-red-500 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
        Sovereign Kill Switch (2026 Protocol)
      </h3>
      <p className="mt-2 text-sm text-gray-400">
        In the event of a research breakthrough (Cryptanalysis) breaking a specific PQC algorithm, use the Kill Switch to instantly deprecate the algorithm across all nodes.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <button 
          onClick={async () => {
            if(confirm("CRITICAL: Deprecate ML-KEM-768 across all sovereign nodes?")) {
              await fetch('/api/kill-switch', { method: 'POST', body: JSON.stringify({ algorithm: 'mlkem768' }) });
              alert("ML-KEM-768 Deprecated. Gateway config reloaded.");
            }
          }}
          className="px-4 py-2 bg-red-900/40 hover:bg-red-800 text-red-200 text-sm font-bold rounded border border-red-500/30 transition-all"
        >
          Deprecate ML-KEM-768
        </button>
        <button 
          onClick={async () => {
            if(confirm("CRITICAL: Deprecate SLH-DSA across all sovereign nodes?")) {
              await fetch('/api/kill-switch', { method: 'POST', body: JSON.stringify({ algorithm: 'slhdsa' }) });
              alert("SLH-DSA Deprecated. Gateway config reloaded.");
            }
          }}
          className="px-4 py-2 bg-red-900/40 hover:bg-red-800 text-red-200 text-sm font-bold rounded border border-red-500/30 transition-all"
        >
          Deprecate SLH-DSA
        </button>
      </div>
    </div>
  );
}
