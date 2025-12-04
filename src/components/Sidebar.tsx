// src/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import {
  HomeIcon,
  BookOpenIcon,
  MusicalNoteIcon,
  Cog6ToothIcon,
  ShoppingCartIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <aside className="w-20 md:w-64 bg-[#816678] text-white flex flex-col items-center py-6 space-y-6 border-r border-neutral-700">
      {/* Navigation */}
      <Link href="/home" aria-label="Home">
        <HomeIcon className="hover:text-purple-400 transition" />
      </Link>
      <Link href="/library" aria-label="Library">
        <BookOpenIcon className="hover:text-purple-400 transition" />
      </Link>
      <Link href="/player/atomic-habits" aria-label="Player">
        <MusicalNoteIcon className="hover:text-purple-400 transition" />
      </Link>
      <Link href="/settings" aria-label="Settings">
        <Cog6ToothIcon className="hover:text-purple-400 transition" />
      </Link>
      <Link href="/sales" aria-label="Sales">
        <ShoppingCartIcon className="hover:text-purple-400 transition" />
      </Link>

      {/* Logout */}
      {user && (
        <button
          onClick={handleLogout}
          aria-label="Logout"
          className="mt-auto hover:text-red-400 transition"
        >
          <PowerIcon />
        </button>
      )}
    </aside>
  );
}