export default function NoteFromTeam({ data }) {
  return (
    <section className="w-full mx-auto px-4 md:px-16 py-6 md:py-12 font-sofia">
      <div className="bg-[#F9F9F5] rounded-[32px] p-8 md:p-16 text-center">
        <h2 className="text-base md:text-4xl lg:text-5xl text-[#0F1B28] font-bold mb-2 lg:mb-4">
          {data?.title}
        </h2>
        <p className="text-[#505354] text-sm lg:text-2xl leading-relaxed mx-auto mb-4 md:mb-16">
          {data?.description}
        </p>
      </div>
    </section>
  );
}
