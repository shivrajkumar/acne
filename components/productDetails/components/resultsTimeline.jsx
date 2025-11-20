import React from "react";

const timelineData = [
  {
    week: "Week 1 - Week 4",
    text: "Active acne starts calming as your skin adjusts to barrier-repairing ingredients.",
    highlight: true,
  },
  {
    week: "Week 4 - Week 8",
    text: "Notice clearer skin, fewer breakouts, and visibly reduced redness.",
  },
  {
    week: "Week 8 - Week 12",
    text: "Your routine shifts focus to post-acne care - fading scars and improving texture.",
  },
  {
    week: "Week 12+",
    text: "Skin appears visibly smoother and more even-toned, while breakouts stay in check.",
  },
];

const ResultsTimeline = () => {
  return (
    <section className="bg-Secondary/100 mt-16 md:mt-20 py-16 px-6 text-center rounded-lg">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-12">
        Acne Time Line with our RITUAL
      </h2>

      {/* Timeline */}
      <div
        className="relative flex items-start overflow-x-auto px-2 
                space-x-6 hide-scrollbar snap-x snap-mandatory"
      >
        {/* Line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-300 z-0" />

        {/* Gradient overlay - first 20% */}
        <div
          className="absolute top-5 -left-6 h-1 z-10"
          style={{
            width: "25%",
            background:
              "linear-gradient(180deg, #F4E06B 100%, rgba(255,255,255,0) 0%)",
          }}
        />

        {timelineData?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-[200px] md:min-w-[250px] md:w-1/4 snap-center z-10"
          >
            {/* Week Label */}
            <div
              className={`px-4 py-2 rounded ${
                item.highlight
                  ? "bg-Warning/500 text-black font-medium"
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
      {/* <p className="text-gray-600 text-sm mt-5">
        Formulated for non-cystic acne.
      </p> */}

      {/* CTA Button */}
      <button className="mt-5 bg-Primary/500 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition">
        Take The Skin Diagnosis Now!
      </button>
    </section>
  );
};

export default ResultsTimeline;
