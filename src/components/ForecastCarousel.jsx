import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, Snowflake, CloudLightning } from 'lucide-react';

/**
 * Returns appropriate Lucide icon for a weather condition code.
 */
const getIcon = (code) => {
  if (!code) return <Cloud className="w-8 h-8 text-gray-200" />;
  const c = code.toLowerCase();
  
  let themeKey = c;
  if (c.startsWith("01")) themeKey = "sunny";
  else if (
    c.startsWith("02") ||
    c.startsWith("03") ||
    c.startsWith("04") ||
    c === "50d" ||
    c === "50n"
  )
    themeKey = "cloudy";
  else if (
    c.startsWith("09") ||
    c.startsWith("10")
  )
    themeKey = "rainy";
  else if (c.startsWith("11")) themeKey = "thunderstorm";
  else if (c.startsWith("13")) themeKey = "snowy";

  switch (themeKey) {
    case 'sunny':
      return <Sun className="w-8 h-8 text-amber-300" />;
    case 'cloudy':
      return <Cloud className="w-8 h-8 text-gray-300" />;
    case 'rainy':
      return <CloudRain className="w-8 h-8 text-sky-300" />;
    case 'snowy':
      return <Snowflake className="w-8 h-8 text-sky-200" />;
    case 'thunderstorm':
      return <CloudLightning className="w-8 h-8 text-yellow-300" />;
    default:
      return <Cloud className="w-8 h-8 text-gray-200" />;
  }
};

/**
 * ForecastCarousel – displays exactly five forecast cards.
 * Expects `forecast` to be an array of objects with:
 *   - dt_txt (date string) or dt (timestamp)
 *   - main.temp
 *   - weather[0].description / icon
 */
export default function ForecastCarousel({ forecast = [] }) {
  // Extract one entry per distinct date (OpenWeather provides 3‑hour intervals)
  const getDailyItems = (list) => {
  const days = [];
  const seen = new Set();
  for (const item of list) {
    // Prefer the local date string provided by OpenWeather (dt_txt)
    let dateKey;
    if (item.dt_txt) {
      // dt_txt format: "YYYY-MM-DD HH:MM:SS"
      dateKey = item.dt_txt.split(' ')[0];
    } else if (item.dt) {
      // Fallback to UTC conversion of UNIX timestamp
      dateKey = new Date(item.dt * 1000).toISOString().split('T')[0];
    } else {
      continue;
    }
    if (!seen.has(dateKey)) {
      seen.add(dateKey);
      days.push(item);
    }
    if (days.length === 5) break;
  }
  return days;
};
  const itemsToRender = getDailyItems(forecast);

  const dayName = (dateStr, index) => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      // When the API returns a mock or non‑date string, fall back to a simple "Day N" label
      return `Day ${index + 1}`;
    }
    return d.toLocaleDateString(undefined, { weekday: 'short' });
  };

  return (
    <motion.div
      className="w-full flex justify-center gap-4 py-4 overflow-x-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
            {itemsToRender.map((item, idx) => (

        <motion.div
          key={idx}
          className="glass-card w-32 sm:w-36 p-3 flex flex-col items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-sm font-medium text-white/70 mb-1">
            {dayName(item.dt_txt || (item.dt ? item.dt * 1000 : ''), idx)}
          </div>
          {getIcon(item.weather?.[0]?.icon?.toLowerCase() || '')}
          <div className="mt-2 text-xl font-bold text-white">
            {Math.round(item.main?.temp)}°C
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
