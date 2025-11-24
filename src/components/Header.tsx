"use client";

export default function Header() {
  return (
    <header className="w-full border-b border-neutral-800 bg-neutral-900 p-4 flex justify-between items-center">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search summaries, authors, or topics…"
        className="w-1/2 rounded bg-neutral-800 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-400 focus:outline-none"
      />

      {/* Settings/Profile */}
      <div className="flex items-center space-x-4">
        <button className="text-neutral-300 hover:text-white">Settings</button>
        {/*dropdown here */}
      </div>
    </header>
  );
}