"use client";

import { useState } from "react";
import { ShieldPlus, Loader2, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-br from-black via-gray-900 to-transparent p-4">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-950 rounded-2xl shadow-2xl shadow-emerald-500/10 border border-gray-800 transition-all">
        <div className="text-center">
          <ShieldPlus className="mx-auto h-12 w-12 text-emerald-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-white text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-400 font-medium">Join the sovereign security network</p>
          <div className="mt-4">
            <a href="/login" className="text-[10px] text-gray-600 hover:text-emerald-500 transition-colors uppercase tracking-widest font-bold">← Back to Login</a>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-xl flex items-center gap-3 animate-shake">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <p className="text-xs text-red-400 font-medium">{error}</p>
          </div>
        )}

        {message && (
          <div className="bg-emerald-900/20 border border-emerald-500/30 p-4 rounded-xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <p className="text-xs text-emerald-400 font-medium">{message}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-1 block">Email Address</label>
              <input
                type="email"
                required
                disabled={loading}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-800 bg-black placeholder-gray-600 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all sm:text-sm"
                placeholder="yourname@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-1 block">Security Phrase</label>
              <input
                type="password"
                required
                disabled={loading}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-800 bg-black placeholder-gray-600 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 border border-transparent text-sm font-bold rounded-xl text-black bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify & Initialize Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
      </div>
    </div>
  );
}
