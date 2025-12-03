"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import progressIcon from "@assets/images/SVG.png";
import Image from "next/image";

export default function UploadSuccessModal({ isOpen, onClose, caseId }) {
  const router = useRouter();
  const sheetRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Detect desktop
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  const handleReorderNow = () => {
    router.push(`/recommendedcart/${caseId}`);
  };

  if (!isOpen) return null;

  // ---- Drag only for MOBILE ----
  const onDragStart = (e) => {
    if (isDesktop) return;
    setIsDragging(true);
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
  };

  const onDragMove = (e) => {
    if (!isDragging || isDesktop) return;
    currentY.current = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = currentY.current - startY.current;
    if (delta > 0) setTranslateY(delta);
  };

  const onDragEnd = () => {
    if (isDesktop) return;
    setIsDragging(false);
    if (translateY > window.innerHeight * 0.4) onClose();
    else setTranslateY(0);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center px-4 pointer-events-none">
        <div
          ref={sheetRef}
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={onDragStart}
          onTouchMove={onDragMove}
          onTouchEnd={onDragEnd}
          style={{
            transform: `translateY(${isDesktop ? 0 : translateY}px)`,
            transition: isDragging ? "none" : "transform 0.25s ease",
          }}
          className={`
            pointer-events-auto bg-white w-full max-w-md
            absolute bottom-0 left-0 right-0
            shadow-2xl rounded-t-3xl
            animate-slide-up

            ${isDesktop ? "md:relative md:rounded-2xl md:mx-0 md:animate-fade-in" : ""}
          `}
        >
          {/* --- HANDLE (Mobile only) --- */}
          {!isDesktop && (
            <div className="w-full flex justify-center py-3">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
            </div>
          )}

          <div className="relative px-6 pb-8 pt-2 md:px-8 md:py-10 text-center">

            {/* --- DESKTOP CLOSE BUTTON --- */}
            {isDesktop && (
              <button
                onClick={onClose}
                className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 transition shadow-md z-20"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}

            {/* Content */}
            <div className="flex items-center gap-3 mb-6 justify-start">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image src={progressIcon} alt="Progress Icon" width={24} height={24} />
              </div>
              <p className="text-gray-700 text-[16px] font-medium">
                Your progress is our mission.
              </p>
            </div>

            <h2 className="text-[32px] md:text-4xl font-normal text-gray-900 mb-4">
              Uploaded!
            </h2>

            <p className="text-gray-600 text-[16px] mb-8 leading-relaxed max-w-xs mx-auto">
              Your photo is used by our doctors to generate your next month’s prescription.
            </p>

            <button
              onClick={handleReorderNow}
              className="w-full bg-[#5B5FED] hover:bg-[#4B4FDD] text-white font-[500] py-4 px-6 rounded-full text-[16px] transition"
            >
              Re-Order Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
