"use client"

import { useState } from "react"
import { motion } from "framer-motion" // This was the missing line!

export default function MessageScreen({ onNext }) {
    const [opened, setOpened] = useState(false)

    return (
        <div className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4 my-10">
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-semibold text-primary text-center">
                    A Special Message
                </h2>
                <p className="text-primary/70 text-sm">
                    Tap to open
                </p>
            </div>

            <div
                onClick={() => setOpened(!opened)}
                className="card relative h-71.25 w-full rounded-[40px] overflow-hidden shadow-inner cursor-pointer transition-all bg-linear-to-b from-white/80 to-pink-200 flex items-center justify-center max-w-71.25"
            >
                {/* The Cover */}
                <div className={`cover absolute inset-0 ${opened ? "opacity-0" : "opacity-100"} pointer-events-none z-10 bg-[#ffedea]! transition-opacity duration-500`} />

                {/* The Letter Content */}
                <div className="relative px-6 h-56 overflow-y-auto text-foreground text-center">
                    Happy Birthday, Cutiepie! You deserve all the happiness, love, and smiles in the world today and always. You have this special way of making everything around you brighter, your smile, your kindness, and the way you make people feel truly cared for. I hope your day is filled with laughter, surprises, and moments that make your heart happy. You’re truly one of a kind, and I just want you to know how special you are. Keep being the amazing person you are, spreading joy wherever you go. Wishing you endless happiness, success, and all the sweet things life has to offer. 💗
                </div>
            </div>

            {/* The Name with the Twinkling Sparkle */}
            <h2 className="text-2xl md:text-3xl font-semibold text-primary text-center mt-2 flex items-center justify-center gap-2">
                Suchita ❤️ 
                <motion.span
                    animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    ✨
                </motion.span>
            </h2>

            {/* Button to go to the Spotify Playlist (Shows up after she opens the card) */}
            {opened && (
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={onNext}
                    className="mt-4 bg-pink-400 text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-pink-500 transition-colors"
                >
                    One last surprise? →
                </motion.button>
            )}
        </div>
    )
}
