// src/pages/player/[id].tsx
"use client";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
} from "@heroicons/react/24/solid";
import ProtectedRoute from "@/components/ProtectedRoute";
import { db } from "@/contexts/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function PlayerPage() {
  const router = useRouter();
  const { id } = router.query;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch audio URL from Firestore
  useEffect(() => {
    const fetchAudio = async () => {
      if (!id || typeof id !== "string") return;
      try {
        const docRef = doc(db, "books", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setAudioUrl(data.audioUrl || null);
        } else {
          setError("Audio not found for this book.");
        }
      } catch (err) {
        console.error("Error fetching audio:", err);
        setError("Failed to load audio. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAudio();
  }, [id]);

  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Skip forward/backward
  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  // Change playback speed
  const changeSpeed = () => {
    const newSpeed = speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1;
    setSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  // Update progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
    };
  }, []);

  if (!id) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center bg-[#816678]">
        <h1 className="text-2xl font-bold text-white">Player Not Found</h1>
        <p className="mt-2 text-neutral-300">
          No audio available for this book.
        </p>
      </section>
    );
  }

  return (
    <ProtectedRoute>
      <section className="p-8 flex flex-col items-center bg-[#816678] min-h-[60vh]">
        <h1 className="text-3xl font-bold text-white">Player: {id}</h1>

        {loading && (
          <p className="text-neutral-300 mt-4">Loading audio…</p>
        )}

        {error && (
          <p className="text-red-500 mt-4">{error}</p>
        )}

        {!loading && !error && audioUrl && (
          <>
            {/* Audio element */}
            <audio ref={audioRef} src={audioUrl} className="hidden" />

            {/* Controls */}
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={() => skip(-10)}
                className="bg-neutral-700 hover:bg-neutral-600 p-2 rounded"
              >
                <BackwardIcon className="h-6 w-6 text-white" />
              </button>

              <button
                onClick={togglePlay}
                className="bg-purple-700 hover:bg-purple-600 p-3 rounded-full"
              >
                {isPlaying ? (
                  <PauseIcon className="h-6 w-6 text-white" />
                ) : (
                  <PlayIcon className="h-6 w-6 text-white" />
                )}
              </button>

              <button
                onClick={() => skip(10)}
                className="bg-neutral-700 hover:bg-neutral-600 p-2 rounded"
              >
                <ForwardIcon className="h-6 w-6 text-white" />
              </button>

              <button
                onClick={changeSpeed}
                className="bg-neutral-700 hover:bg-neutral-600 px-3 py-2 rounded text-sm text-white"
              >
                {speed}x
              </button>
            </div>

            {/* Progress bar */}
            <div className="mt-6 w-full max-w-md">
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={progress}
                onChange={(e) => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = Number(e.target.value);
                    setProgress(Number(e.target.value));
                  }
                }}
                className="w-full accent-purple-700"
              />
              <div className="flex justify-between text-sm text-neutral-400 mt-1">
                <span>{Math.floor(progress)}s</span>
                <span>{Math.floor(duration)}s</span>
              </div>
            </div>
          </>
        )}
      </section>
    </ProtectedRoute>
  );
}