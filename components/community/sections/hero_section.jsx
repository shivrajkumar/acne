import React from "react";
import Image from "next/image";
import InstagramIcon from "@assets/svg/Insta Icon.svg";

export default function HeroSection({
  data,
  subtitle = "We talk about everything - acne, scars, confidence, routines, what really works.",
  imageSrc = "/hero_community.jpg",
}) {
  return (
    <section
      className="relative w-full"
      role="banner"
      aria-label="Hero"
    >
      {/* Background Image */}
      <div className="relative w-full h-[420px] lg:h-[520px]">
        <Image
          src={data?.backgroundImage?.url}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Overlay + content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* subtle overlay for contrast */}
        <div
          className="absolute inset-0 bg-black/35 md:bg-black/30"
          aria-hidden="true"
        />

        <div className="relative max-w-5xl w-full px-6 sm:px-8 py-16">
          <div className="mx-auto text-center">
            {/* Title */}
            <h1
              className="text-white font-bold leading-tight drop-shadow-sm
                         text-4xl md:text-6xl lg:text-[6rem] lg:font-normal"
            >
              {data?.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-white/90 text-sm md:text-[16px]">
              {data?.tagline}
            </p>

            {/* CTA */}
            <button className="mt-6 flex justify-center mx-auto">
              <a
                href="https://www.instagram.com/clear.ritual/"
                className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition"
              >
                <Image
                  src={InstagramIcon}
                  alt="Instagram"
                  width={20}
                  height={20}
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
