"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchBarProps {
  onSearch: (searchTerm?: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = term.trim();
    onSearch(trimmed || undefined);
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Search form"
      className="flex items-center gap-2 bg-neutral-800 rounded px-3 py-2 w-full max-w-md"
    >
      <MagnifyingGlassIcon
        className="h-5 w-5 flex-shrink-0 text-neutral-400"
        aria-hidden="true"
      />
      <input
        type="text"
        aria-label="Search books"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search books..."
        className="flex-1 bg-transparent text-white placeholder-neutral-500 outline-none"
      />
      <button
        type="submit"
        aria-label="Submit search"
        className="bg-purple-700 hover:bg-purple-600 text-white px-3 py-1 rounded transition"
      >
        Search
      </button>
    </form>
  );
}