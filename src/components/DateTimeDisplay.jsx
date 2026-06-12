import React, { useEffect, useState } from "react";

export default function DateTimeDisplay() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000); // update each minute
    return () => clearInterval(timer);
  }, []);

  const formatted = now.toLocaleString(undefined, {
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
