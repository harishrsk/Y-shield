# Yochan-Shield Legal & Compliance

## 1. Quantum Liability Waiver
This software suite ("Yochan-Shield") incorporates emerging cryptographic algorithms (specifically Kyber/ML-KEM and Dilithium/ML-DSA). While these algorithms are selected to adhere to upcoming standards out of the United States National Institute of Standards and Technology (NIST), they are actively evolving. Yochan-Shield is provided "as is" and without warranties of absolute security against cryptanalytically advanced quantum computers, which currently exist in experimental stages. By utilizing the Gateway and associated software, the User acknowledges the experimental nature of Post-Quantum Cryptography (PQC).

## 2. NIST & CNSA 2.0 Compliance Statement
The Yochan-Shield Gateway uses the `x25519_mlkem768` hybrid key exchange. This mechanism leverages classical Elliptic Curve Diffie-Hellman paired with the ML-KEM-768 lattice-based key encapsulation mechanism. Furthermore, digital signatures are authenticated using the `mldsa65` signature scheme. 
These cryptographic primitives align with:
*   **FIPS 203 (draft) / ML-KEM:** Module-Lattice-Based Key-Encapsulation Mechanism Standard.
*   **FIPS 204 (draft) / ML-DSA:** Module-Lattice-Based Digital Signature Standard.
*   **CNSA 2.0 Guidelines:** Issued by the NSA for transitioning to Quantum-Resistant algorithms.

## 3. Data Sovereignty and Zero-Trust Clause
Yochan-Shield operates on a fundamentally Zero-Trust architecture (adhering to NIST Special Publication 800-207). 
*   **Self-Custody:** All cryptographic keys generated or utilized by the Gateway are strictly held within the Host Environment (AWS Fargate/Local Host). Yochan-Shield does not extract, copy, or "backup" private key material on behalf of the customer.
*   **Data Sovereignty:** By deploying the Gateway locally or within a controlled Virtual Private Cloud (VPC), all data traffic, logging, and interception logic remain under the absolute administrative purview of the client.

## 4. Corporate & Strategic Inquiries
For institutional licensing, enterprise partnership, or strategic acquisition discussions, please contact:

*   **Office of the Architect**: Harish
*   **Email**: harish@yochanenterprises.com
*   **Emergency Secure Line**: +91 7502940397
*   **Documentation Access**: Full technical due diligence folders (SCA Labs, eBPF Source, DLT Consensus Specs) are available upon execution of a standard NDA.
