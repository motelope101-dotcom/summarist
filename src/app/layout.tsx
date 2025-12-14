// src/app/layout.tsx
import "../styles/globals.css";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Summarist",
  description: "Audiobook summaries app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-[#0a0a0f] text-white flex">
        <AuthProvider>
          {/* Sidebar visible on all pages */}
          <Sidebar />
          <main className="flex-1">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}