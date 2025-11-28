import Image from "next/image";

export default function ExpertCard({ expert }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 py-6 border-gray-200">
      <div className="w-[180px] h-[180px] md:w-[300px] md:h-[300px] mx-auto md:mx-0 flex-shrink-0">
        <Image
          src={expert.profile_image}
          alt={expert.name}
          width={300}
          height={300}
          className="rounded-full w-full h-full object-cover"
        />
      </div>

      <div className="text-center md:text-left">
        <h3 className="font-bold text-lg md:text-[32px]">{expert.name}</h3>
        <p className="text-[16px] md:text-2xl text-gray-600 mt-1 md:mt-0">
          {expert.designation} |{" "}
          <span className="text-Primary/500">{expert.experience}</span> |{" "}
          <span className="text-Primary/500">{expert.patients} Patients</span>
        </p>
        <p className="text-sm md:text-[16px] mt-2 text-gray-700">{expert.bio}</p>
      </div>
    </div>
  );
}
