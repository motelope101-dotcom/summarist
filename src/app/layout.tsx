import "./globals.css";
import { ReactNode } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/LoginForm";
import LogoutButton from "@/components/LogoutButton";

function AuthGate({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar with logout */}
      <header className="bg-neutral-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Summarist</h1>
        <LogoutButton />
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AuthGate>{children}</AuthGate>
        </AuthProvider>
      </body>
    </html>
  );
}