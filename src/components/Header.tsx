// src/components/Header.tsx
"use client";

import { SearchBar } from "./SearchBar";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-neutral-800 bg-neutral-900 px-6">
      {/* Left side: App title or logo */}
      <div className="text-xl font-semibold tracking-wide text-white">
        Summarist
      </div>

      {/* Center: Search bar */}
      <div className="flex-1 px-6">
        <SearchBar />
      </div>

      {/* Right side: Placeholder for profile/settings */}
      <div className="flex items-center gap-4">
        <button className="rounded bg-neutral-800 px-3 py-1 text-sm text-neutral-300 hover:bg-neutral-700 hover:text-white">
          Settings
        </button>
      </div>
    </header>
  );
}