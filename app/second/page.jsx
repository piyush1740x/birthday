"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Confetti from "react-confetti";

export default function SecondPage() {
  const [step, setStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const backgroundMusic = new Audio("/sounds/birthday.mp3");
    backgroundMusic.loop = true;
    backgroundMusic.play();
    return () => backgroundMusic.pause();
  }, []);

  const playSound = (sound) => {
    new Audio(sound).play();
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center overflow-hidden relative p-4">
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} gravity={0.2} />}
      
      <motion.div
        className="h-[40vh] w-full max-w-md rounded-2xl shadow-lg relative overflow-hidden flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-cover bg-center blur-md" style={{ backgroundImage: "url('/payal/she10.jpeg')" }}></div>
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl"></div>
        <motion.div className="relative text-center text-white p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
          <h1 className="text-3xl font-bold font-serif tracking-wide drop-shadow-lg animate-pulse">🎂 Happy Birthday, My Love ❤️</h1>
          <p className="text-lg mt-2 opacity-90 italic">You make my world brighter! ✨</p>
        </motion.div>
      </motion.div>

      <motion.div className="h-[10vh] w-full max-w-md bg-white rounded-2xl shadow-lg flex justify-around items-center p-2 mt-4">
        {[{ icon: "🕯️", sound: "/sounds/POP.mp3" }, { icon: "🔥", sound: "/sounds/fire.mp3" }, { icon: "😗💨", sound: "/sounds/blow.wav" }, { icon: "🔪", sound: "/sounds/cheering.mp3" }].map((btn, index) => (
          <motion.button
            key={index}
            onClick={() => { 
              setStep(index + 1); 
              playSound(btn.sound);
              if (index === 3) setShowConfetti(true);
            }}
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.2 }}
            className="animate-bounce text-2xl"
          >
            {btn.icon}
          </motion.button>
        ))}
      </motion.div>

      <motion.div className="h-[30vh] w-full max-w-md bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center p-4 mt-4">
        <div className="flex flex-col items-center">
          {step >= 1 && (
            <div className="relative animate-pulse">
              <div className="w-2 h-8 bg-yellow-500 rounded-t-md mx-auto"></div>
              {step >= 2 && step < 3 && (
                <div className="w-4 h-4 bg-orange-400 rounded-full absolute -top-4 left-1/2 transform -translate-x-1/2 animate-ping"></div>
              )}
            </div>
          )}
          <div className="relative mt-2 ">
            {step < 4 && (
              <div className="flex items-center justify-center flex-col" >
                <div className="w-40 h-8 bg-pink-500 rounded-t-lg relative animate-bounce"></div>
                <div className="w-48 h-8 bg-pink-600 rounded-t-lg mt-1 relative animate-bounce delay-200"></div>
                <div className="w-56 h-8 bg-pink-700 rounded-t-lg mt-1 relative animate-bounce delay-400"></div>
              </div>
            )}
          </div>
          <div className="w-64 h-4 bg-gray-300 rounded-full mt-2"></div>
        </div>
      </motion.div>

      {step === 4 && (
        <motion.div className="h-[10vh] w-full max-w-md bg-white rounded-2xl shadow-lg flex items-center justify-center mt-4">
          <Link href="/gift">
            <motion.button
              className="px-6 py-2 bg-pink-500 text-white text-xl font-extrabold rounded-lg shadow-md hover:bg-pink-600 transition font-serif"
              onClick={() => playSound('/sounds/click.mp3')}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              Your Gift 🎁
            </motion.button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
