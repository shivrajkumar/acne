export default function HeroSection({ data }) {
  const { title, highlighted_words, tabs } = data || {};

  return (
    <section className="py-10">
      <h1 className="text-[32px] md:text-6xl font-normal leading-snug w-2/3">
        {title?.split(" ").map((word, idx) => (
          <span
            key={idx}
            className={highlighted_words?.includes(word) ? "text-blue-600" : ""}
          >
            {word}{" "}
          </span>
        ))}
      </h1>

      <div className="flex justify-end text-end gap-3 mt-4">
        {tabs?.map((tab) => (
          <div className="px-6 py-2 border border-gray-300 rounded-full text-sm">
            {tab.label}
          </div>
        ))}
      </div>
    </section>
  );
}
