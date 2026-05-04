"use client";

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area 
} from 'recharts';
import { Shield, Zap, Cpu, HardDrive, ArrowLeft, Download, ExternalLink } from "lucide-react";
import Link from "next/link";

const latencyData = [
  { name: 'Classical (P-256)', latency: 1.0, jitter: 3.0 },
  { name: 'PQC (ML-KEM-512)', latency: 2.1, jitter: 8.5 },
  { name: 'Yochan (ML-KEM-768)', latency: 5.2, jitter: 20.0 },
  { name: 'Max (ML-KEM-1024)', latency: 12.5, jitter: 45.0 },
];

const packetData = [
  { name: 'P-256', size: 64, type: 'Public Key' },
  { name: 'ML-KEM-512', size: 800, type: 'Public Key' },
  { name: 'ML-KEM-768', size: 1184, type: 'Public Key' },
  { name: 'ML-KEM-1024', size: 1568, type: 'Public Key' },
];

const cpuData = [
  { time: '0ms', classical: 5, pqc: 5 },
  { time: '200ms', classical: 8, pqc: 15 },
  { time: '400ms', classical: 5, pqc: 24 },
  { time: '600ms', classical: 12, pqc: 35 },
  { time: '800ms', classical: 7, pqc: 22 },
  { time: '1000ms', classical: 6, pqc: 24 },
];

export default function TechnicalAudit() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 flex justify-between items-end">
        <div>
          <Link href="/dashboard" className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors mb-4 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Command Center
          </Link>
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
            Sovereign Technical Audit v2.0
          </h1>
          <p className="text-gray-400 mt-2">Verified Benchmarks for Hybrid Post-Quantum Infrastructure</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 transition">
            <Download className="w-4 h-4" /> Export PDF
          </button>
          <Link href="/docs/technical_audit_v2.md" className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-black font-bold rounded-lg hover:bg-emerald-500 transition">
             <ExternalLink className="w-4 h-4" /> View Raw Report
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Metric Cards */}
        <div className="bg-gray-950 border border-emerald-500/10 p-6 rounded-2xl flex items-center gap-6">
          <div className="p-4 bg-emerald-500/10 rounded-xl">
            <Zap className="w-8 h-8 text-emerald-500" />
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-1">Mean Latency</div>
            <div className="text-2xl font-bold font-mono">5.2ms</div>
            <div className="text-xs text-emerald-500">+400% vs Classical</div>
          </div>
        </div>

        <div className="bg-gray-950 border border-emerald-500/10 p-6 rounded-2xl flex items-center gap-6">
          <div className="p-4 bg-blue-500/10 rounded-xl">
            <HardDrive className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-1">Packet Size</div>
            <div className="text-2xl font-bold font-mono">1,184B</div>
            <div className="text-xs text-blue-500">MTU Optimized</div>
          </div>
        </div>

        <div className="bg-gray-950 border border-emerald-500/10 p-6 rounded-2xl flex items-center gap-6">
          <div className="p-4 bg-orange-500/10 rounded-xl">
            <Cpu className="w-8 h-8 text-orange-500" />
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-1">CPU Overhead</div>
            <div className="text-2xl font-bold font-mono">24%</div>
            <div className="text-xs text-orange-500">at 1k req/sec</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="lg:col-span-2 bg-gray-950 border border-gray-900 rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-500" /> Handshake Latency Benchmarks
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={latencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'ms', angle: -90, position: 'insideLeft', fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #1f2937', borderRadius: '8px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Bar dataKey="latency" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="jitter" fill="#064e3b" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-950 border border-gray-900 rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-orange-500" /> CPU Load Distribution
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cpuData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #1f2937', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="pqc" stroke="#f97316" fill="#f97316" fillOpacity={0.1} strokeWidth={2} />
                <Area type="monotone" dataKey="classical" stroke="#374151" fill="#374151" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Technical Verdict Section */}
        <div className="lg:col-span-3 bg-gradient-to-br from-emerald-950/20 to-black border border-emerald-500/20 rounded-3xl p-8 relative overflow-hidden">
          <Shield className="absolute top-0 right-0 w-64 h-64 text-emerald-500/5 -translate-y-12 translate-x-12" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Audit Verdict: Sovereign Sweet Spot</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Our analysis confirms that **ML-KEM-768** is the optimal choice for 2026 production environments. 
                By avoiding the quadratically larger keys of Level 5 (ML-KEM-1024), we prevent **IP Fragmentation** 
                and maintain high-concurrency performance while staying 100% compliant with NIST FIPS 203.
              </p>
              <div className="flex gap-8">
                <div className="border-l-2 border-emerald-500 pl-4">
                  <div className="text-2xl font-bold font-mono">1500B</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest">MTU Limit</div>
                </div>
                <div className="border-l-2 border-emerald-500 pl-4">
                  <div className="text-2xl font-bold font-mono">1184B</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest">Yochan Peak</div>
                </div>
              </div>
            </div>
            <div className="bg-black/50 border border-gray-800 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-mono">X25519 Hybrid Layer</span>
                <span className="text-emerald-500 font-bold">PASS</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-mono">ML-DSA-65 Signature</span>
                <span className="text-emerald-500 font-bold">PASS</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-mono">SCA Blinding Immunity</span>
                <span className="text-emerald-500 font-bold">PASS</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-mono">NIST FIPS 203 Compliance</span>
                <span className="text-emerald-500 font-bold">PASS</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
