import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CDN_BASE_URL } from "@/constants/constants";

const KeyIngredients = ({ ingredients = [] }) => {
  const pathname = usePathname();
  const ingredientsToShow = ingredients.length > 0 ? ingredients : null;

  return (
    <div className="flex flex-col gap-4 pt-4 relative">
      {/* Header */}
      {!pathname.includes("/result") && (
        <div className="flex items-end justify-between">
          <h3 className="text-[18px] text-[#0F1B28] tracking-[0.5px] uppercase font-sophiaPro">
            KEY INGREDIENTS
          </h3>
        </div>
      )}

      {/* Ingredients Grid */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar">
        {ingredientsToShow.map((ingredient, index) => (
          <IngredientCard key={index} ingredient={ingredient} />
        ))}
      </div>
    </div>
  );
};

const IngredientCard = ({ ingredient }) => {
  return (
    <div className="flex flex-col gap-2 w-[200px] shrink-0">
      {/* Image */}
      <div className="h-[194px] w-full rounded overflow-hidden">
        {(ingredient.image || ingredient.images) && (
          <Image
            src={
              "https://dvv8w2q8s3qot.cloudfront.net/" +
              (ingredient.images || ingredient.image)
            }
            alt={ingredient.ingredient_name || ingredient.name}
            width={292}
            height={194}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Info */}
      <div className="flex gap-3 items-start">
        <div className="flex-1 flex flex-col">
          <div className="py-1 border-b border-[#0F1B28]/20">
            <h4
              className="text-[16px] text-[#0F1B28] tracking-[0.5px]"
              style={{ fontFamily: "Sofia Pro, sans-serif" }}
            >
              {ingredient.ingredient_name}
            </h4>
          </div>
          {/* Ayurveda ingredients */}
          {ingredient.ingredientType === "ayurveda" && (
            <>
              <div className="py-1 border-b border-[#0F1B28]/20 flex gap-2.5">
                <span
                  className="text-[12px] text-[#608C59]"
                  style={{ fontFamily: "Sofia Pro, sans-serif" }}
                >
                  Part Used:
                </span>
                <span
                  className="text-[12px] text-[#0F1B28]"
                  style={{ fontFamily: "Sofia Pro, sans-serif" }}
                >
                  {ingredient.part_used || ingredient.partUsed || "N/A"}
                </span>
              </div>
              <div className="py-1 border-b border-[#0F1B28]/20 flex gap-2.5">
                <span
                  className="text-[12px] text-[#608C59]"
                  style={{ fontFamily: "Sofia Pro, sans-serif" }}
                >
                  From:
                </span>
                <span
                  className="text-[12px] text-[#0F1B28]"
                  style={{ fontFamily: "Sofia Pro, sans-serif" }}
                >
                  {ingredient.location || ingredient.from || "N/A"}
                </span>
              </div>
            </>
          )}

          {/* Cosmetics ingredients */}
          {ingredient.ingredientType === "cosmetics" && (
            <>
              <div className="py-1 border-b border-[#0F1B28]/20 flex gap-2.5">
                <span
                  className="text-[12px] text-[#608C59]"
                  style={{ fontFamily: "Sofia Pro, sans-serif" }}
                >
                  Function:
                </span>
                <span
                  className="text-[12px] text-[#0F1B28]"
                  style={{ fontFamily: "Sofia Pro, sans-serif" }}
                >
                  {ingredient.function
                    ? ingredient.function
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())
                    : "N/A"}
                </span>
              </div>
              <div className="py-1 border-b border-[#0F1B28]/20 flex gap-2.5">
                <span
                  className="text-[12px] text-[#608C59]"
                  style={{ fontFamily: "Sofia Pro, sans-serif" }}
                >
                  Comedogenic:
                </span>
                <span
                  className="text-[12px] text-[#0F1B28]"
                  style={{ fontFamily: "Sofia Pro, sans-serif" }}
                >
                  {ingredient.comedogenic_score !== undefined
                    ? `${ingredient.comedogenic_score}/5`
                    : "N/A"}
                </span>
              </div>
            </>
          )}

          {/* Drugs ingredients */}
          {ingredient.ingredientType === "drugs" && (
            <>
              <div className="py-1 border-b border-[#0F1B28]/20 flex gap-2.5">
                <span
                  className="text-[12px] text-[#608C59]"
                  style={{ fontFamily: "Sofia Pro, sans-serif" }}
                >
                  Function:
                </span>
                <span
                  className="text-[12px] text-[#0F1B28]"
                  style={{ fontFamily: "Sofia Pro, sans-serif" }}
                >
                  {ingredient.function || "N/A"}
                </span>
              </div>
              <div className="py-1 border-b border-[#0F1B28]/20 flex gap-2.5">
                <span
                  className="text-[12px] text-[#608C59]"
                  style={{ fontFamily: "Sofia Pro, sans-serif" }}
                >
                  Type:
                </span>
                <span
                  className="text-[12px] text-[#0F1B28]"
                  style={{ fontFamily: "Sofia Pro, sans-serif" }}
                >
                  {ingredient.type || "N/A"}
                </span>
              </div>
            </>
          )}

          {/* Fallback for ingredients without type or unknown type */}
          {(!ingredient.ingredientType ||
            !["ayurveda", "cosmetics", "drugs"].includes(
              ingredient.ingredientType
            )) && (
            <>
              <div className="py-1 border-b border-[#0F1B28]/20 flex gap-2.5">
                <span
                  className="text-[12px] text-[#608C59]"
                  style={{ fontFamily: "Sofia Pro, sans-serif" }}
                >
                  Part Used:
                </span>
                <span
                  className="text-[12px] text-[#0F1B28]"
                  style={{ fontFamily: "Sofia Pro, sans-serif" }}
                >
                  {ingredient.partUsed || "N/A"}
                </span>
              </div>
              <div className="py-1 border-b border-[#0F1B28]/20 flex gap-2.5">
                <span
                  className="text-[12px] text-[#608C59]"
                  style={{ fontFamily: "Sofia Pro, sans-serif" }}
                >
                  From:
                </span>
                <span
                  className="text-[12px] text-[#0F1B28]"
                  style={{ fontFamily: "Sofia Pro, sans-serif" }}
                >
                  {ingredient.from || "N/A"}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeyIngredients;
