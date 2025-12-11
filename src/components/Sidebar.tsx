"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; 
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
    <aside className="w-20 md:w-64 bg-[#0a0a0f] text-white flex flex-col items-center py-6 space-y-6 border-r border-neutral-700">
      {/* Navigation */}
      <Link href="/home" aria-label="Home" className="hover:text-purple-400 transition">
        <HomeIcon className="h-5 w-5 flex-shrink-0" /> 
      </Link>

      <Link href="/library" aria-label="Library" className="hover:text-purple-400 transition">
        <BookOpenIcon className="h-5 w-5 flex-shrink-0" /> 
      </Link>

      <Link href="/player/atomic-habits" aria-label="Player" className="hover:text-purple-400 transition">
        <MusicalNoteIcon className="h-5 w-5 flex-shrink-0" /> 
      </Link>

      <Link href="/settings" aria-label="Settings" className="hover:text-purple-400 transition">
        <Cog6ToothIcon className="h-5 w-5 flex-shrink-0" /> 
      </Link>

      <Link href="/sales" aria-label="Sales" className="hover:text-purple-400 transition">
        <ShoppingCartIcon className="h-5 w-5 flex-shrink-0" /> 
      </Link>

      {/* Logout */}
      {user && (
        <button
          onClick={handleLogout}
          aria-label="Logout"
          className="mt-auto hover:text-red-400 transition"
        >
          <PowerIcon className="h-5 w-5 flex-shrink-0" /> {/* ✅ consistent */}
        </button>
      )}
    </aside>
  );
}