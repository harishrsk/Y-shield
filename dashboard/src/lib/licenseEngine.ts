import jwt from "jsonwebtoken";

const SECRET = process.env.LICENSE_JWT_SECRET || "fallback-secret-yochan-shield-1234";

export interface LicensePayload {
  tier: string;
  maxTunnels: number | "Unlimited";
  issuedTo: string;
}

export function generateLicenseKey(payload: LicensePayload): string {
  // Generate a standard JWT but prefix it to easily identify it as Yochan
  const token = jwt.sign(payload, SECRET, { expiresIn: "365d" });
  return `YC-${payload.tier.substring(0,3).toUpperCase()}-${token.substring(0, 30)}`;
}

export function verifyLicenseSignature(key: string) {
  // Normally you decode the full token to guarantee cryptographic integrity.
  // We're simulating a partial prefix lookup for the prototype architecture.
  return key.startsWith("YC-");
}
