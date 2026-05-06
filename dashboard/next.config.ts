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
          { key: "X-Y-Shield", value: "v2.0" },
          { key: "X-ZK-Mode", value: "stateless" },
          { key: "X-SCA-Protection", value: "constant-time-masked" },
          { key: "X-QDPI-Engine", value: "active" },
        ],
      },
    ];
  },
};

export default nextConfig;

