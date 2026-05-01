"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import Button from "../Button"

// Typewriter Component
const TypewriterText = ({ text }) => {
  const characters = Array.from(text);
  
  return (
    <motion.div className="text-4xl font-bold text-pink-500 italic leading-tight px-4">
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            // Slowed down the typing speed (0.15s per letter)
            duration: 0.2,
            delay: index * 0.15,
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
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      const triangle = confetti.shapeFromPath({ path: 'M0 10 L5 0 L10 10 z' });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x, y },
        shapes: [triangle],
        colors: ["#FF69B4", "#8A2BE2", "#FFB6C1", "#9370DB"],
        scalar: 1.5, // Bigger pop triangles
        gravity: 0.6
      });

      const newPopped = [...popped];
      newPopped[index] = true;
      setPopped(newPopped);
      setPoppedCount(prev => prev + 1);
    }
  };

  return (
    <div className="bg-[#fff8fc] p-7 rounded-[60px] shadow-2xl w-full max-w-md relative flex flex-col items-center min-h-[650px] my-10 overflow-hidden border-4 border-pink-100">
      
      <div className="text-center mt-4 z-30">
        <h2 className="text-2xl font-bold text-pink-600">
          {poppedCount < 4 ? "Pop all 4 balloons 🎈" : ""}
        </h2>
      </div>

      <div className="absolute inset-0 w-full h-full pt-20">
        {/* REVEALED MESSAGE AREA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <AnimatePresence>
            {poppedCount === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full flex flex-col items-center"
              >
                <TypewriterText text={fullMessage} />
                
                {/* Continue Button - Absolute Centered Bottom of Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.5 }} // Shows after typing finishes
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full flex justify-center"
                >
                  <Button onClick={onNext} className="bg-pink-500 text-white px-14 py-4 rounded-full shadow-2xl hover:bg-pink-600 scale-110 transition-all">
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
                // MASSIVE SIZE & SUPER SLOW MOVEMENT
                initial={{ y: "110%", x: `${10 + i * 22}%` }}
                animate={{ 
                  y: "-40vh", // Float way past the top
                  x: [`${10 + i * 22}%`, `${20 + i * 22}%`, `${10 + i * 22}%`] 
                }}
                transition={{ 
                  // Duration increased to 25s - 35s for a very slow crawl
                  y: { duration: 25 + i * 4, repeat: Infinity, ease: "linear", delay: i * 3 },
                  x: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute z-20 cursor-pointer"
                onClick={(e) => handlePop(i, e)}
              >
                <div className="relative group">
                  <img 
                    src={`/images/balloon${i + 1}.png`} 
                    alt="balloon" 
                    // Set width to a fixed 140px for "Big" balloons
                    style={{ width: '140px', height: 'auto' }}
                    className="drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Long Thread */}
                  <div className="absolute top-[90%] left-1/2 w-[2px] h-60 bg-gray-400/30 -translate-x-1/2 -z-10" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
}
