import { useState, useEffect, useRef } from 'react';

const useLocalStorage = (key, initialValue) => {
  const keyRef = useRef(key);
  const initialValueRef = useRef(initialValue);
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValueRef.current;
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);
      return initialValueRef.current;
    }
  });

  const storedValueRef = useRef(storedValue);
  storedValueRef.current = storedValue;

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValueRef.current) : value;
      const valueToStoreStr = JSON.stringify(valueToStore);
      
      // Only update if the value is different
      if (JSON.stringify(storedValueRef.current) !== valueToStoreStr) {
        setStoredValue(valueToStore);
        window.localStorage.setItem(keyRef.current, valueToStoreStr);
      }
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === keyRef.current && e.newValue !== null) {
        try {
          const newValue = JSON.parse(e.newValue);
          if (JSON.stringify(storedValueRef.current) !== e.newValue) {
            setStoredValue(newValue);
          }
        } catch (error) {
          console.error(`Error processing storage event: ${error}`);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return [storedValue, setValue];
};

export default useLocalStorage;