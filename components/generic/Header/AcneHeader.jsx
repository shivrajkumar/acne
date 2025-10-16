"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ClearRitualLogo from "@assets/images/Clear_Ritual_Logo.png";
import ShopIcon from "@assets/icons/shopping_cart.png";
import HamburgerMenuIcon from "@assets/svg/Hamburger_Menu";
import { trackMoEngageEvent } from "@/utils/moegage";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import DropdownContent from "./DropDownContent";
import MobileMenu from "./MobileMenu";
import CartDrawer from "./CartDrawer";
import DropdownMenu from "./DropDownMenu";
import { navigationItems } from "./navigationData";
import { usePathname } from "next/navigation";

const AcneHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [marqueeHeight, setMarqueeHeight] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [cartData, setCartData] = useState(null);

  const pathname = usePathname();
  const isResultPage = pathname?.startsWith("/result");

  useEffect(() => {
    let savedCart;
    if (typeof window !== undefined) {
      savedCart = JSON.parse(window.localStorage.getItem("acne_result_data"));
      setCartData(savedCart);
    }
  }, []);

  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    setCurrentPath(window.location.pathname);

    checkIfDesktop();
    const updateHeights = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
      const marqueeElement = document.querySelector(".marquee-container-new");

      if (marqueeElement) {
        const marqueeRect = marqueeElement.getBoundingClientRect();

        if (marqueeRect.bottom <= 0) {
          setMarqueeHeight(0);
        } else if (marqueeRect.top < 0) {
          setMarqueeHeight(marqueeRect.height + marqueeRect.top);
        } else {
          setMarqueeHeight(marqueeElement.offsetHeight);
        }
      } else {
        setMarqueeHeight(0);
      }
    };

    updateHeights();

    window.addEventListener("scroll", updateHeights);
    window.addEventListener("resize", updateHeights);

    return () => {
      window.removeEventListener("scroll", updateHeights);
      window.removeEventListener("resize", updateHeights);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalTopOffset = headerHeight + marqueeHeight;

  useBodyScrollLock(isDrawerOpen);
  useBodyScrollLock(isMenuOpen);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleDropdownToggle = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const getDropdownPosition = () => {
    if (!openDropdown) return 0;

    const anchorElement = document.getElementById(`nav-${openDropdown}`);
    if (!anchorElement) return 0;

    const rect = anchorElement.getBoundingClientRect();
    const headerRect = headerRef.current?.getBoundingClientRect();

    if (!headerRect) return 0;

    const anchorLeftPosition = rect.left - headerRect.left;
    const dropdownWidth = 728;
    const headerWidth = headerRect.width;
    const rightEdge = anchorLeftPosition + dropdownWidth;

    if (rightEdge > headerWidth) {
      return headerWidth - dropdownWidth - 5;
    }

    return anchorLeftPosition;
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  const PageClickEvent = (name, url) => {
    trackMoEngageEvent(`PageClicked_${name}`, {
      from_page: currentPath,
      to_page: url,
      time: new Date().toISOString(),
    });
  };

  return (
    <header ref={headerRef} className="relative">
      <div className="bg-[#FFFFFF] relative py-[12px] px-[16px] md:px-[40px] flex justify-between items-center h-[56px] border-b-[1px] font-sophiaPro">
        <button
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <HamburgerMenuIcon />
        </button>

        {/* Logo */}
        <div>
          {isResultPage ? (
            <Image
              src={ClearRitualLogo}
              alt="Clear Ritual"
              height={20}
              width={140}
            />
          ) : (
            <Link href="/">
              <Image
                src={ClearRitualLogo}
                alt="Clear Ritual"
                height={20}
                width={140}
              />
            </Link>
          )}
        </div>

        <div className="hidden md:flex space-x-8 mr-[32px] md:mr-[160px] relative">
          {navigationItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.hasDropdown ? (
                <DropdownMenu
                  title={item.title}
                  isOpen={openDropdown === item.name.toLowerCase()}
                  onToggle={() => handleDropdownToggle(item.name.toLowerCase())}
                  hasDropdown={item.hasDropdown}
                  anchorId={`nav-${item.name.toLowerCase()}`}
                />
              ) : (
                <Link
                  href={item.href}
                  className="font-sophiaPro font-[400] text-[14px] leading-[140%] text-[#313233] hover:text-Primary/500 transition-colors"
                  onClick={() => PageClickEvent(item.name, item.href)}
                >
                  {item.title}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {cartData && (
            <span className="cursor-pointer">
              <Image
                src={ShopIcon}
                width={24}
                height={24}
                alt="Shop"
                onClick={toggleDrawer}
              />
            </span>
          )}
        </div>
      </div>

      {openDropdown && (
        <div
          className="absolute bg-white border-b shadow-lg z-50 hidden md:block w-fit min-w-[177px] h-fit min-h-[130px] p-[24px]"
          style={{
            top: "100%",
            left: `${getDropdownPosition()}px`,
          }}
        >
          <div className="">
            {navigationItems.map((item) => {
              if (
                openDropdown === item.name.toLowerCase() &&
                item.dropdownContent
              ) {
                return (
                  <DropdownContent
                    key={item.name}
                    sections={item.dropdownContent.sections}
                    onLinkClick={closeDropdown}
                    PageClickEvent={PageClickEvent}
                    showCTA={item.dropdownContent.showCTA}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      )}

      <MobileMenu
        isOpen={isMenuOpen}
        onToggle={toggleMenu}
        totalTopOffset={totalTopOffset}
        headerHeight={headerHeight}
        PageClickEvent={PageClickEvent}
        navigationItems={navigationItems}
      />

      {isDrawerOpen && (
        <CartDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          isDesktop={isDesktop}
        />
      )}
    </header>
  );
};

export default AcneHeader;
