"use client";

import Link from "next/link";

export default function LibraryPage() {
  // Dummy book data (later replace with Firebase)
  const books = [
    {
      id: "atomic-habits",
      title: "Atomic Habits",
      author: "James Clear",
      description: "Learn how small habits compound into remarkable results.",
    },
    {
      id: "deep-work",
      title: "Deep Work",
      author: "Cal Newport",
      description: "Rules for focused success in a distracted world.",
    },
    {
      id: "the-power-of-now",
      title: "The Power of Now",
      author: "Eckhart Tolle",
      description: "A guide to spiritual enlightenment and living in the present.",
    },
  ];

  return (
    <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {books.map((book) => (
        <Link
          key={book.id}
          href={`/book/${book.id}`}
          className="bg-neutral-800 rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col"
        >
          <h2 className="text-lg font-bold text-white">{book.title}</h2>
          <p className="text-sm text-neutral-400">by {book.author}</p>
          <p className="mt-2 text-neutral-300">{book.description}</p>
        </Link>
      ))}
    </section>
  );
}