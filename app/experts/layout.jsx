import AcneFooter from "@/components/generic/AcneFooter";
import AcneMarqueeBanner from "@/components/generic/AcneMarqueeBanner";
import BreadcrumbNavigator from "@/components/generic/BreadcrumbNavigator";
import AcneHeader from "@/components/generic/Header/AcneHeader";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <AcneMarqueeBanner />
      <div className="sticky top-0 z-50 bg-white">
        <AcneHeader />
      </div>
      <div className="px-4 md:px-10 mx-auto mt-4">
        <BreadcrumbNavigator/>
      </div>
      <div className="px-4 md:px-10 mx-auto -mt-10">{children}</div>
      <AcneFooter />
    </div>
  );
};

export default layout;
