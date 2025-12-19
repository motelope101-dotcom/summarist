// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800 bg-[#0a0a0f] px-6 py-8 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* CTA band */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <p className="font-medium text-white">
            Ready to start listening? Join Summarist today.
          </p>
          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
          >
            Get Started
          </Link>
        </div>

        {/* Footer links */}
        <nav className="flex flex-wrap gap-4 text-neutral-400">
          <Link href="/about" className="hover:text-white hover:underline transition">About</Link>
          <Link href="/contact" className="hover:text-white hover:underline transition">Contact</Link>
          <Link href="/help" className="hover:text-white hover:underline transition">Help</Link>
          <Link href="/privacy" className="hover:text-white hover:underline transition">Privacy</Link>
          <Link href="/terms" className="hover:text-white hover:underline transition">Terms</Link>
        </nav>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-neutral-500">
        © 2025 Summarist. All rights reserved.
      </div>
    </footer>
  );
}