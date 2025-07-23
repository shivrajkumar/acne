import React from "react";
import Image from "next/image";
import Badge from "./badge";
import CarouselNav from "./carouselNav";
import StatCard from "./statCard";

export default function IngredientDetail({ data }) {
  console.log("Data::;", data);

  return (
    <div className="px-4 md:px-12 py-8 container mx-auto flex flex-col">
      <div className="flex">
        <div className="flex flex-col gap-6 items-start md:items-start md:w-2/6">
          <div className="text-sm text-gray-600 mb-2">
            {data.name}, From {data.origin}
          </div>

          <div>
            <Image
              src={data.image.src}
              alt={data.image.alt}
              width={180}
              height={180}
              className="object-contain w-[150px] md:w-[180px] h-auto"
            />
          </div>

          <div className="bg-white border rounded-md p-4 w-full max-w-[200px]">
            <div className="text-sm font-medium">
              {data.productReference.found_in}
            </div>
            <button className="mt-3 text-xs bg-[#2D4CF2] text-white rounded-full px-4 py-1">
              {data.productReference.button_label} →
            </button>
          </div>
        </div>

        <div className="">
          <div className="flex flex-wrap gap-2 mb-4">
            {data.badges.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </div>

          <p className="text-gray-700 text-sm max-w-xl">{data.summary}</p>

          <div className="mt-10">
            <h2 className="text-lg font-semibold">
              Score: <span className="text-blue-600">{data.score.value}</span>
            </h2>
            <p className="mt-2 text-gray-800 leading-relaxed max-w-3xl">
              {data.summary}
            </p>
          </div>

          <section className="mt-10">
            {data.sections?.map((section, index) => {
              if (section.heading && section.content) {
                return (
                  <section key={index} className="mt-10">
                    <h3 className="text-xl font-semibold mb-2">
                      {section.heading}
                    </h3>
                    {section.content.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-gray-700 leading-relaxed max-w-3xl mb-4"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </section>
                );
              }

              if (section.note) {
                return (
                  <section
                    key={index}
                    className="mt-10 border-t border-gray-200 pt-6"
                  >
                    <p className="text-xs text-gray-500 italic max-w-3xl">
                      {section.note}
                    </p>
                  </section>
                );
              }

              return null;
            })}
          </section>
        </div>
      </div>

      <div className="border-t mt-10 pt-10 flex flex-col gap-6">
        <h2 className="text-xl font-semibold mb-4">
          {data.related_ingredients.heading}
        </h2>

        <CarouselNav
          previous={data.related_ingredients.previous}
          next={data.related_ingredients.next}
        />

        <div className="mt-4">
          <button className="bg-[#2D4CF2] text-white px-6 py-2 rounded-full text-sm">
            {data.related_ingredients.button} →
          </button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {data.bottom_highlights.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>
    </div>
  );
}
