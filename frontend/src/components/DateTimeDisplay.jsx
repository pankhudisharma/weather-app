import React, { useEffect, useState } from "react";

export default function DateTimeDisplay() {
  const [now, setNow] = useState(new Date());

  // Update every minute
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Use a consistent locale for deployment environments
  const locale = "en-US"; // fallback locale
  const formatted = now.toLocaleString(locale, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="text-white/70 text-sm flex items-center gap-1 mt-2">
      <span role="img" aria-label="clock">🕒</span>
      <span>{formatted}</span>
    </div>
  );
}
