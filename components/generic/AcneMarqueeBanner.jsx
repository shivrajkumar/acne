"use client";
import Image from "next/image";
import Guidance from "@assets/images/gift.png";
import FreeConsulation from "@assets/images/calendar-add.png";
import ScienceBacked from "@assets/images/shield-tick.png";
import Combination from "@assets/images/autonio.png";
import RootCause from "@assets/images/ocean-protocol.png";

const AcneMarqueeBanner = () => {
  return (
    <div className="bg-Background/AirBlue marque h-[40px] flex items-center flex-wrap overflow-hidden text-[12px] md:font-[400] font-[500]">
      <section className="logoMarqueeSection">
        <div id="logoMarqueeSection">
          <div className="default-content-container">
            <div className="default-content-container-inner relative overflow-hidden">
              <div className="marquee-container overflow-hidden w-full">
                <div className="marquee-content flex animate-marquee-all">
                  {/* First set of items */}
                  <div className="flex-shrink-0 flex items-center mx-[80px]">
                    <Image
                      height={16}
                      width={16}
                      className=" mr-3"
                      src={Guidance}
                      alt="Guidance"
                      loading="eager"
                    />
                    <p className="whitespace-nowrap font-lato text-[12px] font-[400] leading[1.5%] -tracking-[3%]">
                      Guidance from Skin Experts
                    </p>
                  </div>

                  <div className="flex-shrink-0 flex items-center mx-[80px]">
                    <Image
                      height={16}
                      width={16}
                      className=" mr-3"
                      src={FreeConsulation}
                      alt="FreeConsulation"
                      loading="eager"
                    />
                    <p className="whitespace-nowrap">
                      Free Dermatologist Consultations
                    </p>
                  </div>

                  <div className="flex-shrink-0 flex items-center mx-[80px]">
                    <Image
                      height={16}
                      width={16}
                      className=" mr-3"
                      src={ScienceBacked}
                      alt="ScienceBacked"
                      loading="eager"
                    />
                    <p className="whitespace-nowrap">
                      Science Backed Formulation
                    </p>
                  </div>

                  <div className="flex-shrink-0 flex items-center mx-[80px]">
                    <Image
                      height={16}
                      width={16}
                      className=" mr-3"
                      src={Combination}
                      alt="Combination"
                      loading="eager"
                    />
                    <p className="whitespace-nowrap">
                      Combination of Ayurveda, Dermatology, and Advanced Science
                    </p>
                  </div>

                  <div className="flex-shrink-0 flex items-center mx-[80px]">
                    <Image
                      height={16}
                      width={16}
                      className=" mr-3"
                      src={RootCause}
                      alt="RootCause"
                      loading="eager"
                    />
                    <p className="whitespace-nowrap">We Fix the Root Cause</p>
                  </div>

                  {/* Duplicate items to create seamless loop */}
                  <div className="flex-shrink-0 flex items-center mx-[80px]">
                    <Image
                      height={16}
                      width={16}
                      className=" mr-3"
                      src={Guidance}
                      alt="Guidance"
                      loading="eager"
                    />
                    <p className="whitespace-nowrap">
                      Guidance from Skin Experts
                    </p>
                  </div>

                  <div className="flex-shrink-0 flex items-center mx-[80px]">
                    <Image
                      height={16}
                      width={16}
                      className=" mr-3"
                      src={FreeConsulation}
                      alt="FreeConsulation"
                      loading="eager"
                    />
                    <p className="whitespace-nowrap">
                      Free Dermatologist Consultations
                    </p>
                  </div>

                  <div className="flex-shrink-0 flex items-center mx-[80px]">
                    <Image
                      height={17}
                      width={16}
                      className=" mr-3"
                      src={ScienceBacked}
                      alt="ScienceBacked"
                      loading="eager"
                    />
                    <p className="whitespace-nowrap">
                      Science Backed Formulation
                    </p>
                  </div>

                  <div className="flex-shrink-0 flex items-center mx-[80px]">
                    <Image
                      height={16}
                      width={16}
                      className=" mr-3"
                      src={Combination}
                      alt="Combination"
                      loading="eager"
                    />
                    <p className="whitespace-nowrap">
                      Combination of Ayurveda, Dermatology, and Advanced Science
                    </p>
                  </div>

                  <div className="flex-shrink-0 flex items-center mx-[80px]">
                    <Image
                      height={16}
                      width={16}
                      className=" mr-3"
                      src={RootCause}
                      alt="RootCause"
                      loading="eager"
                    />
                    <p className="whitespace-nowrap">We Fix the Root Cause</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcneMarqueeBanner;
