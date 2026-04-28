import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { ShieldAlert } from "lucide-react";
import { redirect } from "next/navigation";
import { LicenseCard } from "@/components/LicenseCard";

export default async function UserDashboard() {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    redirect("/login");
  }

  // Fetch the real licenses directly from Supabase!
  let user = null;
  try {
    user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { 
        licenses: {
          include: { protectedDomains: true }
        } 
      },
    });
  } catch (error) {
    console.error("Dashboard Fetch Error:", error);
  }

  const activeLicenses = user?.licenses || [];

  return (
    <div className="min-h-screen bg-black text-white p-12">
      <div className="flex justify-between items-center mb-12 border-b border-gray-800 pb-6">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600 flex items-center">
            <ShieldAlert className="w-8 h-8 mr-3 text-emerald-500" /> Client Portal
          </h1>
          <a href="/" className="text-sm text-gray-500 hover:text-emerald-400 transition-colors">← Back to Site</a>
        </div>
        <div className="text-right">
          <div className="text-gray-400 font-mono text-sm">Operator: {session.user.email}</div>
          <div className="text-emerald-500 font-mono text-xs">Auth Mobile: {user?.mobileNumber || "Not Linked"}</div>
        </div>
      </div>
      
      {activeLicenses.map((lic) => (
        <LicenseCard key={lic.id} lic={lic} />
      ))}

      {activeLicenses.length === 0 && (
        <div className="text-center py-24 bg-gray-900 border border-gray-800 rounded-xl">
          <p className="text-gray-500 italic mb-4">No active quantum-safe licenses found.</p>
          <a href="/checkout" className="inline-block px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-black font-bold rounded transition-all">
            Purchase Sovereign License
          </a>
        </div>
      )}
    </div>
  );
}
