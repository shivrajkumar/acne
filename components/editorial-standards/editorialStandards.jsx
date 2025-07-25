import editorialData from "./data.json";

const EditorialStandards = () => {

  return (
    <div className="md:container mx-auto px-4 md:px-24 py-12 text-[#0E1518]">
      <h1 className="text-[30px] md:text-[87px] font-normal font-sophiaPro text-center mb-8">
        Editorial Standards
      </h1>
      {editorialData?.sections?.map((section, idx) => (
        <div key={idx} className="mb-10">
          {section.title && (
            <h2 className="text-[18px] md:text-[40px] font-normal font-sophiaPro mb-4">{section.title}</h2>
          )}
          {section.paragraphs?.map((para, i) => (
            <p key={i} className="text-sm md:text-lg text-[#0F1B28] font-normal font-sophiaPro mb-4 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default EditorialStandards;
