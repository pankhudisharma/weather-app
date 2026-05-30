import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

// Debounce hook
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 300);

  useEffect(() => {
    if (debouncedInput) {
      onSearch(debouncedInput);
    }
  }, [debouncedInput, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form className="flex items-center gap-2 glass-input" onSubmit={handleSubmit}>
      <Search className="w-5 h-5 text-white/70" />
      <input
        type="text"
        placeholder="Search city..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 py-1 bg-white/10 hover:bg-white/20 rounded transition"
      >
        Search
      </button>
    </form>
  );
}
