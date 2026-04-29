# Yochan-Shield: Automated Billing & Analytics Dashboard

The platform has been successfully upgraded into a fully monetizable SaaS product. We have replaced the simulated checkout with a highly secure Razorpay Webhook integration and introduced a data-rich Client Portal.

## 1. Razorpay Automated Billing
- **Secure Checkout UI:** The `/checkout` page now integrates the official Razorpay JS library. When a client clicks "Pay with Razorpay", they are presented with a real payment modal to pay ₹2,10,000 via UPI or Card.
- **Server-Side Order Generation:** The new `/api/create-razorpay-order` endpoint securely communicates with Razorpay servers to lock the payment amount, preventing client-side tampering.
- **Zero-Trust Webhooks:** Licenses are no longer generated on the frontend. The new `/api/webhooks/razorpay` endpoint listens silently in the background. Only when the bank officially clears the funds does Razorpay ping this webhook, which then writes the new `PQC-XXXXX` License Key into your Prisma database.

## 2. Telemetry & Analytics Dashboard
Your Client Portal (`/dashboard`) has been upgraded with the `recharts` data visualization library.
- **System Telemetry:** Top-level metrics show the total successful Sovereign Handshakes, the number of classical Downgrade Attacks blocked, and active domains.
- **Threat Intelligence Graph:** A line chart visualizing the volume of cryptographic attacks vs. secure handshakes over the last 7 days.
- **Domain Coverage Ring:** A pie chart visually breaking down the percentage of the client's architecture that is protected by PQC versus legacy RSA.

## How to Test
1. Refresh your Vercel deployment after the current build finishes.
2. Go to **Purchase License** to view the new Razorpay gateway integration.
3. Go to **Access Client Portal** to view your beautiful new Analytics charts.
