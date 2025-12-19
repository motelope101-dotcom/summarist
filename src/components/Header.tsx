"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function Header() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="w-full border-b border-neutral-800 bg-[#0a0a0f] px-6 py-4 flex justify-center">
      <form
        onSubmit={handleSearch}
        aria-label="Search form"
        className="w-full max-w-lg flex items-center bg-neutral-900 rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-600"
      >
        <MagnifyingGlassIcon
          className="h-5 w-5 flex-shrink-0 text-neutral-400"
          aria-hidden="true"
        />
        <input
          type="text"
          aria-label="Search summaries and authors"
          placeholder="Search summaries, authors…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="ml-3 flex-1 bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
        />
      </form>
    </header>
  );
}