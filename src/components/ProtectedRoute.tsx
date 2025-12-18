"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirects once auth state is resolved
    if (!loading && !user) {
      try {
        router.replace("/auth/login");
      } catch (err) {
        // swallows navigation errors silently
        if (err instanceof Error && err.name === "AbortError") {
          // ignore aborted navigation
        } else {
          console.error("Navigation error:", err);
        }
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0a0a0f]">
        <p className="text-neutral-300">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}