// src/pages/settings.tsx
"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

export default function SettingsPage() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/auth/login"; // redirect after logout
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <ProtectedRoute>
      <section className="flex min-h-[60vh] flex-col items-center justify-center p-8 bg-[#816678]">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="mt-4 text-neutral-300">
          Manage your account preferences and app configuration here.
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

        {/* Future features */}
        <p className="mt-6 text-neutral-300 text-sm">
          (Later: integrate profile editing, password reset, and personalization.)
        </p>
      </section>
    </ProtectedRoute>
  );
}