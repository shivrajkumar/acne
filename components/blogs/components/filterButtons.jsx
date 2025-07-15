"use client";
import React from "react";
import { Button } from "antd";

const FilterButtons = ({ filters, onClick, selectedFilter }) => {

  return (
    <div className="mt-4 flex gap-3 overflow-x-auto hide-scrollbar">
      {filters.map((item) => (
        <Button
          key={item}
          type="primary"
          className={`font-sophiaPro rounded-3xl px-5 transition-all duration-200 ${
            selectedFilter === item
              ? "bg-blue-500 text-white"
              : "bg-white text-black border border-gray-300"
          }`}
          onClick={() => onClick(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default FilterButtons;