import React from 'react';

const FEATURES = [
  'Clinically Proven Potency',
  '3rd Party Tested',
  'Vegan',
  'No Fillers or Junk',
  'Bioavailable',
  '100% Traceable',
];

const IngredientsFeaturesBar = () => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-6 gap-4 text-center text-xs py-6 border-b text-[#262626]">
      {FEATURES.map((item, i) => (
        <div className='font-sophiaPro py-20 md:py-0 font-normal text-sm' key={i}>{item}</div>
      ))}
    </div>
  );
};

export default IngredientsFeaturesBar;