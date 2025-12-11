"use client";

import { useEffect, useRef, useState } from "react";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";

type AudioPlayerProps = {
  audioUrl: string;
  bookId: string;
};

export default function AudioPlayer({ audioUrl, bookId }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [bookId]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="auto"
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      <button
        onClick={togglePlay}
        className="player-controls bg-neutral-800 hover:bg-neutral-700 text-white rounded-full p-3 transition flex items-center justify-center"
      >
        {isPlaying ? (
          <PauseIcon className="h-5 w-5 flex-shrink-0 text-red-400" />
        ) : (
          <PlayIcon className="h-5 w-5 flex-shrink-0 text-green-400" />
        )}
      </button>
    </div>
  );
}