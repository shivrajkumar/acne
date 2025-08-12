import Link from "next/link";
import React, { useState } from "react";
import {
    InstagramIcon,
    TwitterIcon,
    WhatsAppIcon,
} from "@assets/svg/Social_Icons";
import Image from "next/image";
import AppStore from "@assets/images/app_store.webp";
import PlayStore from "@assets/images/google_play.webp";
import PhoneIcon from "@assets/icons/phone_icon.png";
import MailIcon from "@assets/icons/mail_Icon.png";
import { Divider } from "antd";

const MobileFooter = ({
    currentPath,
    PageClickEvent,
    socialIconsClickEvent,
    contactIconsClickEvent
}) => {
    const [expandedSections, setExpandedSections] = useState({
        products: false,
        navigate: false,
        connect: false,
        legal: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const ChevronIcon = ({ isExpanded }) => (
        <svg
            className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    );

    return (
        <>
            {/* App Promotion Section */}
            <div className="mb-8 flex justify-center">
                <div className="bg-white rounded-[24px] px-[40px] py-[24px] text-center text-black w-[328px] gap-[12px]">
                    <p className="font-medium mb-2 text-gray-600">Customised Care. Clinical Results.</p>
                    <h3 className="text-[24px] font-[400] mb-1 leading-tight">
                        Coming Soon.
                    </h3>
                    <h3 className="text-[24px] font-[400] mb-6 leading-tight">
                        Clear Ritual App.
                    </h3>
                    <p className="text-[16px] mb-8 text-black">For iOS and Android</p>
                    <div className="flex gap-[8px]">
                        <button className="flex items-center justify-center">
                            <Image src={AppStore} alt="App Store Download App" width={120} height={38} />
                        </button>
                        <button className="flex items-center justify-center">
                            <Image src={PlayStore} alt="Google Play Download App" width={120} height={38} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Collapsible Sections */}
            <div className="">
                {/* Products Section */}
                <div className=" pb-2">
                    <button
                        onClick={() => toggleSection('products')}
                        className="w-full flex justify-between items-center py-2"
                    >
                        <h4 className="font-[400] font-sophiaPro text-[14px] leading-[1.4] text-white">Products</h4>
                        <ChevronIcon isExpanded={expandedSections.products} />
                    </button>
                    {expandedSections.products && (
                        <ul className="mt-1 space-y-2">
                            <li className="flex gap-[4px] items-center">
                                <Link
                                    href="/"
                                    onClick={() => PageClickEvent("Shop", "/")}
                                    className="text-Grey/50 text-[14px] font-[400]"
                                >
                                    Shop
                                </Link>
                                <div className="py-[2px] px-[4px] text-Grey/900 font-sophiaPro text-[12px] font-[400] leading-[1.4] bg-Warning/500">
                                    Coming Soon
                                </div>
                            </li>
                        </ul>
                    )}
                    <Divider className="bg-white mt-2 p-0 mb-0" />
                </div>

                {/* Navigate Section */}
                <div className=" pb-2">
                    <button
                        onClick={() => toggleSection('navigate')}
                        className="w-full flex justify-between items-center py-2"
                    >
                        <h4 className="font-[400] font-sophiaPro text-[14px] leading-[1.4] text-white">Navigate</h4>
                        <ChevronIcon isExpanded={expandedSections.navigate} />
                    </button>
                    {expandedSections.navigate && (
                        <ul className="mt-1 space-y-2">
                            <li>
                                <Link
                                    href="/skin-test"
                                    onClick={() => PageClickEvent("SkinTest", "/skin-test")}
                                    className="text-Grey/50 text-[14px] font-[400]"
                                >
                                    Take the Skin Test
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about-us"
                                    onClick={() => PageClickEvent("AboutUs", "/about-us")}
                                    className="text-Grey/50 text-[14px] font-[400]"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/experts"
                                    onClick={() => PageClickEvent("Experts", "/experts")}
                                    className="text-Grey/50 text-[14px] font-[400]"
                                >
                                    Our Experts
                                </Link>
                            </li>
                            <li className="flex gap-[4px] items-center">
                                <Link
                                    href="/blog"
                                    onClick={() => PageClickEvent("Blogs", "/")}
                                    className="text-Grey/50 text-[14px] font-[400]"
                                >
                                    Ritual Blogs
                                </Link>
                                {/* <div className="py-[2px] px-[4px] text-Grey/900 font-sophiaPro text-[12px] font-[400] leading-[1.4] bg-Warning/500">
                                    Coming Soon
                                </div> */}
                            </li>
                            <li className="flex gap-[4px] items-center">
                                <Link
                                    href="/"
                                    onClick={() => PageClickEvent("Ingredients", "/")}
                                    className="text-Grey/50 text-[14px] font-[400]"
                                >
                                    Know Your Ingredients
                                </Link>
                                <div className="py-[2px] px-[4px] text-Grey/900 font-sophiaPro text-[12px] font-[400] leading-[1.4] bg-Warning/500">
                                    Coming Soon
                                </div>
                            </li>
                            <li>
                                <Link
                                    href="/reviews"
                                    onClick={() => PageClickEvent("Results", "/reviews")}
                                    className="text-Grey/50 text-[14px] font-[400]"
                                >
                                    Results
                                </Link>
                            </li>
                            <li className="flex gap-[4px] items-center">
                                <Link
                                    href="/editorial-standards"
                                    onClick={() => PageClickEvent("EditorialStandards", "/editorial-standards")}
                                    className="text-Grey/50 text-[14px] font-[400]"
                                >
                                    Editorial Standards
                                </Link>
                            </li>
                        </ul>
                    )}
                    <Divider className="bg-white mt-2 p-0 mb-0" />

                </div>

                {/* Connect Section */}
                <div className=" pb-2">
                    <button
                        onClick={() => toggleSection('connect')}
                        className="w-full flex justify-between items-center py-2"
                    >
                        <h4 className="font-[400] font-sophiaPro text-[14px] leading-[1.4] text-white">Connect</h4>
                        <ChevronIcon isExpanded={expandedSections.connect} />
                    </button>
                    {expandedSections.connect && (
                        <ul className="mt-1 space-y-2">
                            <li>
                                <Link
                                    href="/faq"
                                    onClick={() => PageClickEvent("FAQ", "/")}
                                    className="text-Grey/50 text-[14px] font-[400]"
                                >
                                    FAQs
                                </Link>
                            </li>
                            <li className="flex gap-[4px] items-center">
                                <div className="text-Grey/50 text-[14px] font-[400]">Get in Touch</div>
                                <div className="py-[2px] px-[4px] text-Grey/900 font-sophiaPro text-[12px] font-[400] leading-[1.4] bg-Warning/500">
                                    Coming Soon
                                </div>
                            </li>
                        </ul>
                    )}
                    <Divider className="bg-white mt-2 p-0 mb-0" />

                </div>

                {/* Legal Section */}
                <div className=" pb-2">
                    <button
                        onClick={() => toggleSection('legal')}
                        className="w-full flex justify-between items-center py-2"
                    >
                        <h4 className="font-[400] font-sophiaPro text-[14px] leading-[1.4] text-white">Legal</h4>
                        <ChevronIcon isExpanded={expandedSections.legal} />
                    </button>
                    {expandedSections.legal && (
                        <ul className="mt-1 space-y-2">
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    onClick={() => PageClickEvent("PrivacyPolicy", "/privacy-policy")}
                                    className="text-Grey/50 text-[14px] font-[400]"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms-conditions"
                                    onClick={() => PageClickEvent("TermsConditions", "/terms-conditions")}
                                    className="text-Grey/50 text-[14px] font-[400]"
                                >
                                    Terms of use
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/return-policy"
                                    onClick={() => PageClickEvent("ReturnPolicy", "/return-policy")}
                                    className="text-Grey/50 text-[14px] font-[400]"
                                >
                                    Return Policy
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>

                {/* Contact Info - Always Visible */}
                <div className="mt-[32px] flex flex-col  gap-[16px] ">
                    <a
                        href="tel:+918424004697"
                        className=" items-center text-white font-sophiaPro text-[14px] leading-[140%] flex gap-[8px]"
                        onClick={() => contactIconsClickEvent("Phone")}
                    >
                        <span><Image src={PhoneIcon} alt="Phone Icon" width={24} height={24} /></span>
                        +91 8424004697
                    </a>
                    <a
                        href="mailto:customercare@clearritual.com"
                        className=" items-center  text-white font-sophiaPro text-[14px] leading-[140%] flex gap-[8px]"
                        onClick={() => contactIconsClickEvent("Email")}
                    >
                        <span><Image src={MailIcon} alt="Mail Icon" width={24} height={24} />
                        </span>
                        customercare@clearritual.com
                    </a>
                </div>

                {/* Social Icons - Always Visible */}
                <div className="mt-[32px] flex gap-[11px] items-center justify-start">
                    <Link
                        href="https://www.instagram.com/clear.ritual/"
                        target="_blank"
                        className="text-white"
                        onClick={() => socialIconsClickEvent("Instagram", "https://www.instagram.com/clear.ritual/")}
                    >
                        <InstagramIcon />
                    </Link>
                    <Link
                        href="https://wa.me/918424004697"
                        target="_blank"
                        className="text-white "
                        onClick={() => socialIconsClickEvent("Whatsapp", "https://wa.me/918424004697")}
                    >
                        <WhatsAppIcon />
                    </Link>
                    <Link
                        href="https://x.com/ClearRitual"
                        target="_blank"
                        className="text-white "
                        onClick={() => socialIconsClickEvent("X", "https://x.com/ClearRitual")}
                    >
                        <TwitterIcon />
                    </Link>
                </div>
            </div >
        </>
    );
};

export default MobileFooter;