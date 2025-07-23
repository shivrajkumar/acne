import Link from "next/link";
import React from "react";

const INGREDIENT_ROWS = {
  A: [
    "Abyssinian Oil",
    "Acacia Collagen",
    "Acerola Extract (hair supplements)",
    "Acetic Acid",
    "Acrylates/Beheneth-25 Methacrylate Copolymer",
    "Acrylates/C10-30 Alkyl Acrylate Crosspolymer",
  ],
  B: [
    "Babassu Oil",
    "Bakuchiol",
    "Bamboo Charcoal",
    "Baobab Extract",
    "Baobab Oil",
    "Barbary Fig Oil",
  ],
  C: [
    "Caffeine",
    "Calendula Extract",
    "Caprylic/Capric Triglyceride",
    "Carbomer",
    "Cedarwood Oil",
    "Centella Asiatica Extract",
  ],
  D: [
    "Daisy Flower Extract",
    "Dandelion Root",
    "Decyl Glucoside",
    "Dexpanthenol",
    "Dimethicone",
    "Dipotassium Glycyrrhizate",
  ],
};

const IngredientGrid = () => {
  return (
    <div className="flex flex-col gap-4 mt-6">
      {Object.entries(INGREDIENT_ROWS).map(([letter, ingredients]) => (
        <div key={letter}>
          {/* Letter Heading */}
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{letter}</h2>

          {/* Grid of Ingredients */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ingredients.map((ingredient, idx) => (
              <Link
                key={`${letter}-${idx}`}
                href={`/ingredients/${ingredient
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="border border-black p-4 bg-white shadow-sm flex flex-col items-start no-underline"
              >
                <span className="text-sm font-medium text-gray-900">
                  {ingredient}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Comedogenic rating:
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IngredientGrid;
