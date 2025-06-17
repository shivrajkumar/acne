import { CDN_BASE_URL } from "@/constants/constants";
import Image from "next/image";
import React from "react";

export default function FeaturedReview() {
    return (
        <section className="bg-Background/Beige p-6 md:p-10 xs:p-[16px] rounded-[24px]">
            <div className="flex flex-col">

                {/* Main Content Area */}
                <div className="flex flex-col gap-[40px] md:flex-row md:gap-[40px] xs:gap-[24px]  rounded-2xl overflow-hidden">
                    {/* Doctor Image - Full width on mobile, half width on desktop */}
                    <div className="w-full md:w-1/2 ">
                        <Image
                            src={`${CDN_BASE_URL}website_images/clear_rituals/results_page/featured_review.webp`}
                            alt="Doctor"
                            width={505}
                            height={505}
                            className="object-fit rounded-[16px] xs:hidden"
                        />
                        <Image
                            src={`${CDN_BASE_URL}website_images/clear_rituals/results_page/featured_review.webp`}
                            alt="Doctor"
                            width={296}
                            height={296}
                            className="w-full h-full object-cover rounded-[16px] hidden xs:flex"
                        />
                    </div>

                    {/* Quote Section - Full width on mobile, half width on desktop */}
                    <div className=" w-full md:w-1/2 p-[16px]  md::p-[24px] md:p-10 flex flex-col justify-center rounded-[16px] !font-lato font-[400]">
                        <div className=" md:text-[40px] text-[16px] text-left md:text-left  ">
                            <p className="text-[16px] md:text-[32px] font-[400]  !font-lato leading-[130%]">
                                “I never knew what products to use or how to mix them.
                                Clear Ritual made it so simple – everything works together perfectly, and my skin has never been happier!”
                            </p>
                            <p className="font-lato font-[400] text-[16px] xs:text-[18px] mt-[16px]">
                                Manisha, 26
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
