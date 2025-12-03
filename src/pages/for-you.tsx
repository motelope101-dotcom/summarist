"use client";

export default function ForYouPage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white">For You</h1>
      <p className="mt-4 text-neutral-400">
        Personalized recommendations.
      </p>
      <p className="mt-2 text-neutral-500 text-sm">
        (Later: integrate Firestore to fetch tailored book summaries.)
      </p>
    </section>
  );
}