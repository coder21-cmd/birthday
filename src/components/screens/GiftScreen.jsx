"use client"

import { motion } from "framer-motion"

export default function GiftScreen({ onNext }) {
  return (
    <div className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4 my-10 overflow-hidden">
      
      {/* Bunting decoration */}
      <div className="absolute top-0 left-0 w-full h-16 pointer-events-none z-20 flex justify-around opacity-70">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] ${i % 2 === 0 ? "border-t-pink-300" : "border-t-violet-300"}`} />
        ))}
      </div>

      <div className="text-center mt-6">
        <h2 className="text-2xl font-bold text-primary">One Last Thing...</h2>
      </div>

      <div className="relative w-full h-80 flex flex-col items-center justify-center bg-linear-to-b from-white/50 to-pink-100 rounded-[40px] shadow-inner">
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          className="cursor-pointer flex flex-col items-center gap-4"
        >
          {/* Replace with your Gift Box GIF path */}
          <img 
            src="/gifs/gift.gif" 
            alt="Gift Box" 
            className="w-48 h-48 object-contain drop-shadow-md" 
          />
          <p className="text-primary/70 text-sm italic animate-pulse">
            Tap the gift
          </p>
        </motion.div>
      </div>
    </div>
  );
}
