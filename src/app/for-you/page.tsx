"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/contexts/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Recommendation {
  bookId: string;
  reason: string;
}

export default function ForYouPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("No user logged in.");
          return;
        }

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          const recs = (data.recommendations || []) as Recommendation[];
          setRecommendations(recs);
        } else {
          setError("User document not found.");
        }
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError("Failed to load recommendations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <ProtectedRoute>
      <section className="flex min-h-[60vh] flex-col items-center justify-center p-8 bg-[#0a0a0f]">
        <h1 className="text-3xl font-bold text-white">For You</h1>
        <p className="mt-4 text-neutral-300">Personalized recommendations.</p>

        {loading && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-neutral-800 p-4 rounded-lg animate-pulse h-32"
              />
            ))}
          </div>
        )}

        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

        {!loading && !error && recommendations.length === 0 && (
          <p className="mt-2 text-neutral-300 text-sm">
            No recommendations yet.
          </p>
        )}

        {!loading && !error && recommendations.length > 0 && (
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
            {recommendations.map((rec, index) => (
              <li
                key={index}
                className="bg-neutral-800 p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold text-white">
                  {rec.bookId}
                </h2>
                <p className="text-neutral-400">{rec.reason}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </ProtectedRoute>
  );
}