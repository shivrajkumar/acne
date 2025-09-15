import AcneFooter from "@/components/generic/AcneFooter";
import AcneHeader from "@/components/generic/Header/AcneHeader";
import AcneMarqueeBanner from "@/components/generic/AcneMarqueeBanner";
import React from "react";

const Layout = ({ children }) => {
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

export default Layout;
