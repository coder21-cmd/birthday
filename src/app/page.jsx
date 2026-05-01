"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import LoaderScreen from "@/components/screens/LoaderScreen"
import IntroScreen from "@/components/screens/IntroScreen"
import CakeScreen from "@/components/screens/CakeScreen"
import PhotosScreen from "@/components/screens/PhotosScreen"
import MessageScreen from "@/components/screens/MessageScreen"
import GiftScreen from "@/components/screens/GiftScreen" // Import Gift Screen
import CelebrationScreen from "@/components/screens/CelebrationScreen" // Import Celebration Screen
import BackgroundMusic from "@/components/backgroundmusic"

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState(0)

  // Logic to restart the whole experience
  const handleReplay = () => {
    setCurrentScreen(1) // Skips the loader and goes back to Intro (or 2 for Cake)
  }

  const screens = [
    <LoaderScreen key="loader" onDone={() => setCurrentScreen(1)} />,
    <IntroScreen key="intro" onNext={() => setCurrentScreen(2)} />,
    <CakeScreen key="cake" onNext={() => setCurrentScreen(3)} />,
    <PhotosScreen key="photos" onNext={() => setCurrentScreen(4)} />,
    // We pass onNext to MessageScreen so it can move to the Gift
    <MessageScreen key="message" onNext={() => setCurrentScreen(5)} />, 
    <GiftScreen key="gift" onNext={() => setCurrentScreen(6)} />,
    <CelebrationScreen key="celebration" onReplay={handleReplay} />,
  ]

  return (
    <main className="min-h-screen overflow-hidden relative">
      <BackgroundMusic />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center w-full"
          >
            {screens[currentScreen]}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
