
import AboutUsMainComponent from "../../components/about-us/AboutUsMainComponent";

export default function page() {
  return (
    <>
      <AboutUsMainComponent />
    </>
  );
}

export async function generateMetadata() {
  return {
    title: "Clear Ritual | About Us",
    description:
      "Discover how Clear Ritual blends dermatology, Ayurveda, and advanced science to create personalised acne treatments. Meet our experts and learn how we help you achieve clear, healthy skin.",
    openGraph: {
      type: "website",
      title: "About Clear Ritual: Expert-Led Personalised Acne Solutions",
      description:
        "Learn how Clear Ritual combines dermatology, Ayurveda, and science to create personalised acne treatments for clear, healthy skin.",
    },
    twitter: {
      card: "summary_large_image",
      title: "About Clear Ritual: Personalised Acne Solutions",
      description:
        "Discover how Clear Ritual crafts personalised, science-backed acne solutions with expert dermatologists and Ayurvedic insights.",
    },
  };
}

