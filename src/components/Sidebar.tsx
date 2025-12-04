// src/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "@/contexts/firebaseConfig";
import { signOut } from "firebase/auth";
import {
  HomeIcon,
  BookOpenIcon,
  MusicalNoteIcon,
  Cog6ToothIcon,
  ShoppingCartIcon,
  PowerIcon, // cleaner logout icon
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <aside className="w-20 bg-purple-950 text-white flex flex-col items-center py-6 space-y-6">
      {/* Navigation */}
      <Link href="/home" aria-label="Home">
        <HomeIcon className="h-6 w-6 hover:text-purple-400 transition" />
      </Link>
      <Link href="/library" aria-label="Library">
        <BookOpenIcon className="h-6 w-6 hover:text-purple-400 transition" />
      </Link>
      <Link href="/player/atomic-habits" aria-label="Player">
        <MusicalNoteIcon className="h-6 w-6 hover:text-purple-400 transition" />
      </Link>
      <Link href="/settings" aria-label="Settings">
        <Cog6ToothIcon className="h-6 w-6 hover:text-purple-400 transition" />
      </Link>
      <Link href="/sales" aria-label="Sales">
        <ShoppingCartIcon className="h-6 w-6 hover:text-purple-400 transition" />
      </Link>

      {/* Logout */}
      <button
        onClick={handleLogout}
        aria-label="Logout"
        className="mt-auto hover:text-red-400 transition"
      >
        <PowerIcon className="h-6 w-6" /> {/* logout icon */}
      </button>
    </aside>
  );
}