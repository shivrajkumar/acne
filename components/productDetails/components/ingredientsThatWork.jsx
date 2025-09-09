import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";

const IngredientsThatWork = () => {
  const products = [
    {
      id: 1,
      title: "Ingredient 1",
      description: "2-in-1 pill for better skin health and hormones.",
      iconText: "h",
      location: "Jammu",
    },
    {
      id: 2,
      title: "Ingredient 2",
      description: "Boosts energy and supports immunity naturally.",
      iconText: "e",
      location: "Delhi",
    },
    {
      id: 3,
      title: "Ingredient 3",
      description: "Promotes hair growth and strengthens roots.",
      iconText: "g",
      location: "Mumbai",
    },
    {
      id: 4,
      title: "Ingredient 4",
      description: "Improves gut health and digestion.",
      iconText: "d",
      location: "Bangalore",
    },
    {
      id: 5,
      title: "Ingredient 5",
      description: "Supports hormonal balance and clear skin.",
      iconText: "s",
      location: "Chennai",
    },
    {
      id: 6,
      title: "Ingredient 6",
      description: "Helps with stress relief and better sleep.",
      iconText: "z",
      location: "Kolkata",
    },
  ];

  return (
    <div className="min-h-screen bg-white mt-20 mx-auto p-4 md:p-8">
      <div className="grid lg:grid-cols-2 gap-6 items-start w-full">
        {/* Left Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">
              Ingredients
            </h1>
            <p className="text-4xl lg:text-5xl font-light text-gray-400">
              that work.
            </p>
          </div>

          <p className="text-lg text-gray-600 font-medium">
            Once-daily options for spontaneous sex.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium">
              Get Started
            </button>
            <button className="bg-white text-Primary/500 border border-Primary/500 text-sm px-6 py-3 rounded-full font-medium">
              See if daily meds are right for me
            </button>
          </div>

          <div className="space-y-4 pt-4">
            {[
              "Customized prescription gel creams",
              "Quality over-the-counter options",
              "100% online support and direct delivery",
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3 text-gray-700">
                <div className="w-5 h-5 bg-Grey/900 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - Product Cards */}
        <div className="overflow-x-auto lg:overflow-visible hide-scrollbar">
          <div className="flex lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-Secondary/100 rounded-2xl p-6 min-w-56 flex flex-col"
              >
                <div className="text-sm font-medium text-gray-600 mb-3">
                  {product.title}
                </div>
                <div className="text-sm text-gray-500 mb-6">
                  {product.description}
                </div>
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg mb-6">
                  <span className="text-white text-2xl font-light">
                    {product.iconText}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <FaArrowRight className="w-4 h-4 text-gray-600" />
                  </button>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <FiMapPin className="w-3 h-3" />
                    <span>{product.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientsThatWork;
