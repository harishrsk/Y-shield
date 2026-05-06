"use client";

import { useEffect, useState } from "react";
import { Shield, ShieldAlert, Users, Key, AlertCircle, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      if (!(session?.user as any)?.isAdmin) {
        router.push("/dashboard"); // Redirect non-admins back to user dashboard
        return;
      }
      fetchUsers();
    }
  }, [status, session, router]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
      setUsers(data.users);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAdmin = async (userId: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin/grant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId: userId, makeAdmin: !currentStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      // Update local state
      setUsers(users.map(u => u.id === userId ? { ...u, isAdmin: !currentStatus } : u));
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  if (loading || status === "loading") {
    return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="w-8 h-8 text-blue-500 animate-spin" /></div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShieldAlert className="w-8 h-8 text-blue-500" />
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                Y-Shield Admin Control
              </h1>
            </div>
            <p className="text-gray-400 font-mono text-sm">Global Sovereign Access Management</p>
          </div>
          <div className="flex gap-4">
            <a href="/dashboard" className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition text-sm">Return to Dashboard</a>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-xl flex items-center gap-3 mb-8">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <p className="text-xs text-red-400 font-medium">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-950/20 border border-blue-500/20 rounded-2xl p-6">
            <Users className="w-6 h-6 text-blue-400 mb-4" />
            <div className="text-3xl font-bold text-white">{users.length}</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Total Clients</div>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-6">
            <Key className="w-6 h-6 text-emerald-400 mb-4" />
            <div className="text-3xl font-bold text-white">
              {users.reduce((acc, user) => acc + user.licenses.length, 0)}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Active Licenses</div>
          </div>
          <div className="bg-violet-950/20 border border-violet-500/20 rounded-2xl p-6">
            <Shield className="w-6 h-6 text-violet-400 mb-4" />
            <div className="text-3xl font-bold text-white">
              {users.filter(u => u.isAdmin).length}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">System Admins</div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5 bg-white/5">
            <h2 className="text-lg font-bold">Client Directory</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-black/40 text-xs uppercase tracking-widest text-gray-500">
                  <th className="p-4 font-medium">User Email</th>
                  <th className="p-4 font-medium">Joined</th>
                  <th className="p-4 font-medium">Licenses</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-sm font-mono text-gray-300">{user.email}</td>
                    <td className="p-4 text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      {user.licenses.length > 0 ? (
                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-xs">
                          {user.licenses.length} Active
                        </span>
                      ) : (
                        <span className="text-gray-600 text-xs">None</span>
                      )}
                    </td>
                    <td className="p-4">
                      {user.isAdmin ? (
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-xs font-bold uppercase tracking-wider">
                          Admin
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-white/5 text-gray-400 border border-white/10 rounded text-xs uppercase tracking-wider">
                          Client
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => toggleAdmin(user.id, user.isAdmin)}
                        disabled={user.email === (session?.user as any)?.email}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 disabled:opacity-30 transition-all"
                      >
                        {user.isAdmin ? "Revoke Admin" : "Make Admin"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
