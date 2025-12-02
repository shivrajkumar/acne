import React from 'react';

export default function Journey() {
  const commitments = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .001-.001.001-.001.001 0 0 .001 0 .001-.001zm4.5 0c0 .001-.001.001-.001.001 0 0 .001 0 .001-.001z" />
        </svg>
      ),
      text: "26 licensed naturopathic doctors offering expert wellness coaching for hair and skin health.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: "Hair Mineral Analysis testing for a personalized hair growth strategy.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      text: "Full access to Headspace, supporting whole-body health for optimal hair growth.",
    },
  ];

  return (
    <section className="pb-20 px-6 md:px-20">
      <div className="bg-[#F9F9F4] rounded-2xl mx-auto px-4 py-8 lg:py-16 lg:px-12">
        <h2 className="text-2xl md:text-4xl lg:text-5xl text-[#041C1B] text-center">
          Your journey, our purpose.
        </h2>

        <hr className="mx-auto my-8" />
        
        <div className="flex flex-col md:flex-row gap-8 justify-evenly items-center">
            <div className="w-full">
                <p className="text-[#041C1B] text-sm lg:text-[28px] leading-relaxed">
                    Success thrives with the right partner. This journey goes beyond supplements—we’re there with you at every step, providing the tools, support, and inspiration to help you achieve real results.
                </p>
            </div>
            
            <div>
            <p className="font-bold text-lg text-[#0F1B28] mb-3 lg:text-2xl">Our commitment includes:</p>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                {commitments.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm flex lg:flex-col lg:items-start items-center gap-4 h-full">
                        <div className="text-[#53687E]">
                            <img src="/hiw_SVG.png" width="44" height="44" alt="" />
                        </div>
                        <p className="text-sm text-[#505354] lg:text-lg">
                            {item.text}
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
