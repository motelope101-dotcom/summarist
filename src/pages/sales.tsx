"use client";

export default function SalesPage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white">Sales</h1>
      <p className="mt-4 text-neutral-400">
        Explore premium plans, offers, and discounts here.
      </p>
      <p className="mt-2 text-neutral-500 text-sm">
        (Later: integrate Stripe for checkout and subscription management.)
      </p>
    </section>
  );
}