import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getServerSession } from "next-auth/next";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock_key',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'mock_secret_do_not_use_in_prod',
    });

    const options = {
      amount: 210000 * 100, // ₹2,10,000 in paise
      currency: "INR",
      receipt: `receipt_yochan_${Date.now()}`,
      notes: {
        userEmail: session.user.email,
        tier: "Pro"
      }
    };

    const order = await instance.orders.create(options);

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Razorpay Order Creation Error:", error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
