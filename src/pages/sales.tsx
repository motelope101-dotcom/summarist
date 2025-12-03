import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";

export default function SalesPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/create-checkout-session", { method: "POST" });
    const session = await res.json();

    if (session?.url) {
      window.location.href = session.url; // redirect to Stripe Checkout
    } else {
      console.error("No session URL returned");
    }
    setLoading(false);
  };

  return (
    <ProtectedRoute>
      <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-white">Sales</h1>
        <p className="mt-4 text-neutral-400">
          Unlock unlimited summaries, audio playback, and personalized recommendations.
        </p>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="mt-6 bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-lg shadow transition"
        >
          {loading ? "Redirecting..." : "Subscribe with Stripe"}
        </button>
      </section>
    </ProtectedRoute>
  );
}