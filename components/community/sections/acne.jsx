import React from "react";
const heroImage = "hero_image.jpg";

export default function Acne({ data }) {
  return (
    <section className="font-sofiaPro mx-auto p-6 lg:mb-24">
      <div className="bg-[rgba(247,246,239,1)] rounded-2xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT CONTENT — UPDATED COMPLETELY */}
          <div className="p-8 flex flex-col justify-between lg:justify-evenly gap-6">
            <div className="">
              {/* ⭐ 3-LINE TITLE (as in screenshot) */}
              <h1 className="text-center font-medium text-3xl md:text-[48px] leading-tight text-black px-6 lg:px-36">
  {data?.title}
</h1>

              {/* Divider */}
              <hr className="border-t border-gray-300 mt-6" />

              {/* Description (small line under divider) */}
              <p className="text-left mt-4 text-[16px] md:text-xl text-[#0F1B28]">
                {data?.description}
              </p>
            </div>
          </div>

          {/* RIGHT IMAGE — LEFT UNTOUCHED */}
          <div className="h-85 lg:h-[680px] w-full">
            <img
              src={data?.image?.url}
              alt={data?.image?.name}
              className="object-cover w-full h-full block lg:h-screen"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
