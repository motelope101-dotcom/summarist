// src/components/SearchBar.tsx
"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function SearchBar() {
  const [q, setQ] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", q);
    // TODO: integrate Firestore search
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full max-w-md items-center rounded border border-neutral-700 bg-[#816678] px-3 py-2"
    >
      <MagnifyingGlassIcon className="text-neutral-300 mr-2" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search summaries, authors, or topics"
        placeholder="Search summaries, authors, or topics…"
        className="w-full bg-transparent text-sm text-white placeholder:text-neutral-400 focus:outline-none"
      />
    </form>
  );
}