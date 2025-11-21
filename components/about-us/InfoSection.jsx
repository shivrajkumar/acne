"use client";

import { CDN_BASE_URL } from "@/constants/constants";
import MainInfo from "./MainInfo";

const featuresList = ["Innovation", "Sustainability", "Transparency"];

const InfoSection = () => {
  return (
    <div>
      <MainInfo
        heading="Expert-Approved, Research-Driven"
        description="We cut through the noise with dermatologist-led expertise and clear science. Our team deeply studies every ingredient, formulation, and proven treatment to ensure each recommendation is not only safe, but truly effective for your unique acne concerns."
        buttonText="TAKE THE SKIN DIAGNOSIS"
        imageSrc={`${CDN_BASE_URL}website_images/clear_rituals/about_us_page/page-info-one.webp`}
        imageAlt="Skincare first banner"
        imagePosition="right"
        contentBg="bg-Background/Beige"
      />

      <MainInfo
        heading="Ayurveda, Dermatology & Modern Science—Stronger Together"
        description="Ayurveda views your skin as a mirror of internal balance, while dermatology brings clinical precision to understand acne at its root. Together, they help us create holistic, effective, and research-backed solutions for clear, healthy skin."
        buttonText="TAKE THE SKIN DIAGNOSIS"
        imageSrc={`${CDN_BASE_URL}website_images/clear_rituals/about_us_page/page-info-two.webp`}
        imageAlt="Natural product image"
        imagePosition="left"
      />

      <MainInfo
        heading="Our Commitment: Integrity, Innovation, and Impact"
        description="We prioritise what truly matters: honest, transparent choices, smarter science-backed solutions, and a lasting impact not just on your skin’s health, but also on the health of our planet."
        features={featuresList}
        buttonText="TAKE THE SKIN DIAGNOSIS"
        imageSrc={`${CDN_BASE_URL}website_images/clear_rituals/about_us_page/page-info-three.webp`}
        imageAlt="Natural product image"
        imagePosition="right"
        contentBg="bg-Background/Beige"
      />

      <MainInfo
        description="At Clear Ritual, we hold ourselves to the highest standards. We cut through the hype to focus only on what genuinely works for your acne. No empty promises, no harsh ingredients—just science-backed, dermatologist-approved solutions for clear, healthy skin."
        descriptionClassName="md:text-[36px] font-[400] md:p-[60px] px-2 text-[28px] font-sophiaPro !leading-[130%] tracking-[-0.02em] font-heading"
        imageSrc={`${CDN_BASE_URL}website_images/clear_rituals/about_us_page/page-info-four.webp`}
        imageAlt=""
        imagePosition="left"
      />
    </div>
  );
};

export default InfoSection;
