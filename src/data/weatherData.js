// Premium Realistic Mock Weather Data for global cities
// Features diverse weather conditions (sunny, rainy, cloudy, snowy, thunderstorm, partly cloudy)
// to test background gradients, visual assets, and UI states.

export const weatherData = {
  "new york": {
    city: "New York",
    country: "United States",
    temperature: 22,
    feelsLike: 24,
    condition: "Partly Cloudy",
    conditionCode: "cloudy", // cloudy, sunny, rainy, snowy, thunderstorm
    humidity: 64,
    windSpeed: 14,
    pressure: 1012,
    uvIndex: 5,
    forecast: [
      { day: "Wed", condition: "Partly Cloudy", tempMax: 23, tempMin: 15, conditionCode: "cloudy" },
      { day: "Thu", condition: "Sunny", tempMax: 26, tempMin: 17, conditionCode: "sunny" },
      { day: "Fri", condition: "Rainy", tempMax: 19, tempMin: 14, conditionCode: "rainy" },
      { day: "Sat", condition: "Thunderstorm", tempMax: 21, tempMin: 13, conditionCode: "thunderstorm" },
      { day: "Sun", condition: "Partly Cloudy", tempMax: 22, tempMin: 15, conditionCode: "cloudy" }
    ]
  },
  "london": {
    city: "London",
    country: "United Kingdom",
    temperature: 14,
    feelsLike: 13,
    condition: "Light Rain",
    conditionCode: "rainy",
    humidity: 88,
    windSpeed: 22,
    pressure: 1008,
    uvIndex: 2,
    forecast: [
      { day: "Wed", condition: "Showers", tempMax: 15, tempMin: 11, conditionCode: "rainy" },
      { day: "Thu", condition: "Heavy Rain", tempMax: 13, tempMin: 9, conditionCode: "rainy" },
      { day: "Fri", condition: "Cloudy", tempMax: 16, tempMin: 10, conditionCode: "cloudy" },
      { day: "Sat", condition: "Partly Cloudy", tempMax: 18, tempMin: 12, conditionCode: "cloudy" },
      { day: "Sun", condition: "Sunny", tempMax: 20, tempMin: 13, conditionCode: "sunny" }
    ]
  },
  "tokyo": {
    city: "Tokyo",
    country: "Japan",
    temperature: 26,
    feelsLike: 27,
    condition: "Sunny",
    conditionCode: "sunny",
    humidity: 50,
    windSpeed: 8,
    pressure: 1018,
    uvIndex: 8,
    forecast: [
      { day: "Wed", condition: "Sunny", tempMax: 27, tempMin: 18, conditionCode: "sunny" },
      { day: "Thu", condition: "Sunny", tempMax: 28, tempMin: 19, conditionCode: "sunny" },
      { day: "Fri", condition: "Partly Cloudy", tempMax: 25, tempMin: 17, conditionCode: "cloudy" },
      { day: "Sat", condition: "Sunny", tempMax: 27, tempMin: 18, conditionCode: "sunny" },
      { day: "Sun", condition: "Light Rain", tempMax: 22, tempMin: 16, conditionCode: "rainy" }
    ]
  },
  "paris": {
    city: "Paris",
    country: "France",
    temperature: 18,
    feelsLike: 18,
    condition: "Overcast",
    conditionCode: "cloudy",
    humidity: 70,
    windSpeed: 12,
    pressure: 1014,
    uvIndex: 4,
    forecast: [
      { day: "Wed", condition: "Cloudy", tempMax: 19, tempMin: 12, conditionCode: "cloudy" },
      { day: "Thu", condition: "Light Rain", tempMax: 17, tempMin: 11, conditionCode: "rainy" },
      { day: "Fri", condition: "Sunny", tempMax: 21, tempMin: 13, conditionCode: "sunny" },
      { day: "Sat", condition: "Partly Cloudy", tempMax: 22, tempMin: 14, conditionCode: "cloudy" },
      { day: "Sun", condition: "Sunny", tempMax: 24, tempMin: 15, conditionCode: "sunny" }
    ]
  },
  "sydney": {
    city: "Sydney",
    country: "Australia",
    temperature: 20,
    feelsLike: 20,
    condition: "Clear Sky",
    conditionCode: "sunny",
    humidity: 58,
    windSpeed: 19,
    pressure: 1016,
    uvIndex: 6,
    forecast: [
      { day: "Wed", condition: "Sunny", tempMax: 21, tempMin: 14, conditionCode: "sunny" },
      { day: "Thu", condition: "Partly Cloudy", tempMax: 20, tempMin: 13, conditionCode: "cloudy" },
      { day: "Fri", condition: "Sunny", tempMax: 22, tempMin: 14, conditionCode: "sunny" },
      { day: "Sat", condition: "Sunny", tempMax: 23, tempMin: 15, conditionCode: "sunny" },
      { day: "Sun", condition: "Cloudy", tempMax: 19, tempMin: 13, conditionCode: "cloudy" }
    ]
  },
  "mumbai": {
    city: "Mumbai",
    country: "India",
    temperature: 32,
    feelsLike: 38,
    condition: "Thunderstorm",
    conditionCode: "thunderstorm",
    humidity: 82,
    windSpeed: 25,
    pressure: 1004,
    uvIndex: 9,
    forecast: [
      { day: "Wed", condition: "Heavy Rain", tempMax: 30, tempMin: 26, conditionCode: "rainy" },
      { day: "Thu", condition: "Thunderstorm", tempMax: 31, tempMin: 27, conditionCode: "thunderstorm" },
      { day: "Fri", condition: "Thunderstorm", tempMax: 31, tempMin: 26, conditionCode: "thunderstorm" },
      { day: "Sat", condition: "Showers", tempMax: 32, tempMin: 28, conditionCode: "rainy" },
      { day: "Sun", condition: "Cloudy", tempMax: 33, tempMin: 28, conditionCode: "cloudy" }
    ]
  },
  "reykjavik": {
    city: "Reykjavik",
    country: "Iceland",
    temperature: -2,
    feelsLike: -7,
    condition: "Heavy Snow",
    conditionCode: "snowy",
    humidity: 85,
    windSpeed: 30,
    pressure: 998,
    uvIndex: 0,
    forecast: [
      { day: "Wed", condition: "Snowy", tempMax: -1, tempMin: -5, conditionCode: "snowy" },
      { day: "Thu", condition: "Blizzard", tempMax: -3, tempMin: -8, conditionCode: "snowy" },
      { day: "Fri", condition: "Freezing Rain", tempMax: 1, tempMin: -3, conditionCode: "rainy" },
      { day: "Sat", condition: "Cloudy", tempMax: 0, tempMin: -4, conditionCode: "cloudy" },
      { day: "Sun", condition: "Snow Showers", tempMax: -2, tempMin: -6, conditionCode: "snowy" }
    ]
  },
  "cairo": {
    city: "Cairo",
    country: "Egypt",
    temperature: 36,
    feelsLike: 37,
    condition: "Sunny and Hot",
    conditionCode: "sunny",
    humidity: 32,
    windSpeed: 16,
    pressure: 1010,
    uvIndex: 11,
    forecast: [
      { day: "Wed", condition: "Sunny", tempMax: 37, tempMin: 24, conditionCode: "sunny" },
      { day: "Thu", condition: "Sunny", tempMax: 38, tempMin: 25, conditionCode: "sunny" },
      { day: "Fri", condition: "Sunny", tempMax: 36, tempMin: 23, conditionCode: "sunny" },
      { day: "Sat", condition: "Sunny", tempMax: 35, tempMin: 22, conditionCode: "sunny" },
      { day: "Sun", condition: "Sunny", tempMax: 36, tempMin: 24, conditionCode: "sunny" }
    ]
  }
};

// Help search user by matching lowercase query
export const getWeatherData = (cityName) => {
  if (!cityName) return null;
  const key = cityName.trim().toLowerCase();
  return weatherData[key] || null;
};
