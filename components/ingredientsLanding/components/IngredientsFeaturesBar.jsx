import React from "react";
import Image from "next/image";
import claims1 from "@assets/images/ingredients-claims/3rd-party-tested.webp";
import claims2 from "@assets/images/ingredients-claims/allergen-free.webp";
import claims3 from "@assets/images/ingredients-claims/clinically-proven.webp";
import claims4 from "@assets/images/ingredients-claims/dermatologically-tested.webp";
import claims5 from "@assets/images/ingredients-claims/fda-approved.webp";
import claims6 from "@assets/images/ingredients-claims/gmo-free.webp";
import claims7 from "@assets/images/ingredients-claims/gmp-certified.webp";
import claims8 from "@assets/images/ingredients-claims/no-fillers.webp";
import claims9 from "@assets/images/ingredients-claims/vegan.webp";

const FEATURES = [
  claims1,
  claims2,
  claims3,
  claims4,
  claims5,
  claims6,
  claims7,
  claims8,
  claims9,
];

const IngredientsFeaturesBar = () => {
  return (
    <div className="flex justify-between overflow-auto hide-scrollbar gap-10 py-2 border-b px-6 mar">
      {FEATURES.map((img, index) => (
        <div key={index} className="flex items-center justify-center">
          <div className="relative w-12 h-16">
            <Image
              src={img}
              alt={`feature-${index}`}
              fill
              className="object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default IngredientsFeaturesBar;
