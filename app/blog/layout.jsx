import AcneFooter from "@/components/generic/AcneFooter";
import AcneMarqueeBanner from "@/components/generic/AcneMarqueeBanner";
import AcneHeader from "@/components/generic/Header/AcneHeader";
import React from "react";

function Layout({ children }) {
  return (
    <div>
      {/* Sticky wrapper for header + banner only */}
      <div className="sticky top-0 z-50">
        <AcneMarqueeBanner />
        <AcneHeader />
      </div>

      {/* Main content */}
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 mx-auto">
        {children}
      </div>

      <AcneFooter />
    </div>
  );
}

export default Layout;
