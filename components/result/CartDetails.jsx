import { useCartContext } from "../../context/CartContext";
import AssignedDoctor from "./AssignDoctor";
import CartItems from "./CartItems";


const CartDetails = ({ isMobile = false, isSmall = false, isDrawer = false, enableFees = true, enableOptin = false }) => {
    const { cartDetails, productsDetails, handleBuyNowClick ,hasPlacedOrder } = useCartContext();

    return (
        <div className=" bg-Secondary/50 md:border md:border-[#AFA792] rounded-[24px] py-0 px-0 md:py-[24px] md:px-[24px]">
            <AssignedDoctor
                enableFees={enableFees}
                enableOptIn={enableOptin}
                isSmall={isSmall}
                isDrawer={isDrawer}
            />
            <CartItems cartDetails={cartDetails} productsDetails={productsDetails} handleBuyNowClick={handleBuyNowClick} isMobile={isMobile}   hasPlacedOrder={hasPlacedOrder} />
        </div>
    );
};

export default CartDetails;
