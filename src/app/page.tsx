"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full">

      {/* Hero Section */}
      <section className="w-full bg-yellow-300 text-black">
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column — Text */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Understand books in minutes
            </h1>

            <p className="mt-6 text-lg max-w-md">
              Get the key ideas from bestselling nonfiction books in text and audio.
              Learn faster. Work smarter. Stay ahead.
            </p>

            <div className="mt-10">
              <a
                href="/signup"
                className="inline-flex items-center justify-center rounded-md bg-black text-yellow-300 px-6 py-3 font-semibold hover:bg-gray-900 transition"
              >
                Start Free Trial
              </a>
            </div>
          </div>

          {/* Right Column — Neutral Phone Mockup */}
          <div className="flex justify-center">
            <Image
              src="/images/neutral-phone.png"  
              alt="App preview on phone"
              width={400}
              height={800}
              className="w-full max-w-sm h-auto object-contain drop-shadow-xl"
              priority
            />
          </div>

        </div>
      </section>
{/* Value Props */}
<section className="w-full bg-white text-black py-20">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

    {/* Card 1 */}
    <div className="flex flex-col items-start">
      <div className="bg-yellow-300 p-4 rounded-lg">
        {/* Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" 
             fill="none" viewBox="0 0 24 24" 
             strokeWidth={1.5} stroke="currentColor" 
             className="h-10 w-10 text-black">
          <path strokeLinecap="round" strokeLinejoin="round" 
                d="M12 6v12m6-6H6" />
        </svg>
      </div>

      <h3 className="mt-6 text-xl font-semibold">Grow your knowledge</h3>
      <p className="mt-3 text-gray-700">
        Learn key insights from bestselling nonfiction books in minutes.
      </p>
    </div>

    {/* Card 2 */}
    <div className="flex flex-col items-start">
      <div className="bg-yellow-300 p-4 rounded-lg">
        {/* Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" 
             fill="none" viewBox="0 0 24 24" 
             strokeWidth={1.5} stroke="currentColor" 
             className="h-10 w-10 text-black">
          <path strokeLinecap="round" strokeLinejoin="round" 
                d="M3 5h18M3 12h18M3 19h18" />
        </svg>
      </div>

      <h3 className="mt-6 text-xl font-semibold">Stay organized</h3>
      <p className="mt-3 text-gray-700">
        Keep track of what you’ve read and what’s next on your list.
      </p>
    </div>

    {/* Card 3 */}
    <div className="flex flex-col items-start">
      <div className="bg-yellow-300 p-4 rounded-lg">
        {/* Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" 
             fill="none" viewBox="0 0 24 24" 
             strokeWidth={1.5} stroke="currentColor" 
             className="h-10 w-10 text-black">
          <path strokeLinecap="round" strokeLinejoin="round" 
                d="M12 3v18m9-9H3" />
        </svg>
      </div>

      <h3 className="mt-6 text-xl font-semibold">Learn faster</h3>
      <p className="mt-3 text-gray-700">
        Save time by absorbing the most important ideas quickly.
      </p>
    </div>

  </div>
</section>
{/* Outcomes Grid */}
<section className="w-full bg-gray-50 text-black py-20">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center">What you’ll get</h2>

    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

      {/* Outcome 1 */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold">Key insights</h3>
        <p className="mt-3 text-gray-700">
          Understand the core ideas from top nonfiction books.
        </p>
      </div>

      {/* Outcome 2 */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold">Time-saving summaries</h3>
        <p className="mt-3 text-gray-700">
          Learn faster with concise, easy-to-digest summaries.
        </p>
      </div>

      {/* Outcome 3 */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold">Audio versions</h3>
        <p className="mt-3 text-gray-700">
          Listen on the go with high-quality audio summaries.
        </p>
      </div>

      {/* Outcome 4 */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold">Personalized library</h3>
        <p className="mt-3 text-gray-700">
          Save your favorites and track your progress.
        </p>
      </div>

      {/* Outcome 5 */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold">Expert curation</h3>
        <p className="mt-3 text-gray-700">
          Access summaries crafted by knowledgeable experts.
        </p>
      </div>

      {/* Outcome 6 */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold">Always learning</h3>
        <p className="mt-3 text-gray-700">
          Stay ahead with new summaries added regularly.
        </p>
      </div>

    </div>
  </div>
</section>
{/* Impact Stats */}
<section className="w-full bg-yellow-300 text-black py-20">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">

    {/* Stat 1 */}
    <div>
      <h3 className="text-4xl font-bold">10M+</h3>
      <p className="mt-2 text-lg">Readers worldwide</p>
    </div>

    {/* Stat 2 */}
    <div>
      <h3 className="text-4xl font-bold">3,000+</h3>
      <p className="mt-2 text-lg">Summaries available</p>
    </div>

    {/* Stat 3 */}
    <div>
      <h3 className="text-4xl font-bold">94%</h3>
      <p className="mt-2 text-lg">User satisfaction</p>
    </div>

  </div>
</section>
{/* Testimonials */}
<section className="w-full bg-white text-black py-20">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center">What our users say</h2>

    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">

      {/* Testimonial 1 */}
      <div className="p-8 bg-gray-50 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gray-300" />
          <div>
            <h4 className="font-semibold">Alex R.</h4>
            <p className="text-sm text-gray-600">Entrepreneur</p>
          </div>
        </div>
        <p className="mt-6 text-gray-700">
          “Summarist helps me stay sharp and learn something new every day.”
        </p>
      </div>

      {/* Testimonial 2 */}
      <div className="p-8 bg-gray-50 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gray-300" />
          <div>
            <h4 className="font-semibold">Maria S.</h4>
            <p className="text-sm text-gray-600">Marketing Manager</p>
          </div>
        </div>
        <p className="mt-6 text-gray-700">
          “I love how quickly I can absorb the key ideas from top books.”
        </p>
      </div>

      {/* Testimonial 3 */}
      <div className="p-8 bg-gray-50 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gray-300" />
          <div>
            <h4 className="font-semibold">Jordan P.</h4>
            <p className="text-sm text-gray-600">Student</p>
          </div>
        </div>
        <p className="mt-6 text-gray-700">
          “A must‑have tool for anyone who wants to learn faster.”
        </p>
      </div>

    </div>
  </div>
</section>
{/* CTA Band */}
<section className="w-full bg-black text-white py-20">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold">
      Start learning smarter today
    </h2>

    <p className="mt-4 text-lg text-gray-300">
      Join millions of readers using Summarist to grow their knowledge.
    </p>

    <div className="mt-10">
      <a
        href="/signup"
        className="inline-flex items-center justify-center rounded-md bg-yellow-300 text-black px-8 py-4 font-semibold hover:bg-yellow-400 transition"
      >
        Start Free Trial
      </a>
    </div>
  </div>
</section>
    </main>
  );
}