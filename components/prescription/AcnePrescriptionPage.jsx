"use client";
import React, { useEffect, useRef, useState } from "react";
import ClearRitualLogo from "@assets/images/clear_ritual_white_logo.webp";
import RxLogo from "@assets/svg/Subtract.svg";
import Image from "next/image";
import { fetchRequest } from "@/helpers/fetchRequest";
import { GET_PRESCRIPTION_API } from "@/constants/urls";
import Loader from "../generic/Loader";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import { CDN_BASE_URL } from "@/constants/constants";

const AcnePrescriptionPage = ({ searchParams }) => {

  const [prescriptionData, setPrescriptionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = searchParams?.userId;

  useEffect(() => {
    if (userId) {
      fetchPrescriptionData();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchPrescriptionData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchRequest(GET_PRESCRIPTION_API(userId));
      setPrescriptionData(response.data);
    } catch (error) {
      console.error("Error fetching prescription data:", error);
      setError("Failed to load prescription data");
    } finally {
      setLoading(false);
    }
  };

  const contentRef = useRef(null);

  const downloadPDF = useReactToPrint({
    contentRef,
  });

  function parseDosageToTimes(dosage) {
    if (!dosage || typeof dosage !== "string") return "Not specified";

    const [am, noon, pm] = dosage.split("-").map(Number);

    const times = [];
    if (am) times.push("AM");
    if (noon) times.push("Afternoon");
    if (pm) times.push("PM");

    return times.length > 0 ? times.join(", ") : "Not specified";
  }


  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="w-full font-lato flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="text-red-500 text-[48px]">⚠️</div>
          <p className="text-text-icon/title text-[16px] font-[500]">Error</p>
          <p className="text-text-icon/subtitle text-[14px]">{error}</p>
          <p className="text-text-icon/subtitle text-[14px]">
            Please try again
          </p>
        </div>
      </div>
    );
  }

  const prescriptionInfo = Array.isArray(prescriptionData) ? prescriptionData[0] : null;

  return (
    <div className=" overflow-hidden  w-full font-lato">
      {Array.isArray(prescriptionData) && prescriptionData.length > 0 ? (
        <>
          <div className="flex-1 pb-[120px]" ref={contentRef}>
            {/* Header */}
            <div className="bg-white h-[48px] flex flex-col gap-4 justify-center">
              <h1 className="text-text-icon/title text-[24px] leading-[130%] font-[400] pl-2">
                Your Prescription
              </h1>
            </div>
            <div className="bg-Radial/Gradient text-white px-[16px] py-[24px] h-[192px] flex flex-col gap-4">
              <div className="flex items-center">
                <img
                  src={ClearRitualLogo.src}
                  alt="Clear Ritual"
                  height="40"
                  width="243"
                />
                <img src={RxLogo.src} alt="Rx" height="32" width="25" />
              </div>
              <div className=" flex justify-between mt-2  ">
                <div className="flex flex-col gap-2">
                  <div>
                    <p className="text-[14px] font-[400] leading-[140%]">
                      {prescriptionInfo?.doctorInfo?.firstName}{" "}
                      {prescriptionInfo?.doctorInfo?.lastName}
                    </p>
                    <p className="text-[14px] font-[400] leading-[140%]">
                      {prescriptionInfo?.doctorInfo?.qualifications[0]}
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] font-[400] leading-[150%] w-[130px] text-wrap">
                      {prescriptionInfo?.doctorInfo?.registrationText}{" "}
                      {prescriptionInfo?.doctorInfo?.registrationNumber}
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
                      {prescriptionInfo?.customerInfo?.firstName}{" "}
                      {prescriptionInfo?.customerInfo?.lastName}
                    </p>
                    <p className="text-text-icon/subtitle text-[12px] font-[400] leading-[150%]">
                      {prescriptionInfo?.customerInfo?.age},{" "}
                      {prescriptionInfo?.customerInfo?.gender
                        ? prescriptionInfo?.customerInfo?.gender.toLowerCase() === "m"
                          ? "Male"
                          : "Female"
                        : ""}
                    </p>
                  </div>

                  {/* <div>
                    <p className="text-text-icon/label-tertiary text-[14px] font-[400] leading-[140%]">
                      {patient?.diagnosisType}
                    </p>
                    <p className="text-text-icon/subtitle text-[12px] font-[400] leading-[150%]">
                      {patient?.diagnosis}
                    </p>
                  </div> */}
                </div>
                <div>
                  <p className="text-text-icon/title text-[14px] leading-[140%] font-[400]">
                    {moment(prescriptionInfo?.customerInfo?.createdAt).format("DD MMMM YYYY")}
                  </p>
                </div>
              </div>
            </div>

            {/* Medicine Section */}
            <div className="p-[16px]">
              <div className="flex items-center mb-4">
                <h2 className=" text-[18px] text-text-icon/body font-[400] leading-[135%] ">
                  Medicine
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
                {Array.isArray(prescriptionInfo?.items) &&
                  prescriptionInfo.items.length > 0 &&
                  prescriptionInfo?.items.map((medicine, index) => (
                    <div
                      key={medicine?.id}
                      className="grid grid-cols-2 bg-surface/disabled-state mb-2 rounded-[8px]"
                    >
                      <div className="p-4 flex gap-[8px] text-text-icon/title text-[14px] font-[400] leading-[140%]">
                        <p className="font-[400]">{index + 1}</p>
                        <p className="font-[500]">{medicine?.productName}</p>
                      </div>
                      <div className="p-4 text-text-icon/body text-[12px] leading-[150%] font-[400] flex flex-col gap-[8px]">
                        <p>{medicine?.description}</p>
                        <p>{parseDosageToTimes(medicine?.dosage)}</p>

                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Treatment Duration */}
            {/* <div className="p-[16px] bg-surface/disabled-state flex flex-col gap-[8px]">
              <h3 className="leading-[135%]  text-text-icon/body text-[18px] font-[400]">
                {treatment?.title}
              </h3>
              <p className="text-text-icon/body text-[14px] font-[400] leading-[140%]">
                {treatment?.description}
              </p>
            </div> */}

            {/* Doctor Signatures */}
            <div className="p-[16px] grid grid-cols-2 h-full">
              <div className="col-span-1">
                <div className="h-[40px] w-[158px] mb-1">
                  <img
                    src={`${CDN_BASE_URL}${prescriptionInfo?.doctorInfo?.doctorSignature}`}
                    alt="Doctor Signature "
                    height={40}
                    width={158}
                    className="w-[158px] h-[40px] object-cover"
                  />
                </div>
                <p className="text-text-icon/title text-[14px] leading-[140%] font-[400]">
                  {prescriptionInfo?.doctorInfo?.firstName}{" "}
                  {prescriptionInfo?.doctorInfo?.lastName}
                </p>
                <p className="text-[12px] text-text-icon/label-tertiary leading-[150%] font-[400]">
                  {prescriptionInfo?.doctorInfo?.qualifications[0]}
                </p>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-10 bg-white shadow-lg border-t border-Elements/Divider-Stroke">
            <div className="flex justify-center items-center md:h-[104px] h-[88px] px-4">
              <button
                className="bg-Neutral/800 text-[#fff] hover:bg-Primary/500 hover:text-[#fff] w-[296px] h-[56px] px-[40px] py-[16px] rounded-[100px] font-medium transition-colors"
                onClick={downloadPDF}
              >
                DOWNLOAD
              </button>
            </div>
          </div>

        </>
      ) : (
        <>
          <div className="bg-Radial/Gradient text-white px-[16px] py-[24px] flex flex-col gap-4">
            <div className="flex items-center">
              <Image
                src={ClearRitualLogo}
                alt="Clear Ritual"
                height={40}
                width={243}
              />
              <Image src={RxLogo} alt="Rx" height={32} width={25} />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 text-center py-4">
            <h2 className="text-text-icon/title text-[18px] font-[500]">
              No Prescription Found
            </h2>
            <p className="text-text-icon/subtitle text-[14px] max-w-[280px]">
              There is no prescription available for this user at the moment.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AcnePrescriptionPage;
