"use client";
import React from "react";
import Image from "next/image";
import { Drawer } from "antd";
import ShopIcon from "@assets/icons/shopping_cart.png";
import CrossIconIcon from "@assets/icons/close-circle.png";
import CartPageHome from "@components/cart/CartPageHome";

const CartDrawer = ({ isOpen, onClose, isDesktop }) => {
    return (
        <Drawer
            placement="right"
            onClose={onClose}
            open={isOpen}
            closable={false}
            width={isDesktop ? 480 : "100%"}
            getContainer={false}
            zIndex={1100}
            rootClassName="custom-drawer-translate"
            rootStyle={{
                zIndex: 1100,
                position: "fixed",
                right: 0,
            }}
            title={
                <div className="flex flex-row items-center justify-between w-full h-[64px]">
                    <div className="flex items-center space-x-2">
                        <Image
                            src={ShopIcon}
                            width={24}
                            height={24}
                            alt="Shop"
                            onClick={onClose}
                            className="cursor-pointer"
                        />
                        <h2 className="font-sophiaPro text-[16px] font-[400] text-[#313233] -tracking-[1%]">
                            Your Cart
                        </h2>
                    </div>

                    <div
                        onClick={onClose}
                        className="cursor-pointer"
                    >
                        <Image
                            src={CrossIconIcon}
                            alt="Cross Icon"
                            width={24}
                            height={24}
                        />
                    </div>
                </div>
            }
        >
            <CartPageHome />
        </Drawer>
    );
};

export default CartDrawer;