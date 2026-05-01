"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import Button from "../Button"

export default function PhotosScreen({ onNext }) {
  const [poppedCount, setPoppedCount] = useState(0);
  const [popped, setPopped] = useState([false, false, false, false]);

  const message = ["You", "are", "so", "Amazing ❤️✨"];
  
  const handlePop = (index, e) => {
    if (!popped[index]) {
      // 1. Trigger the triangle confetti at the click location
      const rect = e.target.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      const triangle = confetti.shapeFromPath({ path: 'M0 10 L5 0 L10 10 z' });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x, y },
        shapes: [triangle],
        colors: ["#FF69B4", "#8A2BE2", "#FFB6C1", "#9370DB"], // Matching your pink/purple theme
        scalar: 1.2,
        gravity: 0.8
      });

      // 2. Update state
      const newPopped = [...popped];
      newPopped[index] = true;
      setPopped(newPopped);
      setPoppedCount(prev => prev + 1);
    }
  };

  return (
    <div className="bg-[#fff8fc] p-7 rounded-[60px] shadow-2xl w-full max-w-md relative flex flex-col items-center min-h-[550px] my-10 overflow-hidden border-4 border-pink-100">
      
      <div className="text-center mt-4 z-30">
        <h2 className="text-2xl font-bold text-pink-600">
          {poppedCount < 4 ? "Pop all 4 balloons 🎈" : "A message for you..."}
        </h2>
      </div>

      <div className="absolute inset-0 w-full h-full pt-20">
        {/* REVEALED MESSAGE AREA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
          <AnimatePresence>
            {poppedCount === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <p className="text-3xl font-bold text-pink-500 italic leading-tight">
                  {message.join(" ")}
                </p>
                <motion.div initial={{ y: 20 }} animate={{ y: 0 }}>
                  <Button onClick={onNext} className="bg-pink-500 text-white px-10 py-3 rounded-full shadow-lg">
                    Continue →
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* FLYING BALLOONS USING YOUR IMAGES */}
        {[0, 1, 2, 3].map((i) => (
          <AnimatePresence key={i}>
            {!popped[i] && (
              <motion.div
                initial={{ y: "100vh", x: `${15 + i * 20}%` }}
                animate={{ 
                  y: "-20vh",
                  x: [`${15 + i * 20}%`, `${20 + i * 20}%`, `${15 + i * 20}%`] 
                }}
                transition={{ 
                  y: { duration: 10 + i * 2, repeat: Infinity, ease: "linear", delay: i * 1 },
                  x: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute z-20 cursor-pointer group"
                onClick={(e) => handlePop(i, e)}
              >
                <div className="relative">
                  {/* YOUR IMAGE FILE */}
                  <img 
                    src={`/images/balloon${i + 1}.png`} 
                    alt="balloon" 
                    className="w-20 h-auto drop-shadow-md group-hover:scale-110 transition-transform"
                  />
                  
                  {/* REAL THREAD/STRING */}
                  <div className="absolute top-[90%] left-1/2 w-[1.5px] h-32 bg-gray-300/60 -translate-x-1/2 -z-10" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
}
