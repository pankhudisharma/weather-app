import React from 'react';
import { CalendarDays } from 'lucide-react';
import ForecastCard from './ForecastCard';

/**
 * ForecastSection Component
 * Houses the heading and a responsive grid layout of ForecastCards.
 * 
 * @param {array} forecastList - Array of forecast items (5 days total)
 */
export default function ForecastSection({ forecastList }) {
  
  // Guard clause in case forecastList is not available (e.g., city not found)
  if (!forecastList || forecastList.length === 0) {
    return null;
  }

  return (
    <section className="w-full space-y-4">
      
      {/* Section Header */}
      <div className="flex items-center gap-2 px-1">
        <CalendarDays className="w-5 h-5 text-sky-400 animate-pulse" />
        <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white/90 m-0">
          5-Day Extension Forecast
        </h3>
      </div>

      {/* Grid Container for ForecastCards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {forecastList.map((item, index) => (
          <ForecastCard key={`${item.day}-${index}`} item={item} />
        ))}
      </div>

    </section>
  );
}
