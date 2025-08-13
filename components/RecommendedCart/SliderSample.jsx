import Image from "next/legacy/image";
import { useMemo } from "react";
import { Carousel } from "antd";

export default function SliderSample(props) {
    const _data = useMemo(() => props.SliderData || [], [props.SliderData]);

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        return (
            <div className="flex space-x-[2px] text-Warning/500 w-[12px] h-[12px] md:w-[14px] md:h-[14px] text-[12px] md:text-[14px] m-2">
                {[...Array(5)].map((_, index) => (
                    <span key={index}>
                        {index < fullStars
                            ? "★"
                            : index === fullStars && hasHalfStar
                                ? "★"
                                : "☆"}
                    </span>
                ))}
            </div>
        );
    };

    const settings = {
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        speed: 600,
        cssEase: "ease-in-out",
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 768, // Mobile
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 600,
                    cssEase: "ease-in-out",
                },
            },
        ],
    };

    return (
        <div className="w-full font-sophiaPro">
            <Carousel
                {...settings}
                className="pb-6"
                style={{ gap: "24px" }} // This is for inline spacing – doesn’t affect Tailwind-based gaps
            >
                {_data.map((data, index) => (
                    <div
                        key={data.id || index}
                        onClick={() => {
                            props.getProductInfoAndOpen(data.id);
                            props.setOtherProductInfo(data);
                        }}
                        className="relative bg-white p-[4px] md:p-[12px] rounded-md  mx-[4px] md:mx-[12px] cursor-pointer  min-h-[400px] md:min-h-[400px]  flex flex-col justify-start text-left"
                    >
                        <div className="bg-white border-[1px] border-lightGray rounded-[8px] border-b-0 rounded-b-none">
                            {/* Rating + Badge */}
                            <div className="flex justify-between items-center ">
                                {renderStars(data.rating)}
                                <div className=" my-1 md:my-2 font-sophiaPro text-[10px] md:text-[12px]  px-[4px] md:px-[10px] py-[2px] bg-Warning/500 font-[400] text-Grey/900  uppercase leading-[1.4] flex">
                                    BEST - SELLER
                                </div>
                            </div>

                            {/* Image */}
                            <div className="flex justify-center ">
                                <Image
                                    src={data.img}
                                    width={180}
                                    height={180}
                                    alt={data.name}
                                    objectFit="contain"
                                    priority
                                    unoptimized
                                    className=""
                                />
                            </div>
                        </div>
                        <div className="border-[1px] border-t-0 border-lightGray rounded-[8px] rounded-t-none p-[4px] min-h-[200px] md:min-h-[200px]">
                            {/* Title */}
                            <div className="font-sophiaPro text-[16px] md:text-[18px] font-[700] text-Grey/900 mb-[4px] leading-[1.4] tracking-[0.5px]">
                                {data.title}
                            </div>

                            {/* Description */}
                            <div className="font-sophiaPro text-[12px] md:text-[14px] font-[400] text-Grey/900 leading-[1.3]">
                                {data.description}
                            </div>

                            {/* Price */}
                            <div className="font-sophiaPro text-[14px] md:text-[16px] font-[500] text-Grey/900 leading-[1.3] my-[4px]">
                                ₹ {data.price}
                            </div>
                            <div className="flex justify-center items-start self-center  p-[4px] md:p-[12px]">
                                <button
                                    id='add_to_cart_order_summary'
                                    className="absolute bottom-[5%] md:bottom-[7%] h-[40px] mx-auto text-center text-[14px] border-[1px] border-black px-[24px] text-black rounded-full w-[90%] hover:bg-Grey/900 hover:text-white focus:bg-white focus:text-black transition-all duration-300"
                                    onClick={(e) => { e.stopPropagation(); props._addItem(data, index); }}
                                >
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}