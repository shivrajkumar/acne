import React from "react";

export default function ThickHair({
  data,
  ctaHref = "#",
  whatsappImg = "/instagram.png",
}) {
  const title = data?.title || "";
  const highlightWords = data?.highlightedWords || [];

  // defensive: ensure highlightWords is an array
  const safeHighlight = Array.isArray(highlightWords) ? highlightWords : [];

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
        {/* Content wrapper */}
        <div className="w-full max-w-6xl px-6 sm:px-12 py-16 sm:py-20 md:py-32 lg:font-medium flex flex-col lg:items-center lg:justify-center lg:text-center">
          
          {/* Title with highlighted words */}
          <h2 className="font-normal text-[28px] sm:text-4xl md:text-[56px] lg:text-[87px] leading-tight md:leading-[1.1] text-black">

            {title.split(" ").map((word, idx) => (
              <span
                key={idx}
                className={
                  safeHighlight.includes(word.replace(".", "")) 
                    ? "text-[#934640]" 
                    : ""
                }
              >
                {word}{" "}
              </span>
            ))}

          </h2>

          {/* CTA */}
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
