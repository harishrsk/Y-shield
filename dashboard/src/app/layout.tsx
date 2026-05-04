import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yochan-Shield | Enterprise Post-Quantum Cryptography (PQC) Gateway",
  description: "Secure your infrastructure with Yochan-Shield, the world's first commercial-grade Post-Quantum Cryptography (PQC) edge gateway. Native support for ML-KEM, ML-DSA, and Hybrid TLS 1.3.",
  keywords: [
    "Post-Quantum Cryptography",
    "PQC Gateway",
    "Quantum-Safe Security",
    "ML-KEM-768",
    "Sovereign Security",
    "NIST PQC Standards",
    "Hybrid TLS 1.3",
    "Cybersecurity Infrastructure",
    "Yochan Enterprises"
  ],
  authors: [{ name: "Harish" }],
  creator: "Yochan Enterprises",
  openGraph: {
    title: "Yochan-Shield | The Future of Quantum-Safe Security",
    description: "Deployment-ready PQC gateway protecting enterprise data from future quantum attacks.",
    url: "/",
    siteName: "Yochan-Shield",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yochan-Shield Sovereign Security Gateway",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yochan-Shield | Post-Quantum Security Gateway",
    description: "Protecting your enterprise assets with next-generation lattice-based cryptography.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
