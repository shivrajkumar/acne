import AcneLandingPage from "../components/landing-page/AcneLandingPage";
import GTMpagelandingEvent from "../components/generic/Gtm";
import React from "react";

const page = () => {
  return (
    <div>
      <AcneLandingPage />
      <GTMpagelandingEvent event={"Vayu Landing"} />
    </div>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: "Clear Ritual: Personalised Acne Solutions Backed by Experts",
    description:
      "Discover Clear Ritual's dermatologist-approved acne treatments. Take our free skin test and get a personalised plan for visible, lasting results.",
    openGraph: {
      type: "website",
      title: "Clear Ritual: Personalised Acne Solutions Backed by Experts",
      description:
        "Discover Clear Ritual's dermatologist-approved acne treatments. Take our free skin test and get a personalised plan for visible, lasting results.",
    },
    twitter: {
      card: "summary_large_image",
      title: "Clear Ritual: Personalised Acne Solutions",
      description:
        "Take the free skin test and discover dermatologist-approved acne treatments, personalised for you.",
    },
  };
}
