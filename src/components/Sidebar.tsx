// src/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn"; // helper for conditional classNames

const navItems = [
  { href: "/", label: "Home" },
  { href: "/for-you", label: "For You" },
  { href: "/library", label: "Library" },
  { href: "/book", label: "Book" },
  { href: "/player", label: "Player" },
  { href: "/sales", label: "Sales" },
  { href: "/settings", label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col border-r border-neutral-800 bg-neutral-900 p-4">
      {/* Logo / Title */}
      <div className="mb-6 px-2">
        <span className="text-xl font-semibold tracking-wide text-white">
          Summarist
        </span>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-300 hover:bg-neutral-800/60 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer note */}
      <div className="mt-6 px-2 text-xs text-neutral-400">
        cinematic ui • premium feel
      </div>
    </aside>
  );
}