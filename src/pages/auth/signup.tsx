// src/pages/auth/signup.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { user, signup } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/library");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await signup(email, password);
      router.replace("/library");
    } catch (err) {
      if (err instanceof Error) {
        console.error("Signup error:", err.message);
        setError("Unable to create account. Please try again.");
      } else {
        console.error("Signup error:", err);
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#816678]">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-800 p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-y-4"
      >
        <h1 className="text-2xl font-bold text-white">Create Account</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded bg-neutral-700 text-white placeholder-neutral-400 focus:outline-none"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-neutral-700 text-white placeholder-neutral-400 focus:outline-none"
          required
        />

        <button
          type="submit"
          disabled={submitting}
          className="bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-50"
        >
          {submitting ? "Signing up…" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}