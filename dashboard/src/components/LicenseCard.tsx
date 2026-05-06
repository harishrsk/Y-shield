"use client";

import React from 'react';
import { Key, ShieldAlert } from 'lucide-react';

export function LicenseCard({ lic }: { lic: any }) {
  const daysLeft = Math.ceil((new Date(lic.expiresAt).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
  const showReminder = daysLeft <= 15 && daysLeft > 0;

  return (
    <div className="mb-8">
      {showReminder && (
        <div className="mb-4 p-4 bg-red-950/40 border border-red-500/50 rounded-xl text-red-200 text-sm animate-pulse flex items-center gap-3">
          <ShieldAlert className="w-5 h-5" />
          CRITICAL: Your {lic.tier} License expires in {daysLeft} days. Renew now to maintain Quantum-Safe protection.
        </div>
      )}
      
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 border-b border-gray-800 pb-4 gap-4 md:gap-0">
          <h2 className="text-lg md:text-xl font-semibold flex items-center">
            <Key className="mr-3 text-emerald-500 shrink-0" /> {lic.tier} License Details
          </h2>
          <div className="text-left md:text-right">
            <p className="text-[10px] md:text-xs text-gray-500">Issued: {new Date(lic.createdAt).toLocaleDateString()}</p>
            <p className={`text-[10px] md:text-xs font-bold ${daysLeft < 30 ? 'text-red-500' : 'text-emerald-500'}`}>
              Expires: {new Date(lic.expiresAt).toLocaleDateString()} ({daysLeft} days left)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
          <div>
            <h3 className="text-[10px] md:text-sm font-bold text-gray-400 uppercase mb-4 tracking-widest">Protected Domains</h3>
            <div className="space-y-2 mb-6">
              {lic.protectedDomains?.map((d: any) => (
                <div key={d.id} className="text-xs md:text-sm font-mono bg-black/40 p-2.5 rounded border border-white/5 flex justify-between items-center">
                   <span className="truncate mr-2">{d.domain}</span>
                  <span className="text-[9px] text-emerald-500 font-bold shrink-0">SECURED</span>
                </div>
              ))}
              {(!lic.protectedDomains || lic.protectedDomains.length === 0) && (
                <p className="text-xs text-gray-600 italic">No domains protected yet.</p>
              )}
            </div>
            
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const domain = (form.elements.namedItem('domain') as HTMLInputElement).value;
                if (!domain) return;
                
                const res = await fetch('/api/license/domains', {
                  method: 'POST',
                  body: JSON.stringify({ licenseId: lic.id, domain })
                });
                
                if (res.ok) {
                  alert("Domain added to Sovereign Protection.");
                  window.location.reload();
                }
              }}
              className="flex gap-2"
            >
              <input 
                name="domain"
                placeholder="domain.com" 
                className="flex-1 bg-black border border-gray-800 rounded-lg px-3 py-2.5 text-xs focus:border-emerald-500 outline-none transition-colors"
              />
              <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-black text-xs font-bold rounded-lg transition-all shrink-0">
                Add
              </button>
            </form>
          </div>
          <div>
            <h3 className="text-[10px] md:text-sm font-bold text-gray-400 uppercase mb-4 tracking-widest">License Authentication</h3>
            <div className="p-5 bg-gray-950 rounded-xl border border-gray-800">
              <p className="text-[10px] text-gray-500 mb-2 uppercase tracking-widest">Authenticated Mobile</p>
              <p className="text-base md:text-lg font-mono text-white mb-4">{lic.mobileNumber || "N/A"}</p>
              <div className="pt-4 border-t border-gray-900">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">License Key</p>
                <p className="text-[10px] font-mono text-gray-600 break-all leading-relaxed">{lic.licenseKey.substring(0, 32)}...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
