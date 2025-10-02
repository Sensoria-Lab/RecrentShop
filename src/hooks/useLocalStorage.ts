import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for managing localStorage with React state
 * Automatically syncs state with localStorage
 * 
 * @param key - localStorage key
 * @param initialValue - Initial value if key doesn't exist
 */
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  // Initialize state with value from localStorage or initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error loading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error saving localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Wrapped setter for better performance
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
};
