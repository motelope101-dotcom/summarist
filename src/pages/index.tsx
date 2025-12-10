// src/pages/index.tsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/contexts/firebaseConfig";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
import BookCard from "@/components/BookCard";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl?: string;
  audioUrl?: string;
  featured?: boolean;
  category?: string;
};

export default function HomePage() {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [featured, setFeatured] = useState<Book | null>(null);
  const [continueList] = useState<string[]>([]); // simplified, no unused setter

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "books"));
      const all = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Book, "id">),
      }));
      setBooks(all);
      setFeatured(all.find((b) => b.featured) || all[0] || null);
    };
    load();
  }, []);

  return (
    <div className="p-8">
      {/* Hero / Featured */}
      {featured && (
        <section className="bg-neutral-900 rounded-lg p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{featured.title}</h1>
            <p className="text-neutral-300">{featured.author}</p>
            <p className="mt-2 text-neutral-400 line-clamp-3">
              {featured.description}
            </p>
            <div className="mt-4 space-x-2">
              <Link
                href={`/player/${featured.id}`}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded"
              >
                Listen now
              </Link>
              {!user && (
                <Link
                  href="/auth/login"
                  className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
          {featured.coverUrl && (
            <Image
              src={featured.coverUrl}
              alt={featured.title}
              width={160}
              height={224}
              className="rounded object-cover"
            />
          )}
        </section>
      )}

      {/* Continue listening (if signed in) */}
      {user && continueList.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-white">Continue listening</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {books
              .filter((b) => continueList.includes(b.id))
              .map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
          </div>
        </section>
      )}

      {/* Top picks */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-white">Top picks</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          {books.slice(0, 8).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}