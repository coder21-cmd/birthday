"use client"
import { useState } from "react"
import { motion } from "framer-motion"

export default function CakeScreen({ onNext }) {
  const [isLit, setIsLit] = useState(false)
  const floatingEmojis = ["✨", "💖", "🎉", "🍰"]

  return (
    <div className="flex flex-col items-center text-center p-5 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl w-[90vw] max-w-[350px] relative overflow-hidden">
      
      {/* Decorative Banners/Floating Emojis */}
      {floatingEmojis.map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-xl pointer-events-none"
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-20vh", opacity: [0, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: i * 2 }}
          style={{ left: `${20 + (i * 20)}%` }}
        >
          {emoji}
        </motion.span>
      ))}

      <h1 className="text-2xl font-bold text-pink-600 mb-4">
        Happy Birthday, Cutiepiee! 🎂✨
      </h1>

      <div className="relative my-2">
        {/* THE CAKE IMAGE */}
        {/* IMPORTANT: Make sure your file in public/images is named 'cake.png' */}
        <img 
          src="/images/cake.png" 
          alt="Birthday Cake" 
          className={`w-40 h-auto transition-all duration-500 ${isLit ? "drop-shadow-[0_0_15px_rgba(255,165,0,0.8)]" : ""}`} 
        />
        
        {/* THE FLAME: Only shows when isLit is true */}
        {isLit && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-[-10px] left-1/2 -translate-x-1/2 text-3xl"
          >
            🔥
          </motion.div>
        )}
      </div>

      <p className="text-md text-gray-700 mt-4 mb-6">
        Make a wish, Suuuchita❤️🕯️
      </p>

      <div className="flex flex-col gap-3 w-full items-center">
        {!isLit ? (
          <button 
            onClick={() => setIsLit(true)}
            className="bg-pink-200 text-pink-700 px-8 py-2 rounded-full font-semibold shadow-sm border border-pink-300 flex items-center gap-2"
          >
            🔥 Light the Candle
          </button>
        ) : (
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onNext}
            className="bg-pink-500 text-white px-10 py-3 rounded-full font-bold shadow-lg"
          >
            Next →
          </motion.button>
        )}
      </div>
    </div>
  )
}
