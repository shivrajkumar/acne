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
        Treat the Acne Trigger - Not Just the Symptoms
      </h2>

      {/* Paragraph */}
      <p className="mt-4 text-sm md:text-[16px] font-sophiaPro md:text-lg text-gray-700 text-left">
        Take our skin diagnostic to find your acne triggers - and the exact supplement your body needs to stop acne from coming back.
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
