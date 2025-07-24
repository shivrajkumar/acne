import JojobaSeeds from '@assets/images/jojoba-seeds.webp'
import JamaicanCastorOil from '@assets/images/jamaican-castor-oil.webp'
import Image from 'next/image';

export default function CarouselNav({ previous, next }) {
  return (
    <div className="border w-full">
      <div className="grid grid-cols-2 border-b">
        {/* Previous */}
        <div className="flex flex-col md:flex-row items-center gap-4 p-2 text-center">
          <Image src={JamaicanCastorOil} alt={previous.name} className="w-20 h-20 object-contain" />
          <div>
            <p className="text-xs md:text-sm font-semibold text-black">{previous.name}</p>
            <p className="text-xs text-gray-500 mt-1">{previous.category}</p>
          </div>
        </div>
        
        {/* Next */}
        <div className="flex flex-col md:flex-row items-center text-center gap-4 p-2 border border-l">
          <Image src={JojobaSeeds} alt={next.name} className="w-20 h-20 object-contain" />
          <div>
            <p className="text-xs md:text-sm font-semibold text-black">{next.name}</p>
            <p className="text-xs text-gray-500 mt-1">{next.category}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2">
        {/* Previous Button */}
        <button className="text-sm text-black py-3 w-full border-r">
          Previous
        </button>

        {/* Next Button */}
        <button className="text-sm text-black md:text-white py-3 w-full md:bg-[#656051]">
          Next
        </button>
      </div>
    </div>
  );
}