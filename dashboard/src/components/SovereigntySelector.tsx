"use client";

import React, { useState } from "react";

export function SovereigntySelector() {
  const [sovereignRegion, setSovereignRegion] = useState("AWS Mumbai (ap-south-1)");
  const [showSovereignModal, setShowSovereignModal] = useState(false);
  const isSovereign = sovereignRegion.includes("Mumbai") || sovereignRegion.includes("Delhi") || sovereignRegion.includes("Pune");

  return (
    <>
      <div className={`rounded-2xl border p-8 flex flex-col md:flex-row items-center justify-between gap-8 transition-all ${isSovereign ? 'bg-emerald-950/20 border-emerald-500/20' : 'bg-orange-950/20 border-orange-500/20'}`}>
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className={`flex h-3 w-3 rounded-full animate-pulse ${isSovereign ? 'bg-emerald-500' : 'bg-orange-500'}`} />
            {isSovereign ? "Sovereign Node Lock Active" : "Global PQC Routing Active"}
          </h2>
          <p className="mt-2 text-gray-400">
            {isSovereign 
              ? `Enforcing PQC Key Encapsulation strictly on local Indian nodes (${sovereignRegion}) for NQM Level 4 compliance.`
              : `Routing PQC via ${sovereignRegion}. FIPS 203 Compliant, but Data Sovereignty (NQM Level 4) is disabled.`}
          </p>
        </div>
        <button 
          onClick={() => setShowSovereignModal(true)}
          className={`w-full md:w-auto px-6 py-3 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(0,0,0,0.3)] ${isSovereign ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/30' : 'bg-orange-600 hover:bg-orange-500 shadow-orange-500/30'}`}
        >
          Configure Sovereignty Policy
        </button>
      </div>

      {showSovereignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Select Physical Data Center</h3>
            <p className="text-gray-400 mb-6 text-sm">
              Routing cryptography to a foreign data center will instantly revoke NQM Level 4 (Sovereign) compliance.
            </p>
            
            <div className="space-y-3 mb-8">
              {[
                { name: "AWS Mumbai (ap-south-1)", type: "NQM Level 4 Valid", icon: "🇮🇳" },
                { name: "Azure Pune (Central India)", type: "NQM Level 4 Valid", icon: "🇮🇳" },
                { name: "On-Premise Delhi (Rack 1)", type: "NQM Level 4 Valid", icon: "🇮🇳" },
                { name: "AWS US-East (Virginia)", type: "Non-Sovereign", icon: "🇺🇸" },
                { name: "AWS Europe (Stockholm)", type: "Non-Sovereign", icon: "🇸🇪" },
              ].map((dc) => (
                <button
                  key={dc.name}
                  onClick={() => {
                    setSovereignRegion(dc.name);
                    setShowSovereignModal(false);
                    fetch('/api/audit-trail', { method: 'POST', body: JSON.stringify({ action: `Sovereignty Policy Changed to ${dc.name}` }) }).catch(() => {});
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${sovereignRegion === dc.name ? 'bg-gray-800 border-emerald-500' : 'bg-black border-gray-800 hover:border-gray-600'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{dc.icon}</span>
                    <span className="text-white font-medium">{dc.name}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${dc.type.includes("NQM") ? 'bg-emerald-900/50 text-emerald-400' : 'bg-orange-900/50 text-orange-400'}`}>
                    {dc.type}
                  </span>
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setShowSovereignModal(false)}
              className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
