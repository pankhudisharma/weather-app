import React, { useState, useRef, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Static city list for autocomplete
const CITY_SUGGESTIONS = [
  "London",
  "Los Angeles",
  "Indore",
  "Mumbai",
  "Tokyo",
  "Paris",
  "New York",
  "Sydney",
  "Berlin",
  "Rome",
];

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [locating, setLocating] = useState(false);
  const containerRef = useRef(null);

  // Update filtered suggestions when input changes
  useEffect(() => {
    if (input.trim() === "") {
      setFiltered([]);
      setShowDropdown(false);
      return;
    }
    const lowered = input.toLowerCase();
    const matches = CITY_SUGGESTIONS.filter((c) =>
      c.toLowerCase().startsWith(lowered)
    ).slice(0, 5); // limit to 5 suggestions
    setFiltered(matches);
    setShowDropdown(matches.length > 0);
  }, [input]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput("");
      setShowDropdown(false);
    }
  };

  const handleSelect = (city) => {
    setInput(city);
    setShowDropdown(false);
    onSearch(city);
  };

  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `http://localhost:5000/geocode?lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          if (data.city) {
            onSearch(data.city);
            setInput("");
          } else {
            alert("Could not detect city name for your location.");
          }
        } catch (err) {
          console.error("Reverse geocoding error:", err);
          alert("Error fetching location data from server.");
        } finally {
          setLocating(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert(`Failed to get location: ${error.message}`);
        setLocating(false);
      }
    );
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <form
        onSubmit={handleSubmit}
        className="search-bar glass-card p-3 rounded-xl flex items-center gap-2"
      >
        <Search className="w-5 h-5 text-white/60" />
        <input
          type="text"
          placeholder="Enter city…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-white placeholder-white/40 outline-none"
          onFocus={() => input && setShowDropdown(filtered.length > 0)}
        />
        <button
          type="button"
          onClick={handleLocationClick}
          disabled={locating}
          className="p-1.5 bg-white/5 hover:bg-sky-500/20 text-white rounded-md transition duration-200 flex items-center justify-center disabled:opacity-50"
          title="Use my current location"
        >
          <MapPin
            className={`w-5 h-5 ${
              locating ? "animate-bounce text-sky-400" : "text-white/70"
            }`}
          />
        </button>
        <button
          type="submit"
          className="px-3 py-1 bg-sky-500/30 hover:bg-sky-500/50 text-white rounded-md transition"
        >
          Search
        </button>
      </form>

      <AnimatePresence>
        {showDropdown && (
          <motion.ul
            className="absolute left-0 right-0 mt-1 bg-white/10 backdrop-blur-md rounded-md shadow-lg z-10"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.map((city) => (
              <li
                key={city}
                className="px-4 py-2 text-white hover:bg-white/20 cursor-pointer"
                onClick={() => handleSelect(city)}
              >
                {city}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
