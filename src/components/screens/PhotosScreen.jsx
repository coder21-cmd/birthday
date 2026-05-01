"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "../Button"

export default function PhotosScreen({ onNext }) {
  const [poppedCount, setPoppedCount] = useState(0);
  const [popped, setPopped] = useState([false, false, false, false]);

  const message = ["You", "are", "so", "Amazing ❤️✨"];
  
  const positions = [
    { left: "20%", bottom: "55%" },
    { left: "40%", bottom: "68%" },
    { left: "60%", bottom: "68%" },
    { left: "80%", bottom: "55%" }
  ];

  const balloonColors = [
    "from-pink-300 to-pink-500", 
    "from-violet-300 to-violet-500", 
    "from-pink-300 to-pink-500", 
    "from-violet-300 to-violet-500"
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
    <div className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4 my-10 overflow-hidden min-h-[500px]">
      
      {/* Decorative Bunting */}
      <div className="absolute top-0 left-0 w-full h-16 pointer-events-none z-20 flex justify-around opacity-70">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] ${i % 2 === 0 ? "border-t-pink-300" : "border-t-violet-300"}`} />
        ))}
      </div>

      <div className="text-center mt-6 z-30">
        <h2 className="text-2xl font-bold text-pink-600">Pop all 4 balloons 🎈</h2>
      </div>

      {/* Interactive Area */}
      <div className="absolute inset-0 w-full h-full">
        {/* SVG for Threads/Strings - They now start from the knot and go to bottom center */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {positions.map((pos, i) => (
            !popped[i] && (
              <motion.path
                key={`string-${i}`}
                // This draws a line from the balloon bottom to a cluster point at the bottom
                d={`M ${pos.left} ${100 - parseInt(pos.bottom) + 5}% C ${pos.left} 90%, 50% 95%, 50% 105%`}
                stroke="#d1d5db"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )
          ))}
        </svg>

        {message.map((word, i) => (
          <div 
            key={i} 
            className="absolute flex flex-col items-center z-20"
            style={{ left: positions[i].left, bottom: positions[i].bottom, transform: 'translateX(-50%)' }}
          >
            <AnimatePresence mode="wait">
              {!popped[i] ? (
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  onClick={() => handlePop(i)}
                  className="relative cursor-pointer group"
                >
                  {/* The Balloon Body - Tapered bottom for realistic shape */}
                  <div className={`w-16 h-20 bg-gradient-to-br ${balloonColors[i]} rounded-t-[50%] rounded-b-[40%] shadow-xl relative`}>
                    {/* Glossy Highlight */}
                    <div className="w-4 h-6 bg-white/30 rounded-full absolute top-3 left-3 rotate-[25deg]" />
                    
                    {/* The Knot (The tied part at the bottom) */}
                    <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-inherit rotate-45 rounded-sm shadow-sm`} />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="h-20 flex items-center justify-center text-center px-2"
                >
                  <span className="text-xl font-bold text-pink-500 drop-shadow-sm italic">
                    {word}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Navigation Button */}
      <div className="mt-auto mb-4 z-30 h-14">
        {poppedCount === 4 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Button onClick={onNext} className="bg-pink-400 text-white px-8 rounded-full shadow-lg hover:bg-pink-500 transition-colors">
              Continue →
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
