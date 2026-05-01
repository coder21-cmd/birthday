"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "../Button"

export default function PhotosScreen({ onNext }) {
  const [poppedCount, setPoppedCount] = useState(0);
  const [popped, setPopped] = useState([false, false, false, false]);

  // Updated message with emojis
  const message = ["You", "are", "my", "Favorite! ✨"];
  
  const positions = [
    { left: "20%", bottom: "50%" },
    { left: "40%", bottom: "65%" },
    { left: "60%", bottom: "65%" },
    { left: "80%", bottom: "50%" }
  ];

  const balloonColors = [
    "bg-gradient-to-br from-pink-300 to-pink-500", 
    "bg-gradient-to-br from-violet-300 to-violet-500", 
    "bg-gradient-to-br from-pink-300 to-pink-500", 
    "bg-gradient-to-br from-violet-300 to-violet-500"
  ];

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
      
      {/* Decorative Bunting */}
      <div className="absolute top-0 left-0 w-full h-16 pointer-events-none z-20 flex justify-around opacity-70">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] ${i % 2 === 0 ? "border-t-pink-300" : "border-t-violet-300"}`} />
        ))}
      </div>

      <div className="text-center mt-6">
        <h2 className="text-2xl font-bold text-pink-600">Pop all 4 balloons 🎈</h2>
      </div>

      {/* Interactive Area */}
      <div className="relative w-full h-80">
        {/* SVG for Threads/Strings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {positions.map((pos, i) => (
            !popped[i] && (
              <motion.path
                key={`string-${i}`}
                d={`M ${pos.left} ${100 - parseInt(pos.bottom)}% Q 50% 80%, 50% 100%`}
                stroke="#d1d5db"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
              />
            )
          ))}
        </svg>

        {message.map((word, i) => (
          <div 
            key={i} 
            className="absolute flex flex-col items-center"
            style={{ left: positions[i].left, bottom: positions[i].bottom, transform: 'translateX(-50%)' }}
          >
            <AnimatePresence mode="wait">
              {!popped[i] ? (
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => handlePop(i)}
                  className={`w-16 h-20 ${balloonColors[i]} rounded-t-full rounded-b-[45%] shadow-xl cursor-pointer relative`}
                >
                  {/* Balloon Reflection */}
                  <div className="w-3 h-5 bg-white/30 rounded-full absolute top-3 left-3 rotate-12" />
                  
                  {/* Balloon Knot (The little triangle at the bottom) */}
                  <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-2 ${balloonColors[i]} clip-path-knot`} style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="h-20 flex items-center justify-center text-center"
                >
                  <span className="text-xl font-bold text-pink-600 drop-shadow-sm">
                    {word}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Navigation Button */}
      <div className="h-14">
        {poppedCount === 4 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Button onClick={onNext} className="bg-pink-400 text-white px-8 rounded-full">
              Next →
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
