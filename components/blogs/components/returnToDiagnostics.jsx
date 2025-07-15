"use client";
import { Button } from "antd";
import React from "react";

const ReturnToDiagnostic = ({ onClick }) => {
  return (
    <div className="w-full flex justify-between items-center py-4 border-t border-b border-gray-200 bg-white">
      <span className="text-sm md:text-[24px] font-extralight text-black font-sophiaPro">
        Return to the result of your diagnostic
      </span>

      <Button
        onClick={onClick}
        className="px-6 md:px-5 py-4 md:py-6 text-sm font-normal md:font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
      >
        My Diagnostic
      </Button>
    </div>
  );
};

export default ReturnToDiagnostic;