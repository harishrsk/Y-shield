import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session || !(session.user as any)?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const { targetUserId, makeAdmin } = await request.json();
    if (!targetUserId) {
      return NextResponse.json({ error: "Missing target user ID" }, { status: 400 });
    }

    // Prevent removing your own admin rights by accident
    if (targetUserId === (session.user as any).id && !makeAdmin) {
      return NextResponse.json({ error: "Cannot remove your own admin privileges" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: targetUserId },
      data: { isAdmin: makeAdmin }
    });

    return NextResponse.json({ success: true, message: `User ${user.email} admin status updated to ${makeAdmin}` });
  } catch (error) {
    console.error("[ADMIN_GRANT_ERROR]", error);
    return NextResponse.json({ error: "Failed to update privileges" }, { status: 500 });
  }
}
