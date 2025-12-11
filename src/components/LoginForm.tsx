"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      router.push("/"); 
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials or login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center p-8 bg-[#816678]">
      <h1 className="text-3xl font-bold text-white">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-neutral-800 rounded-lg p-6 shadow w-full max-w-md flex flex-col gap-y-4"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="px-3 py-2 rounded bg-neutral-700 text-white"
          required
        />
        <input
          type="password"
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
          className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
      <p className="mt-4 text-neutral-300">
        Don’t have an account?{" "}
        <Link href="/auth/signup" className="text-indigo-400 hover:underline">
          Sign Up
        </Link>
      </p>
    </section>
  );
}