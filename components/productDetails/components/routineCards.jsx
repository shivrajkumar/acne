import React from "react";

const routines = [
  {
    title: "Daytime Application",
    bg: "bg-white border border-gray-300",
    text: "text-gray-900",
    steps: ["Cleanse", "Treat", "Moisturise", "Protect"],
  },
  {
    title: "Nighttime Application",
    bg: "bg-Secondary/500 text-white",
    text: "text-white",
    steps: ["Cleanse", "Treat", "Moisturise", "Feed"],
  },
];

// ⭐ MAP PRODUCT TYPE → what step to highlight
const highlightStepMap = {
  COSMETIC_CLEANSER: "Cleanse",
  COSMETIC_MOISTURISER: "Moisturise",
  COSMETIC_PROTECTION: "Protect",
  SUPPLEMENT: "Feed",
  DRUG: "Treat",
};

export default function RoutineCards({ productType }) {
  const highlightTarget = highlightStepMap[productType] || "";
  console.log({highlightTarget, productType})

  return (
    <div className="mt-10 md:mt-20">
      {/* <h2 className="text-center text-2xl md:text-3xl font-semibold mb-8">
        Lorem ipsum dummy
      </h2> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {routines.map((routine, idx) => (
          <div
            key={idx}
            className={`rounded-xl p-6 ${routine.bg} shadow-sm transition hover:shadow-md`}
          >
            <h3
              className={`text-lg md:text-[32px] font-semibold mb-4 ${routine.text}`}
            >
              {routine.title}
            </h3>

            <ul className="space-y-2">
              {routine.steps.map((step, i) => {
                const isHighlighted =
                  step.toLowerCase() === highlightTarget.toLowerCase();
                console.log({ isHighlighted, highlightTarget });
                return (
                  <li
                    key={i}
                    className={`text-sm font-light md:text-[24px] ${
                      isHighlighted
                        ? routine.bg.includes("bg-white")
                          ? "font-semibold text-black" // highlight on white card
                          : "font-semibold text-Warning/500" // highlight on dark card
                        : routine.text === "text-white"
                        ? "text-gray-200"
                        : "text-gray-500"
                    }`}
                  >
                    Step {i + 1}: {step}.
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
