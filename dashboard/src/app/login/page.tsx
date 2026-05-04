"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { ShieldCheck, Loader2, AlertCircle, Fingerprint } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black p-4">
      <div className="max-w-md w-full space-y-8 p-12 bg-black/40 backdrop-blur-xl rounded-[32px] border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
        {/* Subtle Background Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/20 transition-all duration-700"></div>
        
        <div className="text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-2xl border border-white/10 mb-8">
            <Fingerprint className="h-8 w-8 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-light tracking-tight text-white mb-2">
            Sovereign Access
          </h2>
          <p className="text-sm text-gray-500 font-light">Secure gateway authentication for your PQC network</p>
        </div>

        {error && (
          <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <p className="text-xs text-red-400 font-medium">{error}</p>
          </div>
        )}

        <form className="mt-12 space-y-8 relative z-10" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium ml-1 block">Institutional Email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                disabled={loading}
                className="appearance-none relative block w-full px-5 py-4 border border-white/5 bg-white/5 placeholder-gray-700 text-white rounded-2xl focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:bg-white/[0.07] transition-all sm:text-sm"
                placeholder="operator@bank.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium ml-1 block">Security Phrase</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                disabled={loading}
                className="appearance-none relative block w-full px-5 py-4 border border-white/5 bg-white/5 placeholder-gray-700 text-white rounded-2xl focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:bg-white/[0.07] transition-all sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-black bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-50 transition-all shadow-[0_10px_20px_-5px_rgba(16,185,129,0.3)]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Identity"}
            </button>
          </div>
        </form>

        <div className="text-center pt-8 border-t border-white/5 mt-8">
           <div className="flex items-center justify-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">Quantum-Safe Handshake Active</span>
           </div>
           <a href="/" className="text-[11px] text-gray-600 hover:text-gray-400 transition-colors">← Return to Gateway</a>
        </div>
      </div>
    </div>
  );
}
