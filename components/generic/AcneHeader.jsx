"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClearRitualLogo from "@assets/images/Clear_Ritual_Logo.png";
import ShopIcon from "@assets/icons/shopping_cart.png";
import HamburgerMenuIcon from "@assets/svg/Hamburger_Menu";
import CrossIcon from "@assets/svg/Cross_Icons";
import CrossIconIcon from "@assets/icons/close-circle.png";
import { Drawer } from "antd";
import CartPageHome from "@components/cart/CartPageHome";
import { trackMoEngageEvent } from "@/utils/moegage";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

const AcneHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  // Detect if viewport is desktop size and set current path - safely
  useEffect(() => {
    // Safe to access window here since useEffect only runs client-side
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint is typically 768px
    };

    // Set current path for tracking
    setCurrentPath(window.location.pathname);

    // Check on initial load
    checkIfDesktop();

    // Check on resize
    window.addEventListener("resize", checkIfDesktop);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfDesktop);
  }, []);

  // Add body scroll lock effect when drawer is open
  useBodyScrollLock(isDrawerOpen);
  useBodyScrollLock(isMenuOpen);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const PageClickEvent = (name, url) => {
    // Using the saved path from useEffect instead of accessing window directly
    trackMoEngageEvent(`PageClicked_${name}`, {
      from_page: currentPath,
      to_page: url,
      time: new Date().toISOString(),
    });
  };

  return (
    <header>
      {/* Main navigation */}
      <div className="bg-[#FFFFFF] relative py-[12px] px-[16px] md:px-[40px] flex justify-between items-center h-[56px] border-b-[1px] font-lato">
        {/* Mobile Menu Button - Only visible on mobile */}
        <button
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <HamburgerMenuIcon />
        </button>

        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              src={ClearRitualLogo}
              alt="Clear Ritual"
              height={20}
              width={140}
            />
          </Link>
        </div>

        {/* Navigation links - Hidden on mobile */}
        <div className="hidden md:flex space-x-8 mr-[32px] md:mr-[160px]">
          <Link
            href="/about-us"
            className="font-lato font-[400] text-[14px] leading-[140%] text-[#313233]"
            onClick={() => PageClickEvent("AboutUs", "/about-us")}
          >
            About Us
          </Link>
          <Link
            href="/experts"
            className="font-lato font-[400] text-[14px] leading-[140%] text-[#313233]"
            onClick={() => PageClickEvent("Experts", "/experts")}
          >
            Experts
          </Link>
          <Link
            href="/reviews"
            className="font-lato font-[400] text-[14px] leading-[140%] text-[#313233]"
            onClick={() => PageClickEvent("Reviews", "/reviews")}
          >
            Reviews
          </Link>
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <span className="cursor-pointer">
            <Image
              src={ShopIcon}
              width={24}
              height={24}
              alt="Shop"
              onClick={toggleDrawer}
            />
          </span>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed top-[96px]  w-[80%] h-[calc(100vh-56px)] bg-white z-50 md:hidden border-t">
          <div className="py-[12px] px-[16px] flex justify-between items-center border-b">
            <div className="font-lato text-[16px] font-[500] text-[#1F1F1F]">
              Menu
            </div>
            <button onClick={toggleMenu}>
              <CrossIcon colour="#171819" />
            </button>
          </div>

          <nav>
            <ul className="">
              <li className="py-[12px] px-[16px]">
                <Link
                  href="/about-us"
                  className="font-lato text-[14px] font-[400] text-Text/Heading-Text]"
                  onClick={() => {
                    PageClickEvent("AboutUs", "/about-us");
                    toggleMenu();
                  }}
                >
                  About Us
                </Link>
              </li>
              <li className="py-[12px] px-[16px]">
                <Link
                  href="/experts"
                  className="font-lato text-[14px] font-[400] text-Text/Heading-Text]"
                  onClick={() => {
                    PageClickEvent("Experts", "/experts");
                    toggleMenu();
                  }}
                >
                  Experts
                </Link>
              </li>
              <li className="py-[12px] px-[16px]">
                <Link
                  href="/reviews"
                  className="font-lato text-[14px] font-[400] text-Text/Heading-Text]"
                  onClick={() => {
                    PageClickEvent("Reviews", "/reviews");
                    toggleMenu();
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </nav>

          {/* Call to action button */}
          <div
            className="fixed  bottom-20 left-0 right-0 px-4"
            style={{ width: "80%" }}
          >
            <Link href="/skin-test">
              <button
                className="w-full bg-black text-white py-4 rounded-full font-medium"
                onClick={toggleMenu}
              >
                TAKE SKIN TEST
              </button>
            </Link>
          </div>
        </div>
      )}

      {isDrawerOpen && (
        <div>
          <Drawer
            placement="right"
            onClose={() => setIsDrawerOpen(false)}
            open={isDrawerOpen}
            closable={false} /* Hide the default close button */
            width={isDesktop ? 480 : "100%"}
            getContainer={false}
            zIndex={1100}
            rootClassName="custom-drawer-translate" //  set higher z-index
            rootStyle={{
              zIndex: 1100,
              position: "fixed", // Forcefully fixes positioning
              right: 0,
              // Aligns to right
            }}
            title={
              <div className="flex flex-row items-center justify-between w-full h-[64px]">
                <div className="flex items-center space-x-2">
                  <Image
                    src={ShopIcon}
                    width={24}
                    height={24}
                    alt="Shop"
                    onClick={() => setIsDrawerOpen(false)}
                    className="cursor-pointer"
                  />
                  <h2 className="font-lato text-[16px] font-[400]  text-Text/Heading-Text -tracking-[1%]">
                    Your Cart
                  </h2>
                </div>

                <div
                  onClick={() => setIsDrawerOpen(false)}
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
        </div>
      )}
    </header>
  );
};

export default AcneHeader;
