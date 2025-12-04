// src/components/ProtectedRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/contexts/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login"); // redirect if not logged in
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-neutral-300">Loading...</p>
        {/* Replace with spinner/skeleton later */}
      </div>
    );
  }

  return <>{children}</>;
}