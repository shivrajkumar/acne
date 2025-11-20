import React from "react";

const TimelinePhase = ({ month, phase, description, isLast = false }) => (
  <div className="relative">
    <div className="flex items-start gap-4">
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center pt-1">
        {/* Timeline dot */}
        <div className="w-3 h-3 rounded-full bg-yellow-400 flex-shrink-0" />

        {/* Vertical dashed line */}
        {!isLast && (
          <div
            className={`w-0.5 border-l-2 border-dashed border-yellow-300 mt-2`}
            style={{ height: isLast ? "60px" : "80px" }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <h3 className="font-semibold text-gray-900 mb-1 text-xl md:text-lg">
          {month}{" "}
          <span className="text-[#A19B8B] font-normal text-[16px] uppercase tracking-wide">
            ({phase})
          </span>
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const TimelineCard = ({ month, phase, description, index, total }) => (
  <div className="relative flex-1 min-w-[220px]">
    {/* Connecting line - positioned above the dot */}
    {index < total && (
      <div
        className={`absolute top-[11px] left-0 border-t-2 border-dashed border-yellow-300 hidden lg:block ${
          index === total - 1 ? "w-full" : "w-[120%]"
        }`}
        style={{ zIndex: 0 }}
      />
    )}

    {/* Card content */}
    <div className="relative" style={{ zIndex: 1 }}>
      {/* Timeline dot */}
      <div className="flex justify-start mb-4">
        <div
          className="w-5 h-5 rounded-full bg-yellow-400 relative"
          style={{ zIndex: 2 }}
        />
      </div>

      {/* Phase info */}
      <div className="text-left">
        <div className="flex items-start justify-start mb-3 space-x-2">
          <h3 className="font-semibold text-gray-900 text-xl md:text-lg">{month}</h3>
          <p className="text-[#A19B8B] text-[16px] uppercase tracking-wide font-medium mt-1">
            ({phase})
          </p>
        </div>
        <p className="text-[#0F1B28] text-[16px] leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const ExpectationSetting = () => {
  const phases = [
    {
      month: "Month 1-2",
      phase: "RESET PHASE",
      description: "Balanced oil production & reduced acne.",
    },
    {
      month: "Month 3-4",
      phase: "REPAIR PHASE",
      description: "Improved skin clarity & balanced internal triggers.",
    },
    {
      month: "Month 5-6",
      phase: "RENEW PHASE",
      description: "Visibly clearer skin & improved dark spots.",
    },
    {
      month: "Clear Ritual for Life",
      phase: "MAINTAIN",
      description: "Maintaining skin health, long term.",
    },
  ];

  return (
    <div className="md:p-6 lg:py-12 mt-10">
      <div className="">
        {/* Mobile/Tablet View - Vertical Timeline */}
        <div className="lg:hidden bg-[#FAF8F3] rounded-xl p-4 md:p-0">
          <h1 className="text-3xl font-normal text-[#0F1B28] mb-8">
            See Results in 3 <br/> months
          </h1>

          <div className="space-y-0 bg-white p-8 rounded-lg">
            {phases.map((phase, idx) => (
              <TimelinePhase
                key={idx}
                month={phase.month}
                phase={phase.phase}
                description={phase.description}
                isLast={idx === phases.length - 1}
              />
            ))}
          </div>

          <p className="text-center text-Grey/500 text-sm mt-6">
            Clear Ritual Journey.
          </p>
        </div>

        {/* Desktop View - Horizontal Timeline */}
        <div className="hidden lg:block bg-[#FAF8F3] rounded-xl p-12">
          <h1 className="text-4xl font-normal text-[#0F1B28] mb-12">
            See Results in 3 Months
          </h1>

          <div className="flex gap-8 items-start justify-between mb-8 bg-white p-8 rounded-lg">
            {phases.map((phase, idx) => (
              <TimelineCard
                key={idx}
                month={phase.month}
                phase={phase.phase}
                description={phase.description}
                index={idx}
                total={phases.length}
              />
            ))}
          </div>

          <p className="text-left text-Grey/500 text-[16px] mt-8">
            Clear Ritual Journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpectationSetting;
