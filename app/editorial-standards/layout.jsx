import AcneFooter from "@/components/generic/AcneFooter";
import AcneMarqueeBanner from "@/components/generic/AcneMarqueeBanner";
import AcneHeader from "@/components/generic/Header/AcneHeader";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <AcneMarqueeBanner />
      <AcneHeader />
      {children}
      <AcneFooter />
    </div>
  );
};

export default Layout;
