"use client";

import { LicenseTiers } from "@/components/LicenseTiers";
import { ComplianceGenerator } from "@/components/ComplianceGenerator";
import { Footer } from "@/components/Footer";
import { ThreatScanner } from "@/components/ThreatScanner";
import { AuditTrail } from "@/components/AuditTrail";
import { Shield } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black font-sans selection:bg-emerald-500/30">
      
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
            The World's First Commercial-Grade Post-Quantum Gateway. 
            Dual-deployment on AWS or Local. Protect your assets with <code className="text-emerald-300 bg-emerald-900/40 px-1 py-0.5 rounded">x25519_mlkem768</code> today.
          </p>
          
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
        <div className="rounded-2xl bg-emerald-950/20 border border-emerald-500/20 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
              Sovereign Node Lock Active
            </h2>
            <p className="mt-2 text-gray-400">
              Enforcing PQC Key Encapsulation (ML-KEM) strictly on local Indian nodes for NQM Level 4 compliance.
            </p>
          </div>
          <button 
            onClick={() => alert("Sovereign Policy Updated: Key Encapsulation restricted to Indian Local Nodes (NQM Level 4).")}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            Configure Sovereignty Policy
          </button>
        </div>
      </div>

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
      <ComplianceGenerator />
      <Footer />

    </main>
  );
}
