import AcneFooter from "@/components/generic/AcneFooter";
import AcneMarqueeBanner from "@/components/generic/AcneMarqueeBanner";
import AcneHeader from "@/components/generic/Header/AcneHeader";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <AcneMarqueeBanner />
      <div className="sticky top-0 z-50 bg-white">
        <AcneHeader />
      </div>
      {children}
      <AcneFooter />
    </div>
  );
};

export default layout;