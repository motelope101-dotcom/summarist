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
  const [progress, setProgress] = useState(0); // 0–100
  const [duration, setDuration] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Reset when book changes
  useEffect(() => {
    let isActive = true;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    requestAnimationFrame(() => {
      if (!isActive) return;
      setIsPlaying(false);
      setProgress(0);
      setDuration(0);
      setError(null);
    });
    return () => {
      isActive = false;
    };
  }, [bookId]);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (!audioUrl) {
      setError("No audio URL provided.");
      return;
    }
    if (isPlaying) {
      el.pause();
    } else {
      el
        .play()
        .then(() => {
          setError(null);
        })
        .catch((err) => {
          console.error("Audio play failed:", err);
          setError("Unable to play audio.");
        });
    }
  };

  const onLoadedMetadata = () => {
    const el = audioRef.current;
    if (!el) return;
    const d = Number.isFinite(el.duration) ? el.duration : 0;
    setDuration(d);
  };

  const handleTimeUpdate = () => {
    const el = audioRef.current;
    if (!el) return;
    const d = Number.isFinite(el.duration) && el.duration > 0 ? el.duration : 0;
    const current = el.currentTime;
    const pct = d > 0 ? (current / d) * 100 : 0;
    setProgress(pct);

    const user = auth.currentUser;
    if (user) {
      setDoc(
        doc(db, `user/${user.uid}/progress`, bookId),
        { currentTime: current },
        { merge: true }
      ).catch((err) => {
        console.error("Progress save failed:", err);
      });
    }
  };

  const seekToPercent = (pct: number) => {
    const el = audioRef.current;
    if (!el || !duration || duration <= 0) return;
    const clamped = Math.min(100, Math.max(0, pct));
    el.currentTime = (clamped / 100) * duration;
    setProgress(clamped);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full bg-neutral-900 rounded-lg p-4 shadow">
      <audio
        ref={audioRef}
        src={audioUrl || undefined}
        preload="auto"
        onLoadedMetadata={onLoadedMetadata}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={handleTimeUpdate}
        onError={(e) => {
          console.error(`Audio failed to load for book ${bookId}`, audioUrl, e);
          setError("Audio failed to load.");
        }}
      />

      {/* Play/Pause */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
        className="bg-neutral-800 hover:bg-neutral-700 hover:shadow-lg hover:scale-[1.05] text-white rounded-full p-4 transition flex items-center justify-center disabled:opacity-50"
        disabled={!audioUrl}
      >
        {isPlaying ? (
          <PauseIcon className="h-6 w-6 flex-shrink-0 text-red-400" />
        ) : (
          <PlayIcon className="h-6 w-6 flex-shrink-0 text-green-400" />
        )}
      </button>

      {/* Progress */}
      <input
        type="range"
        min={0}
        max={100}
        value={progress}
        onChange={(e) => seekToPercent(parseFloat(e.target.value))}
        className="w-full accent-indigo-500 cursor-pointer disabled:cursor-not-allowed"
        aria-label="Seek position"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        disabled={!duration || duration <= 0}
      />

      {/* Inline status */}
      {error && <p className="text-sm text-red-400">{error}</p>}
      {!error && !audioUrl && (
        <p className="text-sm text-neutral-400">No audio available.</p>
      )}
    </div>
  );
}