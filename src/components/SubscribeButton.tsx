"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type Props = {
  uid: string;
  email: string;
};

export default function SubscribeButton({ uid, email }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, email }),
      });

      if (!res.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await res.json();
      const stripe = await stripePromise;

      if (stripe && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Unable to start checkout. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded transition disabled:opacity-50"
      >
        {loading ? "Redirecting…" : "Subscribe Now"}
      </button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}