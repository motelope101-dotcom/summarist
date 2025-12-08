// src/pages/api/create-customer-portal-session.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const { customerId } = req.query; // pass customerId from Firestore if needed
    const origin = req.headers.origin ?? "http://localhost:3000";

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId as string,
      return_url: `${origin}/settings`,
    });

    res.redirect(303, portalSession.url);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Stripe portal error:", message);
    res.status(500).json({ error: message });
  }
}