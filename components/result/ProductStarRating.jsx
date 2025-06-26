import React from "react";

const renderStars = (rating, activeColor = "text-yellow-500") => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-[20px] ${
            i < Math.round(rating) ? activeColor : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};
export default renderStars;
