"use client";

import { useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", query);
    // TODO: integrate Firestore search
  };

  return (
    <header className="w-full border-b border-neutral-800 bg-neutral-900 p-4 flex justify-between items-center">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="w-1/2">
        <input
          type="text"
          aria-label="Search summaries, authors, or topics"
          placeholder="Search summaries, authors, or topics…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded bg-neutral-800 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-400 focus:outline-none"
        />
      </form>

      {/* Settings/Profile */}
      <div className="relative flex items-center space-x-4">
        <button className="text-neutral-300 hover:text-white">Settings</button>

        {/* Example dropdown */}
        <div className="absolute right-0 mt-10 w-40 bg-neutral-800 rounded shadow-lg hidden group-hover:block">
          <ul className="text-sm text-neutral-200">
            <li className="px-4 py-2 hover:bg-neutral-700 cursor-pointer">Profile</li>
            <li className="px-4 py-2 hover:bg-neutral-700 cursor-pointer">Account</li>
            <li className="px-4 py-2 hover:bg-neutral-700 cursor-pointer">Log Out</li>
          </ul>
        </div>
      </div>
    </header>
  );
}