"use client";

import React from "react";
import { TIERS } from "@/lib/auth_license";
import { Check, Shield } from "lucide-react";

export function LicenseTiers() {
  return (
    <div className="py-12 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-emerald-400 tracking-wide uppercase">Pricing & Licensing</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-500">
            Quantum-Safe Tiers for Every Scale
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
            Choose the right level of zero-trust security for your deployment.
          </p>
        </div>

        <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {Object.values(TIERS).map((tier) => (
            <div key={tier.tier} className="relative p-8 bg-gray-900 bg-opacity-50 border border-gray-800 rounded-2xl shadow-xl flex flex-col hover:border-emerald-500 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-md">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  {tier.tier}
                </h3>
                <p className="mt-4 flex items-baseline text-white">
                  <span className="text-5xl font-extrabold tracking-tight">{tier.priceYearly}</span>
                  {tier.priceYearly !== "Custom" && <span className="ml-1 text-xl font-semibold text-gray-400">/year</span>}
                </p>
                <p className="mt-6 text-gray-400">
                  Up to {tier.maxTunnels} Post-Quantum Tunnels
                </p>

                <ul role="list" className="mt-6 space-y-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="flex-shrink-0 w-6 h-6 text-emerald-400" aria-hidden="true" />
                      <span className="ml-3 text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="/login"
                className="mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium text-black bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 shadow-lg shadow-emerald-500/30 transition-all"
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
