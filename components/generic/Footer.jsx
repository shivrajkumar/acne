import Image from "next/image";
import { CDN_BASE_URL } from "@/constants/config";
import Script from "next/script";
import { trayalogo } from "@/constants/constants";
import InstagramSvg from "@/assets/svgs/InstagramSvg";
import FacebookSvg from "@/assets/svgs/FacebookSvg";
import WhatsAppSvg from "@/assets/svgs/WhatsAppSvg";

const TrayaHealthLogo = `${CDN_BASE_URL}website_images/localImages/TrayaFullLogo.webp`;

function Footer() {
  return (
    <>
      <footer className=" lg:text-left bg-custom-black text-gray-50">
        <div className="flex flex-wrap flex-col mt-10 xl:p-12 xs:p-2">
          <div className="flex xl:flex-row md:flex-row xs:flex-col-reverse  items-center xs:justify-center md:justify-between xl:justify-between place-content-center ">
            <div className="flex justify-center">
              <a href="/" className=" ">
                <Image
                  src={TrayaHealthLogo}
                  alt="Traya Health Logo"
                  height={180}
                  width={180}
                  loading="lazy"
                />
              </a>
            </div>
            <div className="flex flex-wrap flex-row justify-around xs:mt-5 xl:mt-10 ">
              <div className="xs:hidden xl:flex xl:flex-row items-top w-96">
                <div className="ml-12">
                  <a href="https://www.instagram.com/traya.health/">
                    <InstagramSvg theme={"light"} />
                  </a>
                </div>
                <div className="ml-4">
                  <a href="https://www.facebook.com/traya.health/">
                    <FacebookSvg theme={"light"} />
                  </a>
                </div>
                <div className=" ml-6 mt-1">
                  <a href="https://api.whatsapp.com/send/?phone=918828006272&text=Hey%21+I+would+like+to+know+more+about+Vayu&type=phone_number&app_absent=0">
                    <WhatsAppSvg theme={"light"} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:mr-8  xs:p-3 flex flex-wrap flex-col xl:w-96 xs:w-full xs:mt-0 text-white">
            <div>
              <Image
                src={trayalogo}
                alt="traya logo"
                height={41}
                width={128}
                loading="lazy"
              />
            </div>
            <div>
              <h5 className="mt-1 mb-2"> Registered Copyright 2020</h5>

              <p> Tatvartha health Pvt. Ltd.</p>
              <p> Mumbai Office: Ground Floor, VakraTunda Corporate Park </p>
              <p> Goregaon East, Mumbai, Maharastra 400063</p>
              <div>
                {" "}
                <span className="font-bold">Registered Office: </span>C67 P1,
                Fortune Hotel Galaxy,
                <p>Koprali R, GIDC, Vapi, Gujarat - 396195</p>
              </div>
            </div>
          </div>
        </div>
        <Script
          async
          src="https://apigoswirl.com/short_video/v3/multiple_page/swirl-short-videos-v3.9.min.js"
        ></Script>
      </footer>
    </>
  );
}

export default Footer;
