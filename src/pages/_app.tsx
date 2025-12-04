// src/pages/_app.tsx
import type { AppProps } from "next/app";
import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css"; // Tailwind/global styles
import { AuthProvider } from "@/contexts/AuthContext"; // add provider

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="flex">
        {/* Sidebar always visible */}
        <Sidebar />
        {/* Main content */}
        <div className="flex-1">
          <Component {...pageProps} />
        </div>
      </div>
    </AuthProvider>
  );
}