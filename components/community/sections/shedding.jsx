import React from "react";

export default function Shedding({
  title = "What does your hair journey look like?",
  subtitle = "The impacts of thinning and shedding are far-reaching.",
  body = `As a company, we noticed our female customers trying, unsuccessfully, to find a safe space to openly discuss their hair struggles. In 2022, we launched Shed the Silence to destigmatize female hair struggles. What we’ve built is a hyper-connected community of women that understand one another and share a common journey and mindset. Because here, we’ve got nothing to hide, and everything to grow.`,
  className = "",
}) {
  return (
    <section className={`w-full px-4 sm:px-6 lg:px-8 py-8 ${className}`} aria-label="Hero Info">
      <div
        className="mx-auto rounded-2xl overflow-hidden"
        style={{ backgroundColor: "#FAF8F3" }}
      >
        {/* Desktop: md:flex with left narrow title column, right content */}
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Left column: on mobile this becomes full-width at top */}
          <div className="w-full md:w-1/3 p-6 pb-0 md:p-10 lg:py-24 lg:pl-24 flex items-start">
            <h1
              className="m-0 text-[#0F1B28] font-normal leading-tight text-2xl lg:text-5xl lg:font-bold"
            >
              {title}
            </h1>
          </div>

          {/* Right column: subtitle + body */}
          <div className="w-full md:w-2/3 p-6 md:p-10 lg:py-24 lg:pr-24 border-t md:border-t-0 md:border-l border-transparent">
            <div className="max-w-6xl">
              <p className="text-[#0F1B28] font-medium mb-4 text-sm lg:text-4xl">
                {subtitle}
              </p>

              <p className="text-[#505354] text-xs md:text-base leading-relaxed lg:text-2xl" style={{ lineHeight: 1.85 }}>
                {body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
