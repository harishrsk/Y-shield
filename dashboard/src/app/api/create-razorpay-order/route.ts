import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getServerSession } from "next-auth/next";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { tier, amount } = await request.json();
    const finalAmount = (amount || 210000) * 100; // default to Pro if not provided

    // --- Razorpay Initialization ---
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      console.warn("[PAYMENT] Razorpay keys missing. Entering DEMO MODE.");
      // Return a mock order for demo purposes
      return NextResponse.json({ 
        success: true, 
        isDemo: true,
        order: {
          id: `order_demo_${Date.now()}`,
          amount: finalAmount,
          currency: "INR"
        } 
      });
    }

    const instance = new Razorpay({ key_id, key_secret });

    const options = {
      amount: finalAmount,
      currency: "INR",
      receipt: `receipt_yochan_${Date.now()}`,
      notes: {
        userEmail: session.user.email,
        tier: tier || "Professional"
      }
    };

    const order = await instance.orders.create(options);
    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error("Razorpay Order Creation Error:", error.message);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create order',
      details: error.message 
    }, { status: 500 });
  }
}
