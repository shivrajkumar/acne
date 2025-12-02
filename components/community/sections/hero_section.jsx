import React from "react";
// import ActionButton from "../../../components/button";
// import Breadcrumb from "../../../components/common/breadcrumb";

export default function HeroSection({
  subtitle = "We talk about everything - acne, scars, confidence, routines, what really works.",
  videoSrc = "/hero_community.mp4",
}) {
  return (
    <section
      className="relative w-full lg:mb-24"
      role="banner"
      aria-label="Hero"
    >
      {/* Background image */}
      <video
        className="w-full h-[420px] lg:h-[520px] object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay + content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* subtle overlay for contrast */}
        <div
          className="absolute inset-0 bg-black/35 md:bg-black/30"
          aria-hidden="true"
        />

        <div className="relative max-w-5xl w-full px-6 sm:px-8 py-16">
          <div className="mx-auto text-center ">
            {/* Title */}
            <h1
              className="text-white font-bold leading-tight drop-shadow-sm
                           text-4xl md:text-6xl lg:text-[6rem] lg:font-normal"
            >
              {/* mobile: stacked; desktop: inline with spacing */}
              <span className="block md:inline">Real Skin</span>
              <span className="block md:inline">
                {" "}
                <span className="md:ml-1">Content</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-white/90 text-sm sm:text-base md:text-lg lg:text-xl">
              {subtitle}
            </p>

            {/* CTA */}
            <button className="mt-6 flex justify-center mx-auto">
              <a
                href="#"
                className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition"
              >
                <img
                  src="/instagram.png"
                  alt="Instagram"
                  className="w-5 h-5 object-contain"
                />
                Join us on Instagram
              </a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
