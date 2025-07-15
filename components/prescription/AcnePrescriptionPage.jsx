"use client";
import React, { useEffect, useRef, useState } from "react";
import ClearRitualLogo from "@assets/images/clear_ritual_white_logo.webp";
import RxLogo from "@assets/svg/Subtract.svg";
import Image from "next/image";
import { fetchRequest } from "@/helpers/fetchRequest";
import { GET_PRESCRIPTION_API } from "@/constants/urls";
import Loader from "../generic/Loader";
import moment from "moment";
import { CDN_BASE_URL } from "@/constants/constants";
import { downloadPDF } from "@/helpers/downloadPDF";
import { Divider } from "antd";
import PrescriptionProductList from "./PrescriptionProductList";

const AcnePrescriptionPage = ({ searchParams }) => {
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const orderId = searchParams?.orderId;

  useEffect(() => {
    if (orderId) {
      fetchPrescriptionData();
    } else {
      setLoading(false);
    }
  }, [orderId]);

  const fetchPrescriptionData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchRequest(GET_PRESCRIPTION_API(orderId));
      setPrescriptionData(response.data);

    } catch (error) {
      console.error("Error fetching prescription data:", error);
      setError("Failed to load prescription data");
    } finally {
      setLoading(false);
    }
  };

  const contentRef = useRef(null);

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
      <div className="w-full font-sophiaPro flex items-center justify-center min-h-screen">
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

  const prescriptionInfo = Array.isArray(prescriptionData)
    ? prescriptionData[0]
    : null;

  const enableAyurvedicProducts = () => prescriptionInfo?.items?.some(
    (item) => item?.category?.toLowerCase() === "ayurveda"
  );

  return (
    <div
      className="   md:mx-auto font-sophiaPro md:w-[360px]"
      id="pdf-content"
    >
      {Array.isArray(prescriptionData) && prescriptionData.length > 0 ? (
        <>
          <div className="flex-1 " ref={contentRef}>
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
              <div className={` flex justify-between mt-2 ${prescriptionInfo?.isLocked ? "blur-sm" : ""} `}>
                <div className="flex flex-col gap-2">
                  <div>
                    <p className="text-[14px] font-[400] leading-[140%]">
                      {prescriptionInfo?.doctorInfo?.firstName}{" "}
                      {prescriptionInfo?.doctorInfo?.lastName}
                    </p>
                    <p className="text-[14px] font-[400] leading-[140%]">
                      {prescriptionInfo?.doctorInfo?.qualifications?.join(", ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] font-[400] leading-[150%] w-[130px] text-wrap">
                      {prescriptionInfo?.doctorInfo?.registrationText}{" "}
                      {prescriptionInfo?.doctorInfo?.registrationNumber}
                    </p>
                  </div>
                </div>
                {prescriptionInfo?.secondaryDoctorInfo &&
                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="text-[14px] font-[400] leading-[140%]">
                        {prescriptionInfo?.secondaryDoctorInfo?.firstName}{" "}
                        {prescriptionInfo?.secondaryDoctorInfo?.lastName}
                      </p>
                      <p className="text-[14px] font-[400] leading-[140%]">
                        {prescriptionInfo?.secondaryDoctorInfo?.qualifications?.join(", ")}
                      </p>
                    </div>
                    <div>
                      <p className="text-[12px] font-[400] leading-[150%] w-[130px] text-wrap">
                        Reg No. - {prescriptionInfo?.secondaryDoctorInfo?.registrationNumber}
                      </p>
                    </div>
                  </div>}
              </div>
            </div>
            {/* Patient Info */}
            <div className={`px-[16px] py-[20px] bg-surface/disabled-state h-auto ${prescriptionInfo?.isLocked ? "blur-sm" : ""}`}>
              <div className="flex justify-between gap-2 ">
                <div className="flex flex-col gap-3 w-[60%]">
                  <div className="overflow-hidden">
                    <p className="text-text-icon/title text-[14px] leading-[140%] font-[400] break-words break-all">
                      {prescriptionInfo?.customerInfo?.firstName}
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
                  <div>
                    <p className="text-text-icon/label-tertiary text-[14px] font-[400] leading-[140%]">
                      {prescriptionInfo?.diagnosisType}
                    </p>
                    <p className="text-text-icon/subtitle text-[12px] font-[400] leading-[150%]">
                      {prescriptionInfo?.diagnosis?.split(",")[1] || "Moderate"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-text-icon/title text-[14px] leading-[140%] font-[400]">
                    {moment(prescriptionInfo?.customerInfo?.createdAt).format("DD MMMM, YYYY")}
                  </p>
                  <p className="text-text-icon/subtitle text-[12px] font-[400] leading-[150%] flex ">
                    Order Id: {prescriptionInfo?.order?.orderDisplayId}
                  </p>
                </div>
              </div>
            </div>

            {/* Medicine Section */}
            <PrescriptionProductList
              prescriptionInfo={prescriptionInfo?.items?.filter((prod) => prod?.category !== "ayurveda")}
              doctorInfo={prescriptionInfo?.secondaryDoctorInfo}
              isLocked={prescriptionInfo?.isLocked}
              parseDosageToTimes={parseDosageToTimes} />

            {enableAyurvedicProducts() &&
              <PrescriptionProductList
                prescriptionInfo={prescriptionInfo?.items?.filter((prod) => prod?.category === "ayurveda")}
                doctorInfo={prescriptionInfo?.doctorInfo}
                isLocked={prescriptionInfo?.isLocked}
                parseDosageToTimes={parseDosageToTimes}
              />

            }


            {/* Treatment Duration */}
            <div className="p-[16px]  bg-surface/disabled-state flex flex-col gap-[8px] mb-[70px]">
              <h3 className="leading-[135%]  text-text-icon/body text-[18px] font-[400]">
                {prescriptionInfo?.treatment?.title}
              </h3>
              <p className="text-text-icon/body text-[14px] font-[400] leading-[140%]">
                {prescriptionInfo?.treatment?.description}
              </p>

            </div>


          </div>

          {!prescriptionInfo?.isLocked && <div className="fixed bottom-0 left-0 right-0 z-10  shadow-custom-top   md:w-[360px] md:mx-auto">
            <button
              className="bg-Neutral/800 text-[#fff] hover:bg-Primary/500 hover:text-[#fff] w-full h-[56px] px-[40px] py-[16px] font-medium transition-colors"
              onClick={() => downloadPDF(prescriptionInfo?.customerInfo?.firstName)}
            >
              DOWNLOAD
            </button>
          </div>}
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
      )
      }
    </div >
  );
};

export default AcnePrescriptionPage;