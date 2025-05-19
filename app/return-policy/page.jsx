import { Suspense } from "react";
import AcneMarqueeBanner from "@/components/generic/AcneMarqueeBanner";
import AcneHeader from "@/components/generic/AcneHeader";
import AcneFooter from "@/components/generic/AcneFooter";
import ReturnPolicyPage from "@/components/return-policy/ReturnPolicyPage";

export default function page() {
  return (
    <>
      <Suspense>
         <div className=" sticky top-0 z-50">
            <AcneMarqueeBanner />
            <AcneHeader />
         </div>
        <ReturnPolicyPage />
        <AcneFooter />
      </Suspense>
    </>
  );
}
