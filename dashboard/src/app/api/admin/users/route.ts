import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session || !(session.user as any)?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      include: {
        licenses: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("[ADMIN_USERS_GET]", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
