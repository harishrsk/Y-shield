"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Shield, User, LogOut, ChevronRight, Menu, X } from "lucide-react";

export function NavHeader() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-emerald-500 shrink-0" />
          <span className="text-lg sm:text-xl font-bold text-white tracking-tight">Yochan-Shield</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="/#scanner" className="hover:text-emerald-400 transition-colors">Scanner</a>
            <a href="/#compliance" className="hover:text-emerald-400 transition-colors">Compliance</a>
            <a href="/#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
          </div>

          <div className="h-6 w-px bg-white/10"></div>

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

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          {status === "authenticated" && (
            <a href="/dashboard" className="p-2 text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              <User className="w-4 h-4" />
            </a>
          )}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-400 hover:text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-950 border-b border-white/5 px-4 py-6 space-y-4 shadow-2xl">
          <div className="flex flex-col gap-4 text-sm font-medium text-gray-300">
            <a href="/#scanner" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400">Scanner</a>
            <a href="/#compliance" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400">Compliance</a>
            <a href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400">Pricing</a>
          </div>
          
          <div className="h-px w-full bg-white/10 my-4"></div>
          
          {status === "authenticated" ? (
            <div className="flex justify-between items-center">
              <a href="/dashboard" className="text-emerald-400 font-bold text-sm">Client Portal</a>
              <button onClick={() => signOut()} className="text-red-400 text-sm font-medium">Logout</button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <a href="/login" className="text-center py-3 w-full bg-white/5 rounded-xl text-white font-medium">Sign In</a>
              <a href="/signup" className="text-center py-3 w-full bg-emerald-500 rounded-xl text-black font-bold">Get Started</a>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
