// src/components/SubscribeButton.tsx
"use client";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type Props = {
  uid: string;
  email: string;
};

export default function SubscribeButton({ uid, email }: Props) {
  const handleSubscribe = async () => {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, email }),
      });

      const data = await res.json();
      const stripe = await stripePromise;

      if (stripe && data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 transition"
    >
      Subscribe Now
    </button>
  );
}