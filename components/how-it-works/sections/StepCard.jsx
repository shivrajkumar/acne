import React from 'react';

export default function StepCard({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  image,
  isReversed = false,
  bgColor = 'bg-[#EBEBFF]',
  textColor = 'text-[#0F1B28]',
}) {
  const imageUrl = image?.url || imageSrc;
  const altText = image?.alternativeText || imageAlt;

  return (
    <div className={`w-full rounded-3xl overflow-hidden ${bgColor} mb-8`}>
      <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} md:justify-evenly items-center`}>
        <div className="w-full md:w-1/2 p-4 pb-0 md:p-16 flex flex-col justify-center">
          {title && <h2 className={`text-2xl md:text-4xl lg:text-5xl mb-2 lg:mb-5 ${textColor}`}>{title}</h2>}
          {/* {subtitle && <h3 className="text-2xl md:text-2xl mb-4 text-[#3B52F5]">{subtitle}</h3>} */}
          <p className="mb-8 leading-relaxed text-sm lg:text-lg text-[#505354]">
            {description}
          </p>
          {/* {buttonText && (
             <div className="mt-4">
                <ActionButton text={buttonText} onClick={onButtonClick} bgColor="black" />
             </div>
          )} */}
        </div>

        {/* Image Content */}
        <div className="w-full md:w-1/4 p-4 pb-0 pt-0 md:py-12 md:px-2 flex justify-center items-center">
            <div className="relative w-full max-w-sm mx-auto">
                 {/* Placeholder for phone/product frame if needed, or just the image */}
                 <img
                    src={imageUrl}
                    alt={altText}
                    className="w-full h-auto rounded-2xl shadow-xl object-cover"
                 />
            </div>
        </div>
      </div>
    </div>
  );
}