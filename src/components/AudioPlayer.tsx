"use client";

import { useEffect, useRef, useState } from "react";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";
import { auth, db } from "@/contexts/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

type AudioPlayerProps = {
  audioUrl?: string;
  bookId: string;
};

export default function AudioPlayer({ audioUrl, bookId }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      requestAnimationFrame(() => {
        setIsPlaying(false);
        setProgress(0);
      });
    }
  }, [bookId]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Audio play failed:", err);
      });
    }
  };

  const handleProgress = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 1;
      setProgress((current / duration) * 100);

      const user = auth.currentUser;
      if (user) {
        setDoc(
          doc(db, `users/${user.uid}/progress`, bookId),
          { currentTime: current },
          { merge: true }
        );
      }
    }
  };

  // Debug log: show which src is being used
  console.log("AudioPlayer using src:", audioUrl);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <audio
        ref={audioRef}
        src={audioUrl} // Firestore-URL
        preload="auto"
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={handleProgress}
        onError={(e) =>
          console.error(`Audio failed to load for book ${bookId}`, audioUrl, e)
        }
      />
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
        className="player-controls bg-neutral-800 hover:bg-neutral-700 text-white rounded-full p-3 transition flex items-center justify-center"
      >
        {isPlaying ? (
          <PauseIcon className="h-5 w-5 flex-shrink-0 text-red-400" />
        ) : (
          <PlayIcon className="h-5 w-5 flex-shrink-0 text-green-400" />
        )}
      </button>
      <input
        type="range"
        value={progress}
        onChange={(e) => {
          if (audioRef.current) {
            audioRef.current.currentTime =
              (parseFloat(e.target.value) / 100) * audioRef.current.duration;
          }
        }}
        className="w-full accent-indigo-500"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}