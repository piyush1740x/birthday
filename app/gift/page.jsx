"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";

const images = Array.from({ length: 25 }, (_, i) => `/payal/she${i + 1}.jpeg`);
const loveMessages = [
  "You are my sunshine ☀️",
  "I love you more than words can say ❤️",
  "Every moment with you is a gift 🎁",
  "You're my dream come true 💕",
  "Forever & always, my love 😘",
  "You're the best thing that ever happened to me 💖",
  "My heart belongs to you 💞",
  "You make my world brighter 🌎✨",
];

export default function GiftPage() {
  const getRandomIndex = () => Math.floor(Math.random() * images.length);

  const [currentImage, setCurrentImage] = useState(getRandomIndex());
  const [message, setMessage] = useState(loveMessages[Math.floor(Math.random() * loveMessages.length)]);
  const [bottomImages, setBottomImages] = useState([getRandomIndex(), getRandomIndex(), getRandomIndex()]);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const audio = new Audio("/sounds/imagesong.mp3");
    setTimeout(() => audio.play().catch(() => {}), 500);
    audio.loop = true;
    return () => audio.pause();
  }, []);

  const playSwipeSound = () => {
    new Audio("/sounds/swipe.wav").play();
  };

  const handleSwipe = () => {
    playSwipeSound();
    setCurrentImage(getRandomIndex());
    setMessage(loveMessages[Math.floor(Math.random() * loveMessages.length)]);
    setBottomImages([getRandomIndex(), getRandomIndex(), getRandomIndex()]);


    setHearts((prev) => [...prev, { id: Date.now(), x: Math.random() * 100 }]);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipe,
    onSwipedRight: handleSwipe,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-pink-400 flex flex-col items-center justify-start p-4 pt-6 overflow-hidden relative" {...handlers}>
      
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -200 }}
          transition={{ duration: 2 }}
          className="absolute text-red-500 text-3xl"
          style={{ left: `${heart.x}%`, top: "80%" }}
        >
          ❤️
        </motion.div>
      ))}

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold text-pink-700 text-center mb-2 mt-2 drop-shadow-lg"
      >
        ✨ For My Love, Payal ❤️ ✨
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-md text-gray-800 text-center italic mb-4"
      >
        "Every heartbeat of mine whispers your name. You are my forever and always!"
      </motion.p>

      <motion.div
        key={currentImage}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="w-80 h-[28rem] bg-white rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden relative border-4 border-pink-300"
      >
        <Image src={images[currentImage]} alt="Payal" layout="fill" objectFit="cover" className="rounded-2xl transition-all duration-500 hover:scale-105" />

        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-white/10 rounded-2xl"
        />

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-4 w-full bg-black/40 text-white text-center py-2 px-4 rounded-b-2xl backdrop-blur-md"
        >
          <p className="text-lg font-semibold">{message}</p>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-20 flex space-x-4">
        {bottomImages.map((index, i) => (
          <motion.div
            key={i}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
            className="w-16 h-16 bg-pink-300 rounded-lg shadow-lg overflow-hidden relative border-2 border-pink-500"
          >
            <Image src={images[index]} alt={`Thumbnail ${i}`} layout="fill" objectFit="cover" className="rounded-lg" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
