import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Snowflake, 
  CloudLightning, 
  Droplets, 
  Wind, 
  Thermometer, 
  Compass,
  AlertCircle
} from 'lucide-react';

/**
 * Helper to return the matching premium Lucide weather icon.
 * Includes colors and standard animation tags.
 */
const getWeatherIcon = (code) => {
  if (!code) return <Cloud className="w-24 h-24 text-slate-100" />;
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
      return <Sun className="w-24 h-24 text-amber-300 animate-[spin_20s_linear_infinite] filter drop-shadow-[0_0_15px_rgba(252,211,77,0.4)]" />;
    case 'rainy':
      return <CloudRain className="w-24 h-24 text-sky-300 animate-bounce filter drop-shadow-[0_0_12px_rgba(125,211,252,0.4)]" />;
    case 'cloudy':
      return <Cloud className="w-24 h-24 text-slate-200 animate-pulse filter drop-shadow-[0_0_12px_rgba(226,232,240,0.3)]" />;
    case 'snowy':
      return <Snowflake className="w-24 h-24 text-sky-200 animate-spin-slow filter drop-shadow-[0_0_15px_rgba(186,230,253,0.4)]" />;
    case 'thunderstorm':
      return <CloudLightning className="w-24 h-24 text-yellow-300 animate-bounce filter drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]" />;
    default:
      return <Cloud className="w-24 h-24 text-slate-100" />;
  }
};

/**
 * WeatherCard Component
 * Displays the main current weather conditions for the selected city.
 * Supports elegant placeholder fallback if the searched city is not found in dummy data.
 * 
 * @param {object} data - Weather details object from dummy data (can be null if not found)
 * @param {string} typedCityName - The city name actively typed in the search bar
 */
export default function WeatherCard({ weather, typedCityName }) {
  
  // Renders a modern glassmorphic "City Not Found" state when user searches an unsupported city
  if (!weather) {
    return (
      <div className="w-full glass-card rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-6 min-h-[350px] transition-all duration-500 hover:shadow-glass-hover">
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-full animate-bounce">
          <AlertCircle className="w-12 h-12 text-red-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-white/90">
            "{typedCityName || 'Empty Search'}" Not Found
          </h2>
          <p className="text-white/60 text-sm max-w-sm leading-relaxed">
            Our current mock database has weather insights for: <strong className="text-sky-300">Tokyo, London, New York, Paris, Sydney, Mumbai, Reykjavik, Cairo</strong>.
          </p>
        </div>
        
        {/* Dynamic visual placeholder that mimics a dashboard preview */}
        <div className="w-full max-w-xs mt-2 border border-white/5 bg-white/5 rounded-2xl p-4 text-left opacity-40">
          <div className="h-4 w-1/3 bg-white/20 rounded mb-2"></div>
          <div className="h-10 w-1/2 bg-white/20 rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-3 bg-white/20 rounded"></div>
            <div className="h-3 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const { city, country, temperature, feelsLike, condition, conditionCode, humidity, windSpeed, pressure, uvIndex } = weather;

  return (
    <div className="w-full glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-8 relative overflow-hidden transition-all duration-500 hover:shadow-glass-hover hover:border-white/25 group">
      
      {/* Decorative inner glow orb that shifts position based on weather */}
      <div className="absolute -right-16 -top-16 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl group-hover:bg-sky-500/15 transition-all duration-500"></div>

      {/* Top Section: City details, weather icon and temperature */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left Side: City & Temp */}
        <div className="text-center sm:text-left space-y-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white m-0">
              {city}
            </h2>
            <p className="text-white/50 text-xs sm:text-sm font-semibold tracking-wide mt-1 uppercase">
              {country}
            </p>
          </div>
          
          <div className="flex items-start justify-center sm:justify-start">
            <span className="text-6xl sm:text-7xl font-extrabold tracking-tighter text-white font-outfit select-none">
              {temperature}
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-sky-300 mt-1">°C</span>
          </div>
          
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-sky-200">
            {condition}
          </div>
        </div>

        {/* Right Side: Animated Premium Icon */}
        <div className="flex items-center justify-center p-6 bg-white/5 rounded-full border border-white/5 shadow-inner relative">
          {getWeatherIcon(conditionCode)}
        </div>

      </div>

    </div>
  );
}
