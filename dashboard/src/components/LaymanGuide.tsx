"use client";

import { useState } from "react";
import { BookOpen, X, Shield, Lock, Zap, Cpu } from "lucide-react";

export function LaymanGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-emerald-400 border border-emerald-900/50 rounded-full bg-emerald-950/10 hover:bg-emerald-500 hover:text-black transition-all"
      >
        <BookOpen className="w-3 h-3" />
        Explain Like I'm 5 (ELI5) 🤔
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-gray-950 border border-white/10 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl shadow-emerald-500/10">
            <div className="p-6 sm:p-8 border-b border-white/5 flex justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                  <Shield className="text-emerald-500" /> Explain Like I'm 5: Quantum Security 🍼
                </h3>
                <p className="text-sm text-gray-500 mt-1">Understanding the Yochan-Shield upgrade in 2 minutes.</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
              <section>
                <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4">The Challenge</h4>
                <p className="text-gray-300 leading-relaxed">
                  Today's internet security is based on "Hard Math" that classical computers can't solve. 
                  However, <strong>Quantum Computers</strong> use different physics to solve this math instantly. 
                  This means "Harvest Now, Decrypt Later" — hackers are stealing data today to read it tomorrow when they have a quantum machine.
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                  <Cpu className="text-violet-400 mb-3" />
                  <h5 className="text-white font-bold mb-2 text-sm">Classical Security</h5>
                  <p className="text-xs text-gray-500 leading-relaxed">Like sealing data in an envelope glued with a complex puzzle. Quantum Computers can solve the puzzle instantly to open it.</p>
                </div>
                <div className="p-5 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                  <Zap className="text-emerald-400 mb-3" />
                  <h5 className="text-emerald-400 font-bold mb-2 text-sm">Yochan-Shield PQC</h5>
                  <p className="text-xs text-gray-300 leading-relaxed">We put your data inside a multi-dimensional steel vault (Lattice Math) that is mathematically immune to Quantum hacking.</p>
                </div>
              </div>

              <section>
                <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4">How it works for you</h4>
                <ul className="space-y-4">
                  {[
                    { icon: Lock, title: "Zero-Trust", text: "We don't hold your keys. You are the only one with the code to your data vault." },
                    { icon: Zap, title: "Instant Protection", text: "It sits at the 'Edge' of your network, filtering out quantum-vulnerable traffic automatically." },
                    { icon: Shield, title: "Sovereign Control", text: "Your data stays in your region. We ensure compliance with national security standards." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="shrink-0 p-2 bg-white/5 rounded-lg h-fit"><item.icon className="w-4 h-4 text-emerald-500" /></div>
                      <div>
                        <div className="text-sm font-bold text-white">{item.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.text}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="bg-emerald-500 text-black p-6 rounded-2xl text-center">
                <p className="font-bold">Summary: Yochan-Shield is your insurance against the "Quantum Apocalypse." It ensures your data remains private for the next 50 years.</p>
              </div>
            </div>

            <div className="p-6 bg-white/5 border-t border-white/5 text-center">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition"
              >
                Got it, stay secure
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
