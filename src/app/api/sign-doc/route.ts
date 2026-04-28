import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';

const execPromise = promisify(exec);

export async function POST(request: Request) {
  try {
    const { filename, content } = await request.json();

    // 2026 Sovereign Signing Logic: Using SLH-DSA (SPHINCS+)
    const opensslPath = process.env.OPENSSL_PATH || '/opt/openssl/.openssl/bin/openssl';
    const keyPath = '/opt/nginx/conf/slhdsa.key';
    
    // 1. Ensure key exists (Auto-generate if missing - Live Mode)
    if (!fs.existsSync(keyPath)) {
      await execPromise(`${opensslPath} genpkey -algorithm slhdsa128f -out ${keyPath} -provider oqsprovider`);
    }

    // 2. Perform Live Signing
    const tempIn = `/tmp/sign_in_${Date.now()}`;
    const tempOut = `/tmp/sign_out_${Date.now()}`;
    fs.writeFileSync(tempIn, content);

    await execPromise(`${opensslPath} pkeyutl -sign -inkey ${keyPath} -in ${tempIn} -out ${tempOut} -provider oqsprovider`);
    
    const signature = fs.readFileSync(tempOut).toString('base64');

    // 3. Clean up
    fs.unlinkSync(tempIn);
    fs.unlinkSync(tempOut);

    return NextResponse.json({
      success: true,
      algorithm: "SLH-DSA-128f (Stateless)",
      signature: signature,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: 'Signing failed' }, { status: 500 });
  }
}
