// src/app/layout.tsx
"use client";

import "../globals.css"; 

import { ReactNode } from "react";
import Header from "@/components/Header";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-900 text-white">
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}