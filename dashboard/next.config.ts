import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Broadcast PQC sovereignty signal on every response
  // This allows the Yochan threat scanner (and any external auditor)
  // to detect that this domain is operating under PQC protection.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Sovereign-PQC", value: "active" },
          { key: "X-PQC-Algorithm", value: "X25519MLKEM768" },
          { key: "X-Yochan-Shield", value: "v1.0" },
        ],
      },
    ];
  },
};

export default nextConfig;

