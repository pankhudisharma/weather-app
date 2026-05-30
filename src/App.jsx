import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCarousel from "./components/ForecastCarousel";
import DetailsGrid from "./components/DetailsGrid";
import AITip from "./components/AITip";

// Helper to map weather condition and temperature to premium Tailwind gradient classes
function getBackgroundClass(condition, temp) {
  // Premium blue, sky-blue, and white-indigo gradient for home page default
  if (!condition) return "bg-gradient-to-br from-blue-700 via-sky-400 to-indigo-50";

  // 1. Hot temperature priority (> 28°C): vibrant amber/orange/yellow gradient
  if (temp > 28) {
    return "bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-400";
  }

  // 2. Cold temperature priority (< 12°C): deep rich dark-blue/sky gradient
  if (temp < 12) {
    return "bg-gradient-to-br from-indigo-950 via-sky-900 to-blue-900";
  }

  // 3. Moderate weather conditions
  const lc = condition.toLowerCase();
  if (lc.includes("clear") || lc.includes("sun")) {
    return "bg-gradient-to-br from-blue-500 via-sky-500 to-indigo-600";
  }
  if (lc.includes("cloud") || lc.includes("mist") || lc.includes("fog") || lc.includes("haze")) {
    return "bg-gradient-to-br from-slate-600 via-slate-500 to-zinc-700";
  }
  if (lc.includes("rain") || lc.includes("drizzle") || lc.includes("shower")) {
    return "bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900";
  }
  if (lc.includes("snow") || lc.includes("sleet") || lc.includes("hail")) {
    return "bg-gradient-to-br from-sky-200 via-indigo-200 to-white";
  }
  if (lc.includes("thunderstorm")) {
    return "bg-gradient-to-br from-zinc-900 via-purple-950 to-indigo-950";
  }

  // Default moderate weather fallback
  return "bg-gradient-to-br from-blue-600 via-sky-400 to-indigo-800";
}

export default function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiTip, setAiTip] = useState("");
  const [city, setCity] = useState("");

  // Fetch weather and forecast data
  async function getWeather(selectedCity) {
    const finalCity = selectedCity || city;
    if (!finalCity) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/weather/${finalCity}`);
      const data = await res.json();

      const mapped = {
        city: data.city,
        country: data.country || "",
        temperature: data.temperature,
        feelsLike: data.feels_like,
        condition: data.description,
        conditionCode: data.icon,
        humidity: data.humidity,
        windSpeed: data.wind,
        pressure: data.pressure || 1013,
        uvIndex: data.uv || 0,
      };
      setWeather(mapped);

      const forecastRes = await fetch(`http://localhost:5000/forecast/${finalCity}`);
      const forecastData = await forecastRes.json();
      setForecast(forecastData.list || []);

      generateAITip(data.description, data.temperature);
      setCity("");
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  // Generate a lifestyle tip based on weather
  const generateAITip = (desc, temp) => {
    if (!desc) return;
    const d = desc.toLowerCase();
    if (d.includes("rain")) setAiTip("☔ Carry an umbrella today and stay warm!");
    else if (d.includes("thunder")) setAiTip("⛈️ Thunderstorms active. Stay indoors if possible!");
    else if (temp > 35) setAiTip("🥵 Stay hydrated, it’s very hot! Avoid direct afternoon sun.");
    else if (temp < 15) setAiTip("🧥 Wear warm layers today to guard against the cold.");
    else if (d.includes("clear") || d.includes("sun")) setAiTip("🌤️ Perfect weather for a jog or a relaxing outdoor walk!");
    else setAiTip("🌎 Have a wonderful day, keep checking Aerosky!");
  };

  return (
    <motion.div
      className={`min-h-screen w-full flex flex-col items-center justify-start transition-colors duration-700 ${
        weather ? getBackgroundClass(weather.condition, weather.temperature) : getBackgroundClass()
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="w-full">
        <Header />
      </header>

      <div className="app-container mt-4 w-full max-w-3xl px-4">
        <SearchBar onSearch={getWeather} />
        {loading && <div className="loader" />}

        {/* Welcome message shown prior to any search or geolocating event */}
        {!weather && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full text-center py-16 px-6 glass-card rounded-3xl border border-white/10 mt-6 relative overflow-hidden"
          >
            {/* Absolute floating bg glow */}
            <div className="absolute -left-12 -top-12 w-32 h-32 bg-sky-400/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-purple-400/5 rounded-full blur-2xl pointer-events-none" />

            <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">
              Welcome to Aerosky
            </h2>
            <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed">
              Your premium, state-of-the-art atmospheric companion. Search for a city above or tap the location icon to discover elegant, real-time insights and tailored forecasts.
            </p>
          </motion.div>
        )}

        {weather && (
          <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
            <WeatherCard weather={weather} typedCityName={city} />
            <DetailsGrid weather={weather} />
            <AITip tip={aiTip} />
          </motion.div>
        )}

        {forecast && forecast.length > 0 && (
          <motion.div layout className="mt-6 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-xl font-bold text-white mb-2 text-left pl-1">5-Day Forecast</h3>
            <ForecastCarousel forecast={forecast} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
