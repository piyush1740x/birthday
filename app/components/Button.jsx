"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CountdownPage() {
  const targetTime = new Date("2025-02-22T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetTime - new Date().getTime());
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const tickSound = new Audio("/sounds/tiktik.mp3");
    const backgroundMusic = new Audio("/sounds/background-music.mp3");
    backgroundMusic.loop = true;
    setAudio(backgroundMusic);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;
      setTimeLeft(difference > 0 ? difference : 0);

      if (difference > 0) {
        tickSound.currentTime = 0;
        tickSound.play();
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const toggleMusic = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4 relative">
      <h1 className="text-3xl font-bold text-gray-800">Your Surprise Unlocks on 22nd Feb 🎉</h1>
      {timeLeft > 0 ? (
        <p className="text-2xl font-semibold mt-4 bg-white p-4 rounded-lg shadow-md">
          {formatTime(timeLeft)}
        </p>
      ) : (
        <button
          onClick={() => router.push("/first")}
          className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg text-lg hover:bg-pink-600"
        >
          See Your Surprise Babe 💖
        </button>
      )}
      
      {/* Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className="absolute bottom-10 px-4 py-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
      >
        {isPlaying ? "Pause Music 🎵" : "Play Music 🎶"}
      </button>
    </div>
  );
}
