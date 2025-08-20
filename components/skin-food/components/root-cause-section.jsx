'use client'
import Image from "next/image";
import RootCauseImage from "@assets/images/root-cause-circles.png";
import RootCauseImageMobile from '@assets/images/root-cause-circles-mobile.png'
import useMediaQuery from "@/hooks/useMediaQuerry";

export default function RootCauseSection() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <section className="w-full px-4 md:px-10 py-12 md:py-10">
      {/* Heading */}
      <h2 className="text-2xl md:text-[40px] font-sophiaPro font-normal text-gray-900 text-left">
        Address the root-cause, not just the symptoms.
      </h2>

      {/* Paragraph */}
      <p className="mt-4 text-sm md:text-[16px] font-sophiaPro md:text-lg text-gray-700 text-left">
        When we get acne, we often reach for a new serum or drink more water,
        hoping for a quick fix. But the truth is, our skin reflects our internal
        health. Often, the root cause lies deeper, in your liver, gut, or
        hormones. That&apos;s why our formulations are designed with this
        holistic approach in mind. Explore the feature below to see how
        interconnected our health truly is!
      </p>

      {/* Image Section */}
      <div className="mt-10 flex justify-center">
        <Image
          src={isMobile ? RootCauseImageMobile : RootCauseImage}
          alt="Root cause vs clear skin diagram"
          className="w-full  h-auto rounded-2xl"
          priority
        />
      </div>
    </section>
  );
}
