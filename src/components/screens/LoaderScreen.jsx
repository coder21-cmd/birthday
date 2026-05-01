"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function LoaderScreen({ onDone }) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Increment the progress bar over 3 seconds
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + 1
            })
        }, 30) // 30ms * 100 steps = 3 seconds total

        // Call onDone after the bar is full
        const timer = setTimeout(() => {
            onDone?.()
        }, 3500) // Slightly longer than the bar to let her see 100%

        return () => {
            clearInterval(interval)
            clearTimeout(timer)
        }
    }, [onDone])

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center min-h-screen will-change-transform"
        >
            {/* Floating Cake Icon */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-6xl md:text-7xl will-change-transform mb-6"
            >
                🎂
            </motion.div>

            {/* Container to match text width */}
            <div className="w-full max-w-[280px] flex flex-col items-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mb-4 text-xl font-bold text-purple-600 italic text-center"
                >
                    Loading your birthday surprise...
                </motion.p>

                {/* The Cute Progress Bar */}
                <div className="w-full h-3 bg-pink-100 rounded-full overflow-hidden border border-pink-200 shadow-inner">
                    <motion.div
                        className="h-full bg-gradient-to-r from-pink-400 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                    />
                </div>

                {/* Percentage Text */}
                <p className="mt-2 text-pink-500 font-mono text-sm font-semibold">
                    {progress}%
                </p>
            </div>
        </motion.div>
    )
}
