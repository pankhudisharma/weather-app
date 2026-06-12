import { useState } from "react";

import WeatherCard from "./components/WeatherCard";
import DetailsGrid from "./components/DetailsGrid";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ForecastCarousel from "./components/ForecastCarousel";
import DateTimeDisplay from "./components/DateTimeDisplay";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiTip, setAiTip] = useState("");
  const [error, setError] = useState("");
  const [city, setCity] = useState("");

  const getWeather = async (selectedCity) => {
    const finalCity = selectedCity || city;
    if (!finalCity) return;
    setLoading(true);
    setError("");
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const res = await fetch(`${API_URL}/weather/${finalCity}`);
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`HTTP ${res.status}: ${txt}`);
      }
      const data = await res.json();
      if (!data.success) {
        setError(data.message);
        setWeather(null);
        setLoading(false);
        return;
      }
      setWeather({
        city: data.city,
        country: data.country || "",
        temperature: data.temperature,
        feelsLike: data.feels_like,
        humidity: data.humidity,
        windSpeed: data.wind,
        pressure: data.pressure || 1013,
        uvIndex: data.uvIndex || 0,
        condition: data.description,
        conditionCode: data.icon,
      });
      setCity(finalCity);
      generateAITip(data.description, data.temperature);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const generateAITip = (desc, temp) => {
    if (!desc) return;
    const lowered = desc.toLowerCase();
    if (lowered.includes("rain")) setAiTip("☔ Carry an umbrella today!");
    else if (temp > 35) setAiTip("🥵 Stay hydrated, it's very hot!");
    else if (temp < 15) setAiTip("🧥 Wear warm clothes outside.");
    else if (lowered.includes("clear")) setAiTip("🌤️ Perfect weather for a walk!");
    else setAiTip("🌎 Have a great day!");
  };

  const getBackgroundGradient = (weatherObj) => {
  const { description = "", temperature } = weatherObj || {};
  const d = description.toLowerCase();
  if (d.includes("rain") || d.includes("cloud")) return "linear-gradient(135deg, #777777, #eeeeee)";
  if (typeof temperature === "number" && temperature < 10) return "linear-gradient(135deg, #0d47a1, #90a4ae)";
  if (d.includes("clear") || d.includes("sun")) return "linear-gradient(135deg, #b89c45, #7a80b0)";
  if (d.includes("snow")) return "linear-gradient(135deg, #e0eafc, #cfdef3)";
  return "linear-gradient(135deg, #b89c45, #7a80b0)";
};
  return (
    <div className="sky-bg" style={{ background: getBackgroundGradient(weather) }}>
      <div className="app-container glass-card">
        <Header />
        <DateTimeDisplay />
        <SearchBar onSearch={getWeather} />
        {error && <div className="error-msg text-red-500 mt-2 text-center">{error}</div>}
        {loading && (
          <div className="loader mt-4 flex justify-center">
            <div className="spinner" />
          </div>
        )}
        {weather && (
          <>
            <WeatherCard weather={weather} aiTip={aiTip} typedCityName={city} />
            <DetailsGrid weather={weather} />
          </>
        )}
        {forecast && forecast.length > 0 && <ForecastCarousel forecast={forecast} />}

      </div>
    </div>
  );
}

export default App;