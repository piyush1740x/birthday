"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const imageCount = 25;
const images = Array.from(
  { length: imageCount },
  (_, i) => `/payal/she${i + 1}.jpeg`
);
const audioSrc = "/sounds/first.mp3";

export default function Page() {
  const [currentImage, setCurrentImage] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % imageCount);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const audioElement = new Audio(audioSrc);
    audioElement.loop = true;

    const playAudio = () => {
      audioElement.play().catch((err) => console.warn("Playback error:", err));
    };

    playAudio();
    document.addEventListener("click", playAudio, { once: true });

    return () => {
      document.removeEventListener("click", playAudio);
      audioElement.pause();
      audioElement.currentTime = 0;
    };
  }, []);

  return (
    <div className="min-h-scree bg-gradient-to-b from-pink-200 to-pink-500 flex flex-col items-center justify-center p-4 text-center">
      <motion.h1
        className="text-5xl font-extrabold text-white drop-shadow-lg mb-6 font-serif"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        Happy Birthday My Love! ❤️
      </motion.h1>

      <motion.div className="w-full  max-w-md bg-white rounded-3xl shadow-2xl p-6 flex flex-col items-center relative overflow-hidden">
        <div className="absolute  inset-0 bg-gradient-to-t from-pink-100 to-transparent opacity-50 rounded-3xl"></div>
        <span className="text-3xl font-extrabold text-pink-600 z-10">
          Happy
        </span>
        <div className="w-32 h-32 relative rounded-full overflow-hidden mt-3 border-4 border-pink-500 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ y: "100%", opacity: 0.8 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentImage]}
                alt="Payal"
                layout="fill"
                objectFit="cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <span className="text-3xl font-extrabold text-pink-600 z-10">
          Birthday
        </span>
        <span className="mt-3 text-2xl font-bold text-pink-700 font-serif bg-white px-4 py-2 rounded-full shadow-lg border border-pink-300 z-10">
          Payal ✨
        </span>
      </motion.div>
      <motion.div
        className="mt-6 w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="text-xl animate-pulse font-extrabold text-pink-600 font-serif">
          A Special Wish Just for You! My Love 🥰
        </p>
        <p className="text-md text-gray-500 mt-2">
          On this beautiful day, I just want to remind you how precious you are
          to me. Every smile of yours brightens my world, and every laugh of
          yours makes my heart dance. You are my love, my peace, my everything.
          May your year be filled with happiness, surprises, and all the love
          you deserve.
        </p>
        <p className="text-pink-700 font-extrabold mt-4">
          Happy Birthday, My Love! 💖
        </p>
      </motion.div>
      <motion.p
        className="text-lg text-white mt-6 px-6 font-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        You're the best thing that ever happened to me. I love you more than
        words can express. 💖
      </motion.p>

      <motion.div className="mt-6 w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 text-center">
        <p className="text-xl font-extrabold text-pink-600 font-serif">
          Our Journey Together ❤️
        </p>
        <p className="text-md text-gray-500 mt-2">
          4 years of love, countless fights, breakups, patch-ups, laughter, and
          unbreakable bonds. No matter what, we always found our way back to
          each other. You are my forever! 💖
        </p>
      </motion.div>

      {showButton && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/second">
            <motion.button
              className="px-6 py-3 bg-white text-pink-600 text-xl font-extrabold rounded-lg shadow-lg hover:bg-pink-100 transition-all font-serif border-2 border-pink-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Let's Cut The Cake Babe 😘
            </motion.button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
