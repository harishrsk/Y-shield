"use client";

import React from "react";
import { ShieldAlert } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold flex items-center gap-2 mb-4">
              <ShieldAlert className="w-5 h-5 text-emerald-500" />
              Quantum Liability
            </h3>
            <p className="text-sm mb-4">
              <strong>Liability Waiver:</strong> This software suite incorporates emerging cryptographic algorithms (specifically ML-KEM and ML-DSA). Yochan-Shield is provided "as is" and acknowledges the experimental nature of PQC.
            </p>
            <p className="text-sm">
              <strong>NIST Compliance:</strong> Leveraging `x25519_mlkem768` (FIPS 203) and `mldsa65` (FIPS 204), aligning with NSA's CNSA 2.0 guidelines.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Data Sovereignty</h3>
            <p className="text-sm mb-4">
              <strong>Zero-Trust (NIST 800-207):</strong>
              <br />
              - <strong>Self-Custody:</strong> All cryptographic keys are strictly held within your deployment environment.
              <br />
              - <strong>Data Sovereignty:</strong> Traffic and logic remain under your absolute administrative purview.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Corporate Inquiries</h3>
            <div className="space-y-3">
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Lead Architect</div>
                <div className="text-sm text-gray-200">Harish</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Email</div>
                <a href="mailto:harish@yochanenterprises.com" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                  harish@yochanenterprises.com
                </a>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Direct Line</div>
                <div className="text-sm text-gray-400 font-mono">+91 7502940397</div>
              </div>
            </div>
            <p className="text-[10px] text-gray-600 mt-6 font-mono">
              &copy; {new Date().getFullYear()} Yochan Enterprises.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
