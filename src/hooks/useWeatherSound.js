import { useEffect, useRef, useState } from "react";

// Robust, high-quality public ambient sound URLs
const SOUNDS = {
  clear: "https://www.soundjay.com/nature/sounds/cricket-chirping-1.mp3", // Nature/summer night chirp
  cloudy: "https://www.soundjay.com/nature/sounds/wind-cave-1.mp3",      // Soft, airy atmospheric wind
  rainy: "https://www.soundjay.com/nature/sounds/rain-07.mp3",           // Steady, soothing rain falling
  thunderstorm: "https://www.soundjay.com/nature/sounds/thunder-2.mp3",  // Rain with rumble of thunder
  snowy: "https://www.soundjay.com/nature/sounds/wind-cave-1.mp3",       // Cold wind drift sound
};

export default function useWeatherSound(condition) {
  const [isMuted, setIsMuted] = useState(true); // Default to muted to comply with autoplay policies
  const audioRef = useRef(null);

  // Helper to resolve condition string to sound type
  const getSoundType = (cond) => {
    if (!cond) return null;
    const c = cond.toLowerCase();
    if (c.includes("clear") || c.includes("sun")) return "clear";
    if (c.includes("thunder")) return "thunderstorm";
    if (c.includes("rain") || c.includes("drizzle") || c.includes("shower")) return "rainy";
    if (c.includes("snow") || c.includes("sleet") || c.includes("hail")) return "snowy";
    if (c.includes("cloud") || c.includes("mist") || c.includes("fog") || c.includes("haze")) return "cloudy";
    return "clear"; // default fallback
  };

  useEffect(() => {
    // If browser doesn't support Audio or condition is empty, skip
    if (typeof window === "undefined" || !condition) return;

    const soundType = getSoundType(condition);
    const soundUrl = SOUNDS[soundType];

    if (!soundUrl) return;

    // Clean up current audio if it exists
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Initialize new audio
    const audio = new Audio(soundUrl);
    audio.loop = true;
    audio.volume = isMuted ? 0 : 0.3; // low comfort volume
    audioRef.current = audio;

    // Play audio safely
    if (!isMuted) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay blocked sound until user interaction:", err);
        });
      }
    }

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [condition]);

  // Handle Mute/Unmute toggle
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.volume = nextMuted ? 0 : 0.3;
      if (!nextMuted) {
        audioRef.current.play().catch((err) => {
          console.error("Playback failed to start:", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  };

  return { isMuted, toggleMute };
}
