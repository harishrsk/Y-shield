import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { license_key } = await request.json();

    if (!license_key) {
      return NextResponse.json({ error: "Missing license key" }, { status: 400 });
    }

    // Direct Database Query for Final Production
    const validLicense = await prisma.license.findUnique({
      where: { licenseKey: license_key },
      include: { user: true }
    });

    if (validLicense && validLicense.isActive && validLicense.expiresAt > new Date()) {
      return NextResponse.json({ 
        success: true, 
        tier: validLicense.tier, 
        issuedTo: validLicense.user.email 
      }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid, Revoked, or Expired License Key" }, { status: 403 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Quantum Engine Backend Error" }, { status: 500 });
  }
}
