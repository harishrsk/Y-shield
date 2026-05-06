"use client";

import { useState } from "react";
import { UserPlus, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      setMessage(data.message);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black p-4">
      <div className="max-w-md w-full space-y-8 p-12 bg-black/60 backdrop-blur-2xl rounded-[24px] border border-blue-500/20 shadow-[0_0_80px_rgba(59,130,246,0.15)] relative overflow-hidden">
        {/* Subtle Background Glow for Signup */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]"></div>
        
        <div className="text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full border border-blue-500/20 mb-6">
            <UserPlus className="h-8 w-8 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
            Create Account
          </h2>
          <p className="text-sm text-gray-400 font-medium">Join the Sovereign Edge Network</p>
          <div className="mt-6">
            <a href="/login" className="text-[11px] text-gray-500 hover:text-blue-400 transition-colors uppercase tracking-widest font-bold">← Back to Login</a>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-xl flex items-center gap-3 animate-shake">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <p className="text-xs text-red-400 font-medium">{error}</p>
          </div>
        )}

        {message && (
          <div className="bg-emerald-950/50 border border-emerald-500 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 text-center animate-in fade-in zoom-in duration-300 relative z-10 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            <div>
              <p className="text-emerald-400 font-bold text-lg mb-1">Registration Successful!</p>
              <p className="text-sm text-emerald-500/80">{message}</p>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6 relative z-10" onSubmit={handleSignup}>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-blue-400/70 font-bold ml-1 mb-1 block">Email Address</label>
              <input
                type="email"
                required
                disabled={loading}
                className="appearance-none relative block w-full px-4 py-3 border border-white/10 bg-white/5 placeholder-gray-600 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/10 transition-all sm:text-sm"
                placeholder="yourname@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-blue-400/70 font-bold ml-1 mb-1 block">Security Phrase</label>
              <input
                type="password"
                required
                disabled={loading}
                className="appearance-none relative block w-full px-4 py-3 border border-white/10 bg-white/5 placeholder-gray-600 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/10 transition-all sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-4 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify & Initialize Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
