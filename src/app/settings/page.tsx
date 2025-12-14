"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "@/contexts/firebaseClient";
import Link from "next/link";
import Image from "next/image";

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
      console.error("Logout failed:", err);
    }
  };

  // Loads user profile info from Firestore
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;
      try {
        const ref = doc(firestore, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data() as {
            subscriptionStatus?: string;
            displayName?: string;
            avatarUrl?: string;
          };
          setSubscriptionStatus(data.subscriptionStatus ?? null);
          setDisplayName(data.displayName ?? "");
          setAvatarUrl(data.avatarUrl ?? "");
        }
      } catch (err) {
        console.error("Error reading Firestore:", err);
      }
    };
    loadUserData();
  }, [user]);

  // Save profile changes back to Firestore
  const handleSaveProfile = async () => {
    if (!user) return;
    try {
      const ref = doc(firestore, "users", user.uid);
      await updateDoc(ref, { displayName, avatarUrl });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Could not update profile. Check Firestore rules.");
    }
  };

  // Send password reset email
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
      console.error("Error sending reset email:", err);
    }
  };

  return (
    <ProtectedRoute>
      <section className="flex min-h-[60vh] flex-col items-center justify-center p-8 bg-[#0a0a0f]">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="mt-4 text-neutral-300">
          Update your account details, profile, and subscription here.
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
            className="mt-2 w-full px-3 py-2 rounded bg-neutral-700 text-white placeholder-neutral-500 outline-none"
          />
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="Avatar URL"
            className="mt-2 w-full px-3 py-2 rounded bg-neutral-700 text-white placeholder-neutral-500 outline-none"
          />
          {avatarUrl && (
            <Image
              src={avatarUrl}
              alt="User avatar"
              width={64}
              height={64}
              className="rounded-full object-cover mx-auto mt-4"
            />
          )}
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
            Send a reset email to <span className="font-mono">{user?.email}</span>
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