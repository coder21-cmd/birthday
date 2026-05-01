"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

export default function GiftScreen({ onNext }) {
  const [isPopped, setIsPopped] = useState(false);

  const handleGiftTap = (e) => {
    if (!isPopped) {
      setIsPopped(true);

      // 1. Get click coordinates for the pop effect
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      // 2. Define the triangle shape
      const triangle = confetti.shapeFromPath({ path: 'M0 10 L5 0 L10 10 z' });

      // 3. Trigger the explosion
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x, y },
        shapes: [triangle],
        colors: ["#FF69B4", "#8A2BE2", "#FFB6C1", "#9370DB"],
        scalar: 2,
        gravity: 0.4,
        ticks: 200
      });

      // 4. Wait for the pop to look good, then auto-switch to Playlist
      setTimeout(() => {
        onNext();
      }, 600); // 0.6 seconds is the "sweet spot" for a seamless jump
    }
  };

  return (
    <div className="bg-[#fff8fc] p-7 rounded-[60px] shadow-2xl w-full max-w-md relative flex flex-col items-center min-h-[550px] my-10 border-4 border-pink-100 mx-auto overflow-hidden">
      <h2 className="text-3xl font-bold text-purple-600 mt-6 mb-10 italic">
        One Last Thing...
      </h2>

      <div className="flex-1 flex flex-col items-center justify-center w-full relative">
        <AnimatePresence>
          {!isPopped && (
            <motion.div
              key="gift-box"
              initial={{ scale: 0.9, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }} // Gift grows and fades as it "pops"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, -2, 2, 0]
              }}
              transition={{ 
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                exit: { duration: 0.3 }
              }}
              className="cursor-pointer relative z-20 flex flex-col items-center"
              onClick={handleGiftTap}
            >
              <img 
                src="/gifs/gift.gif" 
                alt="Gift Box"
                className="w-56 h-auto drop-shadow-2xl"
              />
              <p className="text-pink-400 mt-8 font-medium italic animate-bounce">
                Tap the gift 🎁
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
