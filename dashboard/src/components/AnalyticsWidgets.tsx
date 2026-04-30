"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, ShieldCheck, ShieldAlert, Globe } from 'lucide-react';

const mockThreatData = [
  { name: 'Mon', attacks: 4000, handshakes: 2400 },
  { name: 'Tue', attacks: 3000, handshakes: 1398 },
  { name: 'Wed', attacks: 2000, handshakes: 9800 },
  { name: 'Thu', attacks: 2780, handshakes: 3908 },
  { name: 'Fri', attacks: 1890, handshakes: 4800 },
  { name: 'Sat', attacks: 2390, handshakes: 3800 },
  { name: 'Sun', attacks: 3490, handshakes: 4300 },
];

const mockCoverageData = [
  { name: 'PQC Protected', value: 85 },
  { name: 'Classical Legacy', value: 15 },
];
const COLORS = ['#10b981', '#ef4444'];

export function AnalyticsWidgets() {
  return (
    <div className="mt-12 space-y-8 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Activity className="text-emerald-500" /> Global Network Intelligence
          <span className="text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-widest">Beta</span>
        </h2>
        <div className="text-xs text-gray-500 font-mono italic">
          Aggregated Telemetry v1.0 — Node-Specific Integration Pending
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Cards */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center gap-4 shadow-lg group hover:border-emerald-500/30 transition-all">
          <div className="p-4 bg-emerald-900/30 rounded-lg text-emerald-500"><ShieldCheck className="w-8 h-8" /></div>
          <div>
            <p className="text-sm text-gray-400">Total Sovereign Handshakes</p>
            <p className="text-3xl font-bold text-white">30,406 <span className="text-[10px] text-gray-600 font-mono">[PROJECTION]</span></p>
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center gap-4 shadow-lg group hover:border-red-500/30 transition-all">
          <div className="p-4 bg-red-900/30 rounded-lg text-red-500"><ShieldAlert className="w-8 h-8" /></div>
          <div>
            <p className="text-sm text-gray-400">Downgrade Attacks Blocked</p>
            <p className="text-3xl font-bold text-white">19,550 <span className="text-[10px] text-gray-600 font-mono">[DEMO]</span></p>
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center gap-4 shadow-lg group hover:border-blue-500/30 transition-all">
          <div className="p-4 bg-blue-900/30 rounded-lg text-blue-500"><Globe className="w-8 h-8" /></div>
          <div>
            <p className="text-sm text-gray-400">Projected Capacity (Domains)</p>
            <p className="text-3xl font-bold text-white">500+</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Global Threat Intelligence <span className="text-[10px] text-gray-500 font-mono ml-2 uppercase tracking-widest">Aggregated</span></h3>
            <div className="flex gap-4 text-[10px] font-mono">
              <span className="text-emerald-400">● Handshakes</span>
              <span className="text-red-400">● Blocked</span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockThreatData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }} />
                <Line type="monotone" dataKey="handshakes" stroke="#10b981" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="attacks" stroke="#ef4444" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col items-center">
          <h3 className="text-lg font-bold text-white mb-2 w-full text-left">Domain Encryption Coverage</h3>
          <div className="h-64 w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockCoverageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {mockCoverageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-4 w-full justify-center">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div><span className="text-xs text-gray-400">PQC Locked</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><span className="text-xs text-gray-400">Legacy RSA</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
