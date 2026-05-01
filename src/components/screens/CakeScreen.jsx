"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Flame, MoveRight } from "lucide-react"
import Button from "../Button"

const confettiColors = ["#ff8fab", "#ffb3c6", "#fca5a5", "#e9a8ff", "#ffd166"];

export default function CakeScreen({ onNext }) {
  const [lit, setLit] = useState(false)
  const floatingEmojis = ["✨", "💖", "🎉", "🍰", "⭐"];

  const lightCandle = () => {
    if (lit) return
    setLit(true)
    setTimeout(() => burst(), 600);
  }

  const burst = () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: confettiColors,
    })
  }

  return (
    <div className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4 my-10 overflow-hidden">
      
      {/* 1. BUNTING & STREAMERS DECORATION (New) */}
      <div className="absolute top-0 left-0 w-full h-24 pointer-events-none z-20">
        {/* Simple CSS Bunting Mimic */}
        <div className="flex justify-around w-full opacity-80">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className={`w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] ${
                i % 2 === 0 ? "border-t-pink-300" : "border-t-purple-300"
              }`}
            />
          ))}
        </div>
        {/* Streamers on the sides */}
        <div className="absolute top-0 left-4 w-1 h-32 bg-gradient-to-b from-pink-300 to-transparent rounded-full blur-[1px]" />
        <div className="absolute top-0 right-4 w-1 h-32 bg-gradient-to-b from-purple-300 to-transparent rounded-full blur-[1px]" />
      </div>

      {/* 2. Floating Decorations */}
      {floatingEmojis.map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl pointer-events-none z-0"
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 1, 1, 0], rotate: 360 }}
          transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: i * 2 }}
          style={{ left: `${Math.random() * 100}%` }}
        >
          {emoji}
        </motion.span>
      ))}

      <motion.div className="relative z-10 left-0 w-full text-center text-3xl md:text-4xl font-semibold text-secondary drop-shadow leading-tight px-4 will-change-transform mt-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Happy Birthday, Cutiepiee! ✨🎂
      </motion.div>

      <div className="relative flex flex-col items-center gap-8 w-full">
        <div className="relative h-72 bg-linear-to-b from-white/80 to-rose-200 w-full flex items-end justify-center rounded-[40px] shadow-inner pb-10">
          <Cake lit={lit} />
        </div>

        {/* Personalized Message */}
        <div className="text-center">
          <p className="text-lg text-secondary font-medium">
            Make a wish, Suuuchita❤️🕯️
          </p>
          <p className="text-xs text-pink-400 font-light mt-1 animate-pulse">
            (Something wonderful is coming!)
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!lit ? (
            <motion.div key="light" exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.5 }}>
              <Button onClick={lightCandle} className="bg-[#ffccd3] text-secondary">
                <Flame size={18} className="mb-0.5" />
                Light the Candle
              </Button>
            </motion.div>
          ) : (
            <motion.div key="next" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, transition: { delay: 2 } }}>
              <Button onClick={onNext} className="bg-[#ffccd3] text-secondary">
                Next <MoveRight size={18} className="mt-0.5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div >
  )
}

function Cake({ lit }) {
  return (
    <div className="flex flex-col items-center">
      <div className="cake">
        <div className="plate"></div>
        <div className="layer layer-bottom"></div>
        <div className="layer layer-middle"></div>
        <div className="layer layer-top"></div>
        <div className="icing"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>
        <div className="candle">
          {lit && <motion.div
            initial={{ opacity: 0, scaleY: 0.2, y: 10 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="flame"></motion.div>}
        </div>
      </div>
    </div>
  )
}
