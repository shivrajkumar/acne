import { useEffect } from "react";

//  takes a boolean argument `isOpen`

export const useBodyScrollLock = (isOpen) => {
  // useEffect will run on mount and whenever `isOpen` changes
  useEffect(() => {
    // If `isOpen` is true, prevent body from scrolling
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disables scroll
    } else {
      document.body.style.overflow = "unset"; // Enables scroll
    }

    // Cleanup function: ensures scroll is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = "unset"; // Always unlock scroll on cleanup
    };
  }, [isOpen]); 
};