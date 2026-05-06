import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { ShieldAlert } from "lucide-react";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/LogoutButton";
import { LaymanGuide } from "@/components/LaymanGuide";
import { DashboardTabs } from "@/components/DashboardTabs";

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
    <div className="min-h-screen bg-black text-white p-4 md:p-12">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 border-b border-gray-800 pb-8 gap-8 md:gap-0">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600 flex items-center">
            <ShieldAlert className="w-8 h-8 mr-3 text-emerald-500" /> Sovereign Command Center
          </h1>
          <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
            <a href="/" className="text-xs md:text-sm text-gray-500 hover:text-emerald-400 transition-colors whitespace-nowrap">← Back to Site</a>
            <div className="h-4 w-px bg-gray-800 hidden xs:block"></div>
            <LaymanGuide />
            <div className="h-4 w-px bg-gray-800 hidden xs:block"></div>
            <a href="/dashboard/audit" className="text-[10px] font-bold text-emerald-400 border border-emerald-900/50 px-3 py-1 rounded-full bg-emerald-950/20 hover:bg-emerald-500 hover:text-black transition-all flex items-center gap-2 whitespace-nowrap">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Technical Audit Report
            </a>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end gap-4 w-full md:w-auto">
          <div className="text-left md:text-right">
            <div className="text-gray-400 font-mono text-sm">{session.user.email}</div>
            <div className="text-emerald-500 font-mono text-xs uppercase tracking-widest mt-1">Sovereign Operator</div>
          </div>
          <LogoutButton />
        </div>
      </div>
      
      <DashboardTabs activeLicenses={activeLicenses} />

      {/* ═══════════════════════════════════════════════════════════════════
          DASHBOARD FOOTER: CORPORATE & SUPPORT
      ═══════════════════════════════════════════════════════════════════ */}
      <footer className="mt-24 border-t border-gray-900 pt-12 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-emerald-500 tracking-widest uppercase font-bold">Y-Shield Sovereign Core Active</span>
            </div>
            <p className="text-xs text-gray-600 font-mono">
              © 2026 Yochan Enterprises. FIPS 140-3 Level 4 Roadmap.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 md:gap-12">
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Technical Support</div>
              <a href="mailto:harish@yochanenterprises.com" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors font-mono">
                harish@yochanenterprises.com
              </a>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Emergency Sovereign Line</div>
              <div className="text-sm text-gray-400 font-mono">
                +91 7502940397
              </div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">System Status</div>
              <div className="text-xs text-emerald-500 font-bold font-mono">
                ENCRYPTED & SYNCED
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
