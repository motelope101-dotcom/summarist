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
import Image from "next/image";

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
      <main className="min-h-screen">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Understand books in few minutes
            </h1>
            <p className="mt-4 text-lg text-neutral-300">
              Gain more knowledge in less time. Great summaries for busy people,
              individuals who barely have time to read, and even people who don’t
              like to read.
            </p>
            <div className="mt-8">
              <a
                href="/login"
                className="inline-flex items-center justify-center rounded-md bg-white/10 px-5 py-3 text-white font-medium ring-1 ring-white/20 hover:bg-white/20"
              >
                Login
              </a>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/landing.png"
              alt="Reading illustration"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg ring-1 ring-white/10"
              priority
            />
          </div>
        </section>

        {/* Value props */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="rounded-lg border border-white/10 bg-neutral-900 p-6">
              <h3 className="text-lg font-semibold text-white">Read or listen</h3>
              <p className="mt-2 text-neutral-300">
                Save time by getting the core ideas from the best books.
              </p>
            </article>
            <article className="rounded-lg border border-white/10 bg-neutral-900 p-6">
              <h3 className="text-lg font-semibold text-white">Find your next read</h3>
              <p className="mt-2 text-neutral-300">
                Explore book lists and personalized recommendations.
              </p>
            </article>
            <article className="rounded-lg border border-white/10 bg-neutral-900 p-6">
              <h3 className="text-lg font-semibold text-white">Briefcasts</h3>
              <p className="mt-2 text-neutral-300">
                Gain valuable insights from briefcasts.
              </p>
            </article>
          </div>
        </section>

        {/* Outcomes grid */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "Enhance your knowledge",
              "Achieve greater success",
              "Improve your health",
              "Develop better parenting skills",
              "Increase happiness",
              "Be the best version of yourself",
            ].map((t) => (
              <div
                key={t}
                className="rounded-lg bg-neutral-900 border border-white/10 p-6"
              >
                <h3 className="text-base font-semibold text-white">{t}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Impact stats */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="text-2xl font-bold text-white">93%</span>
              <p className="text-neutral-300">
                of Summarist members <strong className="text-white">significantly increase </strong>
                reading frequency.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-2xl font-bold text-white">96%</span>
              <p className="text-neutral-300">
                of Summarist members <strong className="text-white">establish better </strong>
                habits.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-2xl font-bold text-white">90%</span>
              <p className="text-neutral-300">
                have made <strong className="text-white">significant positive </strong>
                change to their lives.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-2xl font-bold text-white">91%</span>
              <p className="text-neutral-300">
                of Summarist members <strong className="text-white">report feeling more productive </strong>
                after incorporating the service into their daily routine.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-2xl font-bold text-white">94%</span>
              <p className="text-neutral-300">
                of Summarist members have <strong className="text-white">noticed an improvement </strong>
                in their overall comprehension and retention of information.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-2xl font-bold text-white">88%</span>
              <p className="text-neutral-300">
                of Summarist members <strong className="text-white">feel more informed </strong>
                about current events and industry trends since using the platform.
              </p>
            </li>
          </ul>
        </section>

        {/* Testimonials */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <figure className="rounded-lg border border-white/10 bg-neutral-900 p-6">
              <blockquote className="text-neutral-200">
                This app has been a <strong className="text-white">game-changer </strong>
                for me! It’s saved me so much time...
              </blockquote>
              <figcaption className="mt-4 text-sm text-neutral-400">Hanna M.</figcaption>
            </figure>
            <figure className="rounded-lg border border-white/10 bg-neutral-900 p-6">
              <blockquote className="text-neutral-200">
                I love this app! It provides <strong className="text-white">concise and accurate summaries </strong>
                in a way that is easy to understand.
              </blockquote>
              <figcaption className="mt-4 text-sm text-neutral-400">David B.</figcaption>
            </figure>
            <figure className="rounded-lg border border-white/10 bg-neutral-900 p-6">
              <blockquote className="text-neutral-200">
                This app is a great way to get the main takeaways... <strong className="text-white">The summaries are well-written and informative. </strong>
                Definitely worth downloading.
              </blockquote>
              <figcaption className="mt-4 text-sm text-neutral-400">Nathan S.</figcaption>
            </figure>
            <figure className="rounded-lg border border-white/10 bg-neutral-900 p-6">
              <blockquote className="text-neutral-200">
                If you’re a busy person who <strong className="text-white">loves reading but doesn’t have the time </strong>
                to read every book in full, this app is for you!
              </blockquote>
              <figcaption className="mt-4 text-sm text-neutral-400">Ryan R.</figcaption>
            </figure>
          </div>
        </section>

        {/* CTA band */}
        <section className="mx-auto max-w-7xl px-6 py-16 text-center bg-neutral-900 rounded-xl border border-white/10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Start growing with Summarist now
          </h2>
          <div className="mt-6 flex flex-col sm:flex-row gap-6 justify-center">
            <div className="text-neutral-200">
              3 Million <span className="text-neutral-400">Downloads on all platforms</span>
            </div>
            <div className="text-neutral-200">
              4.5 Stars <span className="text-neutral-400">Average ratings on iOS and Google Play</span>
            </div>
            <div className="text-neutral-200">
              97% <span className="text-neutral-400">Of Summarist members create a better reading habit</span>
            </div>
          </div>
        </section>

        {/* Featured Book */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
            <BookOpenIcon className="h-5 w-5 flex-shrink-0 text-indigo-400" />
            Featured Book
          </h2>
          {loading && <p className="text-neutral-400 mt-2">Loading featured book...</p>}
          {!loading && featured ? (
            <article className="bg-neutral-900 border border-white/10 p-6 rounded-lg mt-4">
              <h3 className="text-lg text-white">{featured.title}</h3>
              <p className="text-neutral-400">by {featured.author}</p>
              {featured.summary && (
                <p className="text-neutral-300 text-sm mt-2">{featured.summary}</p>
              )}
            </article>
          ) : (
            !loading && <p className="text-neutral-400 mt-2">No featured book found.</p>
          )}
        </section>

        {/* Top Picks */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
            <SparklesIcon className="h-5 w-5 flex-shrink-0 text-pink-400" />
            Top Picks
          </h2>
          {loading && <p className="text-neutral-400 mt-2">Loading top picks...</p>}
          {!loading && topPicks.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {topPicks.map((book) => (
                <li
                  key={book.id}
                  className="bg-neutral-900 border border-white/10 p-6 rounded-lg"
                >
                  <h3 className="text-lg text-white">{book.title}</h3>
                  <p className="text-neutral-400">by {book.author}</p>
                  {book.summary && (
                    <p className="text-neutral-300 text-sm mt-2">{book.summary}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p className="text-neutral-400 mt-2">No top picks available.</p>
          )}
        </section>

        {/* Continue Listening */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
            <PlayCircleIcon className="h-5 w-5 flex-shrink-0 text-green-400" />
            Continue Listening
          </h2>
          <p className="text-neutral-400 mt-2">No books in progress</p>
        </section>
      </main>
    </ProtectedRoute>
  );
}