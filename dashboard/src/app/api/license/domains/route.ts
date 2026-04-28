import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { licenseId, domain } = await request.json();

    if (!licenseId || !domain) {
      return NextResponse.json({ error: "License ID and Domain are required" }, { status: 400 });
    }

    const newDomain = await prisma.protectedDomain.create({
      data: {
        licenseId,
        domain
      }
    });

    return NextResponse.json({ success: true, domain: newDomain });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add protected domain" }, { status: 500 });
  }
}
