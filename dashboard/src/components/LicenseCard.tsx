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
      
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl">
        <div className="flex justify-between items-start mb-6 border-b border-gray-800 pb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Key className="mr-3 text-emerald-500" /> {lic.tier} License Details
          </h2>
          <div className="text-right">
            <p className="text-xs text-gray-500">Issued: {new Date(lic.createdAt).toLocaleDateString()}</p>
            <p className={`text-xs font-bold ${daysLeft < 30 ? 'text-red-500' : 'text-emerald-500'}`}>
              Expires: {new Date(lic.expiresAt).toLocaleDateString()} ({daysLeft} days left)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 tracking-widest">Protected Domains</h3>
            <div className="space-y-2 mb-6">
              {lic.protectedDomains?.map((d: any) => (
                <div key={d.id} className="text-sm font-mono bg-black/40 p-2 rounded border border-white/5 flex justify-between items-center">
                  {d.domain}
                  <span className="text-[10px] text-emerald-500">SECURED</span>
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
                placeholder="Enter domain" 
                className="flex-1 bg-black border border-gray-800 rounded px-3 py-2 text-xs focus:border-emerald-500 outline-none transition-colors"
              />
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-black text-xs font-bold rounded transition-all">
                Add
              </button>
            </form>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 tracking-widest">License Authentication</h3>
            <div className="p-4 bg-gray-950 rounded-lg border border-gray-800">
              <p className="text-xs text-gray-400 mb-2">Authenticated via Mobile:</p>
              <p className="text-lg font-mono text-white">{lic.mobileNumber || "N/A"}</p>
              <p className="mt-4 text-xs text-gray-500 italic">License Key (Truncated):</p>
              <p className="text-[10px] font-mono text-gray-600 break-all">{lic.licenseKey.substring(0, 40)}...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
