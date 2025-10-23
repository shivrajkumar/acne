import { CDN_BASE_URL } from "@/constants/constants";
import { useCartContext } from "@/context/CartContext";
import { Carousel } from "antd";
import Image from "next/image";
import React, { memo, useMemo } from "react";

const mapReviewData = (item) => {
  return {
    name: item.name || item.title || "Anonymous",
    description: item.description || item.review || "",
    stage: item.stage || item.level || "",
    images: [
      { src: item.beforeImage || item.images?.before, label: item.beforeLabel || "Before" },
      { src: item.afterImage || item.images?.after, label: item.afterLabel || "After" },
    ].filter((img) => img.src),
  };
};

const TestimonialCard = memo(({ testimonial }) => (
  <div className="bg-Secondary/100 rounded-lg shadow-sm overflow-hidden mx-2 h-[440px] md:h-[534px] flex flex-col">
    <div className="flex h-[240px] md:h-84 flex-shrink-0">
      {testimonial.images.map(({ src, label }, idx) => (
        <div key={idx} className="flex-1 relative">
          <Image
            src={`${CDN_BASE_URL}${src}`}
            alt={`${label} treatment`}
            fill
            className="object-cover py-2 px-2 rounded-2xl"
            loading="lazy"
          />
          <div className="absolute bottom-4 left-4 bg-white px-2 py-1 rounded text-sm font-medium text-gray-700 z-10">
            {label}
          </div>
        </div>
      ))}
    </div>

    <div className="p-2 md:p-4 flex-1 flex flex-col font-sophiaPro font-normal">
      <div className="flex-1">
        <h3 className="text-[24px] md:text-[28px] text-black mb-1 md:mb-3">
          {testimonial.name}
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed md:mb-4 line-clamp-4">
          "{testimonial.description}"
        </p>
      </div>
      <div className="pb-1 border-b border-Primary/500 w-fit">
        <p className="text-[16px] md:text-[24px] font-medium text-Grey/900 tracking-wider">
          {testimonial.stage}, CR Customer
        </p>
      </div>
    </div>
  </div>
));

const AcneReviews = ({ data }) => {
  let reviewDetails = [];

  try {
    const context = useCartContext?.();
    if (context && context.reviewDetails) {
      reviewDetails = context.reviewDetails;
    }
  } catch (err) {
    // not inside context provider → ignore
  }

  // Decide data source: props > context
  const reviews = (data && data.length > 0 ? data : reviewDetails) || [];

  const carouselSettings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: { slidesToShow: 2, slidesToScroll: 1, arrows: true },
        },
        {
          breakpoint: 640,
          settings: { slidesToShow: 1, slidesToScroll: 1, arrows: true },
        },
      ],
    }),
    []
  );

  return (
    <div className="mt-5">
      <Carousel {...carouselSettings}>
        {reviews.map((item, index) => {
          const testimonial = mapReviewData(item);
          return (
            <div key={`${testimonial.name}-${index}`}>
              <TestimonialCard testimonial={testimonial} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default memo(AcneReviews);
