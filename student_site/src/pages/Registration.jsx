import React, { useState } from "react";
import PageReveal from "../components/common/PageReveal";

function Registration() {
  const [showReveal, setShowReveal] = useState(true);

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-[#FFFAE9]">
      {/* Page Reveal Animation */}
      {showReveal && <PageReveal onComplete={() => setShowReveal(false)} />}

      {/* Main Content */}
      <div
        className={`w-full h-full flex items-center justify-center transition-opacity duration-75 ${
          showReveal ? "opacity-100" : "opacity-100"
        }`}
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-[inter-extra] text-black mb-4">
            Registration
          </h1>
          <p className="text-lg md:text-xl font-[Jost-Bold] text-gray-700">
            Welcome! Let's get you started.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;
