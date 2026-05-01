"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => console.log("Playback blocked:", err));
        setShowGuide(false); // Hide the message once music starts
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
      {/* Curvy Arrow and Message */}
      {showGuide && (
        <div className="flex flex-col items-center mb-2 animate-bounce">
          <p className="bg-white text-pink-600 px-4 py-2 rounded-xl shadow-lg font-bold text-sm border-2 border-pink-200">
            Tap for music! 🎵
          </p>
          {/* Curvy Line SVG */}
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="drop-shadow-lg"
          >
            <path d="M7 7c0 0 10 0 10 10" />
            <polyline points="13 17 17 17 17 13" />
          </svg>
        </div>
      )}

      <audio ref={audioRef} loop src="/birthday-song.mp3" />
      
      <button
        onClick={togglePlay}
        className="p-4 bg-pink-500 text-white shadow-2xl rounded-full hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-4 border-white"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </div>
  );
}
