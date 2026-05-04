"use client";

import { LicenseTiers } from "@/components/LicenseTiers";
import { ComplianceGenerator } from "@/components/ComplianceGenerator";
import { Footer } from "@/components/Footer";
import { ThreatScanner } from "@/components/ThreatScanner";
import { AuditTrail } from "@/components/AuditTrail";
import { useState } from "react";
import { Shield } from "lucide-react";

export default function Home() {
  const [sovereignRegion, setSovereignRegion] = useState("AWS Mumbai (ap-south-1)");
  const [showSovereignModal, setShowSovereignModal] = useState(false);
  const [showLaymanGuide, setShowLaymanGuide] = useState(false);
  const isSovereign = sovereignRegion.includes("Mumbai") || sovereignRegion.includes("Delhi") || sovereignRegion.includes("Pune");
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Yochan-Shield",
    "operatingSystem": "Linux, Cloud, Edge",
    "applicationCategory": "SecurityApplication",
    "description": "High-performance Post-Quantum Cryptography (PQC) security gateway and edge router.",
    "offers": {
      "@type": "Offer",
      "price": "199000.00",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "Yochan Enterprises",
      "url": "https://yochanenterprises.com"
    }
  };

  return (
    <main className="min-h-screen bg-black font-sans selection:bg-emerald-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-950 px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-400 to-teal-800 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
              Introducing Post-Quantum Cryptography Edge.{" "}
              <a href="/login" className="font-semibold text-emerald-400">
                <span className="absolute inset-0" aria-hidden="true" />
                Get Started <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl flex items-center justify-center gap-4">
            <Shield className="w-12 h-12 text-emerald-400" /> 
            Yochan-Shield
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            The World&apos;s First Commercial-Grade Post-Quantum Gateway. 
            Dual-deployment on AWS or Local. Protect your assets with <code className="text-emerald-300 bg-emerald-900/40 px-1 py-0.5 rounded">x25519_mlkem768</code> today.
          </p>
          
          <div className="mt-4">
            <button 
              onClick={() => setShowLaymanGuide(true)}
              className="text-xs font-mono text-emerald-500/70 hover:text-emerald-400 transition-colors uppercase tracking-widest flex items-center justify-center gap-2 mx-auto"
            >
              <span className="w-4 h-px bg-emerald-500/30"></span>
              What is this? (The Layman&apos;s Guide)
              <span className="w-4 h-px bg-emerald-500/30"></span>
            </button>
          </div>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a href="/checkout" className="rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400">
              Purchase License
            </a>
            <a href="/dashboard" className="text-sm font-semibold leading-6 text-white hover:text-emerald-300 transition-colors">
              Access Client Portal <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-teal-400 to-emerald-800 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
      </div>

      <ThreatScanner />
      
      {/* Data Sovereignty Lock Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
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
            className={`px-6 py-3 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(0,0,0,0.3)] ${isSovereign ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/30' : 'bg-orange-600 hover:bg-orange-500 shadow-orange-500/30'}`}
          >
            Configure Sovereignty Policy
          </button>
        </div>
      </div>

      {/* Sovereignty Policy Modal */}
      {showSovereignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Select Physical Data Center</h3>
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
                    // Simulate logging the policy change to the backend audit trail
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

      {/* Layman's Guide Modal */}
      {showLaymanGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md px-4">
          <div className="bg-gray-950 border border-emerald-500/20 rounded-3xl p-8 max-w-2xl w-full shadow-[0_0_50px_rgba(16,185,129,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Shield className="w-64 h-64 text-emerald-500" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-emerald-500/10 rounded-2xl">
                  <Shield className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight">The Layman&apos;s Guide</h3>
              </div>

              <div className="space-y-6 text-lg leading-relaxed text-gray-300">
                <p>
                  Think of the internet today as using <span className="text-white font-semibold italic underline decoration-emerald-500/30">standard padlocks</span>. They work great for now, but a new type of <span className="text-emerald-400 font-bold">&quot;Quantum&quot; skeleton key</span> is being built that can open almost every padlock in the world.
                </p>
                <p>
                  Companies are already &quot;harvesting&quot; encrypted data today, waiting for that key to be finished so they can unlock it later. 
                </p>
                <div className="p-6 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl italic">
                  &quot;Yochan-Shield replaces those old padlocks with new, <span className="text-emerald-400 font-bold underline">Quantum-Safe locks</span> that are mathematically impossible for that new key to open. We keep your data safe not just for today, but for the next 50 years.&quot;
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-900 flex justify-between items-center">
                <div className="text-sm text-gray-500 font-mono uppercase tracking-widest">Simple Secure Sovereign</div>
                <button 
                  onClick={() => setShowLaymanGuide(false)}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-black font-bold rounded-xl transition shadow-lg shadow-emerald-500/20"
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AuditTrail />

      {/* Danger Zone: PQC Kill Switch */}
      <div className="max-w-7xl mx-auto px-6 py-12">
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
      </div>

      <LicenseTiers />

      {/* Strategic Partnerships Section */}
      <div className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Strategic Partnerships & Acquisitions</h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Yochan-Shield is currently expanding its global edge node network and exploring strategic integrations with Tier-1 defense and financial institutions. We are open to discussions regarding sovereign licensing, white-label partnerships, and technical acquisitions.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">Lead Architect</div>
                <div className="text-white font-bold">Harish</div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-emerald-950/10 rounded-xl border border-emerald-900/20">
                <div className="text-xs text-emerald-500 uppercase tracking-widest font-mono">Direct Inquiry</div>
                <a href="mailto:harish@yochanenterprises.com" className="text-white font-bold hover:text-emerald-400 transition-colors underline decoration-emerald-500/50">
                  harish@yochanenterprises.com
                </a>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <Shield className="w-24 h-24 text-emerald-500/5 rotate-12" />
            </div>
            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4">Institutional Access</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex gap-3">
                <span className="text-emerald-500">✓</span>
                Full Technical Due Diligence Folders Available
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500">✓</span>
                FIPS 140-3 Level 4 Roadmap Verification
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500">✓</span>
                NQM Level 4 Sovereignty Audit Reports
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500">✓</span>
                eBPF & AVX-512 Source Code Inspection (under NDA)
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ComplianceGenerator />
      <Footer />

    </main>
  );
}
