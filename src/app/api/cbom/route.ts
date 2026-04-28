import { NextResponse } from 'next/server';
import { CBOMEngine } from '@/lib/cbomEngine';

export async function POST(request: Request) {
  try {
    const scanData = await request.json();
    const cbom = CBOMEngine.generate(scanData);
    
    return NextResponse.json(cbom);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate CBOM' }, { status: 500 });
  }
}
