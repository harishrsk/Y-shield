import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    // 1. Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // 2. Store OTP in database (Upsert)
    await prisma.otpVerification.upsert({
      where: { email },
      update: { otp, expiresAt },
      create: { email, otp, expiresAt }
    });

    // 3. Mock Email Sending (In production, use Nodemailer/Resend)
    console.log(`[AUTH] OTP for ${email}: ${otp}`);

    return NextResponse.json({ 
      success: true, 
      message: "OTP sent to your email (Check console for mock output)" 
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to initiate signup" }, { status: 500 });
  }
}
