"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <header className="w-full border-b border-neutral-700 bg-[#0a0a0f] p-4 flex justify-center">
      <form
        onSubmit={handleSearch}
        className="w-full max-w-md flex items-center bg-neutral-800 rounded px-3 py-2"
      >
        <MagnifyingGlassIcon className="h-5 w-5 flex-shrink-0 text-neutral-400" />
        <input
          type="text"
          aria-label="Search summaries, authors"
          placeholder="Search summaries, authors…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="ml-2 flex-1 bg-transparent text-sm text-white placeholder-neutral-400 focus:outline-none"
        />
      </form>
    </header>
  );
}