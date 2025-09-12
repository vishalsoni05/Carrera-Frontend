import React, { useEffect } from "react";
import "../index.css";

const Preloader = ({ onFinish, text = "Careera." }) => {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const letters = text.length;
    const stagger = 140;
    const animDur = 900;
    const buffer = 300; 
    const total = letters * stagger + animDur + buffer;

    const t = setTimeout(() => {
      document.body.style.overflow = prevOverflow || "";
      if (typeof onFinish === "function") onFinish();
    }, total);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow || "";
    };
  }, [onFinish, text]);

  return (
    <div className="preloader-root" aria-hidden="true">
      <div className="preloader-stage">
        <div className="preloader-logo" role="img" aria-label={text}>
          {text.split("").map((ch, i) => (
            <span key={i} style={{ animationDelay: `${i * 140}ms` }}>
              {ch}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preloader;
