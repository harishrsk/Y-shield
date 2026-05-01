"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { ShieldAlert, Loader2, AlertCircle } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-br from-black via-gray-900 to-transparent p-4">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-950 rounded-2xl shadow-2xl shadow-emerald-500/10 border border-gray-800 transition-all">
        <div className="text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-emerald-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-white text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">
            Secure Portal
          </h2>
          <p className="mt-2 text-sm text-gray-400 font-medium">Access your sovereign security tools</p>
          <div className="mt-4">
            <a href="/" className="text-[10px] text-gray-600 hover:text-emerald-500 transition-colors uppercase tracking-widest font-bold">← Home</a>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-xl flex items-center gap-3 animate-shake">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <p className="text-xs text-red-400 font-medium">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-1 block">Email Address</label>
              <input
                id="email-address"
                name="email"
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
                id="password"
                name="password"
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

          <div className="space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 border border-transparent text-sm font-bold rounded-xl text-black bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authenticate to Edge"}
            </button>
            
            <p className="text-center text-xs text-gray-500">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-emerald-400 hover:text-emerald-300 font-bold">
                Provision New Identity
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
