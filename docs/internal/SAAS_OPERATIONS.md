# SaaS Operations Runbook: Banking & Enterprise Management

**Target Audience**: Internal DevOps / SecOps Team

## 1. Tenant Onboarding
To provision a new bank or enterprise tenant:
1.  Create a new configuration in `gateway/tenants.d/tenant_name.conf`.
2.  Define isolated upstream logic and rate-limit parameters.
3.  Restart the Gateway: `docker-compose restart gateway`.

## 2. SLA & Performance Monitoring
The following metrics must be monitored via Prometheus/Grafana:
- **CPU Wait Time**: Lattice math is computationally expensive. If `cpu_wait` exceeds 5% during handshakes, scale the `worker_processes`.
- **Handshake Latency**: Target < 8ms for Hybrid handshakes.
- **MTU Drops**: Monitor for ICMP "Fragmentation Needed" errors to ensure the 1500-byte optimization is holding.

## 3. SIEM Integration
Access logs are piped to `/var/log/nginx/access.log` in structured JSON.
- **Fields for Alerting**:
    - `pqc_status`: If null, the client is bypassing quantum security.
    - `request_id`: Use this for cross-referencing with the `dashboard` logs for forensic auditing.

## 4. Disaster Recovery
- **PQC Failure**: If the OQS Provider fails to load, the gateway is configured to "Fail-Closed." 
- **Recovery**: Re-initialize the Docker image to restore the FIPS-compliant library state.
