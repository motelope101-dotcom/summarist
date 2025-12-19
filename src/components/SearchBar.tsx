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
      className="flex items-center gap-3 bg-neutral-800 rounded-lg px-4 py-2 w-full max-w-md shadow transition focus-within:ring-2 focus-within:ring-indigo-500"
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
        className="flex-1 bg-transparent text-white placeholder-neutral-500 outline-none focus:ring-0"
      />
      <button
        type="submit"
        aria-label="Submit search"
        className="bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg hover:scale-[1.02] text-white px-4 py-1.5 rounded transition disabled:opacity-50"
        disabled={!term.trim()}
      >
        Search
      </button>
    </form>
  );
}