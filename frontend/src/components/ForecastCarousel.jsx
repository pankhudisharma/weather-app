import React from "react";
import { motion } from "framer-motion";

export default function ForecastCarousel({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="forecast-carousel glass">
      {forecast.map((item, i) => (
        <motion.div
          key={i}
          className="forecast-card"
          whileHover={{ scale: 1.07 }}
        >
          <p className="day-name">
            {new Date(item.dt_txt).toLocaleDateString("en-US", {
              weekday: "short",
            })}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
            alt="forecast icon"
            className="forecast-icon"
          />
          <h3 className="forecast-temp">{Math.round(item.main.temp)}°C</h3>
        </motion.div>
      ))}
    </div>
  );
};
