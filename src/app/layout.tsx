// src/app/layout.tsx
import "../styles/globals.css";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

      <body className="bg-[#0a0a0f] text-white min-h-screen flex flex-col">
        <AuthProvider>

          <Header />

          <div className="flex flex-1">
            {/* Sidebar will be null on '/' */}
            <Sidebar />

            <main className="flex-1 px-6 py-4">
              <div className="w-full max-w-6xl mx-auto">
                {children}
              </div>
            </main>
          </div>

          <Footer />

        </AuthProvider>
      </body>
    </html>
  );
}