export default function HeroSection({ data }) {
  const { title, highlighted_words, tabs } = data || {};

  return (
    <section className="py-10">
      <h1 className="text-[28px] md:text-6xl font-normal leading-snug w-2/3">
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
          <button
            key={tab.slug}
            className="px-4 py-1 border border-gray-300 rounded-full text-sm"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </section>
  );
}
