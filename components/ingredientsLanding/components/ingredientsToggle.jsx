"use client";

import React, { useState } from "react";

const TogglePill = () => {
  const [selected, setSelected] = useState("Chemical");

  return (
    <div className="relative flex w-full md:w-[220px] h-[40px] bg-white border border-gray-300 rounded-full overflow-hidden mt-10">
      {/* Sliding pill background */}
      <span
        className={`absolute top-0 left-0 h-full w-1/2 bg-blue-600 rounded-full transition-transform duration-300 ease-in-out ${
          selected === "Ayurveda" ? "translate-x-full" : "translate-x-0"
        }`}
      />

      {/* Toggle buttons */}
      <button
        onClick={() => setSelected("Chemical")}
        className={`z-10 w-1/2 text-sm font-medium transition-colors duration-300 ${
          selected === "Chemical" ? "text-white" : "text-gray-700"
        }`}
      >
        Chemical
      </button>
      <button
        onClick={() => setSelected("Ayurveda")}
        className={`z-10 w-1/2 text-sm font-medium transition-colors duration-300 ${
          selected === "Ayurveda" ? "text-white" : "text-gray-700"
        }`}
      >
        Ayurveda
      </button>
    </div>
  );
};

export default TogglePill;