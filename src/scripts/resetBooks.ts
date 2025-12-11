import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { firestore } from "@/contexts/firebase-admin";
import { books } from "@/data/books";

(async () => {
  const col = firestore.collection("books");

  // Delete existing docs
  const snap = await col.get();
  const batchDelete = firestore.batch();
  snap.forEach((doc) => batchDelete.delete(doc.ref));
  await batchDelete.commit();

  // Seed real books
  const batch = firestore.batch();
  books.forEach((book) => {
    const docRef = col.doc(book.id);
    batch.set(docRef, book);
    console.log("Seeded book:", book.title);
  });
  await batch.commit();

  console.log("Reset complete: cleared and reseeded 'books' collection with real data");
})().catch((err) => {
  console.error("Error resetting books:", err);
  process.exit(1);
});