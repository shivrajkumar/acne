export default function StatCard({ value, label, color }) {
  return (
    <div
      style={{ backgroundColor: color }}
      className="text-black flex md:flex-col justify-between text-left px-4 md:px-6 md:py-4 rounded-xl h-[73px] md:h-[275px] w-full"
    >
      <div className="text-[60px] md:text-[170px] leading-none font-normal md:font-bold">{value}</div>
      <div className="hidden md:block border-black border-b mt-5"></div>
      <div className="text-base font-normal md:text-[24px] font-sophiaPro items-center md:mt-5 flex md:justify-start w-2/3 md:w-full">{label}</div>
    </div>
  );
}