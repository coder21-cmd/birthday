"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import Button from "../Button"

// Typewriter Component
const TypewriterText = ({ text }) => {
  const characters = Array.from(text);
  
  return (
    <div className="text-4xl font-bold text-pink-500 italic leading-tight px-6 min-h-[80px]">
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: index * 0.15, // Noticeable typewriter speed
            ease: "easeIn"
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export default function PhotosScreen({ onNext }) {
  const [poppedCount, setPoppedCount] = useState(0);
  const [popped, setPopped] = useState([false, false, false, false]);

  const fullMessage = "You are so Amazing ❤️✨";
  
  // Specific positions as requested: Left, Left-Center, Right-Center, Right
  const horizontalPositions = ["10%", "35%", "65%", "90%"];

  const handlePop = (index, e) => {
    if (!popped[index]) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      const triangle = confetti.shapeFromPath({ path: 'M0 10 L5 0 L10 10 z' });

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { x, y },
        shapes: [triangle],
        colors: ["#FF69B4", "#8A2BE2", "#FFB6C1", "#9370DB"],
        scalar: 1.6, 
        gravity: 0.5
      });

      const newPopped = [...popped];
      newPopped[index] = true;
      setPopped(newPopped);
      setPoppedCount(prev => prev + 1);
    }
  };

  return (
    <div className="bg-[#fff8fc] p-7 rounded-[60px] shadow-2xl w-full max-w-md relative flex flex-col items-center min-h-[650px] my-10 overflow-hidden border-4 border-pink-100">
      
      {/* Task Header */}
      <div className="text-center mt-4 z-30 h-10">
        <AnimatePresence>
          {poppedCount < 4 && (
            <motion.h2 
              exit={{ opacity: 0 }}
              className="text-2xl font-bold text-pink-600"
            >
              Pop all 4 balloons 🎈
            </motion.h2>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 w-full h-full">
        {/* REVEALED MESSAGE AREA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
          <AnimatePresence>
            {poppedCount === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full flex flex-col items-center"
              >
                <TypewriterText text={fullMessage} />
                
                {/* Continue Button - Centered at the bottom of the card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.8 }} 
                  className="absolute bottom-12 left-0 right-0 flex justify-center"
                >
                  <Button onClick={onNext} className="bg-pink-500 text-white px-14 py-4 rounded-full shadow-2xl hover:bg-pink-600 transform scale-110">
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
                // Positioning logic: Left, center-left, center-right, right
                initial={{ y: "110%", x: horizontalPositions[i] }}
                animate={{ 
                  y: "-50vh", 
                  x: [horizontalPositions[i], `${parseInt(horizontalPositions[i]) + 5}%`, horizontalPositions[i]] 
                }}
                transition={{ 
                  y: { duration: 28 + i * 5, repeat: Infinity, ease: "linear", delay: i * 2 },
                  x: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute z-20 cursor-pointer"
                style={{ translateX: "-50%" }}
                onClick={(e) => handlePop(i, e)}
              >
                <div className="relative group">
                  <img 
                    src={`/images/balloon${i + 1}.png`} 
                    alt="balloon" 
                    style={{ width: '150px', height: 'auto' }} // BIGGER size
                    className="drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Extra long thread */}
                  <div className="absolute top-[90%] left-1/2 w-[2px] h-80 bg-gray-400/20 -translate-x-1/2 -z-10" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
}
