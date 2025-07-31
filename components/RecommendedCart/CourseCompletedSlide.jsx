import Image from "next/image";
import { Carousel } from "antd";
import celebrate from "@assets/images/celebrate.png";
import { useEffect, useState, useMemo, useCallback } from "react";

const CourseCompletedSlide = ({ contents, ...props }) => {
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 0
    );
    const [newIndex, setNewIndex] = useState(0);

    // Memoized values
    const isDesktop = useMemo(() => windowWidth > 640, [windowWidth]);

    const celebrateImageDimensions = useMemo(() => ({
        width: isDesktop ? 60 : 30,
        height: isDesktop ? 30 : 20
    }), [isDesktop]);

    const buttonColor = useMemo(() =>
        props.isMale ? "bg-custom-green" : "bg-[#E5763E]",
        [props.isMale]
    );

    const allItemsAppended = useMemo(() => {
        const names = contents.map((e) => e.name);

        if (names.length === 1) {
            return names[0];
        }

        return names.slice(0, -1).join(", ") + " and " + names[names.length - 1];
    }, [contents]);

    // Callbacks
    const handleResize = useCallback(() => {
        setWindowWidth(window.innerWidth);
    }, []);

    const handleSlideChange = useCallback((currentSlide) => {
        setNewIndex(currentSlide);
    }, []);

    const handleDecreaseClick = useCallback((content, index) => () => {
        if (content.itemCount >= 2) {
            props.decItem(content, index);
        } else {
            props.deleteItem(content, index);
        }
    }, [props.decItem, props.deleteItem]);

    // Effects
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [handleResize]);

    // Memoized components
    const CelebrationOverlay = useMemo(() => (
        <div className="absolute z-50 backdrop-blur-[1.5px] right-0 top-0 bottom-0 w-[100%] bg-[#000000a5] rounded-lg overflow-hidden">
            <div className="ml-5 mt-6 md:ml-16 md:mt-10 mr-1">
                <div className="flex">
                    <p className="text-white text-[18px] md:text-[35px] md:mt-0 font-fredoka">
                        Congratulations
                    </p>
                    <Image
                        src={celebrate}
                        width={celebrateImageDimensions.width}
                        height={celebrateImageDimensions.height}
                        priority={true}
                        alt="Celebrate Image"
                        className="rounded-xl"
                    />
                </div>
                <p className="text-white text-[15px] md:text-[25px] text-left">
                    {allItemsAppended} course completed
                </p>
            </div>
        </div>
    ), [celebrateImageDimensions.width, celebrateImageDimensions.height, allItemsAppended]);

    const ProductImage = useCallback(({ content }) => (
        <div className="flex flex-col justify-end w-[30%]">
            <div style={{ width: "100%", borderRadius: "4px" }}>
                <div className="w-[80%]">
                    <a href={content.onlineStoreUrl}>
                        <Image
                            src={content.image_url.cartImgUrl}
                            width={40}
                            height={40}
                            layout="responsive"
                            priority={true}
                            alt="Medicine Image"
                            className="rounded-xl"
                        />
                    </a>
                </div>
            </div>
        </div>
    ), []);

    const ProductInfo = useCallback(({ content }) => (
        <div>
            <p className="text-left font-sans text-[#414042] font-[600] text-[16px] md:text-[22px] md:mt-[5%]">
                {content.name}
            </p>
        </div>
    ), []);

    const QuantityControls = useCallback(({ content, index }) => (
        <div className="w-[100%]">
            <button
                className={`relative ${buttonColor} border-[1px] border-solid rounded w-6 h-6 align-top`}
                onClick={handleDecreaseClick(content, index)}
            >
                <span className="absolute -top-[13px] left-[5.5px] text-white text-[22px] font-[500]">
                    _
                </span>
            </button>
            <input
                type="text"
                className="w-6 h-6 border-none align-top align-center bg-[#fff] font-[600]"
                disabled
                style={{
                    color: "#000",
                    textAlign: "center",
                }}
                value={content.itemCount}
                readOnly
            />
            <button
                className={`relative ${buttonColor} border-[1px] border-solid rounded w-6 h-6 align-top`}
            // onClick={() => props.incItem(content, index)} - Commented out as in original
            >
                <span className="absolute -top-[6.5px] left-[4.5px] text-white text-[22px] font-[400]">
                    +
                </span>
            </button>
        </div>
    ), [buttonColor, handleDecreaseClick]);

    const SlideContent = useCallback(({ content, index }) => (
        <div className="border border-solid p-2 rounded-md my-2 relative bg-white">
            {CelebrationOverlay}
            <div className="flex w-[100%] space-x-4 pl-[1%]">
                <ProductImage content={content} />
                <div className="w-[70%]">
                    <div
                        style={{ width: "100%", height: "100%" }}
                        className="pt-2 flex flex-col justify-between"
                    >
                        <ProductInfo content={content} />
                        <div className="">
                            <div className="flex justify-between">
                                <div className="flex w-[100%] space-x-2">
                                    <div className="w-[55%] md:w-[75%]">
                                        <p className="text-[18px] md:text-[20px] font-[700] align-top font-sans text-[#414042] text-left">
                                            ₹ {content.price}
                                        </p>
                                    </div>
                                    <div className="w-[45%] md:w-[25%]">
                                        <QuantityControls content={content} index={index} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ), [CelebrationOverlay, ProductImage, ProductInfo, QuantityControls]);

    // Carousel settings
    const carouselSettings = useMemo(() => ({
        autoplay: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: handleSlideChange,
        // Custom arrow styles can be added here if needed
        arrows: false,
    }), [handleSlideChange]);

    return (
        <div className="mt-2 mb-2">
            <Carousel {...carouselSettings} className="block w-full items-center justify-center">
                {contents.map((content, index) => (
                    <div key={index}>
                        <SlideContent content={content} index={index} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default CourseCompletedSlide;