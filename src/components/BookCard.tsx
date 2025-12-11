import Link from "next/link";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
};

type BookCardProps = {
  book?: Book;       // render book details
  loading?: boolean; // render skeleton loader
};

export default function BookCard({ book, loading }: BookCardProps) {
  if (loading) {
    return (
      <div className="animate-pulse bg-neutral-800 rounded-lg p-4 shadow flex flex-col gap-y-3">
        <div className="bg-neutral-700 h-6 w-3/4 rounded"></div>
        <div className="bg-neutral-700 h-4 w-1/2 rounded"></div>
        <div className="bg-neutral-700 h-4 w-full rounded"></div>
      </div>
    );
  }

  if (!book) return null;

  return (
    <Link
      href={`/book/${book.id}`}
      aria-label={`View details for ${book.title}`}
      className="bg-neutral-800 rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col gap-y-4"
    >
      <article>
        <h2 className="text-lg font-bold text-white">{book.title}</h2>
        <p className="text-sm text-neutral-400">by {book.author}</p>
        <p className="text-neutral-300 line-clamp-3">{book.description}</p>
      </article>
    </Link>
  );
}