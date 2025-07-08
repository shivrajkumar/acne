import React from "react";
import { Suspense } from "react";
import AcneHeader from "@/components/generic/AcneHeader";
import AcneMarqueeBanner from "@/components/generic/AcneMarqueeBanner";
import AcneFooter from "@/components/generic/AcneFooter";
import FAQBanner from "./FAQBanner";

const AcneFAQPage = () => {
  return (
    <>
      <AcneMarqueeBanner />
      <div className=" sticky top-0 z-50">
        <AcneHeader />
      </div>

      <Suspense>
        <FAQBanner/>
      </Suspense>

      <AcneFooter />
    </>
  );
};

export default AcneFAQPage;
