"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function SalesPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!user) {
      setError("You must be signed in to subscribe.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid, email: user.email }),
      });

      if (!res.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await res.json();

      if (session?.url) {
        window.location.href = session.url;
      } else {
        throw new Error("No session URL returned");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Unable to start checkout. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <section className="flex min-h-[60vh] flex-col items-center justify-center text-center p-8 bg-[#0a0a0f]">
        <h1 className="text-3xl font-bold text-white">Sales</h1>
        <p className="mt-4 text-neutral-300 max-w-lg">
          Unlock unlimited summaries, audio playback, and personalized recommendations.
        </p>

        <ul className="mt-4 text-neutral-300 text-sm space-y-2">
          <li> Unlimited book summaries</li>
          <li> Audio playback with progress tracking</li>
          <li> Personalized recommendations</li>
        </ul>

        {user && (
          <p className="mt-2 text-neutral-300 text-sm">
            Signed in as <span className="font-mono">{user.email}</span>
          </p>
        )}

        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleCheckout}
          disabled={loading}
          aria-label="Subscribe with Stripe"
          className="mt-6 bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-lg shadow transition disabled:opacity-50"
        >
          {loading ? "Redirecting…" : "Subscribe with Stripe"}
        </button>
      </section>
    </ProtectedRoute>
  );
}