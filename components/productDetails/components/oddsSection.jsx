"use client";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import acneBefore from'@assets/images/acne-before.webp';
import acneAfter from'@assets/images/acne-after.webp';

export default function OddsSection() {
  return (
    <section className="bg-white mt-10 md:mt-20 mx-auto p-4 md:p-8">
      <div className="grid md:grid-cols-2">
        {/* LEFT TEXT SECTION */}
        <div className="bg-yellow-300 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
            You’ll like these results
          </h2>

          <div className="space-y-6">
            <div>
              <p className="text-3xl font-bold text-gray-900">98%</p>
              <p className="text-gray-blue text-[16px]">
                98% said their skin felt deeply hydrated without any greasy residue*
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold text-gray-900">96%</p>
              <p className="text-gray-blue text-[16px]">
                agreed that excess oil was better controlled*
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold text-gray-900">93%</p>
              <p className="text-gray-blue text-[16px]">
                noticed acne marks and scars visibly began to fade*
              </p>
            </div>
          </div>

          <p className="mt-8 text-[16px] text-gray-900">
            Clinically proven to deliver clearer, more balanced skin in just 2 weeks^
          </p>

          <p className="mt-6 text-xs text-gray-700 leading-relaxed">
            ^in a consumer perception study after 2 weeks <br />
            *from a clinical study of 32 people
          </p>
        </div>

        {/* RIGHT — BEFORE/AFTER SLIDER */}
        <div className="relative flex items-center justify-center w-full h-[300px] md:h-[520px]">
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src={acneBefore.src}
                alt="Before"
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={acneAfter.src}
                alt="After"
              />
            }
            style={{ width: "100%", height: "100%" }}
          />

          {/* LABELS */}
          <div className="absolute bottom-3 left-3 bg-white px-2 py-1 text-xs font-medium text-gray-900">
            BEFORE
          </div>

          <div className="absolute bottom-3 right-3 bg-white px-2 py-1 text-xs font-medium text-gray-900">
            IMMEDIATELY AFTER
          </div>
        </div>
      </div>
    </section>
  );
}
