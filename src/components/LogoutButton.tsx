"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/auth/login"; // redirect back to login
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded transition"
    >
      Log Out
    </button>
  );
}