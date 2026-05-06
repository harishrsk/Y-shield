import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: "Email and Password are required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User and mark as verified immediately
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        isVerified: true,
        isAdmin: email === "harishrsk@gmail.com"
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Account created successfully. You can now login." 
    });
  } catch (error) {
    console.error("[SIGNUP_ERROR]", error);
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}
