import Image from "next/image";
import ClearRitualLogo from "@assets/images/Clear_Ritual_Logo.png";

export function FormHeader({
  title,
  subtitle,
  bgClassName = "bg-gradient-to-r from-gray-100 via-white to-teal-50",
}) {
  return (
    <div className={`${bgClassName} p-10 md:p-20`}>
      {/* Logo */}
      <div className="mb-4">
        <Image
          src={ClearRitualLogo}
          alt="Clear Ritual Logo"
          width={365}
          height={70}
          className="object-contain w-[273px] h-[45px] md:w-[365px] md:h-[70px]"
        />
      </div>

      <h2 className="text-[28px] md:text-[64px] font-normal font-sophiaPro text-gray-800 mb-2">
        {title}
      </h2>
      <p className="text-gray-600 text-[16px] md:text-2xl font-sophiaPro">{subtitle}</p>
    </div>
  );
}
