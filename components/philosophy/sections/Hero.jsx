import React from 'react';

export default function Hero({ data }) {
  // Extract equation items from the API response
  const equationItems = data?.equationGraphic?.items || [];
  const [item1, item2, item3] = equationItems;

  return (
    <section className="w-full mx-auto px-4 md:px-10 pt-6 md:py-10 font-sofia">
      <div className="bg-[#F9F9F5] rounded-[32px] p-8 md:p-16 text-center">
        <h1 className="text-2xl md:text-4xl lg:text-5xl text-[#0F1B28] font-semibold mb-6 md:mb-8 uppercase tracking-wide">
          {data?.title}
        </h1>

        <p className="text-[#0F1B28] text-sm md:text-lg lg:text-2xl leading-relaxed mx-auto mb-12 md:mb-16">
          {data?.description}
        </p>

        {/* Visual Formula */}
        <div className="flex flex-row items-center justify-center gap-2 md:gap-8">
          {/* Circle 1: Healthy Body */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-[#D0CBB9] flex items-center justify-center">
              <span className="text-[#0F1B28] text-xs md:text-xl lg:text-2xl text-center px-2 md:px-4" dangerouslySetInnerHTML={{ __html: (item1?.label)?.replace(/\n/g, '<br />') }}>
              </span>
            </div>
          </div>

          {/* Plus Symbol */}
          <div className="text-[#0F1B28] text-xl md:text-4xl lg:text-5xl rotate-0 md:rotate-0">
            +
          </div>

          {/* Circle 2: Clinical Skincare */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-[#D0CBB9] flex items-center justify-center">
              <span className="text-[#0F1B28] text-xs md:text-xl lg:text-2xl text-center px-2 md:px-4" dangerouslySetInnerHTML={{ __html: (item2?.label)?.replace(/\n/g, '<br />') }}></span>
            </div>
          </div>

          {/* Equals Symbol */}
          <div className="text-[#0F1B28] text-xl md:text-4xl lg:text-5xl">
            =
          </div>

          {/* Circle 3: Clear, Happy Skin */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-[#AEDCC9] flex items-center justify-center">
              <span className="text-[#0F1B28] text-xs md:text-xl lg:text-2xl text-center px-2 md:px-4" dangerouslySetInnerHTML={{ __html: (item3?.label)?.replace(/\n/g, '<br />') }}></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
