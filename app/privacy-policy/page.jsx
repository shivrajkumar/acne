import { Suspense } from "react";
import PrivacyAndPrivacyPage from "../../components/privacy-policy/PrivacyPolicyPage";
import AcneMarqueeBanner from "@/components/generic/AcneMarqueeBanner";
import AcneHeader from "@/components/generic/AcneHeader";
import AcneFooter from "@/components/generic/AcneFooter";

export default function page() {
  return (
    <>
      <Suspense>
        <AcneMarqueeBanner />
        <AcneHeader />
        <PrivacyAndPrivacyPage />
        <AcneFooter />
      </Suspense>
    </>
  );
}
