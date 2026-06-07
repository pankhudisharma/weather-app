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
    setError("");

    try {
      const res = await fetch(`http://localhost:5000/weather/${city}`);
      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        setWeather(null);
        setLoading(false);
        return;
      }

      setWeather({
        city: data.city,
        temperature: data.temperature,
        feels_like: data.feels_like,
        humidity: data.humidity,
        wind: data.wind,
        description: data.description,
        icon: data.icon
      });

      setLoading(false);

    } catch (err) {
      setError("Something went wrong");
      setWeather(null);
      setLoading(false);
    }
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