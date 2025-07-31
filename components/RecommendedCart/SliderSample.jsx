import Image from "next/legacy/image";
import { useMemo } from "react";

// Import external libraries
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SliderSample(props) {
    //   const [currentSlide, setCurrentSlide] = useState(0);
    const _data = useMemo(() => {
        if (props.SliderData == undefined) return [];
        return props.SliderData;
    }, [props.SliderData]);

    let settings = {
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
        lazyload: true,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    infinite: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    initialSlide: 1,
                    autoplay: false,
                    autoplaySpeed: 2000,
                    infinite: true,
                    nextArrow: false,
                    prevArrow: false,
                    dots: true,
                    className: "center",
                    centerMode: true,
                    centerPadding: "60px",
                },
            },
        ],
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        margin: 20,
    };

    let settingsMobile = {
        dots: true,
        autoplay: false,
        autoplaySpeed: 2000,
        lazyload: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };

    return (
        <>

            <div className="hidden  w-full mx-auto xl:flex justify-center font-sophiaPro">
                <Slider
                    {...settings}
                    className=" hidden items-center justify-center pb-8 "
                >
                    {_data.map((data, index) => {
                        return (
                            <div
                                // onClick={() => {
                                //     props.getProductInfoAndOpen(data.id);
                                //     props.setOtherProductInfo(data);
                                // }}
                                key={index}
                                className=" p-1 border border-[#E8E8E8] border-solid rounded-[4px] h-[470px] relative mx-[10px]"
                            >
                                <div className="bg-Secondary/50">
                                    <Image
                                        src={data.img}
                                        objectFit="contain"
                                        className="animate-fadeIn scale-[1.05] "
                                        width={280}
                                        height={280}
                                        alt=""
                                        priority={true}
                                        unoptimized={true}
                                    />
                                </div>
                                <div className="bg-white flex flex-col gap-[4px]">
                                    <p
                                        title={data.title}
                                        className="text-left text-Grey/900 font-[700] text-[16px] md:text-[18px]   max-w-[96%]  mx-auto"
                                    >
                                        {data.title}
                                    </p>
                                    <p className="text-left text-Grey/500 font-[400] text-[12px] md:text-[14px]  max-w-[96%] mx-auto">
                                        {data.description}
                                    </p>
                                    <p className=" absolute bottom-[15%] left-[10%]  right-[10%] md:text-[18px] text-center text-Grey/900 font-[500] text-[14px] mt-4 ">
                                        ₹ {data.price}
                                    </p>
                                    <button
                                        id='add_to_cart_order_summary'
                                        className={`absolute bottom-[5%] left-[5%]  right-[5%] mx-auto text-center text-[15px] bg-Primary/500  xs:py-[2.5%] xs:px-4 text-white font-bold rounded-full`}
                                        onClick={(e) => { e.stopPropagation(); props._addItem(data, index); }}
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
            <div className=" xl:hidden w-[100%] mx-auto flex justify-center my-4">
                <Slider
                    {...settingsMobile}
                    className=" flex items-center justify-center pb-8"
                >
                    {_data.map((data, index) => {
                        return (
                            <div
                                key={index}
                                className="p-1 border border-[#E8E8E8] border-solid rounded-[4px] h-[390px] relative mx-auto "
                            // onClick={() => {
                            //     props.getProductInfoAndOpen(data.id);
                            //     props.setOtherProductInfo(data);
                            // }}
                            >
                                <div className="bg-Secondary/50">

                                    <Image
                                        src={data.img}
                                        objectFit="contain"
                                        className="animate-fadeIn"
                                        width={300}
                                        height={300}
                                        alt=""
                                        priority={true}
                                        unoptimized={true}
                                    />
                                </div>
                                <div className="bg-white flex flex-col gap-[4px]">
                                    <p
                                        title={data.title}
                                        className="text-left text-Grey/900 font-[700] text-[16px] md:text-[18px]   max-w-[96%]  mx-auto"
                                    >
                                        {data.title}
                                    </p>
                                    <div>
                                        <p className="text-left text-Grey/500 font-[400] text-[12px] md:text-[14px]  max-w-[96%] mx-auto">
                                            {data.description}
                                        </p>
                                        <p className="absolute left-[10%] right-[10%] bottom-[13%] lg:bottom-[17%] md:text-[18px] text-center text-Grey/900 font-[500] text-[14px] mt-4 ">
                                            ₹ {data.price}
                                        </p>
                                        <button
                                            id='add_to_cart_order_summary'
                                            className={`absolute bottom-[5%] left-[5%]  right-[5%] mx-auto text-center xs:text-[12px] bg-Primary/500 xs:py-[2.5%] xs:px-4 text-white font-bold rounded-full `}
                                            onClick={(e) => { e.stopPropagation(); props._addItem(data, index); }}
                                        >
                                            ADD TO CART
                                        </button></div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>

        </>
    );
}
