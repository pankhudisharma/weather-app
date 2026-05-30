const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const API_KEY = process.env.API_KEY;

// 🌤️ CURRENT WEATHER
app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();

    res.json({
      city: data.name,
      country: data.sys?.country || "",
      temperature: data.main.temp,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      uv: data.main?.uvi || 0,
    });

  } catch (err) {
    res.status(500).json({ error: "Weather API error" });
  }
});

// 📍 REVERSE GEOCODING
app.get("/geocode", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing lat or lon parameter" });
  }

  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      res.json({ city: data[0].name });
    } else {
      res.status(404).json({ error: "No city found for coordinates" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Reverse geocoding error" });
  }
});

// 📊 5-DAY FORECAST
app.get("/forecast/:city", async (req, res) => {
  const city = req.params.city;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Forecast API error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});