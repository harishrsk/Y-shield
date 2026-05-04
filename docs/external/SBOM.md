# Software Bill of Materials (SBOM): Yochan-Shield PQC Gateway

**Version**: 2.0.0 (Sovereign Hardened)
**Date**: May 4, 2026
**Compliance Status**: NIST FIPS 203/204 Ready

## 1. Cryptographic Core
| Component | Version | License | Description |
|-----------|---------|---------|-------------|
| **OpenSSL** | 3.4.0 | Apache-2.0 | Base TLS 1.3 stack; Build: -fstack-protector-strong. |
| **liboqs** | 0.11.0 | MIT | NIST-standardized Post-Quantum algorithm library; Build: OQS_CLEANSE_MEM=ON. |
| **liboqs-provider** | 0.7.0 | Apache-2.0 | OpenSSL 3.x glue layer; Build: OQS_KEM_ENCODERS=ON. |

## 2. Infrastructure & Delivery
| Component | Version | License | Description |
|-----------|---------|---------|-------------|
| **NGINX** | 1.25.x | BSD-2-Clause | Reverse proxy with hybrid signature support. |
| **Docker** | 24.0+ | Apache-2.0 | Containerized micro-tenant isolation. |

## 3. Application Layer (Command Center)
| Component | Version | License | Description |
|-----------|---------|---------|-------------|
| **Next.js** | 16.x (Canary) | MIT | Sovereign dashboard frontend. |
| **Prisma** | 5.x | Apache-2.0 | ORM for multi-tenant database orchestration. |
| **bcryptjs** | 2.4.3 | MIT | Memory-safe password hashing (C-independent). |

## 4. Third-Party API Attestations
- **Supabase (PostgreSQL)**: Data at rest encrypted via AES-256-GCM.
- **NIST ATTESTATION**: All PQC implementations derived from NIST Round 3 finalist specifications.
