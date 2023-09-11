import { useEffect, useRef } from 'react';
import './useRender.css';

export const useRender = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.classList.add('rerender-effect');

      const timeoutId = setTimeout(() => {
        elementRef.current?.classList.remove('rerender-effect');
      }, 700);

      return () => clearTimeout(timeoutId);
    }
  });

  return elementRef;
};
