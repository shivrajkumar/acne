import React from "react";
import ScienceMain from "@/components/science/science-main";

export async function generateMetadata() {
  return {
    title: "Science Behind Clear Ritual | Acne Treatment Research",
    description: "Discover the science-backed approach to acne treatment. Learn about our 3-layer system combining skincare, Rx, and internal support for clear, healthy skin.",
    openGraph: {
      title: "Science Behind Clear Ritual | Acne Treatment Research",
      description: "Discover the science-backed approach to acne treatment. Learn about our 3-layer system combining skincare, Rx, and internal support for clear, healthy skin.",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Science Behind Clear Ritual | Acne Treatment Research",
      description: "Discover the science-backed approach to acne treatment. Learn about our 3-layer system combining skincare, Rx, and internal support for clear, healthy skin.",
    },
  };
}

export default function SciencePage() {
  return <ScienceMain />;
}
