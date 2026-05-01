"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "../Button"

export default function PhotosScreen({ onNext }) {
  const [poppedCount, setPoppedCount] = useState(0);
  const [popped, setPopped] = useState([false, false, false, false]);

  const message = ["You", "are", "a", "Cutiee"];
  
  // Adjusted positions to match the "fan" look in your image
  const positions = [
    { left: "15%", bottom: "55%" },
    { left: "35%", bottom: "65%" },
    { left: "65%", bottom: "65%" },
    { left: "85%", bottom: "55%" }
  ];

  const balloonColors = [
    "bg-gradient-to-br from-pink-200 to-pink-400", 
    "bg-gradient-to-br from-violet-200 to-violet-400", 
    "bg-gradient-to-br from-pink-200 to-pink-400", 
    "bg-gradient-to-br from-violet-200 to-violet-400"
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
        <h2 className="text-2xl font-bold text-accent">Pop all 4 balloons</h2>
      </div>

      {/* Interactive Area */}
      <div className="relative w-full h-80">
        {/* SVG for curved strings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {positions.map((pos, i) => (
            <motion.path
              key={i}
              // This creates the curve from the balloon position to the bottom center
              d={`M ${pos.left} ${100 - parseInt(pos.bottom)}% Q 50% 80%, 50% 100%`}
              stroke="#94a3b8"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
            />
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
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePop(i)}
                  className={`w-16 h-20 ${balloonColors[i]} rounded-t-full rounded-b-[50%] shadow-xl cursor-pointer relative`}
                >
                  {/* Highlight on balloon */}
                  <div className="w-3 h-4 bg-white/40 rounded-full absolute top-3 left-3 rotate-12" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="h-20 flex items-center justify-center"
                >
                  <span className="text-xl font-bold text-accent">
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
            <Button onClick={onNext} className="bg-pink-200 text-accent px-8">
              Next →
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
