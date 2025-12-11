// src/scripts/resetBooks.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); 

import { firestore } from "../contexts/firebase-admin";

async function resetBooks() {
  const booksRef = firestore.collection("books");

  // Step 1: Clear existing docs
  const snapshot = await booksRef.get();
  for (const doc of snapshot.docs) {
    await booksRef.doc(doc.id).delete();
    console.log(`Deleted book: ${doc.id}`);
  }

  // Step 2: Seed fresh docs
  const sampleBooks = [
    {
      id: "atomic-habits",
      title: "Atomic Habits",
      author: "James Clear",
      coverUrl: "https://picsum.photos/200/300?random=1",
      description: "An easy & proven way to build good habits and break bad ones.",
      audioUrl: "https://example.com/audio/atomic-habits.mp3",
      featured: true,
    },
    {
      id: "deep-work",
      title: "Deep Work",
      author: "Cal Newport",
      coverUrl: "https://picsum.photos/200/300?random=2",
      description: "Rules for focused success in a distracted world.",
      audioUrl: "https://example.com/audio/deep-work.mp3",
      featured: false,
    },
    {
      id: "lean-startup",
      title: "The Lean Startup",
      author: "Eric Ries",
      coverUrl: "https://picsum.photos/200/300?random=3",
      description: "How entrepreneurs use continuous innovation to create successful businesses.",
      audioUrl: "https://example.com/audio/lean-startup.mp3",
      featured: false,
    },
    {
      id: "7-habits",
      title: "The 7 Habits of Highly Effective People",
      author: "Stephen R. Covey",
      coverUrl: "https://picsum.photos/200/300?random=4",
      description: "Powerful lessons in personal change.",
      audioUrl: "https://example.com/audio/7-habits.mp3",
      featured: false,
    },
    {
      id: "thinking-fast-slow",
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      coverUrl: "https://picsum.photos/200/300?random=5",
      description: "Explores two modes of thought: fast, intuitive thinking and slow, deliberate reasoning.",
      audioUrl: "https://example.com/audio/thinking-fast-slow.mp3",
      featured: false,
    },
  ];

  for (const book of sampleBooks) {
    const { id, ...bookData } = book;
    await booksRef.doc(id).set(bookData);
    console.log(`Seeded book: ${id}`);
  }

  console.log("Reset complete: cleared and reseeded 'books' collection");
}

resetBooks().catch((err) => {
  console.error("Error resetting books:", err);
});