import AcneHeader from "@/components/generic/AcneHeader";
import { Suspense } from "react";
import AcneMarqueeBanner from "@/components/generic/AcneMarqueeBanner";
import AcneExperts from "../../components/experts/AcneExperts";
import AcneFooter from "@/components/generic/AcneFooter";
export default function page() {
  return (
    <>
      
        <AcneMarqueeBanner />
      <div className=" sticky top-0 z-50">
        <AcneHeader />
      </div>

      <Suspense>
        <AcneExperts />
      </Suspense>

      <AcneFooter />
    </>
  );
}

export async function generateMetadata() {
  return {
    title:
      "Meet Our Skin Experts | Clear Ritual Dermatologist-Led Acne Solutions",
    description:
      "Clear Ritual’s dermatologists and skin experts design personalised acne treatments backed by science and experience. Meet the team behind your clear skin journey.",
    openGraph: {
      type: "website",
      title: "Meet Our Experts | Clear Ritual Acne Solutions",
      description:
        "Discover the dermatologists and skin experts creating personalised acne treatments at Clear Ritual.",
    },
    twitter: {
      card: "summary_large_image",
      title: "Meet Our Skin Experts | Clear Ritual",
      description:
        "Clear Ritual’s team of dermatologists create personalised acne treatments for clearer, healthier skin.",
    },
  };
}
