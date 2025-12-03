// src/pages/signup.tsx
import React, { useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import type { FirebaseError } from "firebase/app";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Account created successfully!");
    } catch (err) {
      const message =
        (err as FirebaseError)?.message ??
        (err instanceof Error ? err.message : "Failed to create account.");
      setError(message);
    }
  };

  return (
    <section className="p-8 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
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
          Sign Up
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </section>
  );
}