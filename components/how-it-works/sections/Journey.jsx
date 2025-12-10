import React from 'react';

export default function Journey({ data }) {
  const commitments = data?.items;

  return (
    <section className="pb-20 px-6 md:px-20">
      <div className="bg-[#F9F9F4] rounded-2xl mx-auto px-4 py-8 lg:py-16 lg:px-12">
        <h2 className="text-2xl md:text-4xl lg:text-5xl text-[#041C1B] text-center">
          {data?.heading}
        </h2>

        <hr className="mx-auto my-8" />

        <div className="flex flex-col md:flex-row gap-8 justify-evenly items-center">
            <div className="w-full">
                <p className="text-[#041C1B] text-sm lg:text-[28px] leading-relaxed">
                    {data?.description}
                </p>
            </div>

            <div>
            <p className="font-bold text-lg text-[#0F1B28] mb-3 lg:text-2xl">{data?.commitmentTitle}</p>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                {commitments?.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm flex lg:flex-col lg:items-start items-center gap-4 h-full">
                        <div className="text-[#53687E]">
                            <img src={item?.icon?.url} width="44" height="44" alt="" />
                        </div>
                        <p className="text-sm text-[#505354] lg:text-lg">
                            {item?.title}
                        </p>
                    </div>
                ))}
            </div>
            </div>
        </div>
      </div>
    </section>
  );
}
