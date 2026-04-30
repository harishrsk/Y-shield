"use client";

import React from "react";
import { ShieldAlert } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold flex items-center gap-2 mb-4">
              <ShieldAlert className="w-5 h-5 text-emerald-500" />
              Quantum Liability & Compliance
            </h3>
            <p className="text-sm mb-4">
              <strong>1. Quantum Liability Waiver:</strong> This software suite incorporates emerging cryptographic algorithms (specifically Kyber/ML-KEM and Dilithium/ML-DSA). While adhering to upcoming NIST standards, they are actively evolving. Yochan-Shield is provided "as is" and acknowledges the experimental nature of Post-Quantum Cryptography (PQC).
            </p>
            <p className="text-sm">
              <strong>2. NIST & CNSA 2.0 Compliance:</strong> The Gateway leverages `x25519_mlkem768` hybrid key exchange (FIPS 203) and `mldsa65` digital signatures (FIPS 204), aligning with the NSA's CNSA 2.0 transition guidelines.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Data Sovereignty</h3>
            <p className="text-sm mb-4">
              <strong>Zero-Trust Architecture (NIST 800-207):</strong>
              <br />
              <br />
              - <strong>Self-Custody:</strong> All cryptographic keys are strictly held within your deployment environment. We cannot extract or backup private material.
              <br />
              - <strong>Data Sovereignty:</strong> Traffic, logging, and interception logic remain under your absolute administrative purview.
            </p>
            <p className="text-xs text-gray-500 mt-8">
              &copy; {new Date().getFullYear()} Yochan-Shield PQC Suite. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
