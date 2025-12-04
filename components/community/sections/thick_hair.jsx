import React from "react";
// import ActionButton from "../../../components/button";

export default function ThickHair({
  data,
  subtitle = "We are with you through thick and hair thinning.",
  ctaHref = "#",
  whatsappImg = "/instagram.png",
}) {
  return (
    <section
      className="w-full py-12 sm:py-20 md:py-0 flex items-center justify-center lg:mb-24"
      aria-label="Support message"
    >
      {/* gradient background panel */}
      <div
        className="w-full rounded-md overflow-hidden flex items-center justify-center"
        style={{
          background:
            "linear-gradient(90deg, rgba(245,242,240,1) 0%, rgba(255,235,226,1) 50%, rgba(255,230,225,1) 100%)",
        }}
      >
        {/* Content wrapper with vertical centering */}
        <div className="w-full max-w-6xl px-6 sm:px-12 py-16 sm:py-20 md:py-32 lg:font-medium flex flex-col lg:items-center lg:justify-center lg:text-center">
          <h2 className="font-normal text-[28px] sm:text-4xl md:text-[56px] lg:text-[87px] leading-tight md:leading-[1.1] text-black">
            {data?.title || (
              <>
                <span className="block text-[#A83C35]">For Every Breakout</span>
                <span className="block mt-1">
                  <span className="">and Breakthrough.</span>
                </span>
              </>
            )}
          </h2>

          {data?.description && (
            <p className="mt-4 text-base md:text-lg lg:text-2xl text-black">
              {data.description}
            </p>
          )}

          <div className="mt-6 md:mt-10">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-medium transition text-white bg-black hover:bg-gray-900"
            >
              {(data?.image?.url || whatsappImg) && (
                <img
                  src={data?.image?.url || whatsappImg}
                  alt={data?.image?.alternativeText || "Instagram"}
                  className="w-5 h-5 object-contain"
                />
              )}
              Join us on Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
