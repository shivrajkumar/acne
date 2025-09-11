import React from "react";

const timelineData = [
  {
    week: "Week 4",
    text: "Balanced oil production and reduced acne breakouts.",
    highlight: true,
  },
  {
    week: "Week 8",
    text: "Improved skin clarity, texture, and hydration, plus reduced redness.",
  },
  {
    week: "Week 12",
    text: "Visibly clearer skin and improved post-acne dark spots.",
  },
  {
    week: "Week 12+",
    text: "Visibly clearer skin and improved post-acne dark spots.",
  },
];

const ResultsTimeline = () => {
  return (
    <section className="bg-[#E6E9FF] mt-20 py-16 px-6 text-center rounded-lg">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-12">
        Real results you can see in just 4–12 weeks.
      </h2>

      {/* Timeline */}
      <div
        className="relative flex items-start overflow-x-auto px-2 
                space-x-6 hide-scrollbar snap-x snap-mandatory"
      >
        {/* Line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-300 z-0" />

        {timelineData?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-[200px] md:min-w-[250px] md:w-1/4 snap-center z-10"
          >
            {/* Week Label */}
            <div
              className={`px-4 py-2 rounded ${
                item.highlight
                  ? "bg-yellow-400 text-black font-medium"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {item.week}
            </div>
            {/* Description */}
            <p className="mt-4 text-sm text-gray-700 text-center">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Subtext */}
      <p className="text-gray-600 text-sm">
        Formulated for non-cystic acne.
      </p>

      {/* CTA Button */}
      <button className="mt-10 bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition">
        Take The Skin Test Now!
      </button>
    </section>
  );
};

export default ResultsTimeline;
