"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import Button from "../Button"

// Typewriter Component for the final message
const TypewriterText = ({ text }) => {
  const characters = Array.from(text);
  
  return (
    <motion.div className="text-3xl font-bold text-pink-500 italic leading-tight">
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: index * 0.1,
            ease: "easeIn"
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function PhotosScreen({ onNext }) {
  const [poppedCount, setPoppedCount] = useState(0);
  const [popped, setPopped] = useState([false, false, false, false]);

  const fullMessage = "You are so Amazing ❤️✨";
  
  const handlePop = (index, e) => {
    if (!popped[index]) {
      const rect = e.target.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      const triangle = confetti.shapeFromPath({ path: 'M0 10 L5 0 L10 10 z' });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x, y },
        shapes: [triangle],
        colors: ["#FF69B4", "#8A2BE2", "#FFB6C1", "#9370DB"],
        scalar: 1.2,
        gravity: 0.8
      });

      const newPopped = [...popped];
      newPopped[index] = true;
      setPopped(newPopped);
      setPoppedCount(prev => prev + 1);
    }
  };

  return (
    <div className="bg-[#fff8fc] p-7 rounded-[60px] shadow-2xl w-full max-w-md relative flex flex-col items-center min-h-[600px] my-10 overflow-hidden border-4 border-pink-100">
      
      <div className="text-center mt-4 z-30">
        <h2 className="text-2xl font-bold text-pink-600">
          {poppedCount < 4 ? "Pop all 4 balloons 🎈" : "Tap to continue"}
        </h2>
      </div>

      <div className="absolute inset-0 w-full h-full pt-20">
        {/* REVEALED MESSAGE AREA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
          <AnimatePresence>
            {poppedCount === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
              >
                <TypewriterText text={fullMessage} />
                
                {/* Continue Button - Centered Bottom */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5 }} // Shows up after typing is mostly done
                  className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50"
                >
                  <Button onClick={onNext} className="bg-pink-500 text-white px-12 py-4 rounded-full shadow-2xl hover:bg-pink-600 hover:scale-105 transition-all">
                    Continue →
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* FLYING BALLOONS */}
        {[0, 1, 2, 3].map((i) => (
          <AnimatePresence key={i}>
            {!popped[i] && (
              <motion.div
                // Bigger balloons (w-28) and slower duration (15s+)
                initial={{ y: "100vh", x: `${10 + i * 22}%` }}
                animate={{ 
                  y: "-30vh",
                  x: [`${10 + i * 22}%`, `${15 + i * 22}%`, `${10 + i * 22}%`] 
                }}
                transition={{ 
                  y: { duration: 16 + i * 3, repeat: Infinity, ease: "linear", delay: i * 2 },
                  x: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute z-20 cursor-pointer group"
                onClick={(e) => handlePop(i, e)}
              >
                <div className="relative">
                  <img 
                    src={`/images/balloon${i + 1}.png`} 
                    alt="balloon" 
                    // Increased width from 80px to 110px (w-28)
                    className="w-28 h-auto drop-shadow-xl group-hover:scale-110 transition-transform active:scale-90"
                  />
                  <div className="absolute top-[95%] left-1/2 w-[1.5px] h-40 bg-gray-300/40 -translate-x-1/2 -z-10" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
}
