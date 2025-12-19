"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  HomeIcon,
  BookOpenIcon,
  MusicalNoteIcon,
  Cog6ToothIcon,
  ShoppingCartIcon,
  SparklesIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const pathname = usePathname();
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

  const links = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/library", label: "Library", icon: BookOpenIcon },
    { href: "/for-you", label: "For You", icon: SparklesIcon },
    { href: "/player/atomic-habits", label: "Player", icon: MusicalNoteIcon },
    { href: "/settings", label: "Settings", icon: Cog6ToothIcon },
    { href: "/sales", label: "Sales", icon: ShoppingCartIcon },
  ];

  return (
    <aside className="w-20 md:w-64 bg-[#0a0a0f] text-white flex flex-col py-6 space-y-4 border-r border-neutral-700 shadow-lg">
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          aria-label={label}
          className={`flex items-center justify-center md:justify-start md:space-x-3 px-3 py-2 rounded-lg transition ${
            pathname === href
              ? "text-purple-400 font-semibold bg-neutral-700"
              : "hover:text-purple-400 hover:bg-neutral-800"
          }`}
        >
          <Icon className="h-5 w-5 flex-shrink-0" />
          <span className="hidden md:inline">{label}</span>
        </Link>
      ))}

      {/* Logout */}
      {user && (
        <button
          onClick={handleLogout}
          aria-label="Logout"
          className="mt-auto flex items-center justify-center md:justify-start md:space-x-3 px-3 py-2 rounded-lg transition hover:text-red-400 hover:bg-neutral-800"
        >
          <PowerIcon className="h-5 w-5 flex-shrink-0" />
          <span className="hidden md:inline">Logout</span>
        </button>
      )}
    </aside>
  );
}