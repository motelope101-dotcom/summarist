"use client";

import { useEffect, useState } from "react";
import { db } from "@/contexts/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import AudioPlayer from "@/components/AudioPlayer";
import Image from "next/image";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  audioUrl: string;
};

export default function BookDetailPage() {
  const params = useParams();
  const id = params?.bookId as string;
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "books", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBook({ id: docSnap.id, ...(docSnap.data() as Omit<Book, "id">) });
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return (
      <p className="text-neutral-300 p-8 bg-[#0a0a0f] rounded-lg">
        Loading book...
      </p>
    );
  }

  return (
    <section className="p-8 bg-[#0a0a0f] min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-2">{book.title}</h1>
      <p className="text-neutral-300 mb-4">by {book.author}</p>
      <Image
        src={book.coverUrl}
        alt={book.title}
        width={192}
        height={288}
        className="w-48 h-72 object-cover rounded mb-6"
      />
      <p className="text-neutral-200 mb-6">{book.description}</p>
      <AudioPlayer audioUrl={book.audioUrl} bookId={book.id} />
    </section>
  );
}