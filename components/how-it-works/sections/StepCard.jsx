import React from "react";

export default function StepCard({ step, isReversed = false }) {
  const imageUrl = step?.image?.url;
  const altText = step?.image?.name;

  const heading = step?.heading || "";
  const highlighted = step?.highlightedText;

  const formattedHeading = highlighted
    ? heading.replace(
        highlighted,
        `<span class="text-[#3B52F5]">${highlighted}</span>`
      )
    : heading;

  return (
    <div
      className={`
        w-full
        rounded-[32px]
        overflow-hidden
        mb-14
        ${
          step?.bgColor
            ? step.bgColor
            : "bg-[#EFF0FF]" /* Very close to screenshot */
        }
      `}
    >
      <div
        className={`
          flex flex-col 
          ${
            isReversed ? "md:flex-row-reverse" : "md:flex-row"
          } 
          items-center
          md:justify-between
          px-6 py-10
          md:px-14 md:py-14
          lg:px-20 lg:py-20
        `}
      >
        {/* LEFT TEXT CONTENT */}
        <div className="w-full md:w-1/2 max-w-xl">
          <h2
            className="text-[26px] md:text-[40px] lg:text-[50px] leading-tight mb-5 text-[#0F1B28]"
            dangerouslySetInnerHTML={{ __html: formattedHeading }}
          />

          <p className="text-sm md:text-[16px] lg:text-lg text-[#505354] leading-relaxed">
            {step?.description}
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full md:w-[40%] mt-8 md:mt-0 flex justify-center">
          <div className="relative w-[260px] md:w-[300px] lg:w-[360px]">
            <img
              src={imageUrl}
              alt={altText}
              className="w-full h-auto rounded-2xl shadow-xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
