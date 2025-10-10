import React from "react";
import Image from "next/image";

const DoctorDetailsCard = ({ doctorDetails }) => {
  if (!doctorDetails) return null;

  return (
    <div className="w-full h-36 md:h-44 rounded-xl bg-[#F7FBF2] shadow-sm">
      {/* Header */}
      <div className="inline-block rounded-r-lg bg-[#608C59] px-4 py-2 text-[14px] font-semibold uppercase tracking-wide text-white md:text-sm">
        Your Assigned Doctor
      </div>

      {/* Content */}
      <div className="flex items-start gap-4 flex-row md:items-center p-4 md:p-6">
        {/* Doctor Image */}
        <div className="flex-shrink-0">
          <Image
            src={doctorDetails?.image}
            alt={doctorDetails?.name}
            width={80}
            height={80}
            className="h-20 w-20 rounded-lg object-cover"
          />
        </div>

        {/* Doctor Details */}
        <div>
          <p className="text-base font-semibold text-gray-900">
            {doctorDetails?.name}
          </p>
          <p className="text-sm text-gray-700">
            {doctorDetails?.education} | {doctorDetails?.experience}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsCard;