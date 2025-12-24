import { useState, useEffect } from 'react';

export const useCountdown = (initialMinutes: number = 1, initialSeconds: number = 5) => {
  const [time, setTime] = useState({ minutes: initialMinutes, seconds: initialSeconds });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev.seconds > 0) {
          return { ... prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = `${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;

  return formattedTime;
};