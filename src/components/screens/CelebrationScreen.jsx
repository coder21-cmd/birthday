"use client"

import { motion } from "framer-motion"
import { RefreshCw } from "lucide-react"

export default function CelebrationScreen({ onReplay }) {
  return (
    <div className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4 my-10 overflow-hidden">
      
      {/* Bunting decoration */}
      <div className="absolute top-0 left-0 w-full h-16 pointer-events-none z-20 flex justify-around opacity-70">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] ${i % 2 === 0 ? "border-t-pink-300" : "border-t-violet-300"}`} />
        ))}
      </div>

      <div className="relative w-full flex flex-col items-center justify-center bg-linear-to-b from-white/50 to-pink-100 rounded-[40px] p-8 shadow-inner mt-4">
        
        <img 
          src="/gifs/surprise.gif" 
          alt="Panda Surprise" 
          className="w-40 h-40 object-contain mb-4" 
        />

        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-primary">Lots of love for you ❤️</h3>
          
          {/* UPDATED TEXT COLOR HERE */}
          <p className="text-sm font-medium text-emerald-600/80 italic px-4">
            "A curated blend handpicked specifically for your 22nd chapter."
          </p>
          
          <a 
            href="https://open.spotify.com/playlist/1EdNx7dJYWz6gvmupaJPA9?si=lf4MqSxqTFShEuxZoD6hfA" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block mt-4 py-3 px-6 bg-[#1DB954] text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
          >
            🎵 Listen to your playlist
          </a>

          <p className="text-sm text-primary/70 leading-relaxed pt-4">
            Once again, Happy Birthday! Hope you loved my surprise🥹🥹.
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onReplay}
          className="mt-8 bg-white text-primary px-8 py-3 rounded-full font-bold shadow-md flex items-center gap-2 hover:bg-pink-50 transition-colors"
        >
          <RefreshCw size={18} /> Replay
        </motion.button>
      </div>
    </div>
  );
}
