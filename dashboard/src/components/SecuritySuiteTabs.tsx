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
      <div className="flex bg-gray-950 p-1 rounded-xl mb-8 border border-gray-900 md:inline-flex md:bg-transparent md:p-0 md:rounded-none md:border-0 md:border-b md:pb-4 md:w-auto w-full gap-1">
        <button
          onClick={() => setActiveTab("defense")}
          className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 md:px-6 md:py-3 rounded-lg font-bold transition-all text-[10px] md:text-sm ${
            activeTab === "defense"
              ? "bg-emerald-900/40 text-emerald-400 border border-emerald-500/30"
              : "bg-transparent text-gray-500 hover:text-gray-300 hover:bg-gray-900"
          }`}
        >
          <ShieldAlert className="w-3 h-3 md:w-4 md:h-4" /> <span className="whitespace-nowrap">Defense</span>
        </button>
        <button
          onClick={() => setActiveTab("crypto")}
          className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 md:px-6 md:py-3 rounded-lg font-bold transition-all text-[10px] md:text-sm ${
            activeTab === "crypto"
              ? "bg-violet-900/40 text-violet-400 border border-violet-500/30"
              : "bg-transparent text-gray-500 hover:text-gray-300 hover:bg-gray-900"
          }`}
        >
          <Lock className="w-3 h-3 md:w-4 md:h-4" /> <span className="whitespace-nowrap">Crypto</span>
        </button>
        <button
          onClick={() => setActiveTab("infrastructure")}
          className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 md:px-6 md:py-3 rounded-lg font-bold transition-all text-[10px] md:text-sm ${
            activeTab === "infrastructure"
              ? "bg-blue-900/40 text-blue-400 border border-blue-500/30"
              : "bg-transparent text-gray-500 hover:text-gray-300 hover:bg-gray-900"
          }`}
        >
          <Server className="w-3 h-3 md:w-4 md:h-4" /> <span className="whitespace-nowrap">Infra</span>
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
