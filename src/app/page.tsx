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
      <main className="min-h-screen bg-[#0a0a0f] text-white">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Understand books in few minutes
            </h1>
            <p className="mt-6 text-lg text-neutral-300 max-w-xl">
              Gain more knowledge in less time. Great summaries for busy people,
              individuals who barely have time to read, and even people who don’t
              like to read.
            </p>
            <div className="mt-10">
              <a
                href="/login"
                className="inline-flex items-center justify-center rounded-md bg-white/10 px-6 py-3 text-white font-medium ring-1 ring-white/20 hover:bg-white/20"
              >
                Login
              </a>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/images/placeholder-hero.jpg"
              alt="Reading illustration placeholder"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg ring-1 ring-white/10 object-cover"
              priority
            />
          </div>
        </section>

        {/* Value props */}
        <section className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-3 gap-12">
          {[
            { title: "Read or listen", text: "Save time by getting the core ideas from the best books." },
            { title: "Find your next read", text: "Explore book lists and personalized recommendations." },
            { title: "Briefcasts", text: "Gain valuable insights from briefcasts." },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-white/10 bg-neutral-900 p-8"
            >
              <Image
                src="/images/placeholder-feature.jpg"
                alt={`${item.title} placeholder`}
                width={400}
                height={250}
                className="w-full h-auto rounded-md mb-6 object-cover"
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-neutral-300">{item.text}</p>
            </article>
          ))}
        </section>

        {/* Outcomes grid */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
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
                className="rounded-lg bg-neutral-900 border border-white/10 p-8 text-center"
              >
                <Image
                  src="/images/placeholder-outcome.jpg"
                  alt={`${t} placeholder`}
                  width={300}
                  height={200}
                  className="w-full h-auto rounded-md mb-4 object-cover"
                />
                <h3 className="text-base font-semibold">{t}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Impact stats */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <ul className="space-y-8">
            <li className="flex items-start gap-6">
              <span className="text-3xl font-bold">93%</span>
              <p className="text-neutral-300">
                of Summarist members <strong>significantly increase</strong> reading frequency.
              </p>
            </li>
            <li className="flex items-start gap-6">
              <span className="text-3xl font-bold">96%</span>
              <p className="text-neutral-300">
                of Summarist members <strong>establish better</strong> habits.
              </p>
            </li>
            <li className="flex items-start gap-6">
              <span className="text-3xl font-bold">90%</span>
              <p className="text-neutral-300">
                have made <strong>significant positive</strong> change to their lives.
              </p>
            </li>
            <li className="flex items-start gap-6">
              <span className="text-3xl font-bold">91%</span>
              <p className="text-neutral-300">
                of Summarist members <strong>feel more productive</strong> after incorporating the service.
              </p>
            </li>
            <li className="flex items-start gap-6">
              <span className="text-3xl font-bold">94%</span>
              <p className="text-neutral-300">
                have <strong>improved comprehension and retention</strong> of information.
              </p>
            </li>
            <li className="flex items-start gap-6">
              <span className="text-3xl font-bold">88%</span>
              <p className="text-neutral-300">
                feel more informed about current events and industry trends.
              </p>
            </li>
          </ul>
        </section>

        {/* Testimonials */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-3xl font-semibold text-center mb-12">What our members say</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { name: "Hanna M.", text: "This app has been a game-changer for me! It’s saved me so much time..." },
              { name: "David B.", text: "I love this app! It provides concise and accurate summaries in a way that is easy to understand." },
              { name: "Nathan S.", text: "This app is a great way to get the main takeaways... The summaries are well-written and informative." },
              { name: "Ryan R.", text: "If you’re a busy person who loves reading but doesn’t have the time to read every book in full, this app is for you!" },
            ].map(({ name, text }) => (
              <figure
                key={name}
                className="rounded-lg border border-white/10 bg-neutral-900 p-8 flex gap-6 items-start"
              >
                <Image
                  src="/images/placeholder-testimonial.jpg"
                  alt={`${name} placeholder`}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
                <blockquote className="text-neutral-200">{text}</blockquote>
                <figcaption className="sr-only">{name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <section className="mx-auto max-w-7xl px-6 py-20 text-center bg-neutral-900 rounded-xl border border-white/10">
          <h2 className="text-2xl sm:text-3xl font-bold">Start growing with Summarist now</h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-8 justify-center">
            <div className="text-neutral-200">
              3 Million <span className="text-neutral-400">Downloads on all platforms</span>
            </div>
            <div className="text-neutral-200">
              4.5 Stars <span className="text-neutral-400">Average ratings on iOS and Google Play</span>
            </div>
            <div className="text-neutral-200">
              97% <span className="text-neutral-400">Of members create a better reading habit</span>
            </div>
          </div>
        </section>

        {/* Featured Book */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BookOpenIcon className="h-5 w-5 flex-shrink-0 text-indigo-400" />
            Featured Book
          </h2>
          {loading && <p className="text-neutral-400 mt-2">Loading featured book...</p>}
          {!loading && featured ? (
            <article className="bg-neutral-900 border border-white/10 p-8 rounded-lg mt-6 grid md:grid-cols-2 gap-12 items-center">
              <Image
                src="/images/placeholder-book.jpg"
                alt="Featured book placeholder"
                width={300}
                height={400}
                className="rounded-lg shadow-lg object-cover"
              />
              <div>
                <h3 className="text-lg text-white">{featured.title}</h3>
                <p className="text-neutral-400">by {featured.author}</p>
                {featured.summary && (
                  <p className="text-neutral-300 text-sm mt-4">{featured.summary}</p>
                )}
              </div>
            </article>
          ) : (
            !loading && <p className="text-neutral-400 mt-2">No featured book found.</p>
          )}
        </section>

        {/* Top Picks */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <SparklesIcon className="h-5 w-5 flex-shrink-0 text-pink-400" />
            Top Picks
          </h2>
          {loading && <p className="text-neutral-400 mt-2">Loading top picks...</p>}
          {!loading && topPicks.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-6">
              {topPicks.map((book) => (
                <li
                  key={book.id}
                  className="bg-neutral-900 border border-white/10 p-8 rounded-lg flex flex-col gap-4"
                >
                  <Image
                    src="/images/placeholder-book.jpg"
                    alt={`${book.title} placeholder`}
                    width={200}
                    height={280}
                    className="rounded-md shadow-md object-cover mx-auto"
                  />
                  <div>
                    <h3 className="text-lg text-white">{book.title}</h3>
                    <p className="text-neutral-400">by {book.author}</p>
                    {book.summary && (
                      <p className="text-neutral-300 text-sm mt-2">{book.summary}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p className="text-neutral-400 mt-2">No top picks available.</p>
          )}
        </section>

        {/* Continue Listening */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <PlayCircleIcon className="h-5 w-5 flex-shrink-0 text-green-400" />
            Continue Listening
          </h2>
          <div className="mt-6 bg-neutral-900 border border-white/10 rounded-lg p-8 flex flex-col items-center justify-center">
            <Image
              src="/images/placeholder-listening.jpg"
              alt="Continue listening placeholder"
              width={400}
              height={250}
              className="rounded-md shadow-md object-cover mb-6"
            />
            <p className="text-neutral-400">No books in progress</p>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}