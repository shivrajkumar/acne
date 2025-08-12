// import { isMobile } from "react-device-detect";
import { Divider, Modal } from "antd";
import Image from "next/image";
import { useEffect } from "react";

const RemoveProductModal = ({
    removedProduct,
    open = false,
    cancel,
    remove,
    isMale,
}) => {

    useEffect(() => {
        if (open) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => document.body.classList.remove('modal-open');
    }, [open]);

    return (
        <Modal
            centered
            open={open}
            footer={null}
            closable={false}
            width={328}
            height={228}
            className="w-[328px] h-[228px] bg-[#FFFFFF] rounded-[12px] "
        >
            <div className="flex items-center gap-2">
                <Image
                    src={removedProduct?.img}
                    alt="Prouct Image"
                    width={72}
                    height={72}
                />
                <div>
                    <p className="font-sophiaPro font-[600] text-[17px] leading-[20px] text-[#303030] text-left">
                        {removedProduct?.title}
                    </p>
                    <p className="font-sophiaPro font-[400] text-[14px] leading-[20px] text-[#303030] text-left">
                        {removedProduct?.benefit}
                    </p>
                </div>
            </div>
            <Divider className="p-0 my-2 border-[1px] border-[#0000001A] " />
            <div className="flex flex-col gap-[12px]">
                <p className="font-sophiaPro font-[400] text-[14px] leading-[20px] text-[#303030] text-left">
                    Are you sure you want to remove this from your cart?
                </p>
                <div className="flex gap-[8px]">
                    <button
                        className={`rounded-[8px] py-[4px] px-[8px] bg-Primary/50
                            text-[14px] font-sophiaPro font-[400] leadinf-[20px] h-[48px] w-full`}
                        onClick={remove}
                    >
                        Remove
                    </button>
                    <button
                        className={`rounded-[8px] py-[4px] px-[8px] bg-Primary/500 text-white
                              text-[14px] font-sophiaPro font-[400] leadinf-[20px] h-[48px] w-full`}
                        onClick={cancel}
                    >
                        Keep in cart
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default RemoveProductModal;
