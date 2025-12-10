"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      window.location.href = "/"; // redirects to home after login
    } catch (err: unknown) {
      console.error("Login error:", err);
      setError("Invalid credentials or login failed.");
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
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="px-3 py-2 rounded bg-neutral-700 text-white"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded transition"
        >
          Log In
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