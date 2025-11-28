export default function RegimenSection({ data }) {
  const { title, highlightWords } = data;

  return (
    <section className="py-10 bg-Secondary/100 rounded-xl text-center px-4 md:px-6">
      <h2 className="text-lg md:text-[40px] leading-tight font-normal max-w-4xl mx-auto">
        {title.split(" ").map((word, idx) => (
          <span
            key={idx}
            className={highlightWords.includes(word) ? "text-blue-600" : ""}
          >
            {word}{" "}
          </span>
        ))}
      </h2>

      <div className="mt-10 text-lg md:text-[40px] text-gray-700">- Team Clear Ritual</div>
    </section>
  );
}
