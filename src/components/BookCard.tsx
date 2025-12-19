import Link from "next/link";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
};

type BookCardProps = {
  book?: Book;       // shows book details
  loading?: boolean; // shows skeleton loader
};

export default function BookCard({ book, loading }: BookCardProps) {
  // Skeleton state
  if (loading) {
    return (
      <article
        className="animate-pulse bg-neutral-800 rounded-lg p-6 shadow flex flex-col gap-y-4"
        aria-hidden="true"
      >
        <div className="bg-neutral-700 h-6 w-3/4 rounded"></div>
        <div className="bg-neutral-700 h-4 w-1/2 rounded"></div>
        <div className="bg-neutral-700 h-4 w-full rounded"></div>
      </article>
    );
  }

  // No book
  if (!book) return null;

  // Normal card
  return (
    <Link
      href={`/book/${String(book.id ?? "")}`}
      aria-label={`View details for ${String(book.title ?? "")}`}
      className="bg-neutral-800 rounded-lg p-6 shadow hover:shadow-xl hover:scale-[1.02] transition-transform flex flex-col gap-y-4"
    >
      <article>
        <h2 className="text-xl font-bold text-white">
          {String(book.title ?? "")}
        </h2>
        <p className="text-sm text-neutral-400">
          by {String(book.author ?? "")}
        </p>
        <p className="text-neutral-300 line-clamp-3">
          {String(book.description ?? "")}
        </p>
      </article>
    </Link>
  );
}