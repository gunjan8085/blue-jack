import React, { useEffect, useRef, useState } from "react";

const CountUp = ({
  className = "tw-font-bold",
  redraw = false,
  children,
  style = {},
  preserveValue = false,
  containerProps = {},
  start = 0,
  end = 100,
  duration = 2,
  onEnd,
  onStart,
  onReset,
  delay = 0,
}) => {
  const [currentValue, setCurrentValue] = useState(start);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!preserveValue || redraw) {
      handleReset();
      startCounting();
    }
    return () => clearInterval(intervalRef.current);
  }, [end, duration, redraw]);

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setCurrentValue(start);
    if (onReset) onReset();
  };

  const startCounting = () => {
    if (onStart) onStart();

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const step = () => {
      const now = Date.now();
      const remaining = Math.max((endTime - now) / 1000, 0);
      const progress = 1 - remaining / duration;

      const value = Math.round(start + progress * (end - start));
      setCurrentValue(value);

      if (now >= endTime) {
        clearInterval(intervalRef.current);
        setCurrentValue(end);
        if (onEnd) onEnd();
      }
    };

    if (delay > 0) {
      setTimeout(() => {
        intervalRef.current = setInterval(step, 100);
        step();
      }, delay * 1000);
    } else {
      intervalRef.current = setInterval(step, 100);
      step();
    }
  };

  if (children) {
    return children({ value: currentValue });
  }

  return (
    <span className="tw-font-bold text-2xl" style={style} {...containerProps}>
      {currentValue}+
    </span>
  );
};

export default CountUp;
