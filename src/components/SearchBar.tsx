// src/components/SearchBar.tsx
"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export function SearchBar({ onSearch }: SearchBarProps) {
  const [q, setQ] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(q.trim());
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full max-w-md items-center rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 shadow focus-within:border-indigo-500 transition"
    >
      <MagnifyingGlassIcon className="text-neutral-400 mr-2 h-5 w-5" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search summaries, authors, or topics"
        placeholder="Search summaries, authors, or topics…"
        className="w-full bg-transparent text-sm text-white placeholder:text-neutral-500 focus:outline-none"
      />
    </form>
  );
}