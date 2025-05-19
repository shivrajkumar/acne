"use client";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AcneTakeTheSkinTest from "../generic/AcneTakeTheSkinTest";

export default function AcneHowItWorks({ howItWorks }) {
  let orderCount = window.localStorage.getItem("order_count");

  return (
    <>
      {/* Desktop View */}
      <div className="hidden bg-[#FFFFFF] p-[16px] md:p-[40px] lg:p-[40px] rounded-[24px] w-full mx-auto border-[1px] border-Elements/Divider-Stroke xs:hidden sm:hidden md:block lg:block xl:block">
        <div className="bg-white border-[1px] border-[#E3E3E2] rounded-[12px] py-2 px-4 font-normal text-[14px] w-fit font-lato">
          How It Works
        </div>
        <div className="flex justify-between mt-[16px] mb -[16px]">
          <div className="flex flex-col justify-between items-start">
            <h2 className="text-[28px] md:text-[40px] xs:text-[28px] font-[500] leading-[130%] font-lato text-Text/Heading-Text">
              Clear Skin, Simplified: <br /> Your Personalised 3-Step Process
            </h2>
          </div>
          <div className="hidden items-end md:flex">
            {!orderCount ? <AcneTakeTheSkinTest
              variant="black"
              text="Get Your Kit"
              tm=" "
              redirectTo="/skin-test"
              deskSize="desktopBig"
            /> : <AcneTakeTheSkinTest
              variant="black"
              text={`Book Your Call Now`}
              tm={" "}
              redirectTo={"/book-a-call?redirect=home"}
              deskSize="desktopBig"
            />}
          </div>
        </div>

        <div className="justify-center flex flex-wrap md:flex-nowrap max-w-[90%] mx-auto">
          {howItWorks.map((value, index) => {
            return (
              <div key={index} className="p-3 w-full md:w-1/3 relative">
                <div className="flex items-center justify-center my-[24px]">
                  <div className="flex items-center justify-center w-fit px-[16px] py-[4px] text-black bg-Background/AirBlue rounded-full text-[12px] md:text-[18px] z-10 font-lato">
                    Step {index + 1}
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="absolute h-0.5 bg-Background/AirBlue right-0 left-1/2 "></div>
                  )}
                  {index > 0 && (
                    <div className="absolute h-0.5 bg-Background/AirBlue left-0 right-1/2 "></div>
                  )}
                </div>
                <CustomerCard value={value} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile View */}


      {/* Mobile Steps */}
      <div className="bg-[#FFFFFF] p-[20px] rounded-[24px] w-full mx-auto border-[1px] border-Elements/Divider-Stroke xs:block sm:block md:hidden lg:hidden xl:hidden">
        <div className="bg-white border-[1px] border-[#E3E3E2] rounded-[12px] py-2 px-4 font-lato font-normal text-[14px] w-fit ">
          How it Works
        </div>

        <div className="my-[20px]">
          <h2 className="text-[28px] font-[500] text-Text/Heading-Text font-lato leading-[130%]">
            The Easiest <br /> Process for the Best Results
          </h2>
        </div>

        {/* Mobile View Steps */}
        <div className="bg-[#FFFFFF] rounded-[24px] w-full mx-auto xs:block sm:block md:hidden lg:hidden xl:hidden">
          <div className="mb-2 relative px-4">
            {/* Container with relative positioning for the timeline */}
            <div className="relative">
              <div className="relative ml-12"> {/* Fixed margin for content alignment */}
                {howItWorks.map((value, index, array) => (
                  <div key={index} className="relative py-4 flex gap-[16px]">
                    <div
                      className="absolute -left-12 top-6 w-5 h-5 rounded-full border-2 border-Primary/500 bg-white flex items-center justify-center z-10"
                    >
                      <div className="w-3 h-3 bg-Primary/500 rounded-full"></div>

                      {/* Line element that extends down from each circle except the last one */}
                      {index < array.length - 1 && (
                        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[1px] border-l border-Neutral/200 h-[calc(100%+160px)]"></div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="bg-Background/AirBlue px-[16px] py-[4px] text-black rounded-full inline-block mb-2 text-[12px] md:text-[18px] font-lato">
                        STEP {index + 1}
                      </div>
                      <h3 className="text-[16px] font-[500] text-Text/Heading-Text font-lato">
                        {value.title}
                      </h3>
                      <p className="text-[12px] text-Text/Heading-Text mb-1 font-lato">
                        {value.description}
                      </p>
                    </div>

                    <Image
                      src={value.src}
                      width={88}
                      height={88}
                      alt={value.alt}
                      className="h-[88px] w-[88px] object-cover rounded-lg flex-shrink-0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex justify-center">
          {!orderCount ? <AcneTakeTheSkinTest
            variant="black"
            text="GET YOUR KIT"
            tm=" "
            redirectTo="/skin-test"
            deskSize="mobileBig"
          /> : <AcneTakeTheSkinTest
            variant="black"
            text={`Book Your Call Now`}
            tm={" "}
            redirectTo={"/book-a-call?redirect=home"}
            deskSize="mobileBig"
          />}
        </div>
      </div>
      {/* Mobile Button */}


    </>
  );
}

function CustomerCard({ value }) {
  return (
    <div className="rounded-lg h-full">
      <div className="rounded-lg mx-auto">
        <Image
          height={288}
          width={350}
          src={value.src}
          className={"mx-auto rounded-[16px] object-cover"}
          alt={value.alt}
        />
      </div>
      <div className="flex flex-col justify-center px-3 rounded-lg items-center gap-[8px] mt-[24px] text-center">
        <h2 className="text-[24px] pb-1 pt-2 text-Text/Heading-Text font-lato leading-[130%] font-[500] ">
          {value.title}
        </h2>
        <p className="text-[16px] text-Text/Heading-Text pb-3 font-[400] text-center px-[40px] font-lato">
          {value.description}
        </p>
      </div>
    </div>
  );
}