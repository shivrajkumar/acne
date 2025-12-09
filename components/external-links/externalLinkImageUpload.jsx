"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import InstructionOne from "@assets/images/haut-instructions-1.png";
import InstructionTwo from "@assets/images/haut-instructions-2.png";
import ClearRitualLogo from "@assets/images/Clear_Ritual_Logo.png";
import Image from "next/image";
import ImageUploadWithHaut from "@/components/form/liqaHautAi";
import UploadSuccessModal from "@/components/external-links/UploadSuccessModal";
import { GET_USER_DETAILS } from "@constants/urls";
import { fetchRequest } from "@/helpers/fetchRequest";
import { validate as uuidValidate } from "uuid";

const INSTRUCTIONS = [
  { id: 1, text: "Hold Phone in front of your face", img: InstructionOne },
  { id: 2, text: "Remove glasses & makeup", img: InstructionTwo },
];

const LoaderSkeleton = () => {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Header Skeleton */}
      <header className="mb-6 lg:mb-10 p-6 lg:px-28 lg:py-10 bg-[linear-gradient(270deg,#D5F4E1_0%,#F2F2F2_100%)]">
        <div className="flex flex-col gap-4">
          <div className="h-[57px] w-[342px] bg-gray-300 rounded"></div>
          <div className="h-6 w-40 bg-gray-300 rounded lg:hidden"></div>
          <div className="hidden lg:block h-[64px] w-96 bg-gray-300 rounded"></div>
          <div className="h-4 w-60 bg-gray-300 rounded lg:hidden"></div>
          <div className="hidden lg:block h-6 w-[550px] bg-gray-300 rounded"></div>
        </div>
      </header>

      {/* Card Skeleton */}
      <div className="bg-white rounded-xl lg:rounded-2xl p-4 mx-10 lg:p-6 border border-Grey/300 md:max-w-4xl md:mx-auto">
        {/* User Badge */}
        <div className="rounded-lg p-4 bg-gray-200 mb-4">
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
        </div>

        {/* Instruction Cards */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex overflow-hidden">
              <div className="w-[133px] h-[100px] md:w-[186px] md:h-[140px] bg-gray-300 rounded"></div>
              <div className="w-[133px] h-[100px] md:w-[230px] md:h-[140px] bg-gray-200 rounded ml-2"></div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="w-full mt-6 bg-gray-300 h-12 lg:h-14 rounded-full"></div>
      </div>
    </div>
  );
};

const InstructionCard = ({ text, img }) => (
  <div className="overflow-hidden bg-white">
    {/* Desktop layout */}
    <div className="flex">
      <div className="relative w-[133px] h-[100px] md:w-[186px] md:h-[140px]">
        <Image src={img} alt={text} fill className="object-contain" />
      </div>

      <div className="text-gray-800 font-normal text-lg md:text-2xl p-2 md:p-6 w-[133px] h-[100px] md:w-[230px] md:h-[140px] bg-[linear-gradient(270deg,#AEDCC9_0%,#F2F2F2_100%)]">
        {text}
      </div>
    </div>
  </div>
);

const UserBadge = ({ name, stage }) => (
  <div className="rounded-lg p-4 bg-Secondary/100 lg:bg-amber-50 lg:mb-6 text-[16px] md:text-lg">
    <p className="text-gray-800 font-medium">Hi, {name}</p>
    {/* <p className="text-gray-600 text-sm">Acne Stage: {stage}</p> */}
  </div>
);

export default function ExternalLinkImageUpload() {
  const [showCamera, setShowCamera] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  // Get caseId and transactionId from URL params
  const caseId = searchParams.get("caseId");
  const rawCaseId = searchParams.get("caseId");
  const isValidCaseId = rawCaseId && uuidValidate(rawCaseId);
  const transactionId = searchParams.get("transactionId");

  useEffect(() => {
    if (!isValidCaseId) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchUserDetails = async () => {
      try {
        const response = await fetchRequest(GET_USER_DETAILS(rawCaseId), {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
        });

        if (response?.data?.customer_first_name) {
          setFirstName(response.data.customer_first_name);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to load user details:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();

    return () => controller.abort();
  }, [rawCaseId]);

  const handleTakePhoto = () => {
    setShowCamera(true);
  };

  const handleSuccess = (blob) => {
    // Show success modal after image upload
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  if (showCamera) {
    return (
      <>
        <ImageUploadWithHaut
          block={{
            id: "external-link-upload",
            text: "Upload Image",
            type: "image",
          }}
          skinAnalysisStatus="OFF"
          caseId={caseId}
          transactionId={transactionId}
          onSuccess={handleSuccess}
        />
        <UploadSuccessModal
          isOpen={showSuccessModal}
          onClose={handleCloseModal}
          caseId={caseId}
        />
      </>
    );
  }

  if (!isValidCaseId && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center bg-white shadow-md p-8 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Invalid Link
          </h2>
          <p className="text-gray-600">
            The link you used is incorrect or expired. Please contact your skin
            coach for a valid upload link.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoaderSkeleton />;
  }

  return (
    <div className="min-h-screen">
      <header
        className="
    mb-6 lg:mb-10
    p-6 lg:px-28 lg:py-10
    bg-[linear-gradient(270deg,#D5F4E1_0%,#F2F2F2_100%)]
  "
      >
        <div className="flex flex-col gap-4">
          {/* Logo */}
          <div className="font-serif text-gray-900">
            <Image
              src={ClearRitualLogo}
              alt="Clear Ritual"
              width={500}
              height={500}
              className="h-[57px] w-[342px]"
              priority
            />
          </div>

          {/* Heading */}
          <h2 className="text-lg font-normal lg:text-4xl lg:font-light text-gray-800">
            <span>Upload Image</span>
          </h2>

          {/* Description */}
          <p className="text-gray-600">
            <span>
              Please upload a photo so our doctors can track your progress and
              adjust next month’s prescription accurately.
            </span>
          </p>
        </div>
      </header>

      <div className="bg-white rounded-xl lg:rounded-2xl p-4 mx-10 lg:p-6 border border-Grey/300 md:max-w-4xl md:mx-auto">
        <UserBadge name={firstName} />

        <div className="mt-4 lg:mt-0 space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4 lg:mb-6">
          {INSTRUCTIONS.map((item, i) => (
            <InstructionCard key={item.id} {...item} hasIndicators={i === 1} />
          ))}
        </div>

        <button
          onClick={handleTakePhoto}
          className="w-full mt-4 lg:mt-0 bg-Primary/500 text-white py-3 lg:py-4 rounded-full font-medium lg:text-lg transition-colors"
        >
          Take Photo
        </button>
      </div>
    </div>
  );
}
