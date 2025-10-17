"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { ReactSVG } from "react-svg";

const DiagnosisBottomSheet = ({
  isOpen,
  onClose,
  data,
  originalImageWithoutMask,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const isDataLoaded = useMemo(() => {
    return data && Object.keys(data).length > 0;
  }, [data]);

  const progressWidth = useMemo(() => {
    return Math.min(100, Math.max(0, data?.score || 0));
  }, [data?.score]);

  // Check if current diagnosis is papules or pustules
  const isPapulesOrPustules = useMemo(() => {
    const name = data?.name?.toLowerCase() || "";
    return name.includes("papules") || name.includes("pustules");
  }, [data?.name]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  }, [onClose]);

  const handleSvgInjection = useCallback((svg) => {
    svg.setAttribute(
      "style",
      "width: 100%; height: 100%; max-width: 100%; max-height: 100%;",
      "object-fit: cover" 
    );
    svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
  }, []);

  if (!isOpen && !isVisible) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-50 ${
          isVisible ? "bg-opacity-50" : "bg-opacity-0"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-2xl z-50 transition-transform duration-300 ease-out max-h-[90vh] overflow-y-auto ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="diagnosis-title"
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
            <h2
              id="diagnosis-title"
              className="text-2xl font-medium text-[#1b1f26] tracking-[-0.96px]"
            >
              {data?.name || "Diagnosis"}
            </h2>
          </div>
        </div>

        {/* Content */}
        {!isDataLoaded ? (
          /* Loader */
          <div className="flex flex-col items-center justify-center p-8 min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4" />
            <p className="text-gray-500 text-center">Loading diagnosis...</p>
          </div>
        ) : (
          <>
            {/* Image Section with overlay */}
            {data?.image && (
              <div className="px-4 pt-4">
                <div className="h-[354px] md:h-auto overflow-hidden rounded-2xl bg-gray-50 relative">
                  {/* Background: Original face photo */}
                  {originalImageWithoutMask && (
                    <img
                      src={originalImageWithoutMask}
                      alt={data.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}

                  {/* Foreground: SVG mask overlay */}
                  <div className="absolute inset-0 w-full h-full">
                    <ReactSVG
                      src={data.image}
                      beforeInjection={handleSvgInjection}
                      wrapper="div"
                      className="w-full h-full"
                      loading={() => (
                        <div className="animate-pulse bg-gray-200 w-full h-full" />
                      )}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Content Section */}
            <div className="p-4 pb-8">
              {/* Metric Section */}
              <div className="bg-white mb-6">
                {/* Score with conditional display */}
                {isPapulesOrPustules ? (
                  // Just show the score for papules/pustules
                  <div className="flex items-center">
                    <span className="text-2xl font-medium text-[#1b1f26]">
                      {data?.score || 0}
                    </span>
                  </div>
                ) : (
                  // Show score with progress bar for others
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
                        className="h-full rounded-full transition-all duration-500 bg-blue-500"
                        style={{ width: `${progressWidth}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Description Text */}
              {data?.description && (
                <div className="text-[16px] text-gray-600 leading-relaxed">
                  {data.description}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DiagnosisBottomSheet;