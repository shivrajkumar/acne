import React from "react";

const NoteCard = ({note}) => {
  return (
    <section className="bg-[#FFF6A8] py-16 px-8 md:px-20 text-center rounded-lg mt-20 max-w-7xl mx-auto">
      {/* Small Header */}
      <p className="text-[16px] md:text-lg tracking-wide text-gray-800 uppercase mb-6">
        A NOTE from Team clear RITUAL.
      </p>

      {/* Main Body */}
      <p className="text-[14px] md:text-lg md:text-[32px] font-semibold text-gray-900 leading-relaxed">
        {note}
      </p>
    </section>
  );
};

export default NoteCard;
