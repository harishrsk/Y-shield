"use client";

import React from 'react';

export const AgentAvatar = () => {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 animate-pulse-slow opacity-20 blur-xl"></div>
      
      {/* Spinning Outer Ring */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/30 animate-[spin_10s_linear_infinite]"></div>
      
      {/* Inner Rotating Hexagon Shape */}
      <div className="relative w-24 h-24 bg-zinc-900 rounded-2xl flex items-center justify-center overflow-hidden border border-white/10 glass-card">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20"></div>
        
        {/* The "Eye" */}
        <div className="relative w-8 h-8 rounded-full bg-cyan-400 glow-blue flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
        </div>
        
        {/* Scanning Line */}
        <div className="absolute inset-x-0 h-px bg-cyan-400/50 shadow-[0_0_10px_cyan] animate-scan"></div>
        
        {/* Technical Deco */}
        <div className="absolute top-2 left-2 text-[8px] font-mono text-cyan-400/50">AQ-01</div>
        <div className="absolute bottom-2 right-2 text-[8px] font-mono text-purple-400/50">SECURED</div>
      </div>
    </div>
  );
};
