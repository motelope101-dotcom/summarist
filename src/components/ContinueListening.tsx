"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext"; 

interface ProgressItem {
  bookId: string;
  title: string;
  currentTime: number; // playback position in seconds
}

export default function ContinueListening() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ProgressItem[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchProgress = async () => {
      const snapshot = await getDocs(collection(db, `users/${user.uid}/progress`));
      const items: ProgressItem[] = snapshot.docs.map((doc) => doc.data() as ProgressItem);
      setProgress(items);
    };

    fetchProgress();
  }, [user]);

  if (!user) return null; 
  if (!progress.length) return <p>No books in progress.</p>;

  return (
    <section>
      <h2>Continue Listening</h2>
      <ul>
        {progress.map((item) => (
          <li key={item.bookId}>
            <p>
              {item.title} — {Math.floor(item.currentTime / 60)}m {item.currentTime % 60}s
            </p>
            <button>Resume</button>
          </li>
        ))}
      </ul>
    </section>
  );
}