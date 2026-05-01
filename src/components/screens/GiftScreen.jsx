"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

export default function GiftScreen({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = (e) => {
    if (!isOpen) {
      // 1. Get click coordinates for the pop effect
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      // 2. Define the same triangle shape we used for balloons
      const triangle = confetti.shapeFromPath({ path: 'M0 10 L5 0 L10 10 z' });

      // 3. Trigger the explosion
      confetti({
        particleCount: 80, // Slightly more for the "main" gift!
        spread: 100,
        origin: { x, y },
        shapes: [triangle],
        colors: ["#FF69B4", "#8A2BE2", "#FFB6C1", "#9370DB"],
        scalar: 1.8, // Slightly bigger triangles
        gravity: 0.4,
        ticks: 200
      });

      // 4. Set state to show the message/next part
      setIsOpen(true);
      
      // Optional: Auto-advance after a delay
      // setTimeout(() => onNext(), 3000);
    }
  };

  return (
    <div className="bg-[#fff8fc] p-7 rounded-[60px] shadow-2xl w-full max-w-md relative flex flex-col items-center min-h-[500px] my-10 border-4 border-pink-100 mx-auto">
      <h2 className="text-3xl font-bold text-purple-600 mt-6 mb-10 italic">
        One Last Thing...
      </h2>

      <div className="flex-1 flex flex-col items-center justify-center w-full relative">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="gift"
              initial={{ scale: 0.9 }}
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, -2, 2, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="cursor-pointer relative z-20"
              onClick={handleOpenGift}
            >
              {/* Using your gift image */}
              <img 
                src="/gif/gift.gif" // Based on your file list earlier
                alt="Gift Box"
                className="w-48 h-auto drop-shadow-2xl"
              />
              <p className="text-pink-400 mt-8 font-medium italic animate-pulse">
                Tap the gift
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="text-center"
            >
              {/* Replace this with whatever your final surprise is! */}
              <h3 className="text-2xl font-bold text-pink-600 mb-4">
                Surprise! 🎉
              </h3>
              <p className="text-gray-600 mb-8 px-4">
                I hope this made your day as special as you are!
              </p>
              
              <button 
                onClick={onNext}
                className="bg-pink-500 text-white px-10 py-3 rounded-full shadow-lg font-bold"
              >
                Start Over ❤️
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
