"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "../Button"

export default function PhotosScreen({ onNext }) {
  const [poppedCount, setPoppedCount] = useState(0);
  const [popped, setPopped] = useState([false, false, false, false]);

  const message = ["You", "are", "a", "Cutiee"];
  const balloonColors = ["bg-pink-300", "bg-violet-300", "bg-yellow-200", "bg-blue-200"];

  const handlePop = (index) => {
    if (!popped[index]) {
      const newPopped = [...popped];
      newPopped[index] = true;
      setPopped(newPopped);
      setPoppedCount(prev => prev + 1);
    }
  };

  return (
    <div className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4 my-10 overflow-hidden">
      
      {/* Decorative Bunting at the top */}
      <div className="absolute top-0 left-0 w-full h-16 pointer-events-none z-20 flex justify-around opacity-70">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className={`w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] ${
              i % 2 === 0 ? "border-t-pink-300" : "border-t-violet-300"
            }`}
          />
        ))}
      </div>

      <div className="text-center mt-6">
        <h2 className="text-2xl font-bold text-accent">Pop the balloons!</h2>
        <p className="text-sm text-accent/70 mt-1 italic">There's a secret message inside...</p>
      </div>

      {/* Balloon Area */}
      <div className="relative w-full h-80 flex items-center justify-center">
        {/* The Strings (meeting at the bottom) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {message.map((_, i) => (
            <path
              key={i}
              d={`M ${50 + (i - 1.5) * 25}% 120 L 50% 280`} // Curved strings from balloons to bottom center
              stroke="#d1d5db"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4"
            />
          ))}
        </svg>

        <div className="flex justify-between w-full px-4 relative z-10">
          {message.map((word, i) => (
            <div key={i} className="flex flex-col items-center">
              <AnimatePresence mode="wait">
                {!popped[i] ? (
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => handlePop(i)}
                    className={`w-14 h-18 md:w-16 md:h-20 ${balloonColors[i]} rounded-t-full rounded-b-[50%] shadow-lg cursor-pointer flex items-center justify-center`}
                  >
                     <div className="w-2 h-2 bg-white/30 rounded-full absolute top-4 left-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="h-20 flex items-center justify-center"
                  >
                    <span className="text-xl font-bold text-accent drop-shadow-sm">
                      {word}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Next Button - only appears when all 4 are popped */}
      <div className="h-14">
        {poppedCount === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button onClick={onNext} className="bg-pink-200 text-accent">
              Next →
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
