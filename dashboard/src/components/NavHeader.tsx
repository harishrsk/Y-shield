"use client";

import { useSession, signOut } from "next-auth/react";
import { Shield, User, LogOut, ChevronRight } from "lucide-react";

export function NavHeader() {
  const { data: session, status } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-emerald-500" />
          <span className="text-xl font-bold text-white tracking-tight">Yochan-Shield</span>
        </a>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#scanner" className="hover:text-emerald-400 transition-colors">Scanner</a>
            <a href="#compliance" className="hover:text-emerald-400 transition-colors">Compliance</a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
          </div>

          <div className="h-6 w-px bg-white/10 hidden md:block"></div>

          {status === "authenticated" ? (
            <div className="flex items-center gap-4">
              <a 
                href="/dashboard" 
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold hover:bg-emerald-500 hover:text-black transition-all"
              >
                <User className="w-3 h-3" />
                Dashboard
              </a>
              <button 
                onClick={() => signOut()}
                className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <a 
                href="/login" 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Sign In
              </a>
              <a 
                href="/signup" 
                className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-full text-sm font-bold hover:bg-gray-200 transition-all shadow-lg shadow-white/5"
              >
                Get Started
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
