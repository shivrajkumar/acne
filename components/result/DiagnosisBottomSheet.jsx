"use client";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { ReactSVG } from "react-svg";

const DiagnosisBottomSheet = React.memo(
  ({ isOpen, onClose, data, originalImageWithoutMask }) => {
    const [isVisible, setIsVisible] = useState(false);

    /** Memoize the diagnosis name and score to prevent unnecessary reads */
    const score = data?.score || 0;
    const diagnosisName = data?.name || "";

    /** Memoized progress bar width */
    const progressWidth = useMemo(
      () => Math.min(100, Math.max(0, score)),
      [score]
    );

    /** Memoized check for papules or pustules */
    const isPapulesOrPustules = useMemo(() => {
      const name = diagnosisName.toLowerCase();
      return name.includes("papules") || name.includes("pustules");
    }, [diagnosisName]);

    /** Animate bottom-sheet */
    useEffect(() => {
      if (isOpen) {
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
      } else {
        setIsVisible(false);
      }
    }, [isOpen]);

    /** Prevent body scroll when bottom sheet is open */
    useEffect(() => {
      if (isOpen) {
        // Store original overflow value
        const originalOverflow = document.body.style.overflow;
        // Prevent scrolling
        document.body.style.overflow = "hidden";

        return () => {
          // Restore original overflow when closed
          document.body.style.overflow = originalOverflow;
        };
      }
    }, [isOpen]);

    /** Memoized Close */
    const handleClose = useCallback(() => {
      setIsVisible(false);
      setTimeout(onClose, 250);
    }, [onClose]);

    /** Memoize SVG injection */
    const handleSvgInjection = useCallback((svg) => {
      svg.setAttribute(
        "style",
        "width: 100%; height: 100%; max-width: 100%; max-height: 100%; object-fit: cover"
      );
      svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
    }, []);

    /** Prevent rendering when not needed */
    if (!isOpen && !isVisible) return null;
    if (!data || Object.keys(data).length === 0) return null;

    return (
      <>
        {/* Overlay */}
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
          {/* Header */}
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
                className="text-2xl font-medium text-[#1b1f26]"
              >
                {diagnosisName}
              </h2>
            </div>
          </div>

          {/* Image Section */}
          {data?.image && (
            <div className="px-4 pt-4">
              <div className="h-[354px] md:h-auto overflow-hidden rounded-2xl bg-gray-50 relative">
                {originalImageWithoutMask && (
                  <img
                    src={originalImageWithoutMask}
                    alt={diagnosisName}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                {/* SVG */}
                <div className="absolute inset-0">
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

          {/* Content */}
          <div className="p-4 pb-8">
            {/* Score */}
            <div className="bg-white mb-6">
              {isPapulesOrPustules ? (
                <span className="text-2xl font-medium text-[#1b1f26]">
                  {score}
                </span>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-medium text-[#1b1f26]">
                      {score}
                    </span>
                    <span className="text-xs text-gray-400 pb-1">/100</span>
                  </div>

                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 bg-blue-500"
                      style={{ width: `${progressWidth}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {data?.description && (
              <div className="text-[16px] text-gray-600 leading-relaxed">
                {data.description}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
);

export default DiagnosisBottomSheet;
