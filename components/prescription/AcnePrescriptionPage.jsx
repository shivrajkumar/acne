"use client";

import React from "react";
import ClearRitualLogo from "@assets/images/Clear_Ritual_Logo_Whte.png";
import Link from "next/link";
import Image from "next/image";

const AcnePrescriptionPage = ({ data }) => {
  const { clinic, patient, prescription, treatment } = data;

  return (
    <div className=" overflow-hidden  w-full font-lato">
      {/* Header */}
      <div className="bg-white h-[48px] flex flex-col gap-4 justify-center">
        <h1 className="text-text-icon/title text-[24px] leading-[130%] font-[400] pl-2">
          Your Prescription
        </h1>
      </div>
      <div className="bg-Radial/Gradient text-white px-[16px] py-[24px] h-[192px] flex flex-col gap-4">
        <Link href="/">
          <Image
            src={ClearRitualLogo}
            alt="Clear Ritual"
            height={40}
            width={243}
          />
        </Link>
        <div className=" flex justify-between mt-2  ">
          <div className="flex flex-col gap-2">
            <div>
              <p className="text-[14px] font-[400] leading-[140%]">
                {clinic?.primaryDoctor?.name}
              </p>
              <p className="text-[14px] font-[400] leading-[140%]">
                {clinic?.primaryDoctor?.qualification}
              </p>
            </div>
            <div>
              <p className="text-[12px] font-[400] leading-[150%] w-[130px] text-wrap">
                {clinic?.primaryDoctor?.registrationLabel}{" "}
                {clinic?.primaryDoctor?.registrationNumber}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <p className="text-[14px] font-[400] leading-[140%]">
                {clinic?.secondaryDoctor?.name}
              </p>
              <p className="text-[14px] font-[400] leading-[140%]">
                {clinic?.secondaryDoctor?.qualification}
              </p>
            </div>
            <div>
              <p className="text-[12px] font-[400] leading-[150%] w-[130px] text-wrap">
                {clinic?.secondaryDoctor?.registrationLabel}{" "}
                {clinic?.secondaryDoctor?.registrationNumber}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Info */}
      <div className=" px-[16px] py-[20px] bg-surface/disabled-state h-[132px]">
        <div className="flex justify-between">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-text-icon/title text-[14px] leading-[140%] font-[400]">
                {patient?.name}
              </p>
              <p className="text-text-icon/subtitle text-[12px] font-[400] leading-[150%]">
                {patient?.age}, {patient?.gender}
              </p>
            </div>

            <div>
              <p className="text-text-icon/label-tertiary text-[14px] font-[400] leading-[140%]">
                {patient?.diagnosisType}
              </p>
              <p className="text-text-icon/subtitle text-[12px] font-[400] leading-[150%]">
                {patient?.diagnosis}
              </p>
            </div>
          </div>
          <div>
            <p className="text-text-icon/title text-[14px] leading-[140%] font-[400]">
              {patient?.date}
            </p>
          </div>
        </div>
      </div>

      {/* Medicine Section */}
      <div className="p-[16px]">
        <div className="flex items-center mb-4">
          <h2 className=" text-[18px] text-text-icon/body font-[400] leading-[135%] ">
            {prescription?.header}
          </h2>
        </div>

        <div className="overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-2 font-medium text-sm">
            <div className="p-2 text-text-icon/subtitle leading-[20px] font-[400]">
              Name
            </div>
            <div className="p-2 text-text-icon/subtitle leading-[20px] font-[400]">
              Instructions
            </div>
          </div>

          {/* Medicines */}
          {Array.isArray(prescription?.medicines) &&
            prescription.medicines.length > 0 &&
            prescription?.medicines.map((medicine, index) => (
              <div
                key={medicine?.id}
                className="grid grid-cols-2 bg-surface/disabled-state mb-2 rounded-[8px]"
              >
                <div className="p-4 flex gap-[8px] text-text-icon/title text-[14px] font-[400] leading-[140%]">
                  <p className="font-[400]">{medicine?.id}</p>
                  <p className="font-[500]">{medicine?.name}</p>
                </div>
                <div className="p-4 text-text-icon/body text-[12px] leading-[150%] font-[400] flex flex-col gap-[8px]">
                  <p>{medicine?.instructions}</p>
                  {medicine?.timing && <p>{medicine?.timing}</p>}
                  {medicine?.dosage && <p>{medicine?.dosage}</p>}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Treatment Duration */}
      <div className="p-[16px] bg-surface/disabled-state flex flex-col gap-[8px]">
        <h3 className="leading-[135%]  text-text-icon/body text-[18px] font-[400]">
          {treatment?.title}
        </h3>
        <p className="text-text-icon/body text-[14px] font-[400] leading-[140%]">
          {treatment?.description}
        </p>
      </div>

      {/* Doctor Signatures */}
      <div className="p-[16px] grid grid-cols-2 h-[136px]">
        <div className="col-span-1">
          <div className="h-[40px] w-full mb-1">
            <Image
              src={clinic?.primaryDoctor?.signature}
              alt="Doctor Signature 1"
              height={40}
              width={158}
            />
          </div>
          <p className="text-text-icon/title text-[14px] leading-[140%] font-[400]">
            {clinic?.primaryDoctor?.name}
          </p>
          <p className="text-[12px] text-text-icon/label-tertiary leading-[150%] font-[400]">
            {clinic?.primaryDoctor?.qualification}
          </p>
        </div>
        <div className="col-span-1 ">
          <div className="h-[40] w-full mb-1">
            <Image
              src={clinic?.secondaryDoctor?.signature}
              alt="Doctor Signature 2"
              height={40}
              width={158}
            />
          </div>
          <p className="text-text-icon/title text-[14px] leading-[140%] font-[400]">
            {clinic?.secondaryDoctor?.name}
          </p>
          <p className="text-[12px] text-text-icon/label-tertiary leading-[150%] font-[400]">
            {clinic?.secondaryDoctor?.qualification}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcnePrescriptionPage;
