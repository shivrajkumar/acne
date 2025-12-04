import DevelopedWithItem from "./experts-developed-with-item";

export default function DevelopedWithSection({ data }) {
  return (
    <section className="py-10">
      <h2 className="text-2xl md:text-[40px] font-normal tracking-[0.5px]">
        {data?.title}
      </h2>

      {/* Mobile: horizontal scroll, Desktop: grid */}
      <div className="mt-6">
        <div className="flex md:grid md:grid-cols-3 md:gap-6 gap-4 overflow-x-auto hide-scrollbar">
          {data?.items?.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[200px] md:w-auto" 
            >
              <DevelopedWithItem item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
