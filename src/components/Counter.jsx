import React, { useEffect, useRef, useState } from "react";

const __animatedOnce = new Set();

const Counter = ({ targetNumber, label, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const frame = useRef(null);

  const key = label || String(targetNumber);

  const easeOutQuad = (t) => t * (2 - t);

  useEffect(() => {

    if (__animatedOnce.has(key)) {
      setCount(targetNumber);
      return;
    }

    let observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          animate();
          observer.disconnect(); 
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  
  }, [key, targetNumber]); 

  const animate = () => {
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = easeOutQuad(progress);

      setCount(Math.floor(easedProgress * targetNumber));

      if (progress < 1) {
        frame.current = requestAnimationFrame(step);
      } else {
        setCount(targetNumber);
        __animatedOnce.add(key); 
      }
    };

    frame.current = requestAnimationFrame(step);
  };

  return (
    <div ref={ref} className="counter-item">
      <h2>{count.toLocaleString()}+</h2>
      <p>{label}</p>
    </div>
  );
};

export default Counter;
