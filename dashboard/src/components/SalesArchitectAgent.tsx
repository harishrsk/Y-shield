"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Zap, 
  Terminal as TerminalIcon, 
  FileText, 
  Download, 
  UserCheck, 
  AlertCircle,
  ChevronRight,
  Send
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SalesArchitectAgent = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'agent', content: 'Sovereign Intelligence Architect initialized. Ready for technical diagnostic.' }
  ]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState(['> System Ready', '> Awaiting Handshake...']);
  const [showAssessment, setShowAssessment] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const steps = [
    { q: "Step 1/4: What is your primary encryption algorithm for data-at-rest? (e.g., AES-256, RSA-2048)", key: 'encryption' },
    { q: "Step 2/4: What is the estimated shelf-life of your most sensitive data? (5yr, 10yr, 30yr+)", key: 'shelfLife' },
    { q: "Step 3/4: Specify your industry vertical for regulatory mapping.", key: 'industry' },
    { q: "Step 4/4: Which compliance mandate is your primary focus? (NQM, GDPR, DPDP)", key: 'compliance' }
  ];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [terminalOutput]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { id: Date.now(), role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');

    if (step < steps.length) {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'agent', content: steps[step].q }]);
        setStep(step + 1);
        simulateTerminal(`Processing ${steps[step].key}: ${currentInput}`);
      }, 800);
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'agent', content: 'Diagnostic complete. Generating Quantum Risk Assessment...' }]);
        setShowAssessment(true);
        simulateHandshake();
      }, 1000);
    }
  };

  const simulateTerminal = (msg: string) => {
    setTerminalOutput(prev => [...prev.slice(-15), `> ${msg}`]);
  };

  const simulateHandshake = () => {
    const frames = [
      "Starting ML-KEM-768 Handshake...",
      "Generating Kyber.Encapsulate(pk)...",
      "Shared Secret Derived: 0x4F...E1",
      "Mathematical Proof: SECURE",
      "Classical RSA: VULNERABLE",
      "Handshake Completed in 0.42ms",
      "Generating Artifact: quantum_risk_assessment.pdf"
    ];
    frames.forEach((f, i) => {
      setTimeout(() => simulateTerminal(f), i * 300);
    });
  };

  if (!isMounted) return null; // Prevent hydration mismatch

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto p-4 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Left Column: Terminal & Feature Cards */}
      <div className="flex-1 space-y-6 order-2 lg:order-1">
        {/* Sandbox Terminal */}
        <div className="glass-card rounded-3xl overflow-hidden border border-emerald-500/20 bg-black shadow-[0_0_40px_rgba(16,185,129,0.1)]">
          <div className="bg-emerald-500/10 px-4 py-2 border-b border-emerald-500/20 flex items-center gap-2">
            <TerminalIcon size={14} className="text-emerald-400" />
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Sandbox Terminal - PQC_DEMO_V1</span>
          </div>
          <div 
            ref={terminalRef}
            className="h-64 overflow-y-auto p-4 font-mono text-xs text-emerald-500/80 space-y-1 scrollbar-hide"
          >
            {terminalOutput.map((line, i) => (
              <div key={i} className="flex gap-2">
                <span className="opacity-50">[{new Date().toLocaleTimeString()}]</span>
                <span>{line}</span>
              </div>
            ))}
            <div className="w-2 h-4 bg-emerald-500/50 animate-pulse inline-block"></div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-6 rounded-2xl border border-white/5 bg-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg"><Shield size={18} className="text-cyan-400" /></div>
              <h4 className="font-bold text-white text-sm">Sovereign Protocol</h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Enforcing ML-KEM-768 and ML-DSA-65 standards for mathematical immunity against quantum decryption.
            </p>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-white/5 bg-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500/10 rounded-lg"><Zap size={18} className="text-purple-400" /></div>
              <h4 className="font-bold text-white text-sm">AVX-512 Optimized</h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              High-performance vectorization ensuring PQC overhead remains under 0.5ms per handshake.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Chat Interface */}
      <div className="w-full lg:w-[450px] flex flex-col h-[600px] lg:h-[700px] glass-card rounded-3xl overflow-hidden border border-white/10 bg-zinc-950/50 backdrop-blur-xl order-1 lg:order-2 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-white/5 flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-purple-600 flex items-center justify-center">
              <Shield size={24} className="text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-zinc-950 animate-pulse"></div>
          </div>
          <div>
            <h3 className="font-bold text-white tracking-tight">Sales Architect</h3>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Active Diagnostic Mode</span>
            </div>
          </div>
        </div>

        {/* Chat Body */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
        >
          {messages.map((m) => (
            <div 
              key={m.id}
              className={cn(
                "flex flex-col max-w-[85%] animate-in fade-in slide-in-from-bottom-2",
                m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div className={cn(
                "px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg",
                m.role === 'user' 
                  ? "bg-cyan-600 text-white rounded-tr-none" 
                  : "bg-zinc-900 border border-white/10 text-zinc-200 rounded-tl-none backdrop-blur-sm"
              )}>
                {m.content}
              </div>
            </div>
          ))}
        </div>

        {/* Footer: Input / Assessment */}
        <div className="p-6 bg-black/40 border-t border-white/5">
          {showAssessment ? (
            <div className="space-y-3 animate-in zoom-in-95 duration-500">
              <div className="flex items-center gap-2 mb-2">
                <FileText size={16} className="text-purple-400" />
                <span className="text-xs font-bold text-white uppercase tracking-tighter">Quantum Risk Assessment Ready</span>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                <Download size={18} />
                DOWNLOAD REPORT (PDF)
              </button>
              <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                <UserCheck size={18} />
                TALK TO HUMAN ARCHITECT
              </button>
            </div>
          ) : (
            <div className="relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your response..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors pr-14 text-zinc-200 placeholder:text-zinc-600"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 top-2 p-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition-all active:scale-90"
              >
                <Send size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
