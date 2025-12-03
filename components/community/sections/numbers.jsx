import React from "react";

/**
 * AboutSection — responsive stats/cards
 *
 * Colors used:
 *  - primary peach (card darker): #FFD9CA
 *  - light peach (card lighter):  #FFF6F3
 *  - text (dark): #0f1721
 *  - divider: #E8D6D4
 *
 * Replace the `stats` array with your real numbers/text.
 */

const defaultStats = [
  {
    id: 1,
    number: "2/3",
    text: "women feel their skin changes how they feel.",
    bgColor: "#FFD9CA"
  },
  {
    id: 2,
    number: "45%",
    text: "women feel acne lowers their confidence.",
    bgColor: "#FFE5D7"
  },
  {
    id: 3,
    number: "63%",
    text: "women feel say \"glass skin\" standards make them feel worse.",
    bgColor: "#FFECDF"
  },
  {
    id: 4,
    number: "33%",
    text: "women feel say acne has led them to cancel plans and has affected their work life.",
    bgColor: "#FFF4E9"
  },
];

export default function Numbers({ data }) {
  const bgDark = "#FFD9CA";
  const bgLight = "#FFF6F3";
  const textColor = "#0f1721";
  const divider = "#E8D6D4";

  const stats = data?.stats || defaultStats;

  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      <div className="mx-auto">
        {/* Desktop: 2 columns grid, Mobile: single column stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((s, idx) => {
            const useDark = idx % 2 === 0; // alternate colors like screenshot
            return (
              <article
                key={s.id || idx}
                className="rounded-lg overflow-hidden"
                style={{ backgroundColor: s.bgColor }}
                aria-labelledby={`stat-${s.id || idx}-title`}
              >
                <div className="p-4 sm:p-6 lg:p-8 h-full flex flex-col">
                  <h4
                    id={`stat-${s.id || idx}-title`}
                    className="text-6xl leading-none lg:text-9xl"
                    style={{ color: textColor }}
                  >
                    {s.number}
                  </h4>

                  <hr
                    className="w-full my-4 border-t border-black"
                    />
                    {/* style={{ borderColor: divider }} */}

                  <p
                    className="text-lg leading-relaxed mt-2 flex-1 lg:text-2xl"
                    style={{ color: textColor }}
                  >
                    {s.label || s.text}
                  </p>

                  {s.description && (
                    <p className="text-sm mt-2 opacity-80" style={{ color: textColor }}>
                      {s.description}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
