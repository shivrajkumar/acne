import Image from "next/image";
import skinCareAndRootCause from '@assets/images/skin care - root cause venn.png'

export default function AcneApproach() {
  return (
    <section className="w-full px-4 md:px-10 py-12 md:py-20">
      <div className="text-left">
        <h2 className="text-[24px] md:text-[40px] font-medium text-gray-900 mb-2">
          Lorem ipsum dummy text
        </h2>
        <p className="text-sm md:text-[18px] text-gray-600 leading-relaxed">
          When we get acne, we often reach for a new serum or drink more water,
          hoping for a quick fix. But the truth is, our skin reflects our
          internal health. Often, the root cause lies deeper, in your liver,
          gut, or hormones. That&apos;s why our formulations are designed with
          this holistic approach in mind. Explore the feature below to see how
          interconnected our health truly is!
        </p>
      </div>

      <div className="relative flex justify-center items-center my-10 md:my-14">
        <Image
          src={skinCareAndRootCause}
          alt="Skin Care and Root Cause"
          width={400}
          height={400}
          className="w-[280px] md:w-[420px] h-auto"
        />
      </div>

      <div className="text-left border-b-2 border-gray-600 pt-6 md:pt-8">
        <p className="text-[34px] md:text-[64px] font-medium text-gray-900 leading-snug md:leading-tight">
          We’re flipping the script on acne with a whole-body approach that
          targets <span className="font-bold">BIO-SPECIFIC ROOT CAUSES</span> of
          mild to moderate acne from within.
        </p>
      </div>
    </section>
  );
}
