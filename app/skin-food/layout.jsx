'use client'
import AcneFooter from "@/components/generic/AcneFooter";
import AcneHeader from "@/components/generic/Header/AcneHeader";
import AcneMarqueeBanner from "@/components/generic/AcneMarqueeBanner";
import React from "react";
import useMediaLoader from "@/hooks/useMediaLoader";
import Loader from "@/components/generic/Loader";

const Layout = ({ children }) => {
  const isLoading = useMediaLoader({
    minLoadingTime: 2000,
    maxLoadingTime: 3000,
    transitionDelay: 1500
  });

  if (isLoading) {
    return <Loader />;
  }
  
  return (
    <div>
      <AcneMarqueeBanner />
      <div className="sticky top-0 z-50 bg-white">
        <AcneHeader />
      </div>
      {children}
      <AcneFooter />
    </div>
  )
};

export default Layout;