import React from "react";
import { motion } from "framer-motion";
import { Thermometer, Droplets, Wind, Compass, Sun } from "lucide-react";

export default function DetailsGrid({ weather }) {
  if (!weather) return null;

  const details = [
    {
      label: "Feels Like",
      value: `${weather.feelsLike}°C`,
      icon: <Thermometer className="w-5 h-5 text-sky-300" />, 
    },
    {
      label: "Humidity",
      value: `${weather.humidity}%`,
      icon: <Droplets className="w-5 h-5 text-sky-300" />, 
    },
    {
      label: "Wind Speed",
      value: `${weather.windSpeed} km/h`,
      icon: <Wind className="w-5 h-5 text-sky-300 animate-pulse" />, 
    },
    {
      label: "Visibility",
      value: `${weather.visibility || 'N/A'}`,
      icon: <Compass className="w-5 h-5 text-sky-300" />, 
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4 mt-6 justify-center mx-auto"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {details.map((item, idx) => (
        <motion.div
          key={item.label}
          className={`glass-card p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all duration-300`}
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 shadow-inner">
            {item.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-white/50 font-semibold tracking-wider uppercase">
              {item.label}
            </span>
            <span className="text-base sm:text-lg font-bold text-white mt-0.5">
              {item.value}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
