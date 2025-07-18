"use client";
import React, { useEffect, useState, useRef } from "react";
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
import { AiOutlineUser } from "react-icons/ai";

const AcneHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [marqueeHeight, setMarqueeHeight] = useState(0);

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

    // Function to calculate visible heights and update position
    const updateHeights = () => {
      // Measure header height
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }

      // Find marquee element
      const marqueeElement =
        document.querySelector(".marquee-container-new")

      if (marqueeElement) {
        // Check if marquee is visible (not scrolled out of view)
        const marqueeRect = marqueeElement.getBoundingClientRect();

        // If marquee is completely scrolled out of view, its height contribution is 0
        if (marqueeRect.bottom <= 0) {
          setMarqueeHeight(0);
        } else if (marqueeRect.top < 0) {
          // Marquee is partially visible - only count the visible portion
          setMarqueeHeight(marqueeRect.height + marqueeRect.top);
        } else {
          // Marquee is fully visible
          setMarqueeHeight(marqueeElement.offsetHeight);
        }
      } else {
        setMarqueeHeight(0);
      }
    };

    // Initial calculation
    updateHeights();

    // Update measurements on scroll and resize
    window.addEventListener("scroll", updateHeights);
    window.addEventListener("resize", updateHeights);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", updateHeights);
      window.removeEventListener("resize", updateHeights);
    };
  }, []);

  // Calculate total offset whenever headerHeight or marqueeHeight changes
  const totalTopOffset = headerHeight + marqueeHeight;

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
    trackMoEngageEvent(`PageClicked_${name}`, {
      from_page: currentPath,
      to_page: url,
      time: new Date().toISOString(),
    });
  };

  return (
    <header ref={headerRef}>
      {/* Main navigation */}
      <div className="bg-[#FFFFFF] relative py-[12px] px-[16px] md:px-[40px] flex justify-between items-center h-[56px] border-b-[1px] font-sophiaPro">
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
            className="font-sophiaPro font-[400] text-[14px] leading-[140%] text-[#313233]"
            onClick={() => PageClickEvent("AboutUs", "/about-us")}
          >
            About Us
          </Link>
          <Link
            href="/experts"
            className="font-sophiaPro font-[400] text-[14px] leading-[140%] text-[#313233]"
            onClick={() => PageClickEvent("Experts", "/experts")}
          >
            Experts
          </Link>
          <Link
            href="/reviews"
            className="font-sophiaPro font-[400] text-[14px] leading-[140%] text-[#313233]"
            onClick={() => PageClickEvent("Reviews", "/reviews")}
          >
            Reviews
          </Link>
          <Link
            href="/blog"
            className="font-sophiaPro font-[400] text-[14px] leading-[140%] text-[#313233]"
            onClick={() => PageClickEvent("Blogs", "/blog")}
          >
            Blogs
          </Link>
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          {/* To be uncommented after testing. */}
          {/* <Link href='/login'>
            <AiOutlineUser />
          </Link> */}
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

      {/* Mobile Menu Overlay - Now positioned considering both header and marquee with scroll awareness */}
      {isMenuOpen && (
        <div
          className="fixed w-[80%] bg-white z-50 md:hidden border-t"
          style={{
            top: `${totalTopOffset}px`,
            height: `calc(100vh - ${headerHeight}px)`,
          }}
        >
          <div className="py-[12px] px-[16px] flex justify-between items-center border-b">
            <div className="font-sophiaPro text-[16px] font-[500] text-[#1F1F1F]">
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
                  className="font-sophiaPro text-[14px] font-[400] text-Text/Heading-Text]"
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
                  className="font-sophiaPro text-[14px] font-[400] text-Text/Heading-Text]"
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
                  className="font-sophiaPro text-[14px] font-[400] text-Text/Heading-Text]"
                  onClick={() => {
                    PageClickEvent("Reviews", "/reviews");
                    toggleMenu();
                  }}
                >
                  Reviews
                </Link>
              </li>
              <li className="py-[12px] px-[16px]">
                <Link
                  href="/blog"
                  className="font-sophiaPro text-[14px] font-[400] text-Text/Heading-Text]"
                  onClick={() => {
                    PageClickEvent("Blogs", "/Blog");
                    toggleMenu();
                  }}
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </nav>

          {/* Call to action button */}
          <div
            className="fixed bottom-20 left-0 right-0 px-4"
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
                {/* To be uncommented after testing. */}
                {/* <div>
                  <Link href='/login'>
                    <AiOutlineUser />
                  </Link>
                </div> */}
                <div className="flex items-center space-x-2">
                  <Image
                    src={ShopIcon}
                    width={24}
                    height={24}
                    alt="Shop"
                    onClick={() => setIsDrawerOpen(false)}
                    className="cursor-pointer"
                  />
                  <h2 className="font-sophiaPro text-[16px] font-[400]  text-Text/Heading-Text -tracking-[1%]">
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
