// src/components/Layout.tsx
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 text-gray-900 font-sans min-h-screen">
      {/* header */}
      <header className="w-full p-4 bg-blue-600 text-white">
        <h1 className="text-2xl font-bold">Summarist</h1>
      </header>

      {/* Main content */}
      <main className="p-8">{children}</main>

      {/* footer */}
      <footer className="w-full p-4 bg-gray-200 text-center">
        <p className="text-sm text-gray-600">© 2025 Summarist</p>
      </footer>
    </div>
  );
}