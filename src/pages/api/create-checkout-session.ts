// src/pages/api/create-checkout-session.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { uid, email } = req.body;
    if (!uid || !email) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const origin = req.headers.origin ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!, // subscription price ID
          quantity: 1,
        },
      ],
      success_url: `${origin}/library?success=true`,
      cancel_url: `${origin}/sales?canceled=true`,

      // user info
      customer_email: email,
      metadata: { uid },
    });

    return res.status(200).json({ id: session.id, url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Stripe session error:", message);
    return res.status(500).json({ error: message });
  }
}