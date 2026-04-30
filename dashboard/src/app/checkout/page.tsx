"use client";

import { useSession } from "next-auth/react";
import { Shield } from "lucide-react";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { data: session } = useSession();

  const handlePurchase = async () => {
    try {
      const res = await fetch("/api/create-razorpay-order", { method: "POST" });
      const data = await res.json();
      
      if (!data.success) {
        alert("Failed to initialize payment gateway.");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_mock_key",
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Yochan-Shield",
        description: "Sovereign PQC License (1 Year)",
        order_id: data.order.id,
        handler: async function (response: any) {
          // Send payment success to our webhook/verification endpoint
          const verifyRes = await fetch("/api/webhooks/razorpay", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              userEmail: session?.user?.email
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
    <div className="min-h-screen bg-black text-white p-12">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
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
          onClick={handlePurchase}
          className="w-full py-4 text-lg font-bold text-black bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg hover:opacity-90"
        >
          Pay with Razorpay
        </button>
      </div>
    </div>
  );
}
