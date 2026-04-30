import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateLicenseKey } from "@/lib/licenseEngine";
import { getServerSession } from "next-auth/next";

export async function POST(request: Request) {
  try {
    const { mobileNumber } = await request.json();
    if (!mobileNumber) return NextResponse.json({ error: "Mobile number required for license authentication" }, { status: 400 });

    const session = await getServerSession();
    let email = session?.user?.email;

    if (!email) {
      email = "tehsta@yochan.crom"; 
    }

    // Ensure User exists and has mobileNumber
    let user = await prisma.user.upsert({
      where: { email },
      update: { mobileNumber },
      create: { 
        email, 
        mobileNumber,
        isVerified: true 
      }
    });

    // Generate cryptographic key
    const newKey = generateLicenseKey({
      tier: "Enterprise",
      maxTunnels: "Unlimited",
      issuedTo: user.email,
    });

    // Set expiration to 1 year from now
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    // Save to Database
    const license = await prisma.license.create({
      data: {
        userId: user.id,
        tier: "Enterprise",
        licenseKey: newKey,
        mobileNumber: mobileNumber,
        isActive: true,
        expiresAt: expiresAt,
      },
    });

    return NextResponse.json({ success: true, licenseKey: license.licenseKey });
  } catch (error) {
    console.error("License Provisioning Error:", error);
    return NextResponse.json({ 
      error: "License Provisioning Failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
