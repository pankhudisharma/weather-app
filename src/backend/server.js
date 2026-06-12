require("dotenv").config({ path: require('path').resolve(__dirname, '../../.env') });
// Use WEATHER_API_KEY if API_KEY is not set
const API_KEY = process.env.API_KEY || process.env.WEATHER_API_KEY;
console.log("✅ Backend initialized – API_KEY present:", !!API_KEY);
const Search = require("./models/Search");

const mongoose = require("mongoose");
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.warn("MongoDB connection failed, proceeding without DB:", err.message));
} else {
  console.warn("Mongo URI not set; skipping MongoDB connection.");
}
const express = require("express");
const cors = require("cors");

console.log("Mongo URI exists:", !!process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});


// 🌤️ CURRENT WEATHER
app.get("/weather/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    console.log("Fetching weather:", url);
    const response = await fetch(url);
    console.log("Weather API response status:", response.status);
    if (!response.ok) {
      const errText = await response.text();
      console.log("Weather API error text:", errText);
      throw new Error(`Weather API request failed ${response.status}: ${errText}`);
    }
    const data = await response.json();
    if (data.cod && data.cod !== 200) {
      return res.status(404).json({ success: false, message: data.message || "City not found" });
    }
    // Save search only if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      await Search.create({ city });
    }
    res.json({
      success: true,
      city: data.name,
      temperature: data.main.temp,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    });
  } catch (error) {
    console.error("Error in /weather route:", error);
    res.status(500).json({ success: false, message: error.message || "Server error" });
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
if (typeof fetch !== 'function') {
  // Node <18 or missing global fetch – require node-fetch as a fallback
  global.fetch = require('node-fetch');
}

// 📊 5-DAY FORECAST – add detailed logging
app.get("/forecast/:city", async (req, res) => {
  const city = req.params.city;
  console.log(`Fetching forecast for ${city}`);
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    console.log("Forecast API response status:", response.status);
    if (!response.ok) {
      const errText = await response.text();
      console.log("Forecast API error text:", errText);
      throw new Error(`Forecast API request failed ${response.status}: ${errText}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error in /forecast route:", err);
    res.status(500).json({ error: "Forecast API error", message: err.message });
  }
});

