// app/layout.tsx
import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="flex min-h-screen bg-[#816678] text-white">
            {/* Sidebar */}
            <aside
              aria-label="Sidebar navigation"
              className="w-20 md:w-64 bg-neutral-800 border-r border-neutral-700"
            >
              <Sidebar />
            </aside>

            {/* Main content area */}
            <div className="flex flex-col flex-1">
              <Header />
              <main role="main" className="flex-1 overflow-y-auto p-6">
                {children}
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}