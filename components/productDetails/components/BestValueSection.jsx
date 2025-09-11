import React from 'react';
import AutomaticShipping from '../../../assets/icons/automatic-shipping.png'
import FreeGift from '../../../assets/icons/free-gift-on-subscription.png'
import EditAnytime from '../../../assets/icons/edit-cancel-anytime.png'
import Image from 'next/image';

const BestValueSection = () => {
  return (
    <div className="border border-[#C5CBCB] rounded overflow-hidden">
      {/* Header */}
      <div className="bg-[#E1E6FE] p-4 flex items-center justify-start">
        <h3 className="text-[18px] md:text-[24px] text-[#0F1B28] tracking-[0.5px]" style={{ fontFamily: 'Sofia Pro, sans-serif' }}>
          Best Value
        </h3>
      </div>

      {/* Content */}
      <div className="p-2 md:p-6 flex flex-col gap-10">
        {/* Features Grid */}
        <div className="flex items-center justify-between">
          <FeatureItem
            icon={AutomaticShipping}
            title="Automatic Shipping"
          />
          <div className="w-px h-full bg-[#E9EDED] self-stretch" />
          <FeatureItem
            icon={FreeGift}
            title="Free Gift on Subscription"
          />
          <div className="w-px h-full bg-[#E9EDED] self-stretch" />
          <FeatureItem
            icon={EditAnytime}
            title="Edit or Cancel Anytime"
          />
        </div>

        {/* Benefits List */}
        <div className="flex flex-col gap-4">
          <BenefitItem text="Earn points on every purchase" />
          <BenefitItem text="Free shipping on orders over $42" />
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon, title }) => {
  return (
    <div className="flex flex-col gap-[3px] items-center justify-start w-40">
      <div className="h-[60px] w-[61px] flex items-center justify-center">
        <Image src={icon} alt={title} width={61} height={60} />
      </div>
      <p className="text-sm md:text-[18px] text-[#0F1B28] text-center tracking-[0.5px] leading-[1.4]" style={{ fontFamily: 'Sofia Pro, sans-serif' }}>
        {title}
      </p>
    </div>
  );
};

const BenefitItem = ({ text }) => {
  return (
    <div className="flex gap-4 items-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="#0F1B28"/>
        <path d="M7 12L10 15L17 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-[14px] md:text-[18px] text-[#0F1B28] leading-[30px]">
        {text}
      </span>
    </div>
  );
};

const ShippingIcon = () => (
  <svg width="61" height="60" viewBox="0 0 61 60" fill="none">
    <rect x="10" y="15" width="41" height="30" stroke="#0F1B28" strokeWidth="2"/>
    <path d="M30.5 25V35" stroke="#0F1B28" strokeWidth="2"/>
    <path d="M25 30H36" stroke="#0F1B28" strokeWidth="2"/>
  </svg>
);

const GiftIcon = () => (
  <svg width="62" height="60" viewBox="0 0 62 60" fill="none">
    <rect x="11" y="20" width="40" height="25" stroke="#0F1B28" strokeWidth="2"/>
    <path d="M31 20V45" stroke="#0F1B28" strokeWidth="2"/>
    <path d="M11 30H51" stroke="#0F1B28" strokeWidth="2"/>
    <path d="M21 20C21 15 26 10 31 15C36 10 41 15 41 20" stroke="#0F1B28" strokeWidth="2"/>
  </svg>
);

const EditIcon = () => (
  <svg width="61" height="60" viewBox="0 0 61 60" fill="none">
    <path d="M25 35L35 25" stroke="#0F1B28" strokeWidth="2"/>
    <path d="M35 25L40 20L45 25L40 30" stroke="#0F1B28" strokeWidth="2"/>
    <path d="M25 35L20 40H30L25 35Z" stroke="#0F1B28" strokeWidth="2"/>
  </svg>
);

export default BestValueSection;