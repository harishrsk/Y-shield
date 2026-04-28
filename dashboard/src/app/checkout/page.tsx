"use client";

import { useSession } from "next-auth/react";
import { Shield } from "lucide-react";

export default function CheckoutPage() {
  const { data: session } = useSession();

  const handleSimulatePurchase = async () => {
    // Calling our new internal API to create the License in Supabase
    const res = await fetch("/api/checkout-success", { method: "POST" });
    const data = await res.json();
    
    if (data.success) {
      alert(`Success! Generated License: ${data.licenseKey}`);
      // Redirect player to see their new license natively on the dashboard
      window.location.href = "/dashboard";
    } else {
      alert("Error generating license.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-12">
      <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold flex items-center mb-6 text-emerald-400">
          <Shield className="mr-3" /> Secure Checkout
        </h1>
        <p className="text-gray-400 mb-8">
          Logged in as: <span className="font-mono text-emerald-200">{session?.user?.email || "Guest"}</span>
        </p>
        
        <div className="bg-gray-950 rounded p-6 mb-8 border border-gray-800">
          <h3 className="text-xl font-semibold mb-2">Yochan-Shield 'Pro' Tier</h3>
          <p className="text-gray-500 mb-4">50 Post-Quantum Tunnels + AWS Deployment integration</p>
          <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">₹2,10,000<span className="text-lg text-gray-500"> /year</span></p>
        </div>

        <button 
          onClick={handleSimulatePurchase}
          className="w-full py-4 text-lg font-bold text-black bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg hover:opacity-90"
        >
          Simulate Payment & Generate License
        </button>
      </div>
    </div>
  );
}
