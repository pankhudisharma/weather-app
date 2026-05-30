import { useState } from "react";
import { motion } from "framer-motion";
import WeatherCard from "./WeatherCard";
import ForecastCarousel from "./components/ForecastCarousel";
import SearchBar from "./components/SearchBar";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiTip, setAiTip] = useState("");
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const cities = [
    "London",
    "New York",
    "Tokyo",
    "Paris",
    "Delhi",
    "Mumbai",
    "Dubai",
    "Singapore",
    "Sydney",
    "Toronto",
    "Berlin",
    "Rome",
    "Bangkok",
    "Los Angeles",
    "Moscow",
    "Indore",
  ];

  const getWeather = async (selectedCity) => {
    const finalCity = selectedCity || city;
    if (!finalCity) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/weather/${finalCity}`);
      const data = await res.json();
      // Map backend data to WeatherCard expected shape
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
      setSuggestions([]);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const generateAITip = (desc, temp) => {
    if (!desc) return;
    desc = desc.toLowerCase();
    if (desc.includes("rain")) {
      setAiTip("☔ Carry an umbrella today!");
    } else if (temp > 35) {
      setAiTip("🥵 Stay hydrated, it's very hot!");
    } else if (temp < 15) {
      setAiTip("🧥 Wear warm clothes outside.");
    } else if (desc.includes("clear")) {
      setAiTip("🌤️ Perfect weather for a walk!");
    } else {
      setAiTip("🌎 Have a great day!");
    }
  };



  return (
    <div className="sky-bg">
      <div className="app-container">
        <h1 className="title">🌍 WeatherX Ultimate</h1>
        <SearchBar onSearch={getWeather} />

        {loading && <div className="loader" />}

        {weather && <WeatherCard weather={weather} aiTip={aiTip} typedCityName={city} />}

        {forecast && forecast.length > 0 && (
          <ForecastCarousel forecast={forecast} />
        )}


      </div>
    </div>
  );
}

export default App;