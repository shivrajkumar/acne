import { Suspense } from "react";
import ResultLandingPage from "@/components/result/ResultLandingPage";
import ShopfloScriptScript from "@/constants/shopflowbridge";


export default function page({ params, searchParams }) {
  return (
    <>
      <Suspense>
        <ResultLandingPage params={params} searchParams={searchParams} />
      </Suspense>
      <ShopfloScriptScript />
    </>
  );
}

export async function generateMetadata() {
  return {
    title: "Your Clear Ritual Acne Results | Personalised by Skin Experts",
    description:
      "Based on your skin test results, here’s your expert-designed acne treatment plan. This routine is personalised for your skin type, triggers, and current concerns.",
  };
}
