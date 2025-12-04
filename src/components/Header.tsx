// src/components/Header.tsx
"use client";

import { useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", query);
    // TODO: integrate Firestore search (books collection, authors, topics)
  };

  return (
    <header className="w-full border-b border-neutral-700 bg-[#816678] p-4 flex justify-center">
      <form onSubmit={handleSearch} className="w-full max-w-md">
        <input
          type="text"
          aria-label="Search summaries, authors"
          placeholder="Search summaries, authors…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded bg-neutral-800 px-3 py-2 text-sm text-white placeholder-neutral-400 focus:outline-none"
        />
      </form>
    </header>
  );
}