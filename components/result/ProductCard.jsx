"use client"
import AMIcon from "@assets/svg/AM.svg";
import PMIcon from "@assets/svg/PM.svg";
import TickIcon from "@assets/svg/tick.svg";
import Image from "next/image";
import { startCase } from "lodash";
import AcneTakeTheSkinTest from "../generic/AcneTakeTheSkinTest";
import { useCartContext } from "@/context/CartContext";
import React from "react";

const ProductCard = ({ product, showAM,showModal, showPM, isOptional = false, addProductToCart, enableAddToCart = false }) => {
        const { removeProductFromCart } = useCartContext();
    
    // Determine if this product was originally optional but has been added to cart
    const wasOptionalAndAdded = product?.isOptionalProduct && !enableAddToCart;
    
    const handleButtonClick = () => {
        if (wasOptionalAndAdded) {
            // This is an optional product that was added, so remove it
            removeProductFromCart(product);
        } else if (enableAddToCart && !isOptional) {
            // This is an optional product that can be added
            addProductToCart(product);
        }
    };

    const getButtonText = () => {
        if (wasOptionalAndAdded) {
            return "Remove";
        } else if (isOptional) {
            return "Added";
        } else {
            return "Add To Bag";
        }
    };

    const getButtonVariant = () => {
        if (wasOptionalAndAdded) {
            return "blue"; 
        } else if (isOptional) {
            return "disabled";
        } else {
            return "blue";
        }
    };
    return (
        <>
            {(isOptional || enableAddToCart) && <p className="font-lato font-[700] text-[12px] text-[#000000] bg-ProductAddNow py-[8px] text-center mb-[16px]">
                {"SOLVE FOR YOUR ACNE SCARS NOW!"}
            </p>
            }
            <div className="hidden md:flex justify-between gap-[24px]">
                {/* Image + Dosage */}
                <div>
                    <Image
                        src={product?.image}
                        alt={product?.name}
                        width={168}
                        height={168}
                        className="w-[168px] h-[168px] cursor-pointer object-cover"
                        onClick={() => showModal(product?.variantId)}
                    />
                    <div className="flex justify-center gap-[16px] mt-[16px]">
                        {showAM && (
                            <div className="flex items-center gap-1">
                                <Image src={AMIcon} alt="AM" width={24} height={24} />
                                <span className="text-[18px] font-[400] leading-[135%] text-Neutral/800">
                                    AM
                                </span>
                            </div>
                        )}
                        {showPM && (
                            <div className="flex items-center gap-1">
                                <Image src={PMIcon} alt="PM" width={22} height={22} />
                                <span className="text-[18px] font-[400] leading-[135%] text-Neutral/800">
                                    PM
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-[16px] flex-1">
                    <div className="flex flex-col gap-[4px]">
                        <p className="font-lato font-[700] text-[18px] text-Text/Heading-Text">
                            {product?.name}
                        </p>
                        {product?.composition && (
                            <p className="font-lato font-[500] text-[16px] text-Text/Heading-Text italic">
                                {product?.composition}
                            </p>
                        )}
                        {product?.size && (
                            <p className="font-lato font-[400] text-Text/Label text-[14px]">
                                Container: {product?.size}
                            </p>
                        )}
                        {product?.dosage && (
                            <p className="font-lato font-[400] text-Text/Label text-[14px]">
                                Dosage: {startCase(product?.dosage)}
                            </p>
                        )}
                    </div>

                    {product?.tags?.length > 0 && (
                        <div className={`flex gap-[8px] flex-wrap ${isOptional || enableAddToCart ? '2xl:w-[490px] md:w-[300px]' : ''}`}>
                            {product.tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="border border-Neutral/600 px-[8px] font-[1400] h-[28px] text-[14px] flex items-center leading-[140%] font-lato  text-primary/700 "
                                >
                                    <Image
                                        src={TickIcon}
                                        alt="Tick"
                                        width={23}
                                        height={23}
                                    />
                                    <span className="ml-[8px]"> {tag}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {product?.rating && product?.price && (
                        <div className="flex gap-[16px]">
                            <p className="font-lato font-[400] text-[16px] text-Text/Body-Text">
                                <span className="w-[20px] h-[20px] mr-[4px]">★</span>
                                {product?.rating} ({product?.ratingPeopleCount})
                            </p>
                            <p className="font-lato font-[700] text-[16px] text-Text/Heading-Text">
                                ₹{product?.price}
                            </p>
                        </div>
                    )}

                    {product?.description && (

                        <p className={`font-lato font-[400] ${isOptional || enableAddToCart ? '' : ''} text-[16px] text-Text/Body-Text -tracking-[1%]`}>
                            {product.description}
                        </p>
                    )}
               {(isOptional || enableAddToCart || wasOptionalAndAdded) && (
    <div className="inline-block md:inline-block" onClick={handleButtonClick}>
        <AcneTakeTheSkinTest
            text={getButtonText()}
            variant={getButtonVariant()}
            tm={" "}
            size={"desktopLarge"}
            deskSize={"desktopLarge"}
        />
    </div>
)}
                </div>
            </div>

            {/* Mobile View */}
            <div className="flex md:hidden flex-col gap-[12px]  p-[12px]  relative" >

                {/* AM/PM icons */}
                <div className="absolute top-[8px] left-[8px] flex flex-col gap-[4px]" >
                    {showAM && (
                        <div className="flex items-center gap-1">
                            <Image src={AMIcon} alt="AM" width={16} height={16} />
                            <span className="text-[18px] font-[400] leading-[135%] text-Neutral/800">
                                AM
                            </span>
                        </div>
                    )
                    }
                    {
                        showPM && (
                            <div className="flex items-center gap-1">
                                <Image src={PMIcon} alt="PM" width={16} height={16} />
                                <span className="text-[18px] font-[400] leading-[135%] text-Neutral/800">
                                    PM
                                </span>
                            </div>
                        )
                    }
                </div>

                {/* Product Image */}
                <div className="w-full flex justify-center" >
                    <Image
                        src={product?.image}
                        alt={product?.name}
                        width={300}
                        height={220}
                        className="object-contain w-[300px] h-[220px] cursor-pointer"
                        onClick={() => showModal(product?.variantId)}
                    />
                </div>

                {/* Title + Price */}
                <div className="flex justify-between items-center gap-[4px]" >
                    <p className="font-lato font-[600] text-[18px]  text-primary/700 leading-[140%]">
                        {product?.name}
                    </p>
                    <p className="font-lato font-[500] text-[18px]  text-color/cyan/6 leading-[23px]">
                        ₹{product?.price}
                    </p>
                </div>

                {/* Rating */}
                {
                    product?.rating && (
                        <p className="font-lato font-[400] text-[14px] text-Text/Body-Text flex items-center leading-[140%]">
                            <span className="text-[20px] mr-[4px] text-Neutral/800">
                                ★
                            </span>
                            {product?.rating} ({product?.ratingPeopleCount})
                        </p>
                    )
                }

                {/* Composition */}
                {
                    product?.composition && (
                        <p className="italic font-lato font-[500] text-[16px] leading-[130%] text-primary/700 ">
                            {product?.composition}
                        </p>
                    )
                }

                {/* Tags */}
                {
                    product?.tags?.length > 0 && (
                        <div className="flex gap-[8px] flex-wrap">
                            {product.tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="border border-Neutral/600 px-[8px] font-[1400] h-[28px] text-[14px] flex items-center leading-[140%] font-lato  text-primary/700 "
                                >
                                    <Image
                                        src={TickIcon}
                                        alt="Tick"
                                        width={23}
                                        height={23}
                                    />
                                    <span className="ml-[8px]"> {tag}</span>
                                </div>
                            ))}
                        </div>
                    )
                }
                <div className="flex   justify-between font-lato font-[400] text-[14px] leading-[140%]  text-primary/700 ">
                    {/* Container info */}
                    {product?.size && <p>Container: {product?.size}</p>}

                    {product?.dosage && (
                        <p>Dosage: {startCase(product?.dosage)}</p>
                    )}
                </div>

                {/* Description */}
                {
                    product?.description && (
                        <p className="font-lato font-[400] leading-[140%] text-[14px] text-Neutral/800 -tracking-[1%] my-1">
                            {product.description}
                        </p>
                    )
                }
                 {(isOptional || enableAddToCart || wasOptionalAndAdded) && (
                    <div className={`flex justify-center`} onClick={handleButtonClick}>
                        <AcneTakeTheSkinTest
                            text={getButtonText()}
                            variant={getButtonVariant()}
                            tm={" "}
                            size={"mobileLarge"}
                            deskSize={"mobileLarge"}
                        />
                    </div>
                )}
            </div>


        </>
    )
}

export default ProductCard;