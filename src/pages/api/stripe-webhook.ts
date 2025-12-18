import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { firestore } from "@/contexts/firebase-admin";
import { Readable } from "stream";

export const config = {
  api: { bodyParser: false },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function buffer(readable: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const sig = req.headers["stripe-signature"] as string | undefined;
  if (!sig) return res.status(400).send("Missing Stripe signature");

  let event: Stripe.Event;
  try {
    const rawBody = await buffer(req);
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook signature verification failed";
    console.error("Webhook signature error:", message);
    return res.status(400).send(`Webhook Error: ${message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const uid = session.metadata?.uid;
        if (uid && session.customer) {
          // Attach UID to customer metadata for future lookups
          await stripe.customers.update(session.customer as string, {
            metadata: { uid },
          });

          await firestore.collection("user").doc(uid).set(
            {
              subscriptionStatus: "active",
              stripeCustomerId: session.customer as string,
            },
            { merge: true }
          );
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const userSnap = await firestore
          .collection("user")
          .where("stripeCustomerId", "==", customerId)
          .limit(1)
          .get();

        if (!userSnap.empty) {
          const uid = userSnap.docs[0].id;
          await firestore.collection("user").doc(uid).set(
            { subscriptionStatus: subscription.status },
            { merge: true }
          );
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const userSnap = await firestore
          .collection("user")
          .where("stripeCustomerId", "==", customerId)
          .limit(1)
          .get();

        if (!userSnap.empty) {
          const uid = userSnap.docs[0].id;
          await firestore.collection("user").doc(uid).set(
            { subscriptionStatus: "canceled" },
            { merge: true }
          );
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Webhook handler error:", message);
    return res.status(500).send("Internal Server Error");
  }
}