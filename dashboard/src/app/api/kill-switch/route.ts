import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { algorithmToKill } = await request.json();

    // Path to the PQC config in the shared volume
    const configPath = '/opt/openssl/.openssl/ssl/openssl.cnf';
    
    if (!fs.existsSync(configPath)) {
      throw new Error("PQC Configuration file not found. Live Mode failure.");
    }

    let config = fs.readFileSync(configPath, 'utf8');
    
    // Live Algorithm Deprecation: Remove from Groups list
    const newConfig = config.replace(algorithmToKill + ':', '').replace(':' + algorithmToKill, '');
    fs.writeFileSync(configPath, newConfig);

    // Trigger Nginx Reload (Requires dashboard to have signal permission or shared pid)
    const { exec } = require('child_process');
    exec('pkill -HUP nginx'); 

    return NextResponse.json({
      success: true,
      killed: algorithmToKill,
      timestamp: new Date().toISOString(),
      action: "GATEWAY_RELOADED"
    });
  } catch (error) {
    return NextResponse.json({ error: 'Kill Switch failed' }, { status: 500 });
  }
}
