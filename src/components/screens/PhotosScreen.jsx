"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "../Button"

export default function PhotosScreen({ onNext }) {
  const [poppedCount, setPoppedCount] = useState(0);
  const [popped, setPopped] = useState([false, false, false, false]);

  const message = ["You", "are", "so", "Amazing ❤️✨"];
  
  const positions = [
    { left: "20%", top: "15%" },
    { left: "40%", top: "10%" },
    { left: "60%", top: "10%" },
    { left: "80%", top: "15%" }
  ];

  const balloonColors = [
    "from-pink-400 to-pink-600", 
    "from-violet-400 to-violet-600", 
    "from-pink-400 to-pink-600", 
    "from-violet-400 to-violet-600"
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
    <div className="bg-[#fff8fc] p-7 rounded-[60px] shadow-2xl w-full max-w-md relative flex flex-col items-center min-h-[550px] my-10 overflow-hidden">
      
      <div className="text-center mt-4 z-30">
        <h2 className="text-2xl font-bold text-pink-600">Pop all 4 balloons 🎈</h2>
      </div>

      {/* Interactive Area */}
      <div className="absolute inset-0 w-full h-full pt-24">
        
        {/* THE THREADS (STRINGS) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {positions.map((pos, i) => (
            !popped[i] && (
              <motion.path
                key={`string-${i}`}
                // This draws a wavy line from the balloon knot to a center point at the bottom
                d={`M ${pos.left} ${pos.top} 
                   C ${pos.left} 60%, 50% 70%, 50% 90%`}
                stroke="#d1d5db"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
              />
            )
          ))}
        </svg>

        {message.map((word, i) => (
          <div 
            key={i} 
            className="absolute z-20 transition-all duration-500"
            style={{ left: positions[i].left, top: positions[i].top, transform: 'translateX(-50%)' }}
          >
            <AnimatePresence mode="wait">
              {!popped[i] ? (
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  onClick={() => handlePop(i)}
                  className="relative cursor-pointer"
                >
                  {/* REAL BALLOON SHAPE: Teardrop style */}
                  <div className={`w-16 h-20 bg-gradient-to-br ${balloonColors[i]} rounded-t-full rounded-b-[60%_80%] shadow-lg relative`}>
                    
                    {/* Shiny Reflection */}
                    <div className="w-4 h-6 bg-white/40 rounded-full absolute top-3 left-3 rotate-[25deg]" />
                    
                    {/* The Knot (The tied part) */}
                    <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-2 bg-inherit rounded-full`} />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="h-20 flex items-center justify-center text-center px-2"
                >
                  <span className="text-xl font-bold text-pink-500 italic drop-shadow-sm whitespace-nowrap">
                    {word}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="mt-auto mb-6 z-30 h-14">
        {poppedCount === 4 && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
            <Button onClick={onNext} className="bg-pink-500 text-white px-10 py-3 rounded-full shadow-xl hover:bg-pink-600 transition-all">
              Continue →
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
