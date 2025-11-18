"use client";

import { auth, db } from "../lib/firebaseConfig";

export default function HomePage() {
  console.log("Firebase Auth instance:", auth);
  console.log("Firebase Firestore instance:", db);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-blue-600">Summarist</h1>
      <p className="mt-4 text-lg text-gray-700">
        Firebase is configured and ready to use!
      </p>
    </main>
  );
}