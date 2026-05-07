"use client";

import React, { useState, useEffect, useRef } from 'react';
import { AgentAvatar } from './AgentAvatar';
import { 
  Shield, 
  Zap, 
  Globe, 
  FileText, 
  ChevronRight, 
  Send, 
  Cpu, 
  Lock, 
  BarChart3,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  id: string;
  role: 'agent' | 'user';
  content: string;
  type?: 'info' | 'stat' | 'cta' | 'compliance';
}

const INITIAL_MESSAGE = "Welcome to Y-Shield Sovereign Intelligence. I am your specialized Sales Engineer. How can I assist you in securing your enterprise against quantum-era threats today?";

const SUGGESTIONS = [
  "What is the 'Harvest Now, Decrypt Later' threat?",
  "How does the eBPF Handshake Defense work?",
  "Tell me about Compliance (NQM, GDPR, DPDP)",
  "Explain Hybrid ML-KEM-768 Encryption",
  "What is the Sovereign Kill Switch?"
];

export const SalesAgent = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'agent', content: INITIAL_MESSAGE }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: messageText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response logic
    setTimeout(() => {
      const response = generateResponse(messageText);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'agent', content: response.text, type: response.type }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (text: string) => {
    const lower = text.toLowerCase();
    
    if (lower.includes('harvest') || lower.includes('hndl')) {
      return {
        text: "The 'Harvest Now, Decrypt Later' (HNDL) threat is where attackers collect encrypted data today to decrypt it later once large-scale quantum computers exist. Y-Shield prevents this by using Hybrid Key Exchange (ML-KEM-768 + X25519), ensuring that even if one algorithm is broken, your data remains mathematically secure.",
        type: 'info' as const
      };
    }
    
    if (lower.includes('ebpf') || lower.includes('handshake') || lower.includes('defense')) {
      return {
        text: "Our Kernel-Level eBPF/XDP Handshake Defense is unique. It drops malicious packets directly at the NIC driver, maintaining <1% CPU load even during gigabit-scale DDoS attacks. It specifically filters malformed Lattice-Math encapsulation storms that would crash standard firewalls.",
        type: 'stat' as const
      };
    }

    if (lower.includes('compliance') || lower.includes('nqm') || lower.includes('dpdp')) {
      return {
        text: "Y-Shield is built for data sovereignty. We are fully compliant with India's National Quantum Mission (NQM Level 4), the DPDP Act, and international standards like NIST FIPS 203 & 204. Our architecture ensures keys never cross international borders.",
        type: 'compliance' as const
      };
    }

    if (lower.includes('kill switch')) {
      return {
        text: "The Sovereign Kill Switch (2026 Protocol) allows administrators to instantly remove a compromised cryptographic algorithm from the system and hot-reload the entire network in under 1 second. This provides ultimate agility in a rapidly evolving threat landscape.",
        type: 'cta' as const
      };
    }

    if (lower.includes('performance') || lower.includes('latency')) {
      return {
        text: "We leverage AVX-512 and AVX2 vectorization to make PQC math invisible. We achieve <0.5ms overhead per connection. For extreme scales, we offer FPGA-accelerated tiers providing up to 18x throughput compared to standard implementations.",
        type: 'stat' as const
      };
    }

    return {
      text: "That's an excellent question. Y-Shield provides Tier-1 Sovereign Defense, including Zero-Knowledge Key Infrastructure and Quantum-Deep Packet Inspection. Would you like to see a technical deep-dive or a compliance walkthrough?",
      type: 'info' as const
    };
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto p-4 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Left Column: Visual Showcase */}
      <div className="flex-1 space-y-6">
        <div className="glass-card p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Shield size={120} className="text-cyan-400" />
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-2">
              <Zap size={14} /> LIVE THREAT ANALYSIS
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Defend Today Against <br />
              <span className="text-gradient">Tomorrow's Threats.</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-xl">
              Y-Shield is the world's first Sovereign PQC Gateway, providing mathematical immunity against quantum decryption.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <StatCard icon={<Cpu size={18} />} label="Latency" value="<0.5ms" sub="AVX-512 Optimized" />
              <StatCard icon={<Lock size={18} />} label="Security" value="ML-KEM-768" sub="Quantum-Resistant" />
              <StatCard icon={<Globe size={18} />} label="Compliance" value="NQM L4" sub="Sovereign Data" />
              <StatCard icon={<BarChart3 size={18} />} label="Capacity" value="10Gbps+" sub="FPGA Accelerated" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureItem 
            icon={<CheckCircle2 className="text-emerald-400" />} 
            title="Zero-Knowledge" 
            desc="Private keys never leave your hardware. Stateless orchestration." 
          />
          <FeatureItem 
            icon={<AlertTriangle className="text-amber-400" />} 
            title="HNDL Protection" 
            desc="Prevents Harvest Now, Decrypt Later attacks today." 
          />
        </div>
      </div>

      {/* Right Column: Chat Interface */}
      <div className="w-full lg:w-[450px] flex flex-col h-[600px] lg:h-[700px] glass-card rounded-3xl overflow-hidden border-white/5 relative">
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-white/5 flex items-center gap-4">
          <AgentAvatar />
          <div>
            <h3 className="font-bold text-white">Sovereign Intelligence</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Active Protocol: ML-KEM-768</span>
            </div>
          </div>
        </div>

        {/* Chat Body */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide cyber-grid"
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
                "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                m.role === 'user' 
                  ? "bg-cyan-600 text-white rounded-tr-none" 
                  : "bg-white/5 border border-white/10 text-zinc-200 rounded-tl-none backdrop-blur-sm"
              )}>
                {m.content}
              </div>
              
              {m.role === 'agent' && m.type && (
                <div className="mt-2 w-full">
                  <AgentInsight type={m.type} />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-1 ml-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 animate-bounce"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 animate-bounce [animation-delay:0.4s]"></div>
            </div>
          )}
        </div>

        {/* Footer: Suggestions & Input */}
        <div className="p-4 bg-black/20 border-t border-white/5">
          <div className="flex flex-wrap gap-2 mb-4">
            {SUGGESTIONS.slice(0, 2).map((s) => (
              <button 
                key={s}
                onClick={() => handleSend(s)}
                className="text-[10px] uppercase font-mono tracking-tighter px-2 py-1 rounded border border-white/10 hover:bg-white/5 transition-colors text-zinc-500 hover:text-cyan-400"
              >
                {s}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about PQC security..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors pr-12 text-zinc-200"
            />
            <button 
              onClick={() => handleSend()}
              className="absolute right-2 top-1.5 p-1.5 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub: string }) => (
  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-1">
    <div className="flex items-center gap-2 text-cyan-400">
      {icon}
      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{label}</span>
    </div>
    <div className="text-xl font-bold text-white">{value}</div>
    <div className="text-[10px] text-zinc-500 font-mono">{sub}</div>
  </div>
);

const FeatureItem = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
    <div className="mt-1">{icon}</div>
    <div>
      <div className="font-bold text-sm text-zinc-200">{title}</div>
      <div className="text-xs text-zinc-500 leading-tight mt-0.5">{desc}</div>
    </div>
  </div>
);

const AgentInsight = ({ type }: { type: 'info' | 'stat' | 'cta' | 'compliance' }) => {
  const configs = {
    info: { icon: Shield, color: 'text-cyan-400', label: 'Technical Context' },
    stat: { icon: Zap, color: 'text-yellow-400', label: 'Performance Metric' },
    cta: { icon: FileText, color: 'text-purple-400', label: 'Strategic Action' },
    compliance: { icon: Globe, color: 'text-emerald-400', label: 'Regulatory Data' }
  };

  const { icon: Icon, color, label } = configs[type];

  return (
    <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex items-center gap-3">
      <div className={cn("p-2 rounded-lg bg-black/20", color)}>
        <Icon size={16} />
      </div>
      <div>
        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">{label}</div>
        <div className="text-[11px] text-zinc-400 leading-none mt-0.5">Verified by Y-Shield Kernel v4.2</div>
      </div>
      <ChevronRight size={14} className="ml-auto text-zinc-600" />
    </div>
  );
};
