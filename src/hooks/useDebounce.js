import { useCallback, useRef } from 'react';

//reuseable debounce custom hook to prevent overlap api calls
export const useDebounce = (callback, delay) => {
  const timeoutRef = useRef();

  const debouncedCallback = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  return debouncedCallback;
}