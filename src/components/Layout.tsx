// src/components/Layout.tsx
"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-900 text-white">
      {/* Sidebar */}
      <aside aria-label="Sidebar navigation">
        <Sidebar />
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <Header />
        <main
          role="main"
          className="flex-1 overflow-y-auto p-6"
        >
          {children}
        </main>
      </div>
    </div>
  );
}