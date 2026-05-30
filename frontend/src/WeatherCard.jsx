import React from "react";
import { motion } from "framer-motion";

const WeatherCard = ({ weather, aiTip }) => {
  if (!weather) return null;

  const isRaining = weather.description?.toLowerCase().includes("rain");

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className="weather-card"
    >
      {/* Rain overlay */}
      {isRaining && <div className="rain-overlay" />}

      {/* Icon */}
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt="weather icon"
        className="weather-icon"
      />

      <h2 className="city-name">{weather.city}</h2>
      <h1 className="temp">{Math.round(weather.temperature)}°C</h1>
      <p className="description">{weather.description}</p>

      {/* AI tip */}
      <div className="ai-tip">{aiTip}</div>

      {/* Info grid */}
      <div className="info-grid">
        <div className="info-box">
          💧
          <p>{weather.humidity}%</p>
          <span>Humidity</span>
        </div>
        <div className="info-box">
          🌬️
          <p>{weather.wind}</p>
          <span>Wind</span>
        </div>
        <div className="info-box">
          🤔
          <p>{Math.round(weather.feels_like)}°C</p>
          <span>Feels Like</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
