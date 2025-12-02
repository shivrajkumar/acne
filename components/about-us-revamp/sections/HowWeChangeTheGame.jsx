import React from 'react';

export default function HowWeChangeTheGame() {
  const listItems = [
    "diagnosis first approach",
    "personalised skin food to support your internal triggers",
    "dermatologist designed routines",
    "Rx + Cosmetic Products"
  ];

  return (
    <section className="w-full mx-auto px-4 md:px-16 py-12 font-sofia">
      <div className="bg-[#F9F9F5] rounded-[32px] overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Image - Left on Desktop, Top on Mobile */}
        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
          <img
            src="/change-the-game.jpg"
            alt="Woman writing on whiteboard"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Text Content - Right on Desktop, Bottom on Mobile */}
        <div className="w-full md:w-1/2 py-8 px-6 md:p-16 flex flex-col justify-center lg:gap-20">
          <div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl text-[#0F1B28] mb-4 font-medium">
            how we change the game
          </h2>
          
          <p className="text-[#505354] text-sm md:text-lg mb-12 leading-relaxed max-w-lg">
            It was important to us to build a business thats delivers results. At clear, we believe in: Efficacy. Innovation. Integrity.
          </p>
          </div>

          <div className="w-full">
            {listItems.map((item, index) => (
              <div 
                key={index}
                className="border-t border-[#D1D5DB] py-2 lg:py-6"
              >
                <p className="text-[#0F1B28] text-base md:text-3xl font-medium">
                  {item}
                </p>
              </div>
            ))}
             {/* <div className="border-t border-[#D1D5DB]"></div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
