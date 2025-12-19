"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "@/contexts/firebaseClient";

export default function ManageSubscriptionButton() {
  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomerId = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      try {
        const userDoc = await getDoc(doc(firestore, "user", uid));
        if (userDoc.exists()) {
          setStripeCustomerId(userDoc.data().stripeCustomerId ?? null);
        }
      } catch (err) {
        console.error("Error fetching Stripe customer ID:", err);
      }
    };
    fetchCustomerId();
  }, []);

  const handleManageSubscription = () => {
    if (!stripeCustomerId) return;
    window.location.href = `/api/create-customer-portal-session?stripeCustomerId=${stripeCustomerId}`;
  };

  return (
    <button
      onClick={handleManageSubscription}
      disabled={!stripeCustomerId}
      aria-label="Manage Subscription"
      className="bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg hover:scale-[1.02] text-white px-6 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Manage Subscription
    </button>
  );
}