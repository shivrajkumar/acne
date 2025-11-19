import React from "react";

const ProductsBanner = ({
  title,
  subtitle,
  gradientFrom = "white",
  gradientTo = "#DCEBF2",
  titleColor = "#45474A",
  subtitleColor = "#45474A",
  titleSizeMobile = "text-[28px]",
  titleSizeDesktop = "md:text-[87px]",
  fontWeight = "font-normal",
  containerClasses = "px-4 md:px-12 py-10",
}) => {
  return (
    <section
      className={`w-full ${containerClasses}`}
      style={{
        background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      <div className="mx-auto">
        <h1
          className={`${titleSizeMobile} ${titleSizeDesktop} ${fontWeight} leading-tight tracking-tight`}
          style={{ color: titleColor }}
        >
          {title.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br className="hidden md:block" />
            </React.Fragment>
          ))}
        </h1>

        {subtitle && (
          <p
            className="mt-4 text-[16px] md:text-2xl tracking-[0.5px] font-normal"
            style={{ color: subtitleColor }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default ProductsBanner;
