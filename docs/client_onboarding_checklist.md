# Client Onboarding Checklist (Quantum Security as a Service)

As a SaaS provider, you do **NOT** need a new AWS IP for every client. You will use the **exact same AWS IP (`13.60.169.185`)** for hundreds of clients! 

Nginx uses a technology called **SNI (Server Name Indication)** to look at the incoming traffic, see which domain name they typed, and instantly route it to the correct client's backend server.

---

### ⚙️ How to Add a New Client (Zero-Downtime Method)

When you secure a new client (e.g., `client-bank.com`), follow this exact checklist:

#### [ ] Step 1: Client Updates their DNS
Instruct your client to go to their DNS provider and point the **A-Record** for `client-bank.com` to your Master AWS IP: `13.60.169.185`.

#### [ ] Step 2: Register in Dashboard
Open your Yochan-Shield Dashboard and add their domain to your internal License Management system (so you can track their billing and usage).

#### [ ] Step 3: Add Client to Nginx
SSH into your AWS server and open your `nginx.conf`:
```bash
nano ~/Y-shield/gateway/nginx.conf
```
Scroll to the bottom and add a new Server Block specifically for their domain:
```nginx
server {
    listen 443 ssl http2;
    server_name client-bank.com;

    # Standard Yochan-Shield PQC Certificates
    ssl_certificate      /opt/nginx/conf/q_server.crt;
    ssl_certificate_key  /opt/nginx/conf/q_server.key;

    # Enforce PQC Hybrid Key Exchange
    ssl_protocols TLSv1.3;
    ssl_ecdh_curve X25519MLKEM768; 

    location / {
        # Forward traffic to the client's actual hosting server (e.g., their AWS/Azure IP)
        proxy_pass https://203.0.113.50; 
        
        # Pass the original host header
        proxy_set_header Host $host;
    }
}
```

#### [ ] Step 4: Hot-Reload Gateway (Zero Downtime)
You **do not** need to restart the Gateway and kick everyone off! Nginx can magically "hot-reload" its configuration files while keeping all existing users connected. 

Run this command:
```bash
sudo docker exec infra_gateway_1 nginx -s reload
```

#### [ ] Step 5: Verification
Go to your Vercel Threat Scanner, type `client-bank.com`, and watch the screen turn **GREEN**. Show this to the client as proof that they are now protected!

---

### 💡 Pro-Tip for the Future:
Right now, you are updating `nginx.conf` manually. As your company grows, you can write a simple Python script on your AWS server to automatically add these blocks and reload Nginx whenever a new client pays on your dashboard!
