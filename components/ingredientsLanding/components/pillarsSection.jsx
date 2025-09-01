import React from "react";

const PILLARS = [
  {
    title: "Standardized",
    description:
      "For any ingredients we list on our labels, we make sure you get the same concentration of ingredients every single time. We do this by sourcing standardized ingredients with the same potency in every serving to ensure consistency.",
  },
  {
    title: "Bioavailable",
    description:
      "If your body can’t absorb something, you won’t see the full benefits. That’s why we use ingredients that your body easily recognizes, allowing them to effectively target root causes of hair thinning.",
  },
  {
    title: "Quality and Safety Tested",
    description:
      "Our formulas are rigorously tested for quality, safety, and efficacy—from sourcing the ingredients until they’re in your bottle. Because what you put in your body matters as much to us as it does to you.",
  },
];

const PillarsSection = () => {
  return (
    <div className="flex flex-col gap-6 py-20 px-4 md:px-12 text-[#262626] md:container mx-auto">
      {PILLARS?.map((item, idx) => (
        <div key={idx} className="border border-black flex flex-col md:flex-row justify-between p-4 rounded-xl bg-white shadow-sm md:items-center">
          <div className="font-normal font-sophiaPro text-[28px] md:text-[40px] mb-2 w-full md:w-1/4">{item.title}</div>
          <div className="text-sm md:text-[24px] font-sophiaPro leading-relaxed text-gray-700 w-full md:w-4/6">
            {item.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PillarsSection;
