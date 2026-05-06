"use client";

import { useState } from "react";
import { ShieldAlert, Cpu, Network, Lock, Server } from "lucide-react";
import { EbpfHardeningPanel } from "./EbpfHardeningPanel";
import { QDPIMonitor } from "./QDPIMonitor";
import { SideChannelStatus } from "./SideChannelStatus";
import { ZeroKnowledgePanel } from "./ZeroKnowledgePanel";
import { MerkleFailsafePanel } from "./MerkleFailsafePanel";
import { KillSwitchPanel } from "./KillSwitchPanel";
import { PerformancePanel } from "./PerformancePanel";
import { FederationPanel } from "./FederationPanel";

export function SecuritySuiteTabs() {
  const [activeTab, setActiveTab] = useState<"defense" | "crypto" | "infrastructure">("defense");

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-800 pb-4">
        <button
          onClick={() => setActiveTab("defense")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
            activeTab === "defense"
              ? "bg-emerald-900/40 text-emerald-400 border border-emerald-500/30"
              : "bg-transparent text-gray-500 hover:text-gray-300 hover:bg-gray-900"
          }`}
        >
          <ShieldAlert className="w-4 h-4" /> Network Defense
        </button>
        <button
          onClick={() => setActiveTab("crypto")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
            activeTab === "crypto"
              ? "bg-violet-900/40 text-violet-400 border border-violet-500/30"
              : "bg-transparent text-gray-500 hover:text-gray-300 hover:bg-gray-900"
          }`}
        >
          <Lock className="w-4 h-4" /> Cryptographic Core
        </button>
        <button
          onClick={() => setActiveTab("infrastructure")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
            activeTab === "infrastructure"
              ? "bg-blue-900/40 text-blue-400 border border-blue-500/30"
              : "bg-transparent text-gray-500 hover:text-gray-300 hover:bg-gray-900"
          }`}
        >
          <Server className="w-4 h-4" /> Global Infrastructure
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-8 animate-in fade-in duration-500">
        {activeTab === "defense" && (
          <>
            <EbpfHardeningPanel />
            <QDPIMonitor />
            <SideChannelStatus />
          </>
        )}

        {activeTab === "crypto" && (
          <>
            <ZeroKnowledgePanel />
            <MerkleFailsafePanel />
            <KillSwitchPanel />
          </>
        )}

        {activeTab === "infrastructure" && (
          <>
            <PerformancePanel />
            <FederationPanel />
          </>
        )}
      </div>
    </div>
  );
}
