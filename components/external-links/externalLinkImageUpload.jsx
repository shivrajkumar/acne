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

const INSTRUCTIONS = [
  { id: 1, text: "Hold Phone in front of your face", img: InstructionOne },
  { id: 2, text: "Remove glasses & makeup", img: InstructionTwo },
];

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
  <div className="rounded-lg p-4 bg-stone-100 lg:bg-amber-50 lg:mb-6 text-[16px] md:text-lg">
    <p className="text-gray-800 font-medium">{name}</p>
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
  const caseId = searchParams.get('caseId');
  const transactionId = searchParams.get('transactionId');

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!caseId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(GET_USER_DETAILS(caseId), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerColumns: 'gender,firstName,lastName'
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data?.firstName) {
            setFirstName(data.firstName);
          }
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [caseId]);

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
          block={{ id: "external-link-upload", text: "Upload Image", type: "image" }}
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
          <h2 className="text-lg font-semibold lg:text-4xl lg:font-light text-gray-800">
            <span className="lg:hidden">Upload Image</span>
            <span className="hidden lg:inline text-[64px]">
              How to use your RITUAL
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-600">
            <span className="lg:hidden">
              Your delivery experience matters to us, share feedback, to help us
              make it even better.
            </span>
            <span className="hidden lg:inline text-2xl">
              Welcome to Clear Ritual – we're excited to have you on board.
              Here's your usage guide. For any questions, feel free to reach out
              to your skin coach.
            </span>
          </p>
        </div>
      </header>

      <div className="bg-white rounded-xl lg:rounded-2xl p-4 mx-10 lg:p-6 border border-Grey/300 md:max-w-4xl md:mx-auto">
        <UserBadge name={loading ? "" : (firstName || "Guest")}/>

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
