// src/components/Sidebar.tsx
import Link from "next/link";
import { auth } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";
import {
  HomeIcon,
  BookOpenIcon,
  CogIcon,
  ShoppingCartIcon,
  PlayIcon,
  RectangleStackIcon, // used for Library
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <aside className="flex flex-col w-20 bg-purple-900 text-white min-h-screen">
      {/* Navigation */}
      <nav className="flex flex-col items-center gap-6 mt-6">
        <Link href="/" className="hover:text-purple-300">
          <HomeIcon className="h-6 w-6" />
        </Link>

        <Link href="/library" className="hover:text-purple-300">
          <RectangleStackIcon className="h-6 w-6" />
        </Link>

        <Link href="/book/atomic-habits" className="hover:text-purple-300">
          <BookOpenIcon className="h-6 w-6" />
        </Link>

        <Link href="/player/atomic-habits" className="hover:text-purple-300">
          <PlayIcon className="h-6 w-6" />
        </Link>

        <Link href="/sales" className="hover:text-purple-300">
          <ShoppingCartIcon className="h-6 w-6" />
        </Link>

        <Link href="/settings" className="hover:text-purple-300">
          <CogIcon className="h-6 w-6" />
        </Link>
      </nav>

      {/* Logout button at bottom */}
      <div className="mt-auto mb-6 flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-neutral-700 hover:bg-neutral-600 text-white p-2 rounded"
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}