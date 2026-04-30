"use client";

import { useState, useEffect } from "react";
import { Gauge, Cpu, Zap, Server, TrendingUp } from "lucide-react";

interface PerfData {
  cpu: {
    arch: string;
    model: string;
    cores: number;
    avx512: boolean;
    avx2: boolean;
    aesni: boolean;
    fpgaReady: boolean;
  };
  benchmark: {
    avgLatencyMs: number;
    minLatencyMs: number;
    maxLatencyMs: number;
    p99LatencyMs: number;
    throughputOpsPerSec: number;
    totalTimeMs: number;
  };
  projections: {
    baseline: number;
    withAVX2: number;
    withAVX512: number;
    withFPGA: number;
    concurrentMax: number;
  };
  handshakeTax: {
    currentMs: number;
    targetMs: number;
    meetsTarget: boolean;
    verdict: string;
  };
  acceleration: {
    current: string;
    recommended: string;
    fpgaStatus: string;
  };
  capacity: {
    currentQPS: number;
    targetQPS: number;
    readyForEnterprise: boolean;
  };
}

export function PerformancePanel() {
  const [data, setData] = useState<PerfData | null>(null);
  const [loading, setLoading] = useState(true);
  const [benchmarking, setBenchmarking] = useState(false);

  const fetchBenchmark = async () => {
    try {
      const res = await fetch("/api/perf-benchmark");
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (e) {
      console.error("Perf fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  const runBenchmark = async () => {
    setBenchmarking(true);
    try {
      const res = await fetch("/api/perf-benchmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ iterations: 1000 }),
      });
      const json = await res.json();
      if (json.success) {
        setData((prev) => (prev ? { ...prev, benchmark: json.data.benchmark, cpu: json.data.cpu } : prev));
      }
    } catch (e) {
      console.error("Benchmark error:", e);
    } finally {
      setBenchmarking(false);
    }
  };

  useEffect(() => {
    fetchBenchmark();
  }, []);

  if (loading) return <div className="animate-pulse bg-gray-900 rounded-2xl h-64" />;
  if (!data) return null;

  const latencyPercent = Math.min(100, (data.handshakeTax.currentMs / 2) * 100);
  const capacityPercent = Math.min(100, (data.capacity.currentQPS / data.capacity.targetQPS) * 100);

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Roadmap Overlay */}
      <div className="absolute top-4 right-4 z-20">
        <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
          Acceleration Roadmap
        </span>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <Gauge className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Hardware-Accelerated Throughput
                <span className="text-xs font-mono text-blue-500/70">[SCALAR ACTIVE]</span>
              </h3>
              <p className="text-sm text-gray-500">Vectorized optimization for high-density PQC traffic</p>
            </div>
          </div>
          <button
            onClick={runBenchmark}
            disabled={benchmarking}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            {benchmarking ? "Running 1000x..." : "Run Benchmark"}
          </button>
        </div>

        {/* CPU Info Bar */}
        <div className="flex items-center gap-4 px-4 py-3 bg-gray-900/60 border border-gray-800 rounded-xl mb-6">
          <Cpu className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-mono text-gray-300 truncate flex-1">{data.cpu.model}</span>
          <div className="flex gap-2">
            {data.cpu.avx512 && (
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs font-mono rounded">AVX-512</span>
            )}
            {data.cpu.avx2 && (
              <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-xs font-mono rounded">AVX2</span>
            )}
            {data.cpu.aesni && (
              <span className="px-2 py-0.5 bg-violet-500/10 text-violet-400 text-xs font-mono rounded">AES-NI</span>
            )}
            <span className="px-2 py-0.5 bg-gray-800 text-gray-400 text-xs font-mono rounded">
              {data.cpu.cores} cores
            </span>
          </div>
        </div>

        {/* Gauges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Latency Gauge */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Handshake Latency</div>
            <div className="text-3xl font-bold text-white mb-1">
              {data.benchmark.avgLatencyMs.toFixed(3)}<span className="text-sm text-gray-500">ms</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full transition-all duration-1000 ${
                  data.handshakeTax.meetsTarget ? "bg-emerald-400" : "bg-amber-400"
                }`}
                style={{ width: `${100 - latencyPercent}%` }}
              />
            </div>
            <div className="text-xs text-gray-500">Target: &lt;{data.handshakeTax.targetMs}ms</div>
          </div>

          {/* Throughput */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Throughput</div>
            <div className="text-3xl font-bold text-white mb-1">
              {data.benchmark.throughputOpsPerSec.toLocaleString()}<span className="text-sm text-gray-500"> ops/s</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-400">
                Max concurrent: {data.projections.concurrentMax.toLocaleString()} ops/s
              </span>
            </div>
          </div>

          {/* Capacity */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Enterprise Capacity</div>
            <div className="text-3xl font-bold text-white mb-1">
              {capacityPercent.toFixed(1)}<span className="text-sm text-gray-500">%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
              <div className="h-2 rounded-full bg-blue-400 transition-all duration-1000" style={{ width: `${capacityPercent}%` }} />
            </div>
            <div className="text-xs text-gray-500">
              {data.capacity.currentQPS.toLocaleString()} / {data.capacity.targetQPS.toLocaleString()} target
            </div>
          </div>
        </div>

        {/* Acceleration Tiers */}
        <div className="bg-black/40 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Projected Throughput by Acceleration Tier</div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { tier: "Baseline", ops: data.projections.baseline, active: true },
              { tier: "AVX2", ops: data.projections.withAVX2, active: data.cpu.avx2 },
              { tier: "AVX-512", ops: data.projections.withAVX512, active: data.cpu.avx512 },
              { tier: "FPGA", ops: data.projections.withFPGA, active: false },
            ].map(({ tier, ops, active }) => (
              <div
                key={tier}
                className={`text-center p-3 rounded-lg border ${
                  active
                    ? "bg-blue-950/30 border-blue-900/30"
                    : "bg-gray-900/30 border-gray-800 opacity-50"
                }`}
              >
                <div className="text-xs text-gray-500 mb-1">{tier}</div>
                <div className={`text-sm font-bold font-mono ${active ? "text-blue-400" : "text-gray-600"}`}>
                  {ops.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600">ops/s</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
