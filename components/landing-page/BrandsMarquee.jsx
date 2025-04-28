"use client";
import Image from "next/image";
import Cetaphil from "@assets/images/Cetaphil.png";
import Sebamed from "@assets/images/Sebamed.png";
import HimalayanOrganics from "@assets/images/Himalayn_Organics.png";
import OrdernicIndia from "@assets/images/Organic_India.png";
import Reequil from "@assets/images/Reequil.png";

const Brandmarquee = () => {
  return (
    <div className="bg-Background/Beige marque py-[24px] ">
      <section className="logoMarqueeSection">
        <div id="logoMarqueeSection">
          <div className="default-content-container">
            <div className="default-content-container-inner relative overflow-hidden">
              <div className="marquee-container overflow-hidden w-full">
                <div className="marquee-content flex animate-marquee">
                  {/* First set of brand images */}
                  <div className="flex-shrink-0 flex items-center mx-8">
                    <Image
                      height={72}
                      width={86}
                      className=""
                      src={Cetaphil}
                      alt="Cetaphil"
                      loading="eager"
                    />
                  </div>

                  <div className="flex-shrink-0 flex items-center mx-8">
                    <Image
                      height={72}
                      width={86}
                      className=""
                      src={Sebamed}
                      alt="Sebamed"
                      loading="eager"
                    />
                  </div>

                  <div className="flex-shrink-0 flex items-center mx-8">
                    <Image
                      height={72}
                      width={86}
                      className=""
                      src={HimalayanOrganics}
                      alt="Himalayan Organics"
                      loading="eager"
                    />
                  </div>

                  <div className="flex-shrink-0 flex items-center mx-8">
                    <Image
                      height={72}
                      width={86}
                      className=""
                      src={OrdernicIndia}
                      alt="Organic India"
                      loading="eager"
                    />
                  </div>

                  <div className="flex-shrink-0 flex items-center mx-8">
                    <Image
                      height={72}
                      width={86}
                      className=""
                      src={Reequil}
                      alt="Reequil"
                      loading="eager"
                    />
                  </div>

                  {/* Duplicate set of brand images for seamless loop */}
                  <div className="flex-shrink-0 flex items-center mx-8">
                    <Image
                      height={72}
                      width={86}
                      className=""
                      src={Cetaphil}
                      alt="Cetaphil"
                      loading="eager"
                    />
                  </div>

                  <div className="flex-shrink-0 flex items-center mx-8">
                    <Image
                      height={72}
                      width={86}
                      className=""
                      src={Sebamed}
                      alt="Sebamed"
                      loading="eager"
                    />
                  </div>

                  <div className="flex-shrink-0 flex items-center mx-8">
                    <Image
                      height={72}
                      width={86}
                      className=""
                      src={HimalayanOrganics}
                      alt="Himalayan Organics"
                      loading="eager"
                    />
                  </div>

                  <div className="flex-shrink-0 flex items-center mx-8">
                    <Image
                      height={72}
                      width={86}
                      className=""
                      src={OrdernicIndia}
                      alt="Organic India"
                      loading="eager"
                    />
                  </div>

                  <div className="flex-shrink-0 flex items-center mx-8">
                    <Image
                      height={72}
                      width={86}
                      className=""
                      src={Reequil}
                      alt="Reequil"
                      loading="eager"
                    />
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

export default Brandmarquee;
