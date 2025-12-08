// src/components/AudioPlayer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/contexts/firebaseConfig";
import { useAuth } from "@/contexts/AuthContext"; // get current user
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/contexts/firebaseClient"; // client Firestore SDK
import Link from "next/link"; 

type AudioPlayerProps = {
  bookId: string;
};

export default function AudioPlayer({ bookId }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { user } = useAuth(); // current Firebase user
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);

  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState<number>(1);

  // Effect 0: check subscription status
  useEffect(() => {
    const fetchStatus = async () => {
      if (user) {
        const refUser = doc(firestore, "users", user.uid);
        const snap = await getDoc(refUser);
        if (snap.exists()) {
          setSubscriptionStatus(snap.data().subscriptionStatus || null);
        }
      }
    };
    fetchStatus();
  }, [user]);

  // Effect 1: fetch audio file
  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const audioRefFirebase = ref(storage, `audio/${bookId}.mp3`);
        const url = await getDownloadURL(audioRefFirebase);
        setSrc(url);
      } catch (err) {
        console.error("Error fetching audio:", err);
      }
    };
    fetchAudio();
  }, [bookId]);

  // Effect 2: restore speed preference
  useEffect(() => {
    const savedSpeed = localStorage.getItem(`speed-${bookId}`);
    if (savedSpeed !== null) {
      const ss = Number(savedSpeed);
      if (Number.isFinite(ss) && ss > 0) {
        setTimeout(() => {
          setSpeed(ss);
          if (audioRef.current) {
            audioRef.current.playbackRate = ss;
          }
        }, 0);
      }
    }
  }, [bookId]);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play();
      setPlaying(true);
    }
  };

  const handleLoadedMetadata = () => {
    const el = audioRef.current;
    if (!el) return;
    setDuration(el.duration || 0);

    const saved = localStorage.getItem(`progress-${bookId}`);
    if (saved) {
      const t = Number(saved);
      if (Number.isFinite(t)) {
        el.currentTime = t;
        setProgress(t);
      }
    }

    el.playbackRate = speed;
  };

  const handleTimeUpdate = () => {
    const el = audioRef.current;
    if (!el) return;
    const current = el.currentTime;
    setProgress(current);
    localStorage.setItem(`progress-${bookId}`, current.toString());
  };

  const changeSpeed = (newSpeed: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.playbackRate = newSpeed;
    setSpeed(newSpeed);
    localStorage.setItem(`speed-${bookId}`, String(newSpeed));
  };

  const percent =
    duration > 0 ? Math.min(100, Math.max(0, (progress / duration) * 100)) : 0;

  // Subscription gating
  if (subscriptionStatus !== "active") {
    return (
      <div className="bg-neutral-900 p-6 rounded-lg text-center">
        <p className="text-neutral-400 mb-4">
          Premium playback requires a subscription.
        </p>
        <Link
          href="/sales"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
        >
          Subscribe Now
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 p-6 rounded-lg shadow flex flex-col items-center gap-y-4 w-full max-w-xl mx-auto">
      {src ? (
        <>
          <audio
            ref={audioRef}
            src={src}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            className="hidden"
          />
          <button
            onClick={togglePlay}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-500 transition font-semibold"
          >
            {playing ? "Pause" : "Play"}
          </button>

          {/* Progress Bar */}
          <div className="w-full bg-neutral-700 h-2 rounded overflow-hidden">
            <div
              className="bg-indigo-500 h-2"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="w-full flex justify-between text-xs text-neutral-400">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Speed Controls */}
          <div className="flex gap-2 mt-4">
            {[1, 1.25, 1.5, 2].map((s) => (
              <button
                key={s}
                onClick={() => changeSpeed(s)}
                className={`px-3 py-1 rounded text-sm ${
                  speed === s
                    ? "bg-indigo-600 text-white"
                    : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="text-neutral-400">Loading audio…</p>
      )}
    </div>
  );
}

function formatTime(sec: number) {
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  const m = Math.floor(sec / 60);
  return `${m}:${s}`;
}