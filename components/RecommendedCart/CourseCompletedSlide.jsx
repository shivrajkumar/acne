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

    const celebrateImageDimensions = useMemo(
        () => ({
            width: isDesktop ? 66 : 42,
            height: isDesktop ? 60 : 39,
        }),
        [isDesktop]
    );

    const buttonColor = useMemo(
        () => (props.isMale ? "bg-custom-green" : "bg-[#E5763E]"),
        [props.isMale]
    );

    const allItemsAppended = useMemo(() => {
        const names = contents.map((e) => e.name);
        if (names.length === 1) return names[0];
        return names.slice(0, -1).join(", ") + " and " + names[names.length - 1];
    }, [contents]);

    // Callbacks
    const handleResize = useCallback(() => {
        setWindowWidth(window.innerWidth);
    }, []);

    const handleSlideChange = useCallback((currentSlide) => {
        setNewIndex(currentSlide);
    }, []);

    const handleDecreaseClick = useCallback(
        (content, index) => () => {
            if (content.itemCount >= 2) {
                props.decItem(content, index);
            } else {
                props.deleteItem(content, index);
            }
        },
        [props.decItem, props.deleteItem]
    );

    // Effects
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [handleResize]);

    // Overlay (centered + doesn't block dragging/clicks underneath)
    const CelebrationOverlay = useMemo(
        () => (
            <div className="pointer-events-none absolute inset-0 z-50 rounded-lg overflow-hidden">
                <div className="backdrop-blur-[1.5px] bg-[#000000a5] w-full h-full flex items-center justify-center text-center">
                    <div className="p-2 flex flex-col items-center justify-center gap-[8px] md:gap-[16px]">
                        <div className="flex items-center justify-center gap-[8px]">
                            <p className="text-white text-[28px] md:text-[50px] md:mt-0 font-sophiaPro font-[400] md:font-[600]">
                                Congratulations
                            </p>
                            <Image
                                src={celebrate}
                                width={celebrateImageDimensions.width}
                                height={celebrateImageDimensions.height}
                                priority
                                alt="Celebrate Image"
                                className="rounded-xl"
                                draggable={false}
                            />
                        </div>
                        <p className="text-white font-sophiaPro font-[400] text-[14px] md:text-[24px]">
                            {allItemsAppended} course completed
                        </p>
                    </div>
                </div>
            </div>
        ),
        [celebrateImageDimensions.width, celebrateImageDimensions.height, allItemsAppended]
    );

    const ProductImage = useCallback(({ content }) => (
        <div className="flex flex-col justify-end w-[30%]">
            <div style={{ width: "100%", borderRadius: "4px" }}>
                <div className="w-[100%]">
                    <a href={content.onlineStoreUrl}>
                        <Image
                            src={content.image}
                            width={180}
                            height={180}
                            priority
                            alt="Medicine Image"
                            className="rounded-xl"
                            draggable={false}
                        />
                    </a>
                </div>
            </div>
        </div>
    ), []);

    const ProductInfo = useCallback(
        ({ content }) => (
            <div>
                <p className={`text-left font-sophiaPro text-[#414042] font-[500] text-[17px] md:text-[22px]`}>
                    {content.name}
                </p>
            </div>
        ),
        []
    );

    const QuantityControls = useCallback(
        ({ content, index }) => (
            <div className="font-sophiaPro border-Grey/200 text-[14px] font-[400] border-[1px] rounded-full flex items-center justify-between w-[80px] px-2">
                <button
                    type="button"
                    className="font-[400] text-[20px]"
                    aria-label="Decrease quantity"
                    onClick={handleDecreaseClick(content, index)}
                >
                    –
                </button>

                {/* Use span instead of input so dragging works on desktop */}
                <span
                    className="font-[400] text-[15px] w-[20px] text-center select-none"
                    aria-label={`Quantity ${content.quantity}`}
                    role="status"
                >
                    {content.quantity}
                </span>

                <button
                    type="button"
                    className="font-[400] text-[20px]"
                    aria-label="Increase quantity"
                    onClick={() => props.incItem?.(content, index)}
                >
                    +
                </button>
            </div>
        ),
        [handleDecreaseClick, props]
    );

    const SlideContent = useCallback(
        ({ content, index }) => (
            <div className="border border-solid p-[12px] md:p-[24px] rounded-[8px] my-2 relative bg-white transition-all ease-in">
                {CelebrationOverlay}
                <div className="flex w-[100%] space-x-4 pl-[1%]">
                    <ProductImage content={content} />
                    <div className="w-[70%]">
                        <div style={{ width: "100%", height: "100%" }} className="flex flex-col justify-between">
                            <ProductInfo content={content} />
                            <div>
                                <div className="flex justify-between">
                                    <div className="flex w-[100%] space-x-2">
                                        <div className="w-[55%] md:w-[75%]">
                                            <p className="text-[18px] md:text-[20px] font-[500] align-top font-sophiaPro text-[#414042] text-left">
                                                ₹ {content.price}
                                            </p>
                                        </div>
                                        <div className="w-[45%] md:w-[25%] flex justify-end">
                                            <QuantityControls content={content} index={index} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
        [CelebrationOverlay, ProductImage, ProductInfo, QuantityControls]
    );

    // Carousel settings
    const carouselSettings = useMemo(
        () => ({
            autoplay: false,
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: true,
            swipe: true,
            swipeToSlide: true,
            touchMove: true,
            accessibility: true,
            // react-slick signature uses current index, antd passes through; afterChange is safest
            afterChange: handleSlideChange,
            arrows: false,
            adaptiveHeight: false,
        }),
        [handleSlideChange]
    );

    return (
        <div className="mt-2 mb-2">
            <Carousel {...carouselSettings} className="block w-full items-center justify-center">
                {contents.map((content, index) => (
                    <div key={index}>
                        <script>{console.log("content", content)}</script>
                        <SlideContent content={content} index={index} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default CourseCompletedSlide;
