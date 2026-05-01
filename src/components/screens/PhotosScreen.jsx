"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import Button from "../Button"

const TypewriterText = ({ text }) => {
  // Split the sentence into words first
  const words = text.split(" ");
  let globalCharIndex = 0; // Keeps the typing delay continuous across words

  return (
    <div className="text-[34px] md:text-4xl font-bold text-pink-500 italic leading-tight px-2 min-h-[100px] text-center">
      {words.map((word, wordIndex) => (
        // 'inline-block' is the magic fix! It forces the whole word to stay on one line.
        <span key={wordIndex} className="inline-block mr-2 md:mr-3">
          {Array.from(word).map((char, charIndex) => {
            const delay = globalCharIndex * 0.1;
            globalCharIndex++;
            return (
              <motion.span
                key={charIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: delay, ease: "easeIn" }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </div>
  );
};

export default function PhotosScreen({ onNext }) {
  const [poppedCount, setPoppedCount] = useState(0);
  const [popped, setPopped] = useState([false, false, false, false]);

  const fullMessage = "You are so Amazing ❤️✨";
  
  // THE FIX: These act as CSS "left" properties to spread them across the screen
  const horizontalPositions = ["15%", "38%", "62%", "85%"];
  
  // Different starting heights so they are vertically spread out
  const verticalStarts = ["110vh", "135vh", "120vh", "150vh"];

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
    <div className="bg-[#fff8fc] p-7 rounded-[60px] shadow-2xl w-full max-w-md relative flex flex-col items-center min-h-[650px] my-10 overflow-hidden border-4 border-pink-100 mx-auto">
      
      <div className="text-center mt-4 z-30 h-10">
        <AnimatePresence>
          {poppedCount < 4 && (
            <motion.h2 exit={{ opacity: 0 }} className="text-2xl font-bold text-pink-600">
              Pop all 4 balloons 🎈
            </motion.h2>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 w-full h-full">
        {/* REVEALED MESSAGE AREA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
          <AnimatePresence>
            {poppedCount === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center pointer-events-auto">
                <TypewriterText text={fullMessage} />
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.0 }} 
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
                // 1. Initial only handles Y (up/down)
                initial={{ y: verticalStarts[i] }}
                animate={{ 
                  y: "-120vh", 
                  // 2. Sway back and forth using pixels so it doesn't mess up screen position
                  x: [0, i % 2 === 0 ? 15 : -15, 0] 
                }}
                transition={{ 
                  y: { 
                    duration: 22 + (i * 3), 
                    repeat: Infinity, 
                    ease: "linear", 
                    delay: i * 0.5 
                  },
                  x: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute z-20 cursor-pointer transform-gpu"
                // 3. THE MAGIC FIX: This physically places them across the screen width!
                style={{ 
                  left: horizontalPositions[i], 
                  marginLeft: "-60px" // Centers the 120px balloon perfectly on its spot
                }}
                onClick={(e) => handlePop(i, e)}
              >
                <div className="relative group">
                  <img 
                    src={`/images/balloon${i + 1}.png`} 
                    alt="balloon" 
                    style={{ width: '120px', height: 'auto' }} 
                    className="drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-[95%] left-1/2 w-[2px] h-80 bg-gray-400/30 -translate-x-1/2 -z-10" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
}
