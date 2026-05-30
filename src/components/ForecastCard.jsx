import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Snowflake, 
  CloudLightning 
} from 'lucide-react';

/**
 * Returns a small themed icon for the forecast list.
 */
const getSmallWeatherIcon = (code) => {
  const iconClass = "w-10 h-10 transition-transform duration-300 group-hover:scale-110";
  switch (code) {
    case 'sunny':
      return <Sun className={`${iconClass} text-amber-300`} />;
    case 'rainy':
      return <CloudRain className={`${iconClass} text-sky-300`} />;
    case 'cloudy':
      return <Cloud className={`${iconClass} text-slate-200`} />;
    case 'snowy':
      return <Snowflake className={`${iconClass} text-sky-100`} />;
    case 'thunderstorm':
      return <CloudLightning className={`${iconClass} text-yellow-300`} />;
    default:
      return <Cloud className={`${iconClass} text-slate-100`} />;
  }
};

/**
 * ForecastCard Component
 * Renders a single day's forecast details.
 * Features a glassmorphic look, beautiful hover transformations, and premium margins.
 * 
 * @param {object} item - Forecast data (day, condition, tempMax, tempMin, conditionCode)
 */
export default function ForecastCard({ item }) {
  const { day, condition, tempMax, tempMin, conditionCode } = item;

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between text-center gap-3 w-full group relative overflow-hidden">
      
      {/* Small top ambient background light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-white/5 rounded-full blur-xl group-hover:bg-sky-400/10 transition-colors duration-500"></div>

      {/* Day label */}
      <span className="text-sm font-bold text-white/95 uppercase tracking-wide">
        {day}
      </span>

      {/* Weather Icon container */}
      <div className="p-3 bg-white/5 rounded-full border border-white/5 shadow-inner my-1">
        {getSmallWeatherIcon(conditionCode)}
      </div>

      {/* Weather condition text */}
      <span className="text-[11px] font-semibold text-white/50 truncate max-w-full">
        {condition}
      </span>

      {/* Temps High / Low */}
      <div className="flex items-center gap-2 pt-2 border-t border-white/5 w-full justify-center">
        <span className="text-sm font-extrabold text-white font-outfit">
          {tempMax}°
        </span>
        <span className="text-xs text-white/40 font-semibold font-outfit">
          {tempMin}°
        </span>
      </div>

    </div>
  );
}
