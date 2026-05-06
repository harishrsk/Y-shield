"use client";

import { useSession } from "next-auth/react";
import { Shield, Check, Zap, Globe, Lock } from "lucide-react";
import Script from "next/script";
import { useState } from "react";
import { TIERS } from "@/lib/auth_license";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const [selectedTier, setSelectedTier] = useState<string>("Professional");

  if (status === "unauthenticated") {
    window.location.href = "/login";
    return null;
  }

  const tierData = (TIERS as any)[selectedTier] || TIERS.Professional;
  const priceString = tierData?.priceYearly || "₹0";
  const numericPrice = parseInt(priceString.replace(/[^\d]/g, "")) || 0;

  const handlePurchase = async () => {
    try {
      const res = await fetch("/api/create-razorpay-order", { 
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: selectedTier, amount: numericPrice })
      });
      const data = await res.json();
      
      if (!data.success) {
        alert("Failed to initialize payment gateway.");
        return;
      }

      if (data.isDemo) {
        alert("DEMO MODE: Bypassing Razorpay. Simulating successful payment...");
        const verifyRes = await fetch("/api/webhooks/razorpay", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_payment_id: `pay_demo_${Date.now()}`,
            razorpay_order_id: data.order.id,
            razorpay_signature: "demo_signature",
            userEmail: session?.user?.email,
            tier: selectedTier
          })
        });
        const verifyData = await verifyRes.json();
        if(verifyData.success) {
          alert(`Payment Successful (Demo)! Generated License: ${verifyData.licenseKey}`);
          window.location.href = "/dashboard";
        }
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_mock_key",
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Y-Shield",
        description: `Sovereign PQC ${selectedTier} License`,
        order_id: data.order.id,
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/webhooks/razorpay", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              userEmail: session?.user?.email,
              tier: selectedTier
            })
          });
          const verifyData = await verifyRes.json();
          if(verifyData.success) {
            alert(`Payment Successful! Generated License: ${verifyData.licenseKey}`);
            window.location.href = "/dashboard";
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          email: session?.user?.email || "",
        },
        theme: {
          color: "#10b981"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any){
        alert(`Payment Failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (error) {
      alert("Checkout error.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-12">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-light flex items-center mb-12 text-white tracking-tight">
          <Shield className="mr-4 text-emerald-500 w-10 h-10" /> Provision Sovereign Infrastructure
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {Object.values(TIERS).map((tier: any) => (
            <div 
              key={tier.tier}
              onClick={() => setSelectedTier(tier.tier)}
              className={`relative p-8 rounded-3xl border transition-all cursor-pointer ${
                selectedTier === tier.tier 
                ? "bg-emerald-500/10 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.1)]" 
                : "bg-gray-900/50 border-white/5 hover:border-white/20"
              }`}
            >
              {selectedTier === tier.tier && (
                <div className="absolute top-4 right-4 bg-emerald-500 text-black p-1 rounded-full">
                  <Check className="w-4 h-4" />
                </div>
              )}
              <h3 className="text-xl font-bold mb-1">{tier.tier}</h3>
              <p className="text-3xl font-light text-white mb-6">{tier.priceYearly}</p>
              
              <ul className="space-y-3 mb-8">
                {tier.features.slice(0, 4).map((f: string) => (
                  <li key={f} className="text-xs text-gray-400 flex items-center gap-2">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-900 border border-white/5 rounded-[32px] p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">Selected Configuration</p>
              <h3 className="text-2xl font-bold text-white mb-1">Y-Shield {selectedTier}</h3>
              <p className="text-sm text-gray-400">Quantum-Safe Handshake • {tierData.maxTunnels} Tunnels • FIPS 203 Compliance</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-4xl font-light text-emerald-400 mb-4">{tierData.priceYearly}</p>
              <button 
                onClick={handlePurchase}
                className="w-full md:w-auto px-12 py-4 text-lg font-bold text-black bg-emerald-500 rounded-2xl hover:bg-emerald-400 active:scale-95 transition-all shadow-xl shadow-emerald-500/20"
              >
                Execute Provisioning
              </button>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] text-gray-600 uppercase tracking-widest font-mono">
          Immutable Audit Log Anchored • Encrypted via x25519_mlkem768
        </p>
      </div>
    </div>
  );
}
