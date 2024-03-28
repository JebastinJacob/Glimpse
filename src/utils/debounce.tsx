import { useEffect, useState } from "react";

export function useDebounce <T>(value: T, delay: number): T {
    // State to store the debounced value
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
    useEffect(() => {
      // Set up a timeout to update debounced value after the delay
      const timeoutId = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      // Cleanup function to clear the timeout on unmount
      return () => clearTimeout(timeoutId);
    }, [value, delay]); // Re-run effect if value or delay changes
  
    return debouncedValue;
  };