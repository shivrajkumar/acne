"use client";
import React from "react";
import { StarFilled } from "@ant-design/icons"; // Ant Design icon

const ReviewCard = ({ name, location, review, rating }) => {
  return (
    <div className="w-full max-w-md border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
      {/* Date */}
      <p className="text-sm text-gray-500 mb-2">
        {new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>
      {/* Name & Location */}
      <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
        {name}, {location}
      </h3>

      {/* Review Text */}
      <p className="text-gray-700 text-sm leading-relaxed mb-4">{review}</p>

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
