"use client";

import { useState, useEffect } from "react";
import { Globe, Server, Link2, ShieldCheck, AlertTriangle, Hash, RefreshCw } from "lucide-react";

interface EdgeNode {
  nodeId: string;
  name: string;
  region: string;
  country: string;
  endpoint: string;
  status: "ONLINE" | "OFFLINE" | "SYNCING" | "DEGRADED";
  policyVersion: string;
  lastSync: string;
  algorithms: string[];
  connectionsPerSec: number;
  uplinkLatencyMs: number;
}

interface AuditBlock {
  index: number;
  timestamp: string;
  event: string;
  actor: string;
  nodeId: string;
  data: any;
  previousHash: string;
  hash: string;
}

export function FederationPanel() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAudit, setShowAudit] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const fetchFederation = async () => {
    try {
      const res = await fetch("/api/federation");
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (e) {
      console.error("Federation fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFederation();
    const interval = setInterval(fetchFederation, 15000);
    return () => clearInterval(interval);
  }, []);

  const pushPolicy = async () => {
    setSyncing(true);
    try {
      await fetch("/api/federation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "push_policy", policyVersion: "v2.4.2", actor: "admin@yochan.com" }),
      });
      await fetchFederation();
    } catch (e) {
      console.error("Policy push error:", e);
    } finally {
      setSyncing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ONLINE": return "emerald";
      case "SYNCING": return "amber";
      case "DEGRADED": return "orange";
      default: return "red";
    }
  };

  if (loading) return <div className="animate-pulse bg-gray-900 rounded-2xl h-64" />;
  if (!data) return null;

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <Globe className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Multi-Tenant Sovereign Sync</h3>
              <p className="text-sm text-gray-500">Federated Control Plane — {data.totalNodes} Global Edge Nodes</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAudit(!showAudit)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg transition flex items-center gap-2"
            >
              <Hash className="w-4 h-4" />
              {showAudit ? "Node Map" : "Audit Chain"}
            </button>
            <button
              onClick={pushPolicy}
              disabled={syncing}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "Syncing..." : "Push Policy"}
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: "Online Nodes", value: data.onlineNodes, total: data.totalNodes, color: "emerald" },
            { label: "Chain Integrity", value: data.auditChain.integrity.valid ? "VERIFIED" : "BROKEN", color: data.auditChain.integrity.valid ? "emerald" : "red" },
            { label: "Audit Blocks", value: data.auditChain.totalBlocks, color: "blue" },
            { label: "Data Sovereignty", value: "ENFORCED", color: "violet" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
              <div className={`text-lg font-bold text-${color}-400 mt-1 font-mono`}>{String(value)}</div>
            </div>
          ))}
        </div>

        {!showAudit ? (
          /* Edge Node Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.nodes.map((node: EdgeNode) => {
              const statusColor = getStatusColor(node.status);
              return (
                <div key={node.nodeId} className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Server className={`w-4 h-4 text-${statusColor}-400`} />
                      <span className="text-sm font-bold text-white">{node.name}</span>
                    </div>
                    <span className={`px-2 py-0.5 text-xs font-mono rounded bg-${statusColor}-500/10 text-${statusColor}-400`}>
                      {node.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-gray-400">
                      <span>Region</span>
                      <span className="text-gray-300">{node.region}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Country</span>
                      <span className="text-gray-300">{node.country}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Policy</span>
                      <span className="text-emerald-400">{node.policyVersion}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Throughput</span>
                      <span className="text-blue-400">{node.connectionsPerSec.toLocaleString()} conn/s</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Latency</span>
                      <span className="text-gray-300">{node.uplinkLatencyMs}ms</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {node.algorithms.map((algo) => (
                      <span key={algo} className="px-1.5 py-0.5 bg-gray-800 text-gray-400 text-[10px] font-mono rounded">
                        {algo}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Blockchain Audit Trail */
          <div className="bg-black/40 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-bold text-white">Immutable Blockchain Audit Log</span>
              </div>
              <div className="flex items-center gap-2">
                {data.auditChain.integrity.valid ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                )}
                <span className={`text-xs font-mono ${data.auditChain.integrity.valid ? "text-emerald-400" : "text-red-400"}`}>
                  Chain: {data.auditChain.integrity.valid ? "VERIFIED" : "BROKEN"}
                </span>
              </div>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {(data.auditChain.blocks as AuditBlock[]).slice().reverse().map((block) => (
                <div key={block.index} className="flex items-start gap-3 px-3 py-3 bg-gray-900/40 border border-gray-800 rounded-lg">
                  {/* Chain indicator */}
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <div className="w-0.5 h-full bg-gray-800 mt-1" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold ${
                        block.event.includes("KILL_SWITCH") ? "text-red-400" :
                        block.event.includes("GENESIS") ? "text-violet-400" :
                        "text-blue-400"
                      }`}>
                        #{block.index} — {block.event}
                      </span>
                      <span className="text-[10px] text-gray-600 font-mono">
                        {new Date(block.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono truncate">
                      Hash: {block.hash.substring(0, 32)}...
                    </div>
                    <div className="text-[10px] text-gray-600 font-mono truncate">
                      Prev: {block.previousHash.substring(0, 32)}...
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1">
                      Actor: {block.actor} | Node: {block.nodeId}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sovereignty Footer */}
        <div className="mt-6 flex items-center justify-between px-4 py-3 bg-black/40 border border-gray-800 rounded-xl">
          <span className="text-xs text-gray-500">NQM Level 4 Compliance</span>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-emerald-400">Keys: LOCAL ONLY</span>
            <span className="text-violet-400">Audit: IMMUTABLE</span>
            <span className="text-blue-400">Kill Switch: &lt;1s</span>
          </div>
        </div>
      </div>
    </div>
  );
}
