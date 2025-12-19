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
        // swallow navigation errors silently
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
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-neutral-300 text-sm">Loading your session…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}