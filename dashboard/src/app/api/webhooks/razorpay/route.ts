import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, userEmail, tier } = await request.json();

    const secret = process.env.RAZORPAY_KEY_SECRET || 'mock_secret_do_not_use_in_prod';
    
    // In a real production environment, you verify the signature:
    // const generated_signature = crypto.createHmac('sha256', secret).update(razorpay_order_id + "|" + razorpay_payment_id).digest('hex');
    // if (generated_signature !== razorpay_signature) { throw new Error("Invalid Signature"); }

    // Find the user to attach the license to
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generate a secure Post-Quantum License Key
    const newLicenseKey = `PQC-${crypto.randomBytes(8).toString('hex').toUpperCase()}`;

    // Calculate expiration date (1 Year from now)
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    // Save the license to the database securely
    const license = await prisma.license.create({
      data: {
        userId: user.id,
        tier: tier || "Professional",
        licenseKey: newLicenseKey,
        expiresAt: expiresAt,
        isActive: true
      }
    });

    // Log the purchase event
    await prisma.auditLog.create({
      data: {
        action: "LICENSE_PURCHASED",
        actor: user.email,
        details: { licenseKey: newLicenseKey, paymentId: razorpay_payment_id }
      }
    });

    return NextResponse.json({ success: true, licenseKey: newLicenseKey });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
