import { Suspense } from "react";
import AcneMarqueeBanner from "@/components/generic/AcneMarqueeBanner";
import AcneFooter from "@/components/generic/AcneFooter";
import AcneHeader from "@/components/generic/AcneHeader";
import AcneReviewPage from "../../components/reviews/AcneReviewPage";

export default function page() {
  return (
    <>
      <Suspense>
          <AcneMarqueeBanner />
          <div className=" sticky top-0 z-50">
            <AcneHeader />
         </div>
        <AcneReviewPage />
        <AcneFooter />
      </Suspense>
    </>
  );
}

export async function generateMetadata() {
  return {
    title: "Clear Ritual Reviews: Real Acne Transformations & Success Stories",
    description:
      "See how Clear Ritual has helped thousands achieve clear, healthy skin. Read verified customer reviews and acne success stories from real users.",
    openGraph: {
      type: "website",
      title:
        "Clear Ritual Reviews: Real Acne Transformations & Success Stories",
      description:
        "Read verified customer reviews and success stories. See how Clear Ritual helps people achieve clear, healthy skin.",
    },
    twitter: {
      card: "summary_large_image",
      title: "Clear Ritual Reviews: Real Acne Success Stories",
      description:
        "See real customer success stories and discover how Clear Ritual delivers clear, healthy skin.",
    },
  };
}
