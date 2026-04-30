"use client";

import React from 'react';
import { History, ShieldCheck, FileKey } from 'lucide-react';

export function AuditTrail() {
  const [logs, setLogs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/audit-trail')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLogs(data);
        } else {
          setLogs([]);
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <History className="w-8 h-8 text-emerald-400" />
        <h2 className="text-3xl font-bold text-white">Live Sovereign Audit Trail</h2>
      </div>

      <div className="overflow-y-auto max-h-[400px] rounded-2xl border border-white/10 bg-gray-900/40 backdrop-blur-xl shadow-inner scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-gray-900 sticky top-0 z-10 shadow-md">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Event Type</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Target</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Algorithm</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {logs.length === 0 && !loading && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500 italic">No events recorded in this session.</td>
              </tr>
            )}
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-white">{log.eventType}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{log.target}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <code className="text-xs bg-emerald-950/40 text-emerald-300 px-2 py-1 rounded border border-emerald-500/20">{log.algorithm}</code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${log.status === 'Verified' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-blue-400/10 text-blue-400'}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
