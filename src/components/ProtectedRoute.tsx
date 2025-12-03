import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebaseConfig";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login"); // redirect if not logged in
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <p className="p-8">Loading...</p>;
  }

  return <>{children}</>;
}