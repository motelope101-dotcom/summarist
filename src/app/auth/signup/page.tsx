"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      await signup(email, password);
      router.push("/home"); 
    } catch (err) {
      console.error("Signup error:", err);
      setError((err as Error).message || "Unable to create account. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center p-8 bg-[#816678]">
      <h1 className="text-3xl font-bold text-white">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-neutral-800 rounded-lg p-6 shadow w-full max-w-md flex flex-col gap-y-4"
      >
        <input
          type="email"
          aria-label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="px-3 py-2 rounded bg-neutral-700 text-white"
          required
        />
        <input
          type="password"
          aria-label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="px-3 py-2 rounded bg-neutral-700 text-white"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          aria-label="Sign Up"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded transition disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <p className="mt-4 text-neutral-300">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-indigo-400 hover:underline">
          Log In
        </Link>
      </p>
    </section>
  );
}