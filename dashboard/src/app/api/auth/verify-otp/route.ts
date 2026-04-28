import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, otp, password } = await request.json();

    const verification = await prisma.otpVerification.findUnique({
      where: { email }
    });

    if (!verification || verification.otp !== otp || verification.expiresAt < new Date()) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create or Update User
    const user = await prisma.user.upsert({
      where: { email },
      update: { password: hashedPassword, isVerified: true },
      create: { email, password: hashedPassword, isVerified: true }
    });

    // Delete the OTP
    await prisma.otpVerification.delete({ where: { email } });

    return NextResponse.json({ success: true, message: "Account verified and created successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
