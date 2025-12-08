import Image from "next/image";
import React from "react";
import InstagramIcon from "@assets/svg/Insta Icon.svg";

export default function Story({ data, reverse = false }) {
  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-8 pt-12">
      {/* Outer card */}
      <div
        className="mx-auto rounded-2xl overflow-hidden shadow-sm"
        style={{ backgroundColor: "#FFD9CA" }}
      >
        {/* content order: text first (mobile), image second -> on md screens reverse to show image left */}
        <div
          className={`flex flex-col-reverse ${
            (data?.reverse !== undefined ? data.reverse : reverse)
              ? "lg:flex-row-reverse"
              : "lg:flex-row"
          } items-stretch`}
        >
          {/* Image block (mobile appears below, desktop left due to md:flex-row-reverse) */}
          <div className="w-full md:w-1/2">
            <img
              src={data?.image?.url}
              alt={data?.image?.name}
              className="w-full h-80 md:h-[850px] object-cover"
            />
          </div>

          {/* Text content */}
          <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center text-center">
            <div className="mx-auto max-w-2xl">
              <h3 className="text-2xl md:text-5xl lg:text-7xl leading-tight text-[#0f1721]">
                {data?.name || data?.title}
              </h3>

              <p className="my-3 lg:my-10 text-lg md:text-2xl lg:text-7xl font-medium text-[#934640]">
                {data?.headline}
              </p>

              <div className="my-4 border-t border-Grey/300" />

              <p className="text-[16px] lg:text-3xl lg:my-10 text-[#0f1721]">
                {data?.description}
              </p>

              <div className="mt-6 md:mt-8">
                <a
                  href={'https://www.instagram.com/clear.ritual/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#934640] text-white px-5 py-3 rounded-full shadow-md hover:opacity-95 transition"
                  aria-label="Join the community"
                >
                  <Image
                  src={InstagramIcon}
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
                  <span className="text-sm font-medium lg:text-lg">
                    Join the community
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
