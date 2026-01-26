import { useState, useEffect, useCallback } from 'react';

export function useIdleDetection(timeout: number = 180000) {
  const [isIdle, setIsIdle] = useState(false);

  const handleActivity = useCallback(() => {
    setIsIdle(false);
  }, []);

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(idleTimer);
      setIsIdle(false);
      idleTimer = setTimeout(() => setIsIdle(true), timeout);
    };

    // Events that indicate user activity
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
    ];

    events.forEach((event) => {
      document.addEventListener(event, resetTimer, true);
    });

    // Start the timer
    resetTimer();

    return () => {
      clearTimeout(idleTimer);
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer, true);
      });
    };
  }, [timeout]);

  return isIdle;
}
