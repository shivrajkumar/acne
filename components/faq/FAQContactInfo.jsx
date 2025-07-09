import Image from "next/image";
import React from "react";
import MailIcon from "@assets/svg/mail.svg";
import AddressIcon from "@assets/svg/address_icon.svg";
import TimerIcon from "@assets/svg/Off.svg";

const FAQContactInfo = ({ className = "" }) => {
  return (
    <div className={` pt-6 space-y-4 ${className}`}>
      <div className="flex items-start space-x-3 py-[40px] border-b border-b-grey/200">
        <Image src={MailIcon} alt="mail icon" width={40} height={31} />
        <div className="flex flex-col lg:gap-[10px]">
          <h3 className="font-[700] text-primary/700 text-[18px] leading-[140%] tracking-[0.5px] ">
            Write to Us
          </h3>
          <p className="text-primary/700 text-[14px] leading-[150%] font-[400]">
            hello@acne.com
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-3 py-[40px] border-b border-b-grey/200">
        <Image src={AddressIcon} alt="address icon" width={40} height={31} />
        <div className="flex flex-col lg:gap-[10px]">
          <h3 className="font-[700] text-primary/700 text-[18px] leading-[140%] tracking-[0.5px]">
            Mailing Address
          </h3>
          <p className="text-primary/700 text-[16px] leading-[150%] font-[400]">
            Future Health Solutions Pvt Ltd
            <br />
            8th floor, A Wing, Krisha Kunj
            <br />
            Hospital, 462, Dr. Babasaheb Gawai,
            <br />
            Mumbai,
            <br />
            Maharashtra 400072
          </p>
          <p className="text-primary/700 text-[12px] leading-[140%] font-[400] mt-2 ">
            CIN: U0674MH2000PTC123479
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-3 py-[40px] border-b border-b-grey/200">
        <Image src={TimerIcon} alt="timer icon" width={40} height={40} />
        <div className="flex flex-col lg:gap-[10px]">
          <h3 className="font-[700] text-primary/700 text-[18px] leading-[140%] tracking-[0.5px]">
            Working Hours:
          </h3>
          <p className="text-primary/700 text-[16px] leading-[150%] font-[400]">
            9AM - 6PM IST
            <br />
            Monday to Saturday
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQContactInfo;
