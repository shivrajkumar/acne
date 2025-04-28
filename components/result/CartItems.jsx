const CartItems = ({ cartItems, cartDetails, isMobile, handleBuyNowClick, isThankYouPage = false, totalCartValue, productsDetails }) => {
    // Calculate the total cart value from the items
    const subtotal = totalCartValue || cartDetails?.totalCartValue || 0;

    console.log("cartDeails", cartDetails);
    // Map the new data structure to what the component needs
    const productsDetailsUpdated = productsDetails ? productsDetails : cartItems?.map(item => ({
        quantity: item.quantity,
        name: item.productVariant.name,
        price: item.productVariant.priceAmount * item.quantity, // Total price for this item
    }));


    return (
        <>
            <div className={`${isMobile ? 'flex' : 'hidden md:flex'} flex-col gap-[16px] ${!isThankYouPage && "mt-[24px]"}`}>
                {isThankYouPage && !isMobile &&
                    <>
                        <div className="font-lato font-[400] text-Text/Body-Text text-[24px] -tracking-[0.5px]">Your Order Summary</div>
                        <div className="flex gap-[24px] justify-between">
                            <p className="font-lato font-[400] text-[16px] text-Text/Body-Text -tracking-[1%] overflow-ellipsis">{`(1) Dermatologist Appointment`}</p>
                            <p className="font-lato font-[400] text-[14px] md:text-[18px] text-[#FFFFFF] -tracking-[1%] bg-Semantic/Success w-fit h-[28px] py-[4px] px-[16px] rounded-[8px] flex items-center">{'Free'}</p>
                        </div>
                    </>
                }
                {productsDetailsUpdated?.map((product, index) => (
                    <div key={index} className="flex gap-[24px] justify-between">
                        <p className="font-lato font-[400] text-[16px] text-Text/Body-Text -tracking-[1%] overflow-ellipsis">{`(${product.quantity}) ${product.name}`}</p>
                        <p className="font-lato font-[400] text-[16px] text-Text/Body-Text -tracking-[1%] ">₹{(product.price).toFixed(2)}</p>
                    </div>
                ))}
            </div>

            <div className={`${isMobile ? 'flex' : 'hidden md:flex'} border-[1px] border-Elements/Divider-Stroke h-[1px] mt-[24px]`}></div>

            <div className={`${isMobile ? 'flex' : 'hidden md:flex'} flex-col gap-[16px] mt-[16px]`}>
                <div className="flex justify-between">
                    <p className="font-lato font-[400] text-[14px] md:text-[18px] text-Text/Body-Text -tracking-[1%] overflow-ellipsis">Subtotal</p>
                    <p className="font-lato font-[400] text-[14px] md:text-[18px] text-Text/Body-Text -tracking-[1%]">₹{subtotal.toFixed(2)}</p>
                </div>

                <div className={`${isMobile ? 'flex' : 'hidden md:flex'} justify-between`}>
                    <p className="font-lato font-[400] text-[14px] md:text-[18px] text-Text/Body-Text -tracking-[1%] overflow-ellipsis">Shipping</p>
                    <p className="font-lato font-[400] text-[14px] md:text-[18px] text-[#FFFFFF] -tracking-[1%] bg-Semantic/Success w-fit h-[28px] py-[4px] px-[16px] rounded-[8px] flex items-center">{cartDetails?.shippingCharges || 'Free'}</p>
                </div>

                <div className={`${isMobile ? 'flex' : 'hidden md:flex'} justify-between`}>
                    <p className="font-lato font-[500] text-[16px] md:text-[18px] text-Text/Body-Text -tracking-[1%] overflow-ellipsis">{"Total (pre-tax)"}</p>
                    <p className="font-lato font-[500] text-[16px] md:text-[18px] text-Text/Body-Text -tracking-[1%]">₹{subtotal.toFixed(2)}</p>
                </div>
            </div>

            {
                isMobile && cartDetails?.cta && (
                    <button className="w-full bg-Tertiary/600 px-[16px] py-[16px] rounded-full my-[24px] text-[#FFFFFF] text-[14px] font-[500] -tracking-[1%] justify-center"
                        onClick={handleBuyNowClick}>
                        {cartDetails?.cta}
                    </button>
                )
            }

            {
                !isMobile && cartDetails?.cta && (
                    <button className="hidden md:flex w-full bg-Tertiary/600 px-[56px] py-[16px] rounded-full my-[24px] text-[#FFFFFF] text-[14px] font-[500] -tracking-[1%] justify-center"
                        onClick={handleBuyNowClick}>
                        {cartDetails?.cta}
                    </button>
                )
            }

            <div className={`${isThankYouPage && "mt-[24px]"}`}>
                <p className={`${isMobile ? 'flex' : 'hidden md:flex'} text-[14px] font-lato font-[400] text-Text/Label text-center justify-center`}>
                    {cartDetails?.disclaimer || 'No additional duties and taxes collected upon delivery.'}
                </p>
            </div>
        </>
    )
}

export default CartItems