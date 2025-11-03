"use client";
import React from "react";
import { StarFilled } from "@ant-design/icons"; // Ant Design icon

const ReviewCard = ({ name, location, review, rating }) => {
  function getRandomPastDate(daysAgo = 30) {
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - Math.floor(Math.random() * daysAgo));
    return past;
  }

  return (
    <div className="w-full max-w-full border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
      {/* Date */}
      <p className="text-sm text-gray-500 mb-2">
        {new Date(getRandomPastDate(90)).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>
      {/* Name & Location */}
      <h3 className="text-lg md:text-2xl font-semibold text-[#0F172A] mb-2">
        {name}, {location}
      </h3>

      {/* Review Text */}
      <p className="text-gray-700 text-sm md:text-[16px] leading-relaxed mb-4">
        {review}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium text-gray-800">{rating}</span>
        {Array.from({ length: 5 }).map((_, index) => (
          <StarFilled
            key={index}
            className={`text-[16px] ${
              index < Math.floor(rating)
                ? "text-[#FACC15]"
                : index < rating
                ? "text-[#FACC15]/50"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
