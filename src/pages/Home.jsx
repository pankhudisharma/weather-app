import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import ForecastSection from '../components/ForecastSection';
import { getWeatherData } from '../data/weatherData';

/**
 * Renders the weather-themed premium gradient background.
 * Changes colors dynamically depending on the current weather condition!
 */
const getDynamicBackgroundClass = (conditionCode) => {
  switch (conditionCode) {
    case 'sunny':
      // Warm, radiant solar rays fading into deep atmosphere
      return 'bg-gradient-to-br from-amber-500/30 via-sky-700/40 to-indigo-950/90';
    case 'rainy':
      // Melancholic, misty showers, dark and cool tones
      return 'bg-gradient-to-br from-slate-700/40 via-sky-900/40 to-slate-950';
    case 'cloudy':
      // Overcast silver lining clouds, smooth gray-blues
      return 'bg-gradient-to-br from-blue-700/20 via-slate-700/45 to-zinc-950';
    case 'snowy':
      // Cold, pristine, alpine frost look
      return 'bg-gradient-to-br from-sky-300/10 via-sky-600/20 to-slate-950';
    case 'thunderstorm':
      // Electric, charged violet skies
      return 'bg-gradient-to-br from-indigo-950/60 via-purple-900/40 to-slate-950';
    default:
      // Fallback premium twilight gradient
      return 'bg-gradient-to-br from-sky-500/20 via-indigo-900/30 to-slate-950';
  }
};

/**
 * Home Page Component
 * Serves as the weather dashboard home. Coordinates all state, including live search
 * input, matched weather data, and triggers dynamic UI theme updates.
 */
export default function Home() {
  // 1. STATE: 'searchVal' stores what the user has currently typed in the search bar
  const [searchVal, setSearchVal] = useState('Tokyo');
  
  // 2. STATE: 'activeWeather' stores the matched city weather object
  const [activeWeather, setActiveWeather] = useState(null);

  // 3. STATE: 'isSearching' simulated state for clean loading UI triggers
  const [loading, setLoading] = useState(false);

  // Look up weather data whenever 'searchVal' changes (live typing update!)
  useEffect(() => {
    // Look up in our dummy database
    const matched = getWeatherData(searchVal);
    
    if (matched) {
      setActiveWeather(matched);
    } else {
      // If the current typed value doesn't match, set to null
      // The WeatherCard will display a helpful fallback showing city is not found yet.
      setActiveWeather(null);
    }
  }, [searchVal]);

  // Handler for final selection (presets, dropdown autocomplete clicks)
  const handleSelectCity = (cityName) => {
    setLoading(true);
    setSearchVal(cityName);
    // Simulate minor premium transition load
    setTimeout(() => {
      setLoading(false);
    }, 450);
  };

  // Determine active background gradient based on the currently loaded weather
  const currentConditionCode = activeWeather ? activeWeather.conditionCode : 'default';
  const backgroundGradient = getDynamicBackgroundClass(currentConditionCode);

  return (
    <div className={`min-h-screen w-full flex flex-col justify-start items-center p-4 sm:p-6 md:p-8 transition-all duration-700 ease-in-out relative overflow-hidden`}>
      
      {/* Dynamic Background Shader Wrapper */}
      <div className={`absolute inset-0 transition-all duration-1000 -z-10 ${backgroundGradient}`}></div>
      
      {/* Floating ambient radial orbs for premium high-fidelity aesthetics */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-sky-500/10 blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-[120px] -z-10 animate-pulse delay-1000"></div>

      {/* Primary Container */}
      <div className="w-full max-w-4xl space-y-6 sm:space-y-8 mt-2 sm:mt-4">
        
        {/* Modular Header */}
        <Header />

        {/* Live Search and Quick presets */}
        <SearchBar 
          value={searchVal} 
          onChange={setSearchVal} 
          onSelectCity={handleSelectCity} 
        />

        {/* Loading overlay/spinner for smooth transition feel */}
        {loading ? (
          <div className="w-full glass-card rounded-3xl p-16 flex flex-col items-center justify-center gap-4 min-h-[350px]">
            <div className="w-12 h-12 rounded-full border-4 border-sky-400/20 border-t-sky-400 animate-spin"></div>
            <span className="text-white/60 font-semibold text-sm">Syncing meteorological atmospheric data...</span>
          </div>
        ) : (
          <>
            {/* Main Weather Card */}
            <WeatherCard data={activeWeather} typedCityName={searchVal} />

            {/* Extension Forecast Section */}
            {activeWeather && (
              <div className="animate-[fadeIn_0.6s_ease-out]">
                <ForecastSection forecastList={activeWeather.forecast} />
              </div>
            )}
          </>
        )}

        {/* Premium footer credits */}
        <footer className="text-center text-white/30 text-xs font-semibold py-4 border-t border-white/5 tracking-wider mt-4">
          AeroSky Weather Dashboard &copy; {new Date().getFullYear()} &bull; Built with React & Tailwind CSS
        </footer>

      </div>
    </div>
  );
}
