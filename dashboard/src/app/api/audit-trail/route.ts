import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const events = await prisma.pqcEvent.findMany({
      orderBy: { timestamp: 'desc' },
      take: 50
    });
    
    return NextResponse.json(events);
  } catch (error) {
    console.error("Audit Trail Fetch Error:", error);
    // Return empty array instead of 500 to prevent UI crash
    return NextResponse.json([]);
  }
}
