"use client";

import { useEffect, useState } from "react";
import { db } from "@/contexts/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  BookOpenIcon,
  SparklesIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Book {
  id: string;
  title: string;
  author: string;
  summary?: string;
}

export default function HomePage() {
  const [featured, setFeatured] = useState<Book | null>(null);
  const [topPicks, setTopPicks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Featured book query
        const featuredQuery = query(
          collection(db, "books"),
          where("featured", "==", true)
        );
        const featuredSnap = await getDocs(featuredQuery);
        if (!featuredSnap.empty) {
          const doc = featuredSnap.docs[0];
          setFeatured({
            id: doc.id,
            title: doc.data().title,
            author: doc.data().author,
            summary: doc.data().summary,
          });
        }

        // Top picks (all books for now)
        const picksSnap = await getDocs(collection(db, "books"));
        const picksData = picksSnap.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          author: doc.data().author,
          summary: doc.data().summary,
        }));
        setTopPicks(picksData);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <ProtectedRoute>
      <section className="p-6 space-y-6 bg-[#0a0a0f] min-h-screen">
        {/* Featured Book */}
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
            <BookOpenIcon className="h-5 w-5 flex-shrink-0 text-indigo-400" />
            Featured Book
          </h2>
          {loading && <p className="text-neutral-400">Loading featured book...</p>}
          {!loading && featured ? (
            <div className="bg-neutral-800 p-4 rounded-lg mt-2">
              <h3 className="text-lg text-white">{featured.title}</h3>
              <p className="text-neutral-400">by {featured.author}</p>
              {featured.summary && (
                <p className="text-neutral-300 text-sm mt-1">{featured.summary}</p>
              )}
            </div>
          ) : (
            !loading && <p className="text-neutral-400">No featured book found.</p>
          )}
        </div>

        {/* Top Picks */}
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
            <SparklesIcon className="h-5 w-5 flex-shrink-0 text-pink-400" />
            Top Picks
          </h2>
          {loading && <p className="text-neutral-400">Loading top picks...</p>}
          {!loading && topPicks.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {topPicks.map((book) => (
                <li key={book.id} className="bg-neutral-800 p-4 rounded-lg">
                  <h3 className="text-lg text-white">{book.title}</h3>
                  <p className="text-neutral-400">by {book.author}</p>
                  {book.summary && (
                    <p className="text-neutral-300 text-sm mt-1">{book.summary}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p className="text-neutral-400">No top picks available.</p>
          )}
        </div>

        {/* Continue Listening */}
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
            <PlayCircleIcon className="h-5 w-5 flex-shrink-0 text-green-400" />
            Continue Listening
          </h2>
          <p className="text-neutral-400">No books in progress</p>
        </div>
      </section>
    </ProtectedRoute>
  );
}