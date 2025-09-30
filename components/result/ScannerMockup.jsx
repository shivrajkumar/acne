"use client";

import { useEffect, useState } from "react";

export default function ScannerBox() {
  const [direction, setDirection] = useState("down");

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection((prev) => (prev === "down" ? "up" : "down"));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-md h-[250px] mx-auto rounded-xl border border-gray-300 overflow-hidden shadow-sm bg-white">
      <div
        className="absolute left-0 w-full h-32 pointer-events-none"
        style={{
          top: direction === "down" ? "80%" : "5%",
          transition: "top 1s ease-in-out",
          backgroundImage: `
            radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0))
          `,
          backgroundSize: "12px 12px, 100% 100%",
          backdropFilter: "blur(2px)",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-grey/200 shadow-lg" />
      </div>
    </div>
  );
}
