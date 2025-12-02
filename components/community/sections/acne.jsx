import React from "react";

// Replace the image path with your imported image or a URL if needed.
// I used the uploaded image path from the conversation container.
const heroImage = "hero_image.jpg";

export default function Acne() {
  return (
    <section className="font-sofia mx-auto p-6 lg:mb-24">
      <div className="bg-[rgba(247,246,239,1)] rounded-2xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left content card */}
          <div className="p-8 flex flex-col justify-between lg:justify-evenly gap-6">
            <div className="text-center">
              <h1 className="font-medium text-3xl md:text-4xl lg:text-7xl leading-tight text-black">
                We're changing
                <br />
                <span className="block mt-2 lg:mt-4">how acne</span>
              </h1>

              <p className="mt-4 text-xl md:text-2xl lg:text-6xl lg:leading-[1.4] text-[#635E51] font-medium">
                is treating
                <br />
                together.
              </p>
            </div>

            <hr className="border-t border-gray-300" />

            <p className="text-base lg:text-3xl text-[#0F1B28] max-w-lg lg:max-w-3xl mx-auto">
              Clear skin needs more than just products. Your skin improves when your inside and outside routine work together.
            </p>
          </div>

          {/* Right image */}
          <div className="h-64 lg:h-auto w-full">
            <img
              src={heroImage}
              alt="hero"
              className="object-cover w-full h-full block lg:h-screen"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Mobile variant: a thin card on the right side like in the screenshot (optional)
          You can uncomment and tweak this block if you want the mobile stacked small card look. */}
      {/*
      <div className="mt-6 md:hidden max-w-sm mx-auto bg-white rounded-xl p-4 shadow">
        <h3 className="text-sm font-semibold text-center text-[#071228]">Women everywhere</h3>
        <p className="text-xs text-gray-500 text-center mt-2">are shedding their silence.</p>
        <img src={heroImage} alt="mobile" className="mt-4 rounded-md w-full object-cover h-40" />
      </div>
      */}
    </section>
  );
}
