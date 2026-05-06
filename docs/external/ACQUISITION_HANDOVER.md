# Technical Handover: Y-Shield Hybrid PQC Architecture

**Target Audience**: Acquiring Engineering Teams / Technical Due Diligence Auditors

## 1. Architectural Philosophy
Y-Shield is built on the principle of **Cryptographic Agility**. The system does not hard-code lattice math; it utilizes the OpenSSL 3.x Provider interface to allow immediate swaps of algorithms should a new vulnerability be discovered in a NIST finalist.

## 2. The Hybrid Handshake (X25519-MLKEM-768)
The core IP lies in the **MTU-Optimized Hybridization**.
- **Classical**: X25519 (Elliptic Curve) provides 128-bit security against 2026-era classical threats.
- **Quantum**: ML-KEM-768 provides 192-bit security against future Shor's algorithm attacks.
- **Optimization**: We have tuned the `ssl_ecdh_curve` to ensure the handshake fits within a single 1500-byte TCP packet, preventing the p99 latency spikes seen in pure-Kyber implementations.

## 3. Bimodal Cryptographic Core (Tiered Routing)
The gateway implements **Dynamic Tiering** to prevent RAM exhaustion from large PQC signatures:
- **Standard (443)**: ML-DSA-65. Low overhead, standard Nginx buffers.
- **Premium (8443)**: SLH-DSA (SPHINCS+). This "Merkle Failsafe" tier is isolated to a dedicated listener with `large_client_header_buffers` set to **128KB**. This ensures that the massive signatures of SPHINCS+ do not impact the performance of the standard lattice-based traffic.

## 4. Memory & Runtime Safety
### 4.1 Memory Scrubbing & Hardening
The gateway is built with `-fstack-protector-strong` and `-D_FORTIFY_SOURCE=2`. 
`liboqs` is explicitly compiled with `OQS_CLEANSE_MEM=ON` to guarantee that sensitive lattice parameters and private keys are scrubbed from RAM immediately after the shared secret is generated.
- **Auditor Verification**: 
    1. Run `valgrind --tool=memcheck` on the Nginx worker process.
    2. Check the Docker build logs for the `OQS_CLEANSE_MEM=ON` flag to verify compliance.

### 4.2 Side-Channel Defenses
- **Constant-Time Math**: All comparisons of shared secrets use `CRYPTO_memcmp`.
- **Rejection Sampling**: Protected against timing attacks via masked rejection sampling in the ML-KEM decapsulation phase.

## 5. Maintenance & Compliance
- **Regulatory**: Meets NIST FIPS 203 (KEM) and 204 (Signing) requirements.
- **Updates**: `git pull origin full-repo` triggers a fresh Docker build of the OpenSSL/OQS stack, ensuring the latest security patches are applied.