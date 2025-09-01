import React from "react";

const AZTabs = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="flex flex-col text-xs text-black">
      {letters.map((letter) => (
        <span key={letter} className="cursor-pointer hover:text-black">
          {letter}
        </span>
      ))}
    </div>
  );
};

export default AZTabs;
