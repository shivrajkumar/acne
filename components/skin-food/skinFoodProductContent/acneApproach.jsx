import Image from "next/image";
import skinCareAndRootCause from "@assets/images/venn-skin.webp";

export default function AcneApproach() {
  return (
    <section className="w-full px-4 md:px-10 py-12 md:py-20">
      <div className="text-left">
        <h2 className="text-[24px] md:text-[40px] font-medium text-gray-900 mb-2">
          Why Both Inside + Outside Matter.
        </h2>
        <p className="text-sm md:text-[18px] text-gray-600 leading-relaxed">
          The science is, our skin reflects our internal health. The internal
          trigger lies deeper, in your diet, gut, or hormones. That's why our
          formulations are designed with this holistic approach in mind.
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

      <div className="text-left pt-6 md:pt-8">
        <p className="text-[34px] md:text-[64px] font-medium text-gray-900 leading-snug md:leading-tight">
          We’re flipping the script on acne with a whole-body approach that
          targets bio-specific <span className="font-normal">INTERNAL TRIGGERS</span> 
        </p>
      </div>
    </section>
  );
}
