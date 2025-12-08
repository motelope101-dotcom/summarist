// src/pages/api/stripe-webhook.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { firestore } from "@/contexts/firebase-admin"; // Firebase Admin helper

export const config = {
  api: {
    bodyParser: false, // Stripe requires raw body for signature verification
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;
  try {
    const rawBody = await buffer(req); // helper to get raw body
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    return res.status(400).send("Webhook Error: Unknown error");
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const uid = session.metadata?.uid;
        if (uid) {
          await firestore.collection("users").doc(uid).set(
            {
              subscriptionStatus: "active",
              stripeCustomerId: session.customer,
            },
            { merge: true }
          );
        }
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const uid = subscription.metadata?.uid;
        if (uid) {
          await firestore.collection("users").doc(uid).set(
            { subscriptionStatus: "canceled" },
            { merge: true }
          );
        }
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const uid = subscription.metadata?.uid;
        if (uid) {
          await firestore.collection("users").doc(uid).set(
            { subscriptionStatus: subscription.status },
            { merge: true }
          );
        }
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Webhook handler error:", err.message);
    } else {
      console.error("Webhook handler error: Unknown");
    }
    res.status(500).send("Internal Server Error");
  }
}

// Helper to read raw body
import { Readable } from "stream";
async function buffer(readable: Readable) {
  const chunks: Buffer[] = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}