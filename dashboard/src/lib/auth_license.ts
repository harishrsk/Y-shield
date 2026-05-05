export type LicenseTier = "Essential" | "Professional" | "Enterprise";

export interface LicenseDetails {
  tier: LicenseTier;
  maxTunnels: number | "Unlimited";
  features: string[];
  priceYearly: string;
}

export const TIERS: Record<LicenseTier, LicenseDetails> = {
  Essential: {
    tier: "Essential",
    maxTunnels: 5,
    features: [
      "Lattice-based Handshake (ML-KEM)",
      "Local Edge Proxy Mode",
      "Standard PQC Audit Logs",
      "Email Support"
    ],
    priceYearly: "₹45,000",
  },
  Professional: {
    tier: "Professional",
    maxTunnels: 50,
    features: [
      "Hybrid TLS 1.3 (x25519_mlkem768)",
      "Multi-Tenant Sovereign Sync",
      "Side-Channel Attack Immunity",
      "Priority Technical Support"
    ],
    priceYearly: "₹2,10,000",
  },
  Enterprise: {
    tier: "Enterprise",
    maxTunnels: "Unlimited",
    features: [
      "Merkle-Failsafe (SLH-DSA) Tier",
      "Indian NQM Level 4 Compliance",
      "Zero-Knowledge Key Orchestration",
      "Dedicated Sovereign Engineer"
    ],
    priceYearly: "Custom",
  },
};

/**
 * Validates a pseudo license key for demo purposes.
 */
export function validateLicenseKey(key: string): LicenseDetails | null {
  if (key.startsWith("YC-ENT")) return TIERS.Enterprise;
  if (key.startsWith("YC-PRO")) return TIERS.Professional;
  if (key.startsWith("YC-ESS")) return TIERS.Essential;
  return null;
}
