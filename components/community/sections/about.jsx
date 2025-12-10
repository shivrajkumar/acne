import React from "react";

// Helper function to highlight specific words in a title
const HighlightedTitle = ({ title, highlightedWords = [] }) => {
  if (!highlightedWords.length) return title;
  
  // Create a regex pattern to match highlighted words
  const pattern = new RegExp(`(${highlightedWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = title.split(pattern);
  
  return parts.map((part, i) => {
    const isHighlighted = highlightedWords.some(
      word => word.toLowerCase() === part.toLowerCase()
    );
    return isHighlighted ? (
      <span key={i} className="text-[#4F46E5]">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    );
  });
};

// Helper to get image URL from Strapi format
const getImageUrl = (image) => {
  if (!image) return '';
  if (typeof image === 'string') return image;
  // Strapi formats: image.url, image.data.attributes.url, or nested formats
  return image?.url || image?.data?.attributes?.url || image?.formats?.medium?.url || '';
};

const TopicCard = ({ topic, index }) => {
  const isEven = index % 2 === 0;
  const imageUrl = getImageUrl(topic.image);

  const imageBlock = (
    <div className="hidden md:block shrink-0">
      <div className="rounded-xl overflow-hidden w-28 h-28 md:w-40 md:h-48 lg:w-80 lg:h-96 bg-gray-100">
        {imageUrl && (
          <img 
            src={imageUrl?.url} 
            alt={topic.title} 
            className="w-full h-full object-cover block" 
          />
        )}
      </div>
    </div>
  );
  
  const textBlock = (
    <div className="flex-1">
      <h2 className="text-3xl sm:text-4xl md:text-3xl lg:text-5xl font-semibold leading-tight text-[#0F1B28]">
        <HighlightedTitle title={topic.title} highlightedWords={topic.highlightedWords} />
      </h2>
      <hr className="border-t border-gray-200 my-6" />
      <p className="text-[16px] md:text-lg lg:text-3xl text-[#0F1B28] leading-relaxed">
        {topic.description}
      </p>
    </div>
  );
  
  return (
    <div className="flex flex-col md:flex-row md:items-start md:gap-10">
      {isEven ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
};

export default function AboutSection({ data }) {
  if (!data) return null;

  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Badge */}
      <span className="inline-block bg-[#FFF88A] text-[#0F1B28] text-xs lg:text-[16px] font-normal px-2 py-2 rounded-sm mb-8 lg:mb-12">
        {data.title}
      </span>
      
      {/* Topics */}
      <div className="space-y-12 lg:space-y-16">
        {data.topics?.map((topic, index) => (
          <TopicCard key={topic.id || index} topic={topic} index={index} />
        ))}
      </div>
    </section>
  );
}