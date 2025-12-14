// src/scripts/resetBooks.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { firestore } from "@/contexts/firebase-admin";
import { books } from "@/data/books";

(async () => {
  try {
    const col = firestore.collection("books");

    // Delete existing docs
    const snap = await col.get();
    if (!snap.empty) {
      const batchDelete = firestore.batch();
      snap.forEach((doc) => batchDelete.delete(doc.ref));
      await batchDelete.commit();
      console.log(`Deleted ${snap.size} existing book(s)`);
    } else {
      console.log("No existing books to delete");
    }

    // Seed new books
    const batch = firestore.batch();
    books.forEach((book) => {
      const docRef = col.doc(book.id);
      batch.set(docRef, book);
      console.log("Seeded book:", book.title);
    });
    await batch.commit();

    console.log(
      "Reset complete: cleared and reseeded 'books' collection with real data"
    );
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown error occurred";
    console.error("Error resetting books:", message);
    process.exit(1);
  }
})();