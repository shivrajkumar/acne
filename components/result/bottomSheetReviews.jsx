"use client";
import React from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";

const ReviewCard = ({ name, location, review, rating, date }) => {
  // Generate stars dynamically
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        // Full star
        stars.push(<StarFilled key={i} className="text-[#FACC15] text-[16px]" />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        // Half star effect using opacity
        stars.push(
          <StarFilled
            key={i}
            className="text-[#FACC15] text-[16px]"
            style={{ clipPath: "inset(0 50% 0 0)" }} // shows half star
          />
        );
      } else {
        // Empty star
        stars.push(<StarOutlined key={i} className="text-gray-300 text-[16px]" />);
      }
    }
    return stars;
  };

  return (
    <div className="w-full max-w-full border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
      {/* Date */}
      <p className="text-sm text-gray-500 mb-2">{date}</p>

      {/* Name & Location */}
      <h3 className="text-lg md:text-2xl font-semibold text-[#0F172A] mb-2">
        {name}, {location}
      </h3>

      {/* Review Text */}
      <p className="text-gray-700 text-sm md:text-[16px] leading-relaxed mb-4">{review}</p>

      {/* Rating */}
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium text-gray-800">{rating}</span>
        {renderStars()}
      </div>
    </div>
  );
};

export default ReviewCard;
