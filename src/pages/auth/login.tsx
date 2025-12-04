// src/pages/auth/login.tsx
import React, { useState } from "react";
import { auth } from "@/contexts/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
      router.push("/library"); // ✅ redirect after success
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to log in. Please try again.";
      setError(msg);
    }
  };

  return (
    <section className="p-8 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-purple-600 text-white p-2 rounded">
          Log In
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </section>
  );
}