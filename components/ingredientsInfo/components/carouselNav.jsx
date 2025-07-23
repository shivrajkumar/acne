export default function CarouselNav({ previous, next }) {
  return (
    <div className="grid grid-cols-2 border rounded overflow-hidden">
      <div className="flex items-center gap-2 p-4 border-r">
        <img src={previous.image} alt={previous.name} className="w-10 h-10" />
        <div>
          <p className="text-xs font-semibold">{previous.name}</p>
          <p className="text-[10px] text-gray-500">{previous.category}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 p-4">
        <img src={next.image} alt={next.name} className="w-10 h-10" />
        <div>
          <p className="text-xs font-semibold">{next.name}</p>
          <p className="text-[10px] text-gray-500">{next.category}</p>
        </div>
      </div>
    </div>
  );
}
