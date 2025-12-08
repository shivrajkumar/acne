import Image from "next/image";
import React from "react";
// import ActionButton from "../../../components/button"; // adjust path if needed
import InstagramIcon from "@assets/svg/Insta Icon.svg";

export default function HairJourney({
  data,
  title = "What does your hair journey look like?",
  subtitle = "Let's Learn & Share our stories.",
  ctaHref = "#",
  iconSrc = "/instagram.png",
  className = "",
}) {
  return (
    <section
      className={`w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-16 flex items-center justify-center  ${className}`}
      aria-label="Share your hair journey"
    >
      <div className="w-full">
        <div
          className="rounded-2xl px-6 py-8 sm:py-12 md:py-16 lg:py-28 flex flex-col items-center text-center"
          style={{ backgroundColor: "#FAF8F3" }}
        >
          {/* Title */}
          <h2
            className="text-black font-semibold leading-tight"
            style={{
              fontSize: "clamp(24px, 4.5vw, 40px)", // mobile→desktop scaling
            }}
          >
            {data?.title || title}
          </h2>

          {/* Subtitle */}
          <p
            className="mt-4 text-sm sm:text-[16px] md:text-xl lg:text-2xl text-bold text-[#635E51]"
            style={{ maxWidth: 720 }}
          >
            {data?.description || subtitle}
          </p>

          {data?.image?.url && (
            <div className="mt-6">
              <img
                src={data.image.url}
                alt={data.image.name}
                className="rounded-lg max-w-md mx-auto"
              />
            </div>
          )}

          <div className="mt-6 md:mt-8">
            <a
              href={'https://www.instagram.com/clear.ritual/'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#000000] text-white px-8 py-3 rounded-full shadow-md hover:opacity-95 transition"
              aria-label="Join the Facebook Group"
            >
              <Image
                src={InstagramIcon}
                alt="Instagram"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
              <span className="text-sm lg:text-base font-medium">
                Join us on Instagram
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
