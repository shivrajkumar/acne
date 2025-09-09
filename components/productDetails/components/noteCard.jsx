import React from "react";

const NoteCard = () => {
  return (
    <section className="bg-[#FFF6A8] py-16 px-8 md:px-20 text-center rounded-lg mt-20 max-w-7xl mx-auto">
      {/* Small Header */}
      <p className="text-[16px] md:text-lg tracking-wide text-gray-800 uppercase mb-6">
        A NOTE from Team clear RITUAL.
      </p>

      {/* Main Body */}
      <p className="text-[14px] md:text-lg md:text-[32px] font-semibold text-gray-900 leading-relaxed">
        If there is one thing I can’t stand, it’s dry, chapped lips, so the one
        thing that’s always in my bag or my pocket is Lippe. As much as I love
        it, I wanted something that addressed deepening lip lines, uneven
        texture, and chronic dryness on the lips. That’s how Plump-C Tripeptide
        Lippe Mask was born. It has a plumping peptide, 11 amino acids, and
        vitamin C—and 47% of it is comprised of nourishing plant oils and
        butters. Plump-C is the longest-lasting moisture I’ve ever tried, and
        it’s clinically proven to smooth lines, even out texture, and leave your
        lips feeling deeply moisturized and plumper. It’s real lip service.
      </p>

      {/* Signature */}
      <p className="mt-10 text-gray-800 italic text-base">xo, Tiffany</p>
    </section>
  );
};

export default NoteCard;
