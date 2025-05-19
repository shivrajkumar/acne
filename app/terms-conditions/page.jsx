import { Suspense } from "react";
import TermsAndConditionsPage from "../../components/terms-conditions/TermsConditionsPage";
import AcneMarqueeBanner from "@/components/generic/AcneMarqueeBanner";
import AcneHeader from "@/components/generic/AcneHeader";
import AcneFooter from "@/components/generic/AcneFooter";

export default function page() {
  return (
    <>
      <Suspense>
       <div className=" sticky top-0 z-50">
          <AcneMarqueeBanner />
          <AcneHeader />
       </div>
        <TermsAndConditionsPage />
        <AcneFooter />
      </Suspense>
    </>
  );
}
