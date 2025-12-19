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
      <section className="flex min-h-[60vh] flex-col items-center justify-center text-center px-6 py-8 bg-[#0a0a0f]">
        <h1 className="text-3xl font-bold text-white mb-2">Sales</h1>
        <p className="text-neutral-300 max-w-lg mb-6">
          Unlock unlimited summaries, audio playback, and personalized recommendations.
        </p>

        <ul className="text-neutral-300 text-sm space-y-2 mb-6">
          <li>Unlimited book summaries</li>
          <li>Audio playback with progress tracking</li>
          <li>Personalized recommendations</li>
        </ul>

        {user && (
          <p className="text-neutral-400 text-sm mb-4">
            Signed in as <span className="font-mono">{user.email}</span>
          </p>
        )}

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          onClick={handleCheckout}
          disabled={loading}
          aria-label="Subscribe with Stripe"
          className="bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg hover:scale-[1.02] text-white px-6 py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Redirecting…" : "Subscribe with Stripe"}
        </button>
      </section>
    </ProtectedRoute>
  );
}