"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sprout, Sparkles, Sun, Mail } from "lucide-react"
import Button from "../Button"

export default function PhotosScreen({ onNext }) {
  const [plants, setPlants] = useState([]);

  // Function to add a plant/flower when the garden is tapped
  const addPlant = () => {
    if (plants.length < 8) {
      const newPlant = {
        id: Date.now(),
        x: Math.random() * 80 + 10, 
        size: Math.random() * 20 + 30,
        // Using flowers and plants that fit an artistic vibe
        type: ["🌸", "🌿", "🌷", "🌻", "🍀"][Math.floor(Math.random() * 5)]
      };
      setPlants([...plants, newPlant]);
    }
  };

  return (
    <div className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4 my-10 overflow-hidden">
      
      {/* Decorative Bunting/Banner at the top */}
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

      <div className="text-center mt-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-accent flex items-center justify-center gap-2">
          Suuu's Digital Garden <Sprout className="text-green-500" />
        </h2>
        <p className="text-sm text-accent/70 mt-1 italic">Tap the grass to plant a wish ✨</p>
      </div>

      {/* The Interactive Garden Area */}
      <div 
        onClick={addPlant}
        className="relative h-72 bg-linear-to-b from-blue-50/50 to-green-100/50 w-full rounded-[40px] shadow-inner overflow-hidden cursor-pointer border-2 border-white/50"
      >
        {/* Sun Animation */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-4 right-4 text-yellow-400/60"
        >
          <Sun size={40} />
        </motion.div>

        {/* Floating "Instruction" text if empty */}
        {plants.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-green-400 text-sm animate-pulse">
            Click here to start growing...
          </div>
        )}

        {/* Render the Plants */}
        <AnimatePresence>
          {plants.map((plant) => (
            <motion.div
              key={plant.id}
              initial={{ scale: 0, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute bottom-6 select-none"
              style={{ left: `${plant.x}%`, fontSize: `${plant.size}px` }}
            >
              {plant.type}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Ground/Grass Layer */}
        <div className="absolute bottom-0 w-full h-8 bg-green-200/40 blur-sm" />
      </div>

      <div className="text-center px-4">
        <p className="text-xs md:text-sm text-accent/80 leading-relaxed font-medium">
          "Like your art, may your life always be <br/> full of vibrant colors and peaceful growth."
        </p>
      </div>

      <div className="mt-2">
        <Button onClick={onNext} className="bg-[#ddd6ff] text-accent">
          <Mail size={18} /> Open My Letter
        </Button>
      </div>
    </div>
  )
}
