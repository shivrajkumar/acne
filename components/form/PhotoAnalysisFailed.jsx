"use client";

import { useContext, useEffect } from "react";
import { QuestionsContext } from "@/context/questions-store";

const PhotoAnalysisFailed = ({ onContinue }) => {
  const { nextQuestion, currentQuestion } = useContext(QuestionsContext);

  useEffect(() => {
    // Auto-continue after 5 seconds
    const timer = setTimeout(() => {
      if (onContinue) {
        onContinue();
      } else {
        // Move to next question in the flow
        nextQuestion(currentQuestion.id, "photo_analysis_failed");
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [onContinue, nextQuestion, currentQuestion]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white">
      <div className="flex flex-col items-center justify-center max-w-2xl mx-auto gap-4">
        {/* Warning Icon */}
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-gray-300"></div>
          <span className="absolute inset-0 flex items-center justify-center text-3xl font-light text-gray-700">
            !
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-[400] text-[28px] md:text-[40px] text-black text-center leading-tight">
          We couldn't analyse this photo.
        </h1>

        {/* Description */}
        <p className="font-[400] text-[14px] md:text-[16px] text-gray-500 text-center max-w-md leading-relaxed">
          This may be due to low lighting or because the photo doesn't clearly show your face.
        </p>

        {/* Auto-continue message */}
        <p className="mt-6 text-[14px] text-gray-400 text-center">
          Continuing with questions...
        </p>
      </div>
    </div>
  );
};

export default PhotoAnalysisFailed;