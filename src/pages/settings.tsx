// src/pages/settings.tsx
"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "@/contexts/firebaseClient";
import Link from "next/link";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/auth/login";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Fetch subscription + profile info
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const refUser = doc(firestore, "users", user.uid);
        const snap = await getDoc(refUser);

        if (snap.exists()) {
          const data = snap.data();
          setSubscriptionStatus(data.subscriptionStatus || null);
          setDisplayName(data.displayName || "");
          setAvatarUrl(data.avatarUrl || "");
        } else {
          console.warn("No user document found in Firestore.");
        }
      } catch (err) {
        console.error("Firestore read error:", err);
      }
    };

    fetchUserData();
  }, [user]);

  // Save profile edits
  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      const refUser = doc(firestore, "users", user.uid);
      await updateDoc(refUser, {
        displayName,
        avatarUrl,
      });
      alert("Profile updated!");
    } catch (err) {
      console.error("Firestore update error:", err);
      alert("Unable to update profile. Check Firestore rules.");
    }
  };

  // Trigger Firebase Auth password reset
  const handlePasswordReset = async () => {
    if (!user?.email) return;

    try {
      await fetch("/api/send-password-reset", {
        method: "POST",
        body: JSON.stringify({ email: user.email }),
        headers: { "Content-Type": "application/json" },
      });
      alert("Password reset email sent!");
    } catch (err) {
      console.error("Password reset error:", err);
    }
  };

  return (
    <ProtectedRoute>
      <section className="flex min-h-[60vh] flex-col items-center justify-center p-8 bg-[#816678]">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="mt-4 text-neutral-300">
          Manage your account preferences and subscription here.
        </p>

        {/* Account Info */}
        <div className="mt-6 bg-neutral-800 rounded-lg p-6 shadow w-full max-w-md text-center">
          <h2 className="text-lg font-semibold text-white">Account</h2>
          <p className="mt-2 text-neutral-300">
            Signed in as <span className="font-mono">{user?.email}</span>
          </p>

          <button
            onClick={handleLogout}
            className="mt-4 bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded transition"
          >
            Log Out
          </button>
        </div>

        {/* Profile Editing */}
        <div className="mt-6 bg-neutral-800 rounded-lg p-6 shadow w-full max-w-md text-center">
          <h2 className="text-lg font-semibold text-white">Profile</h2>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display Name"
            className="mt-2 w-full px-3 py-2 rounded bg-neutral-700 text-white"
          />
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="Avatar URL"
            className="mt-2 w-full px-3 py-2 rounded bg-neutral-700 text-white"
          />
          <button
            onClick={handleSaveProfile}
            className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded transition"
          >
            Save Profile
          </button>
        </div>

        {/* Password Reset */}
        <div className="mt-6 bg-neutral-800 rounded-lg p-6 shadow w-full max-w-md text-center">
          <h2 className="text-lg font-semibold text-white">Password Reset</h2>
          <p className="mt-2 text-neutral-300">
            Send a password reset email to <span className="font-mono">{user?.email}</span>
          </p>
          <button
            onClick={handlePasswordReset}
            className="mt-4 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded transition"
          >
            Reset Password
          </button>
        </div>

        {/* Subscription Management */}
        <div className="mt-6 bg-neutral-800 rounded-lg p-6 shadow w-full max-w-md text-center">
          <h2 className="text-lg font-semibold text-white">Subscription</h2>

          {subscriptionStatus ? (
            <p className="mt-2 text-neutral-300">
              Status:{" "}
              <span
                className={`font-semibold ${
                  subscriptionStatus === "active"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {subscriptionStatus}
              </span>
            </p>
          ) : (
            <p className="mt-2 text-neutral-400">No subscription found.</p>
          )}

          <Link
            href="/api/create-customer-portal-session"
            className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded transition"
          >
            Manage Subscription
          </Link>
        </div>
      </section>
    </ProtectedRoute>
  );
}