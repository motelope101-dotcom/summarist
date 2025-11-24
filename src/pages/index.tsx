// src/pages/index.tsx
"use client";

import { db, auth } from "@/lib/firebaseConfig";

export default function HomePage() {
  console.log("Firebase Auth instance:", auth);
  console.log("Firebase Firestore instance:", db);

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">Summarist</h1>
      <p className="mt-4 text-lg text-neutral-300">
        Firebase is configured and ready to use!
      </p>
    </section>
  );
}