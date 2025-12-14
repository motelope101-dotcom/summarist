// src/pages/api/create-customer-portal-session.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { customerId } = req.query;

    if (!customerId || typeof customerId !== "string") {
      return res.status(400).json({ error: "Missing or invalid customerId" });
    }

    const origin = req.headers.origin ?? "http://localhost:3000";

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/settings`,
    });

    // Redirects user to the portal session
    return res.redirect(303, portalSession.url);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Stripe portal error:", message);
    return res.status(500).json({ error: message });
  }
}