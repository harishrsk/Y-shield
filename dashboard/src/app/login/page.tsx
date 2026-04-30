"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { ShieldAlert } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", { email, password, callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-br from-black via-gray-900 to-transparent">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-950 rounded-2xl shadow-2xl shadow-emerald-500/10 border border-gray-800">
        <div className="text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-emerald-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-white text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">
            Enterprise Portal
          </h2>
          <p className="mt-2 text-sm text-gray-400">Sign in or auto-register to access your licenses</p>
          <div className="mt-4">
            <a href="/" className="text-xs text-gray-600 hover:text-emerald-500 transition-colors uppercase tracking-widest font-bold">← Home</a>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 placeholder-gray-500 text-white rounded focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Enterprise Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 placeholder-gray-500 text-white rounded focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 border border-transparent text-sm font-medium rounded-md text-black bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Authenticate to Edge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
