import React from "react";

const timelineData = [
  {
    week: "Month 1 - 2\n(RESET PHASE)",
    text: "Balanced oil production & reduced acne.",
    highlight: true,
  },
  {
    week: "Month 3 - 4\n(REPAIR PHASE)",
    text: "Improved skin clarity & balanced internal triggers.",
  },
  {
    week: "Month 5 - 6\n(RENEW PHASE)",
    text: "Visibly clearer skin & improved dark spots.",
  },
  {
    week: "Clear Ritual for LIFE.\n(MAINTAIN)",
    text: "Maintaining skin health, long term.",
  },
];

const ResultsTimeline = () => {
  return (
    <section className="bg-amber-50 mt-16 md:mt-20 py-16 px-6 text-center rounded-lg">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-normal text-gray-900 mb-12">
        Visible results in 3 months
      </h2>

      {/* Timeline - Outer wrapper for scroll */}
      <div className="relative overflow-x-auto px-2 snap-x snap-mandatory hide-scrollbar">
        {/* Inner wrapper to establish full content width */}
        <div className="relative flex items-start space-x-6 min-w-max pb-4">
          {/* Line - spans full content width */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-300 z-0" />

          {/* Gradient overlay - first 25% */}
          <div
            className="absolute top-5 left-0 h-1 z-10"
            style={{
              width: "25%",
              background: "linear-gradient(90deg, #F4E06B 100%, transparent 100%)",
            }}
          />

          {timelineData?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center min-w-[200px] md:min-w-[250px] md:flex-1 snap-center z-10"
            >
              {/* Week Label */}
              <div
                className={`px-4 py-2 rounded whitespace-pre-line text-sm ${
                  item.highlight
                    ? "bg-yellow-400 text-black font-medium"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {item.week}
              </div>
              {/* Description */}
              <p className="mt-4 text-sm text-gray-700 text-center max-w-[200px]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Subtext */}
      {/* <p className="text-gray-600 text-sm mt-5">
        Formulated for non-cystic acne.
      </p> */}

      {/* CTA Button */}
      {/* <button className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition">
        Take The Skin Diagnosis Now!
      </button> */}
    </section>
  );
};

export default ResultsTimeline;