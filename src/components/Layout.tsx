// src/components/Layout.tsx
"use client";

import Header from "./Header";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100">
      {/* Top header */}
      <Header />

      {/* Main content area */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}