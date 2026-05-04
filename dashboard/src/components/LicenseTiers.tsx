"use client";

import React from "react";
import { TIERS } from "@/lib/auth_license";
import { Check, Zap, Globe, Lock } from "lucide-react";

export function LicenseTiers() {
  return (
    <div className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/5 blur-[120px] rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-[11px] font-bold text-emerald-500 tracking-[0.3em] uppercase mb-4">Institutional Framework</h2>
          <p className="text-4xl font-light tracking-tight text-white sm:text-5xl mb-6">
            Sovereign Provisioning Tiers
          </p>
          <p className="text-lg text-gray-500 font-light leading-relaxed">
            Select the resilience framework aligned with your institutional compliance mandates. All tiers include standard FIPS 203/204 enforcement.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.values(TIERS).map((tier) => (
            <div key={tier.tier} className="relative p-10 bg-white/[0.03] border border-white/5 rounded-[32px] flex flex-col hover:bg-white/[0.05] hover:border-emerald-500/30 transition-all duration-500 group">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-8">
                   <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                      {tier.tier === "Essential" ? <Zap className="w-6 h-6 text-emerald-500" /> : 
                       tier.tier === "Professional" ? <Globe className="w-6 h-6 text-emerald-500" /> : 
                       <Lock className="w-6 h-6 text-emerald-500" />}
                   </div>
                   {tier.tier === "Professional" && (
                     <span className="text-[10px] font-bold bg-emerald-500 text-black px-3 py-1 rounded-full uppercase tracking-widest">Recommended</span>
                   )}
                </div>

                <h3 className="text-2xl font-light text-white mb-2">
                  {tier.tier}
                </h3>
                
                <div className="flex items-baseline text-white mt-4">
                  <span className="text-4xl font-light tracking-tight">{tier.priceYearly}</span>
                  {tier.priceYearly !== "Custom" && <span className="ml-2 text-sm font-light text-gray-500 uppercase tracking-widest">/ Year</span>}
                </div>
                
                <p className="mt-6 text-sm text-gray-500 font-light border-b border-white/5 pb-6">
                  Secures up to <span className="text-white font-medium">{tier.maxTunnels}</span> Post-Quantum Edge Tunnels
                </p>

                <ul role="list" className="mt-8 space-y-5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="flex-shrink-0 w-5 h-5 text-emerald-500/70 mt-0.5" />
                      <span className="ml-4 text-sm text-gray-400 font-light leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="/login"
                className="mt-12 block w-full py-4 px-6 rounded-2xl text-center text-sm font-bold transition-all bg-white/5 border border-white/10 text-white hover:bg-emerald-500 hover:text-black hover:border-emerald-500 hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)]"
              >
                Provision Account
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center text-gray-600 font-mono text-[10px] uppercase tracking-[0.2em]">
           Institutional Grade SLA Included • FIPS 140-3 Level 4 Roadmap
        </div>
      </div>
    </div>
  );
}
