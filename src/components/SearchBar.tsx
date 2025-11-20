// src/components/SearchBar.tsx
"use client";

import { useState } from "react";

export function SearchBar() {
  const [q, setQ] = useState("");

  return (
    <div className="flex w-full max-w-md items-center rounded border border-neutral-700 bg-neutral-900 px-3 py-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search summaries, authors, or topics…"
        className="w-full bg-transparent text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none"
      />
    </div>
  );
}