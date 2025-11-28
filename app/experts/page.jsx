import React from "react";
import AcneExpertsPage from "../../components/experts/AcneExperts";
import ExpertsPage from "@/components/experts-revamp/experts-main";

export default function page() {
  return (
    <>
      {/* <AcneExpertsPage/> */}
      <ExpertsPage/>
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
