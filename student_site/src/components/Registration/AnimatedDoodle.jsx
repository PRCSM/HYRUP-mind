import React from "react";

function AnimatedDoodle({ src, alt, className = "" }) {
  return (
    <div className={`animated-doodle ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain animate-float"
      />
    </div>
  );
}

export default AnimatedDoodle;
