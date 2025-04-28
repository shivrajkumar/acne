import Image from "next/image";
import { CDN_BASE_URL } from "../../constants/config";

export default function MarqueeComponent() {
  return (
    <div className="marque 2xl:w-8/12 xl:w-11/12 lg:w-12/12 lg:w-12/12 w-11/12 lg:px-8 mx-2 mx-auto xl:py-10 lg:py-10 md:py-10 py-6 border-b-[1px] mb-2 xl:mb-10 lg:mb-10 md:mb-10 border-[#40d3b94d]">
      <section className="logoMarqueeSection">
        <div className=" " id="logoMarqueeSection">
          <div className="default-content-container flex items-center">
            <div className="default-content-container-inner relative overflow-hidden inline-block">
              <div className="marquee">
                <a href="#" className="-mr-4">
                  <Image
                    height={39}
                    width={130}
                    className="marqueelogo"
                    src={`${CDN_BASE_URL}website_images/commonImages/bussinessWire.png`}
                    alt="bussinessWire"
                    loading="eager"
                  />
                </a>

                <a href="#" className="-mr-4">
                  <Image
                    height={29}
                    width={130}
                    className="marqueelogo"
                    src={`${CDN_BASE_URL}website_images/commonImages/midDay.png`}
                    alt="midDay"
                    loading="eager"
                  />
                </a>

                <a href="#" className="-mr-4">
                  <Image
                    height={17}
                    width={130}
                    className="marqueelogo"
                    src={`${CDN_BASE_URL}website_images/commonImages/theEconomicsTime.png`}
                    alt="theEconomicsTime"
                    loading="eager"
                  />
                </a>

                <a href="#" className="-mr-4">
                  <Image
                    height={32}
                    width={130}
                    className="marqueelogo"
                    src={`${CDN_BASE_URL}website_images/commonImages/cxo.png`}
                    alt="cxo"
                    loading="eager"
                  />
                </a>

                <a href="#" className="-mr-4">
                  <Image
                    height={28}
                    width={130}
                    className="marqueelogo"
                    src={`${CDN_BASE_URL}website_images/commonImages/deccanChronicle.png`}
                    alt="deccanChronicle"
                    loading="eager"
                  />
                </a>

                <a href="#" className="-mr-4">
                  <Image
                    height={25}
                    width={130}
                    className="marqueelogo"
                    src={`${CDN_BASE_URL}website_images/commonImages/cosmopolitan.png`}
                    alt="cosmopolitan"
                    loading="eager"
                  />
                </a>

                <a href="#" className="-mr-4">
                  <Image
                    height={39}
                    width={130}
                    className="marqueelogo"
                    src={`${CDN_BASE_URL}website_images/commonImages/dailyHunt.png`}
                    alt="dailyHunt"
                    loading="eager"
                  />
                </a>

                <a href="#" className="-mr-4">
                  <Image
                    height={32}
                    width={130}
                    className="marqueelogo"
                    src={`${CDN_BASE_URL}website_images/commonImages/hindustanTimes.png`}
                    alt="hindustanTimes"
                    loading="eager"
                  />
                </a>

                <a href="#" className="-mr-4">
                  <Image
                    height={39}
                    width={130}
                    className="marqueelogo"
                    src={`${CDN_BASE_URL}website_images/commonImages/theTribune.png`}
                    alt="theTribune"
                    loading="eager"
                  />
                </a>

                <a href="#" className="-mr-4">
                  <Image
                    height={39}
                    width={130}
                    className="marqueelogo"
                    src={`${CDN_BASE_URL}website_images/commonImages/bussinessWire.png`}
                    alt="bussinessWire"
                    loading="eager"
                  />
                </a>

                <a href="#" className="-mr-4">
                  <Image
                    height={29}
                    width={130}
                    className="marqueelogo"
                    src={`${CDN_BASE_URL}website_images/commonImages/midDay.png`}
                    alt="midDay"
                    loading="eager"
                  />
                </a>

                <a href="#" className="-mr-4">
                  <Image
                    height={14}
                    width={130}
                    className="marqueelogo"
                    src={`${CDN_BASE_URL}website_images/commonImages/theEconomicsTime.png`}
                    alt="theEconomicsTime"
                    loading="eager"
                  />
                </a>

                <a href="#" className="-mr-4">
                  <Image
                    height={32}
                    width={130}
                    className="marqueelogo"
                    src={`${CDN_BASE_URL}website_images/commonImages/cxo.png`}
                    alt="cxo"
                    loading="eager"
                  />
                </a>

                <a href="#" className="-mr-4">
                  <Image
                    height={28}
                    width={130}
                    className="marqueelogo"
                    src={`${CDN_BASE_URL}website_images/commonImages/deccanChronicle.png`}
                    alt="deccanChronicle"
                    loading="eager"
                  />
                </a>

                <a href="#" className="-mr-4">
                  <Image
                    height={39}
                    width={130}
                    className="marqueelogo"
                    src={`${CDN_BASE_URL}website_images/commonImages/cosmopolitan.png`}
                    alt="cosmopolitan"
                    loading="eager"
                  />
                </a>

                <a href="#" className="-mr-4">
                  <Image
                    height={39}
                    width={130}
                    className="marqueelogo"
                    src={`${CDN_BASE_URL}website_images/commonImages/dailyHunt.png`}
                    alt="dailyHunt"
                    loading="eager"
                  />
                </a>

                <a href="#" className="-mr-4">
                  <Image
                    height={17}
                    width={130}
                    className="marqueelogo"
                    src={`${CDN_BASE_URL}website_images/commonImages/hindustanTimes.png`}
                    alt="hindustanTimes"
                    loading="eager"
                  />
                </a>

                <a href="#" className="-mr-4">
                  <Image
                    height={39}
                    width={130}
                    className="marqueelogo"
                    src={`${CDN_BASE_URL}website_images/commonImages/theTribune.png`}
                    alt="theTribune"
                    loading="eager"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
