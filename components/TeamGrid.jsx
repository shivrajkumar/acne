import Image from "next/image";
import { doctorsTeam } from "./constants/allVayuData";

const TeamGrid = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="md:text-[40px] text-[28px] font-[500] text-Text/Heading-Text text-left font-lato tracking-[-0.02em] leading-[1.3]">
          Meet Our Team of Doctors
        </div>
        <p className="text-Text/Heading-Text md:text-[18px] text-[14px] font-[500] text-left leading-[1.35] font-lato tracking-[-0.01em] mt-4">
          Leading dermatologists and skin specialists behind Vayu’s science-backed solutions.
        </p>
      </div>

      <div className="mt-10 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 sm:px-[150px]">
        {doctorsTeam.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-2xl p-6 border border-[#E3E3E2]"
          >
            <div className="flex flex-col items-start md:flex-row gap-4">
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={88}
                height={88}
                className="rounded-full mb-4"
              />
              <div className="text-left">
                <div className="text-[18px] font-[500] leading-[1.35] tracking-[-0.01em] text-Text/Heading-Text font-lato">
                  {doctor.name}
                </div>
                <div className="text-[14px] font-[400] leading-[1.4] font-lato text-gray-600">
                  {doctor.designation}
                </div>
                <div className="text-[14px] font-[500] text-Text/Body-Text font-lato leading-[1.4] mt-2">
                  {doctor.patients}
                </div>
              </div>
            </div>

            <hr className="w-full my-3 border-[#E3E3E2]" />

            <p className="text-[14px] font-[500] text-left text-Text/Body-Text font-lato leading-[1.4]">
              {doctor.quote}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamGrid;
