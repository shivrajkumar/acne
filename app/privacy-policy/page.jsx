import { Suspense } from "react";
import PrivacyAndPrivacyPage from "../../components/privacy-policy/PrivacyPolicyPage";
import AcneMarqueeBanner from "@/components/generic/AcneMarqueeBanner";
import AcneHeader from "@/components/generic/Header/AcneHeader";
import AcneFooter from "@/components/generic/AcneFooter";

export default function page() {
  return (
    <>
      <Suspense>
        <AcneMarqueeBanner />
        <div className="sticky top-0 z-50">
          <AcneHeader />
        </div>

        <PrivacyAndPrivacyPage />
        <AcneFooter />
      </Suspense>
    </>
  );
}
