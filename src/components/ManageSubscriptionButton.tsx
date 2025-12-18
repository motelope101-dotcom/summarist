import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "@/contexts/firebaseClient";

export default function ManageSubscriptionButton() {
  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomerId = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      const userDoc = await getDoc(doc(firestore, "user", uid)); 
      if (userDoc.exists()) {
        setStripeCustomerId(userDoc.data().stripeCustomerId);
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
      className="btn-primary"
    >
      Manage Subscription
    </button>
  );
}