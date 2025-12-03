"use client";

import { useRouter } from "next/router";

export default function BookDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  // Dummy book data (replace with Firestore later)
  const books: Record<
    string,
    { title: string; author: string; description: string }
  > = {
    "atomic-habits": {
      title: "Atomic Habits",
      author: "James Clear",
      description: "Learn how small habits compound into remarkable results.",
    },
    "deep-work": {
      title: "Deep Work",
      author: "Cal Newport",
      description: "Rules for focused success in a distracted world.",
    },
    "the-power-of-now": {
      title: "The Power of Now",
      author: "Eckhart Tolle",
      description: "A guide to spiritual enlightenment and living in the present.",
    },
  };

  const book = id ? books[id as string] : null;

  if (!book) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Book Not Found</h1>
        <p className="mt-2 text-neutral-400">
          No details available for this book.
        </p>
      </section>
    );
  }

  return (
    <section className="p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white">{book.title}</h1>
      <p className="mt-2 text-neutral-400">by {book.author}</p>
      <p className="mt-4 text-neutral-300 max-w-xl text-center">
        {book.description}
      </p>
    </section>
  );
}