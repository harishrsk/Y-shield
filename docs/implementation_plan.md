# Goal
Transform Yochan-Shield into a fully monetizable SaaS platform by implementing a real automated billing system via **Razorpay** and building a comprehensive **Analytics Dashboard** to display cryptographic metrics to your clients.

## Open Questions
> [!IMPORTANT]
> 1. Do you already have a Razorpay (or Stripe) account? We will need API keys to process real payments, but I can implement this using Razorpay's "Test Mode" keys for now.
> 2. For the Analytics Dashboard, what specific metrics are most valuable to your clients? (e.g., Number of attacks blocked, Total bandwidth encrypted, PQC handshake latency?)

## Proposed Architecture

### 1. Automated Billing System (Razorpay Integration)
Currently, the billing is a simple simulation button that auto-generates a license in the database. We will replace this with a secure flow:
- **Order Generation:** Create a new `/api/create-razorpay-order` endpoint. When the user clicks "Purchase," your backend securely requests an Order ID from Razorpay for ₹2,10,000.
- **Frontend Payment UI:** Integrate the official Razorpay JavaScript checkout module on the `/checkout` page. The user enters their credit card/UPI details securely via Razorpay.
- **Secure Webhooks:** Build `/api/webhooks/razorpay`. When the payment clears the bank, Razorpay secretly pings this webhook. Only then does the backend insert the new `LicenseKey` into the PostgreSQL database. This prevents hackers from bypassing the payment screen.

### 2. Analytics Dashboard Upgrade
Your current `/dashboard` only lists the active licenses. We will build a data-rich metrics page utilizing `recharts` (which is already installed in your `package.json`).

We will add three core widgets to the dashboard:
1. **Threat Intelligence Graph:** A line chart visualizing `PqcEvent` data—showing how many classical downgrade attacks were actively blocked over the last 7 days.
2. **Sovereign Handshake Counter:** A live counter showing total successful `X25519MLKEM768` connections.
3. **Domain Coverage Ring:** A circular chart showing the ratio of fully protected domains vs. unprotected domains on their license.

## Verification Plan
1. Enter Razorpay Test Mode credentials.
2. Navigate to `/checkout` and complete a test purchase using a mock UPI ID (`success@razorpay`).
3. Verify that the Webhook correctly catches the payment and generates the license in the database.
4. Navigate to `/dashboard` and confirm the new Recharts analytics widgets render correctly based on the mock data.
