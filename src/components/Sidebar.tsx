"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import {
  HomeIcon,
  SparklesIcon,
  BookOpenIcon,
  PlayCircleIcon,
  ShoppingCartIcon,
  Cog6ToothIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "For You", href: "/for-you", icon: SparklesIcon },
  { name: "Library", href: "/library", icon: RectangleStackIcon },
  { name: "Book", href: "/book", icon: BookOpenIcon },
  { name: "Player", href: "/player", icon: PlayCircleIcon },
  { name: "Sales", href: "/sales", icon: ShoppingCartIcon },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 text-2xl font-bold text-blue-500">Summarist</div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (pathname.startsWith("/book") && item.href === "/book");

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition",
                isActive
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
              )}
            >
              {/* 👇 Compact icon size + lighter stroke */}
              <Icon className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 text-xs text-neutral-500">
        cinematic ui • premium feel
      </div>
    </aside>
  );
}