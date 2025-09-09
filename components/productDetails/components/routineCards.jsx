import React from "react";

const routines = [
  {
    title: "Daytime Application",
    bg: "bg-white border border-gray-300",
    text: "text-gray-900",
    steps: [
      { text: "Step 1: Clear Waters Hydrating Cleanser", highlight: true },
      { text: "Step 2: Toner, serum" },
      { text: "Step 3: Hydrobounce Instant Moisturizer" },
      { text: "Step 4: Multi-screen Mineral Sunscreen SPF" },
    ],
  },
  {
    title: "Nighttime Application",
    bg: "bg-Secondary/500 text-white",
    text: "text-white",
    steps: [
      { text: "Step 1: Clear Waters Hydrating Cleanser", highlight: true },
      { text: "Step 2: Toner, serum" },
      { text: "Step 3: Hydrobounce Instant Moisturizer" },
      { text: "Step 4: Custom prescription cream" },
    ],
  },
];

export default function RoutineCards() {
  return (
    <div className="mt-20">
      <h2 className="text-center text-2xl md:text-3xl font-semibold mb-8">
        Lorem ipsum dummy
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {routines.map((routine, idx) => (
          <div
            key={idx}
            className={`rounded-xl p-6 ${routine.bg} shadow-sm transition hover:shadow-md`}
          >
            <h3 className={`text-lg md:text-[32px] font-semibold mb-4 ${routine.text}`}>
              {routine.title}
            </h3>
            <ul className="space-y-2">
              {routine.steps.map((step, i) => (
                <li
                  key={i}
                  className={`text-sm md:text-[16px] ${
                    step.highlight
                      ? "font-semibold text-black md:text-Warning/500 dark:text-yellow-300"
                      : routine.text === "text-white"
                      ? "text-gray-200"
                      : "text-gray-500"
                  }`}
                >
                  {step.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
