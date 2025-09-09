"use client";
import Image from "next/image";
import React from "react";
import OddsImage from '../../../assets/images/oddsimage.png'

const OddsSection = () => {
  return (
    <section className="bg-white mt-20 mx-auto p-4 md:p-8">
      <div className="grid md:grid-cols-2">
        <div className="bg-yellow-300 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
            You’ll like these odds
          </h2>

          <div className="space-y-6">
            <div>
              <p className="text-3xl font-bold text-gray-900">100%</p>
              <p className="text-gray-800 text-base">
                agreed lips felt moisturized and soft*
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">96%</p>
              <p className="text-gray-800 text-base">agreed lips felt firmer*</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">93%</p>
              <p className="text-gray-800 text-base">
                agreed the product helped lock in moisture*
              </p>
            </div>
          </div>

          <p className="mt-8 text-base text-gray-900">
            Clinically proven to deliver smoother, plumper lips after 2 weeks^
          </p>

          <p className="mt-6 text-xs text-gray-700 leading-relaxed">
            ^in a clinical study of 32 people <br />
            *in a consumer-perception study of 32 people after 2 weeks
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative w-full h-[400px] md:h-full">
            <Image
              src={OddsImage}
              alt="Before and After Lips"
              fill
              className="object-cover scale-100"
            />

            <div className="absolute bottom-3 left-3 bg-white px-2 py-1 text-xs font-medium text-gray-900">
              BEFORE
            </div>
            <div className="absolute bottom-3 right-3 bg-white px-2 py-1 text-xs font-medium text-gray-900">
              IMMEDIATELY AFTER
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OddsSection;
