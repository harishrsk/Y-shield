"use client";

import { useState } from "react";
import { LayoutDashboard, ShieldCheck, Zap, Activity } from "lucide-react";
import { LicenseCard } from "./LicenseCard";
import { AnalyticsWidgets } from "./AnalyticsWidgets";
import { SovereigntySelector } from "./SovereigntySelector";
import { SecuritySuiteTabs } from "./SecuritySuiteTabs";

interface DashboardTabsProps {
  activeLicenses: any[];
}

export function DashboardTabs({ activeLicenses }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "licenses" | "security">("overview");

  const tabs = [
    { id: "overview", label: "Command Overview", icon: LayoutDashboard, color: "emerald" },
    { id: "licenses", label: "Sovereign Licenses", icon: ShieldCheck, color: "blue" },
    { id: "security", label: "Advanced Security", icon: Zap, color: "violet" },
  ] as const;

  return (
    <div className="w-full pb-20 md:pb-0">
      {/* Tab Navigation - Mobile First Approach */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-gray-800 p-2 md:relative md:bg-transparent md:backdrop-blur-none md:border-t-0 md:p-0 md:mb-12 md:border-b md:pb-6">
        <div className="flex justify-around md:justify-start gap-1 md:gap-4 max-w-7xl mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 py-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all duration-300 group flex-1 md:flex-none ${
                activeTab === tab.id
                  ? `bg-${tab.color}-500/10 text-${tab.color}-400 border border-${tab.color}-500/30 md:shadow-[0_0_20px_rgba(0,0,0,0.5)]`
                  : "bg-transparent text-gray-500 hover:text-gray-300 hover:bg-gray-900/50"
              }`}
            >
              <tab.icon className={`w-5 h-5 md:w-5 md:h-5 ${activeTab === tab.id ? `text-${tab.color}-400` : "text-gray-600 group-hover:text-gray-400"}`} />
              <span className="text-[10px] md:text-base font-bold tracking-tight whitespace-nowrap uppercase md:normal-case">{tab.label.split(" ")[1] || tab.label}</span>
              {tab.id === "licenses" && activeLicenses.length > 0 && (
                <span className={`absolute top-1 right-2 md:relative md:top-0 md:right-0 ml-1 px-1.5 py-0.5 text-[8px] md:text-[10px] rounded-full ${
                  activeTab === "licenses" ? "bg-blue-500 text-black" : "bg-gray-800 text-gray-400"
                }`}>
                  {activeLicenses.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="min-h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === "overview" && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-12">
                <AnalyticsWidgets />
              </div>
            </div>
            <div className="bg-gray-950/50 border border-gray-900 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Activity className="w-5 h-5 text-emerald-500" />
                Network Sovereignty Control
              </h3>
              <SovereigntySelector />
            </div>
          </div>
        )}

        {activeTab === "licenses" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Active Deployments</h3>
              <a href="/checkout" className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
                + Purchase New License
              </a>
            </div>
            
            {activeLicenses.length > 0 ? (
              <div className="grid grid-cols-1 gap-8">
                {activeLicenses.map((lic) => (
                  <LicenseCard key={lic.id} lic={lic} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-gray-900/30 border border-dashed border-gray-800 rounded-3xl">
                <ShieldCheck className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500 italic mb-6">No active quantum-safe licenses found in your registry.</p>
                <a href="/checkout" className="inline-block px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-900/20">
                  Acquire Sovereign License
                </a>
              </div>
            )}
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-1">
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-blue-500">
                    Enterprise Security Suite
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Advanced sovereign hardening — beyond standard PQC compliance</p>
                </div>
                <SecuritySuiteTabs />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
