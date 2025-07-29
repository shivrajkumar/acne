"use client";
import React from "react";
import Image from "next/image";
import { Input, Button, Divider } from "antd";
import { FiUpload } from "react-icons/fi";
import { AiOutlinePicture } from "react-icons/ai";
import BreadcrumbNavigator from "../generic/BreadcrumbNavigator";
import LPBannerDesk from "@assets/images/LandingPageHeroDesktopV2.webp";
import { CDN_BASE_URL, SHOPIFY_CDN_BASE_URL } from "@/constants/constants";
import { contactInfo } from "../faq/data/faqData";
import FaqContactInfo from "../faq/components/FaqContactInfo";

const { TextArea } = Input;

const ContactUsIndex = () => {
  return (
    <div className="w-full text-[#0E1518] font-sophiaPro mx-auto py-12">
      {/* Breadcrumb */}
      <div className="mb-6 px-4 md:px-10">
        <BreadcrumbNavigator />
      </div>

      {/* Contact Section */}
      <div className="flex flex-col md:flex-row gap-12 justify-between px-4 md:px-10">
        {/* Left: Contact Form */}
        <div className="w-full md:w-3/6 font-normal">
          <h1 className="text-[24px] md:text-5xl mb-2">Contact us</h1>
          <div className="w-full md:w-5/6 font-normal text-Grey/500">
            <div className="text-sm md:text-lg text-[#3C3C43] mb-2">
              Feel free to reach out anytime—we're here to help with orders,
              product questions, partnerships or any feedback you'd like to
              share.
            </div>
            <div className="text-sm md:text-lg text-[#3C3C43] mb-2">
              Our customer support team is available via email Monday to Friday,
              9 AM to 5 PM (excluding holidays). We aim to respond within 2
              business days—often sooner.
            </div>
            <div className="text-base md:text-base mb-6">
              * indicates a required field
            </div>
          </div>
          <form className="space-y-4">
            <Input
              placeholder="First and Last Name*"
              className="text-sm py-3 rounded-md placeholder:text-[#141515]"
            />
            <Input
              type="email"
              placeholder="Email*"
              className="text-sm py-3 rounded-md placeholder:text-[#141515]"
            />
            <Input
              placeholder="Contact Reason*"
              className="text-sm py-3 rounded-md placeholder:text-[#141515]"
            />
            <Input
              placeholder="Topic*"
              className="text-sm py-3 rounded-md placeholder:text-[#141515]"
            />
            <TextArea
              placeholder="Tell us the details.*"
              rows={4}
              className="text-sm py-3 rounded-md placeholder:text-[#141515]"
            />
            <div>
              <p className="text-sm text-[#67645E] mb-2 tracking-widest">
                (Optional: 10 files max, total file size must be less than 50MB)
              </p>
              <div className="flex items-center justify-between bg-[#F9F7F2] text-Secondary/500 rounded-md px-4 py-3">
                <span className="text-sm flex items-center gap-2">
                  <AiOutlinePicture className="text-lg" />
                  Drag or paste image here
                </span>
                <Button
                  className="text-sm h-auto py-1 px-3 bg-transparent border-none rounded-md"
                  icon={<FiUpload className="text-lg" />}
                >
                  Upload
                </Button>
              </div>
            </div>
            <Button
              htmlType="submit"
              type="primary"
              className="w-full rounded-full py-6 bg-Primary/500 text-white font-medium flex items-center justify-center gap-2"
            >
              Submit <span className="ml-1">→</span>
            </Button>
          </form>
        </div>

        {/* Right: Cards */}
        <div className="space-y-6 w-full md:w-3/6">
          {/* FAQ Card */}
          <div className="bg-[#F9F7F2] p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-8 py-10">
            <div className="order-1 md:order-2 w-[140px] h-[140px] md:w-[242px] md:h-[242px] flex items-center justify-center border border-Secondary/400 rounded-full overflow-hidden shrink-0">
              <Image
                src={`${CDN_BASE_URL}acne/general/message-icon.webp`}
                alt="faq"
                width={75}
                height={76}
              />
            </div>
            <div className="order-2 md:order-1 w-full flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="md:text-[32px] font-medium mb-2">
                Check out our FAQs.
              </h2>
              <p className="text-sm text-[#3C3C43]/80 mb-4 md:w-4/5">
                We're ready to answer all of your questions about Clear Ritual.
              </p>
              <Button type="primary" className="rounded-full bg-Primary/500">
                Visit FAQ Page →
              </Button>
            </div>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-[#F9F7F2] p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-8 py-10">
            <div className="order-1 md:order-2 w-[140px] h-[140px] md:w-[242px] md:h-[242px] flex items-center justify-center border border-Secondary/400 rounded-full overflow-hidden shrink-0">
              <Image
                src={`${CDN_BASE_URL}acne/general/chat-icon.webp`}
                alt="whatsapp"
                width={75}
                height={76}
              />
            </div>
            <div className="order-2 md:order-1 w-full flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-[18px] md:text-lg font-medium mb-2">
                Chat with Us on Whatsapp.
              </h2>
              <p className="text-sm text-[#3C3C43]/80 mb-4">
                Chat with our customer support team. Monday - Friday 9am to 6pm.
              </p>
              <Button type="primary" className="rounded-full bg-Primary/500">
                Start Chat →
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Company Info Cards */}
      <div className="hidden md:grid md:grid-cols-3 py-12 justify-between gap-6 px-4 md:px-10">
        <div className="flex flex-col justify-center items-center text-center gap-3 border border-gray-300 py-12 px-6 md:px-16">
          <Image
            src={`${SHOPIFY_CDN_BASE_URL}mail.webp`}
            height={40}
            width={40}
            alt="mail icon"
          />
          <h3 className="font-medium">Write to Us</h3>
          <p className="text-sm text-[#3C3C43]/80">
            customercare@clearritual.com
          </p>
        </div>

        <div className="flex flex-col justify-center items-center text-center gap-3 border border-gray-300 py-12 px-6 md:px-16">
          <Image
            src={`${SHOPIFY_CDN_BASE_URL}address.webp`}
            height={40}
            width={40}
            alt="address icon"
          />
          <h3 className="font-medium">Mailing Address</h3>
          <p className="text-sm text-[#3C3C43]/80">
            Clear Ritual
            <br />
            1st Floor, Interface 16 Road, Malad, Mindspace, Malad West, Mumbai,
            Maharashtra - 400064
          </p>
        </div>

        <div className="flex flex-col justify-center items-center text-center gap-3 border border-gray-300 py-12 px-6 md:px-16">
          <Image
            src={`${SHOPIFY_CDN_BASE_URL}timings.webp`}
            height={40}
            width={40}
            alt="timings icon"
          />
          <h3 className="font-medium">Working Hours:</h3>
          <p className="text-sm text-[#3C3C43]/80">
            9AM – 6PM IST
            <br />
            Monday to Saturday
          </p>
        </div>
      </div>

      <div className="mt-12 block md:hidden px-4">
        <FaqContactInfo
          icon={`${SHOPIFY_CDN_BASE_URL}mail.webp`}
          title="Write to Us"
          content={contactInfo.email}
        />
        <Divider className="my-6" />
        <FaqContactInfo
          icon={`${SHOPIFY_CDN_BASE_URL}address.webp`}
          title="Mailing Address"
          content={contactInfo.company}
          subContent={contactInfo.address}
          cin={contactInfo.cin}
        />
        <Divider className="my-6" />
        <FaqContactInfo
          icon={`${SHOPIFY_CDN_BASE_URL}timings.webp`}
          title="Working Hours:"
          content={contactInfo.workingHours}
          subContent={contactInfo.workingDays}
        />
      </div>

      {/* Banner */}
      <div className="w-full py-20 px-0 md:px-10">
        <div className="relative">
          <Image
            src={LPBannerDesk}
            alt="Banner"
            className="w-full object-cover h-[320px] md:h-[420px] md:rounded-3xl"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl">
            <h2 className="text-white text-[24px] md:text-[40px] font-normal text-center px-4">
              Clear skin requires a{" "}
              <span className="font-semibold">RITUAL</span>, not shortcuts.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsIndex;
