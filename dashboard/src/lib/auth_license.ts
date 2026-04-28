export type LicenseTier = "Starter" | "Pro" | "Enterprise";

export interface LicenseDetails {
  tier: LicenseTier;
  maxTunnels: number | "Unlimited";
  features: string[];
  priceYearly: string;
}

export const TIERS: Record<LicenseTier, LicenseDetails> = {
  Starter: {
    tier: "Starter",
    maxTunnels: 5,
    features: ["Local Only", "Basic Logs", "Standard Support"],
    priceYearly: "₹45,000",
  },
  Pro: {
    tier: "Pro",
    maxTunnels: 50,
    features: ["Hybrid Cloud", "Advanced Logs", "Priority Support"],
    priceYearly: "₹2,10,000",
  },
  Enterprise: {
    tier: "Enterprise",
    maxTunnels: "Unlimited",
    features: ["High-Availability", "Compliance Export", "Zero-Trust Edge"],
    priceYearly: "Custom",
  },
};

/**
 * Validates a pseudo license key for demo purposes.
 */
export function validateLicenseKey(key: string): LicenseDetails | null {
  if (key.startsWith("YC-ENT")) return TIERS.Enterprise;
  if (key.startsWith("YC-PRO")) return TIERS.Pro;
  if (key.startsWith("YC-STR")) return TIERS.Starter;
  return null;
}
