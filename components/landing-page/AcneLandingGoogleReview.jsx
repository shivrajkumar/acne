import { CDN_BASE_URL } from "../../constants/config";
import Image from "next/image";
import MarqueeComponent from '../modular/MarqueeComponent'
const AcneLandingGoogleReview = () => {
  return (
    <div>
      <div className="googleReviewImg 2xl:w-[80%] xl:w-[87%] lg:w-12/12 md:w-11/12 lg:px-[2rem] mx-auto">
        <a
          className="flex pt-4 xl:pt-10 lg:pt-10 md:pt-10"
          href="#googleReview"
        >
          <div className="mr-2">
            <Image
              height={64}
              width={60}
              src={`${CDN_BASE_URL}website_images/commonImages/google.png`}
              alt="google"
              loading="eager"
            />
          </div>
          <div className="">
            <div className="flex flex-row">
              <p className=" font-bold text-2xl text-[#303032]">4.5</p>
              <Image
                height={30}
                width={120}
                src={`${CDN_BASE_URL}website_images/commonImages/stars.png`}
                alt="rating"
                loading="eager"
              />
            </div>
            <div className="flex align-items-center">
              <Image
                height={25}
                width={25}
                loading="eager"
                src={`${CDN_BASE_URL}website_images/commonImages/verifiedIcon.png`}
                alt="verified"
              />
              <Image
                height={26}
                width={140}
                loading="eager"
                src={`${CDN_BASE_URL}website_images/commonImages/reviewsNumber.png`}
                alt="rating count"
              />
            </div>
          </div>
        </a>
      </div>
      <MarqueeComponent />
    </div>
  );
};

export default AcneLandingGoogleReview;
