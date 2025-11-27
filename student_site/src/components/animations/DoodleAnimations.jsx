import React from "react";

// Common styles for the doodle effect
const styles = `
  @keyframes draw {
    from { stroke-dashoffset: 1000; }
    to { stroke-dashoffset: 0; }
  }
  @keyframes wiggle {
    0%, 100% { transform: rotate(-3deg); }
    50% { transform: rotate(3deg); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .doodle-draw {
    stroke-dasharray: 1000;
    animation: draw 1.5s ease-out forwards;
  }
  .doodle-wiggle {
    animation: wiggle 2s ease-in-out infinite;
  }
  .doodle-float {
    animation: float 3s ease-in-out infinite;
  }
  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }
`;

export const SuccessDoodle = () => (
  <div className="w-48 h-48 mx-auto relative">
    <style>{styles}</style>
    <svg viewBox="0 0 200 200" className="w-full h-full doodle-float">
      {/* Star */}
      <path
        d="M100 20 L125 80 L190 80 L140 120 L160 180 L100 140 L40 180 L60 120 L10 80 L75 80 Z"
        fill="#FFD54F"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="doodle-draw"
      />
      {/* Face */}
      <path
        d="M70 100 Q80 110 90 100"
        stroke="black"
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M110 100 Q120 110 130 100"
        stroke="black"
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M80 130 Q100 150 120 130"
        stroke="black"
        strokeWidth="4"
        fill="none"
      />

      {/* Sparkles */}
      <path
        d="M160 40 L170 20 L180 40 L200 50 L180 60 L170 80 L160 60 L140 50 Z"
        fill="#96E7E5"
        stroke="black"
        strokeWidth="2"
        className="animate-pulse"
      />
      <path
        d="M30 40 L40 20 L50 40 L70 50 L50 60 L40 80 L30 60 L10 50 Z"
        fill="#FFB3B3"
        stroke="black"
        strokeWidth="2"
        className="animate-pulse delay-75"
      />
    </svg>
  </div>
);

export const FailureDoodle = () => (
  <div className="w-48 h-48 mx-auto relative">
    <style>{styles}</style>
    <svg viewBox="0 0 200 200" className="w-full h-full doodle-wiggle">
      {/* Cloud */}
      <path
        d="M40 100 Q20 100 20 80 Q20 50 50 50 Q60 20 100 20 Q140 20 150 50 Q180 50 180 80 Q180 100 160 100 Z"
        fill="#E0E0E0"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="doodle-draw"
      />
      {/* Sad Face */}
      <path d="M70 70 L80 80 M80 70 L70 80" stroke="black" strokeWidth="3" />
      <path
        d="M120 70 L130 80 M130 70 L120 80"
        stroke="black"
        strokeWidth="3"
      />
      <path
        d="M80 90 Q100 80 120 90"
        stroke="black"
        strokeWidth="3"
        fill="none"
      />

      {/* Rain */}
      <line
        x1="60"
        y1="110"
        x2="50"
        y2="140"
        stroke="#4285F4"
        strokeWidth="3"
        strokeLinecap="round"
        className="animate-bounce delay-0"
      />
      <line
        x1="100"
        y1="110"
        x2="100"
        y2="150"
        stroke="#4285F4"
        strokeWidth="3"
        strokeLinecap="round"
        className="animate-bounce delay-100"
      />
      <line
        x1="140"
        y1="110"
        x2="150"
        y2="140"
        stroke="#4285F4"
        strokeWidth="3"
        strokeLinecap="round"
        className="animate-bounce delay-200"
      />
    </svg>
  </div>
);

export const MuscleDoodle = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-16 h-16 absolute -top-4 -right-2 md:-right-8 animate-bounce opacity-80"
  >
    <path
      d="M20 60 Q20 40 40 40 Q50 20 70 30 Q90 40 80 60 L80 80 L20 80 Z"
      fill="#FFB3B3"
      stroke="black"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M40 80 L40 60" stroke="black" strokeWidth="2" />
  </svg>
);

export const VibeDoodle = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-16 h-16 absolute -top-6 -right-4 md:-right-8 animate-spin-slow opacity-80"
  >
    <path
      d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z"
      fill="#96E7E5"
      stroke="black"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="50"
      cy="50"
      r="10"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
  </svg>
);

export const ThinkingDoodle = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-12 h-12 absolute -top-4 -right-4 animate-pulse opacity-80"
  >
    <path
      d="M30 40 Q30 20 50 20 Q70 20 70 40 Q70 50 50 60 L50 70"
      fill="none"
      stroke="black"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <circle cx="50" cy="85" r="4" fill="black" />
    <path
      d="M20 20 L30 30 M80 20 L70 30 M50 10 L50 15"
      stroke="black"
      strokeWidth="3"
    />
  </svg>
);
