// src/components/ProtectedRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/contexts/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.replace("/login"); // redirect if not logged in
      } else {
        setUser(firebaseUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-neutral-300">Loading...</p>
        {/* TODO: Replace with skeleton */}
      </div>
    );
  }

  if (!user) {
    // While redirecting, show a fallback
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-neutral-400">Redirecting to login...</p>
      </div>
    );
  }

  return <>{children}</>;
}