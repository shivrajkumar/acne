"use client";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";

const DiagnosisBottomSheet = ({ isOpen, onClose, data }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small delay to trigger animation
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  if (!isOpen && !isVisible) return null;

  // Calculate severity level
  const getSeverityLevel = (score) => {
    if (typeof score === "number") {
      if (score === 0) return "None";
      if (score <= 10) return "Mild";
      if (score <= 30) return "Moderate";
      if (score <= 60) return "Concerning";
      return "Severe";
    }
    return "Unknown";
  };

  const getSeverityColor = (score) => {
    if (score <= 10) return "#22c55e"; // Green
    if (score <= 30) return "#f59e0b"; // Yellow
    if (score <= 60) return "#ef4444"; // Red
    return "#dc2626"; // Dark Red
  };

  const severity = data?.tag || getSeverityLevel(data?.score);
  const progressWidth = Math.min(100, Math.max(0, data?.score || 0));

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-50 ${
          isVisible ? "bg-opacity-50" : "bg-opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-2xl z-50 transition-transform duration-300 ease-out max-h-[90vh] overflow-y-auto ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Header with title */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="#1b1f26"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-medium text-[#1b1f26] tracking-[-0.96px]">
              {data?.name || "Diagnosis"}
            </h2>
          </div>
        </div>

        {/* Image Section */}
        {data?.image && (
          <div className="px-4 pt-4">
            <div className="h-[354px] overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center">
              <ReactSVG
                src={data.image}
                beforeInjection={(svg) => {
                  svg.setAttribute(
                    "style",
                    "width: 100%; height: 100%; max-width: 100%; max-height: 100%;"
                  );
                  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
                }}
                wrapper="div"
                className="w-full h-full flex items-center justify-center"
              />
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-4 pb-8">
          {/* Metric Section */}
          <div className="bg-white mb-6">
            <p className="text-base font-medium text-[#1b1f26] mb-2">
              {severity}
            </p>
            
            {/* Score with progress bar */}
            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-1">
                <span className="text-2xl font-medium text-[#1b1f26]">
                  {data?.score || 0}
                </span>
                <span className="text-xs text-gray-400 pb-1">/ 100</span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progressWidth}%`,
                    backgroundColor: getSeverityColor(data?.score),
                  }}
                />
              </div>
            </div>
          </div>

          {/* Description Text */}
          <div className="text-base text-gray-600 leading-relaxed">
            {getDescriptionForCondition(data?.name)}
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function to get descriptions for different skin conditions
const getDescriptionForCondition = (conditionName) => {
  const descriptions = {
    Pores: "Skin usually has pores in different conditions. They contain tiny ostia from either pilosebaceous follicles (with sebaceous glands) or sweat glands that affect their condition. Enlarged, filamented, or black-headed pores require care. The algorithm calculates the size of each pore and the number of pores. The pores are classified into small and large pores. The ratio of skin area covered by large pores is non-linearly transformed to a score that is calculated for different facial areas and the whole face. The higher the value of this parameter, the less large pores you have.",
    Acne: "Acne is a common skin condition that occurs when hair follicles become clogged with oil and dead skin cells. It can cause whiteheads, blackheads, or pimples. Acne is most common among teenagers, though it affects people of all ages. The algorithm identifies and counts different types of acne lesions to provide a comprehensive assessment of acne severity.",
    Wrinkles: "Wrinkles are lines and creases that form in your skin. Some wrinkles can become deep crevices or furrows and may be especially noticeable around your eyes, mouth, and neck. The algorithm analyzes the depth, length, and number of wrinkles to provide an aging assessment score.",
    "Dark Circles": "Dark circles under the eyes are a common concern. They can be caused by various factors including genetics, aging, lack of sleep, and lifestyle factors. The algorithm measures the pigmentation difference between the under-eye area and surrounding skin to quantify dark circle severity.",
    Pigmentation: "Pigmentation refers to the coloring of the skin. Skin pigmentation disorders cause changes to the color of your skin. The algorithm identifies areas of hyperpigmentation or hypopigmentation and calculates their extent and intensity.",
    default: "Our advanced AI algorithm has analyzed your skin to provide detailed insights about this specific condition. The score reflects the current state of your skin, with higher scores indicating better skin health for this parameter.",
  };

  return descriptions[conditionName] || descriptions.default;
};

export default DiagnosisBottomSheet;