"use client"
import { motion } from "framer-motion"

export default function CakeScreen({ onNext }) {
  // Fewer emojis for mobile to keep the screen clean
  const floatingEmojis = ["✨", "💖", "🎉", "🍰"];

  return (
    <div className="flex flex-col items-center text-center p-5 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl w-[90vw] max-w-[350px] relative overflow-hidden">
      
      {/* Floating Decorations - Optimized for mobile */}
      {floatingEmojis.map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-xl pointer-events-none"
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ 
            y: "-20vh", 
            opacity: [0, 1, 0],
            x: [0, i % 2 === 0 ? 20 : -20, 0] 
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            delay: i * 2,
            ease: "easeInOut"
          }}
          style={{ left: `${20 + (i * 20)}%` }}
        >
          {emoji}
        </motion.span>
      ))}

      <motion.h1 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-2xl font-bold text-pink-600 mb-4"
      >
        Happy Birthday, Cutiepiee! 🎂✨
      </motion.h1>

      <motion.div 
        className="my-2"
        animate={{ 
          rotate: [0, -2, 2, -2, 0],
          scale: [1, 1.02, 1] 
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <img src="/images/cake.png" alt="Birthday Cake" className="w-40 h-auto drop-shadow-xl" />
      </motion.div>

      <p className="text-md text-gray-700 mt-4 mb-6 leading-relaxed">
        Make a wish, Suuuchita❤️🕯️<br/>
        <span className="text-xs text-pink-400 font-light">(Something wonderful is coming!)</span>
      </p>

      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        className="bg-pink-500 text-white px-10 py-3 rounded-full font-bold shadow-lg z-20"
      >
        Next →
      </motion.button>
    </div>
  )
}
