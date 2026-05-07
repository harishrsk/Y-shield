import { SalesArchitectAgent } from "@/components/SalesArchitectAgent";
import { Shield } from "lucide-react";
import Link from "next/link";

export default function SalesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-cyan-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center glow-blue">
            <Shield className="text-white" size={24} />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tighter">Y-SHIELD</span>
            <div className="text-[10px] font-mono text-cyan-400 leading-none">SOVEREIGN PQC</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="/login" className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-all active:scale-95">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-12 pb-24">
        <SalesArchitectAgent />
      </main>

      {/* Footer Decoration */}
      <div className="fixed bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-0" />
      
      <div className="relative z-10 flex flex-col items-center justify-center pb-12 gap-2">
        <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em]">
          Endorsed by National Quantum Mission (NQM) • FIPS 140-3 Compliant
        </p>
        <div className="flex gap-4">
          <div className="h-px w-12 bg-white/5" />
          <div className="w-1 h-1 rounded-full bg-cyan-500" />
          <div className="h-px w-12 bg-white/5" />
        </div>
      </div>
    </div>
  );
}
