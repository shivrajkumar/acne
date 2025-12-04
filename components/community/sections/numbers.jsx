import React from "react";

const defaultStats = [
  {
    id: 1,
    number: "2/3",
    text: "women feel their skin changes how they feel.",
  },
  {
    id: 2,
    number: "45%",
    text: "women feel acne lowers their confidence.",
  },
  {
    id: 3,
    number: "63%",
    text: "women feel say \"glass skin\" standards make them feel worse.",
  },
  {
    id: 4,
    number: "33%",
    text: "women feel say acne has led them to cancel plans and has affected their work life.",
  },
];

const cardColors = ["#FFD9CA", "#FFE5D7", "#FFECDF", "#FFF4E9"];

export default function Numbers({ data }) {
  const textColor = "#0f1721";
  const stats = data?.stats || defaultStats;

  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((s, idx) => {
            const bgColor = cardColors[idx % cardColors.length];
            return (
              <article
                key={s.id || idx}
                className="rounded-lg overflow-hidden"
                style={{ backgroundColor: bgColor }}
                aria-labelledby={`stat-${s.id || idx}-title`}
              >
                <div className="p-4 sm:p-6 lg:p-8 h-full flex flex-col">
                  <h4
                    id={`stat-${s.id || idx}-title`}
                    className="text-6xl leading-none lg:text-9xl"
                    style={{ color: textColor }}
                  >
                    {s.value || s.number}
                  </h4>

                  <hr className="w-full my-4 border-t border-black" />

                  <p
                    className="text-lg leading-relaxed mt-2 flex-1 lg:text-2xl"
                    style={{ color: textColor }}
                  >
                    {s.description || s.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}