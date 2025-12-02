import React from "react";

export default function ResearchStatsSection({ data }) {
  const title = data?.title || "Acne care shouldn't be a game of trial and error. We did the RESEARCH so you can stop experimenting with your skin.";
  const stats = data?.stats || [
    {
      number: "24+",
      label: "Years of Development",
      color: "#FEF3C7",
      textColor: "#92400E",
    },
    {
      number: "4",
      label: "Industry Reports Conducted",
      color: "#DBEAFE",
      textColor: "#1E3A8A",
    },
    {
      number: "5+",
      label: "Doctor Advisors",
      color: "#D1FAE5",
      textColor: "#065F46",
    },
  ];

  return (
    <section className="bg-white px-4 md:px-10 lg:px-20 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-[#171819] leading-tight max-w-5xl mx-auto">
            {title}
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative rounded-2xl p-8 md:p-10 text-center transform hover:scale-105 transition-transform duration-200 shadow-md"
              style={{ backgroundColor: stat.color }}
            >
              <div className="space-y-4">
                <div
                  className="text-5xl md:text-6xl lg:text-7xl font-bold"
                  style={{ color: stat.textColor }}
                >
                  {stat.number}
                </div>
                <div
                  className="text-base md:text-lg font-semibold leading-snug"
                  style={{ color: stat.textColor }}
                >
                  {stat.label}
                </div>
              </div>

              {/* Decorative element */}
              <div
                className="absolute top-4 right-4 w-8 h-8 rounded-full opacity-20"
                style={{ backgroundColor: stat.textColor }}
              ></div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-base md:text-lg text-[#6B7280] max-w-3xl mx-auto leading-relaxed">
            Our science-backed approach combines dermatological expertise with cutting-edge research to deliver real results you can trust.
          </p>
        </div>
      </div>
    </section>
  );
}
