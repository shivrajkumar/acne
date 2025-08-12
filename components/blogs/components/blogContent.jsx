import React from "react";
import SectionRenderer from "./subComponents/sectionRenderer";
import BreadcrumbNavigator from "@/components/generic/BreadcrumbNavigator";
import AuthorCard from "./authorCard";

const BlogContent = ({ article }) => {
  console.log(article, ": article in BlogContent");

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No Articles Available
          </h2>
          <p className="text-gray-600">
            Please provide article data to display content.
          </p>
        </div>
      </div>
    );
  }

  const sections = article.section || [];

  return (
    <div className="md:container md:mx-auto mt-12 px-4">
      <div className="mt-10">
        <BreadcrumbNavigator />
      </div>
      
      <div className="mb-2">
        {article.title && (
          <p className="text-[24px] md:text-[40px] text-black font-sophiaPro font-normal leading-relaxed">
            {article.title}
          </p>
        )}
        
        {article.description && (
          <p className="text-xl text-[#727678] md:text-black font-sophiaPro leading-relaxed mb-8">
            {article.description}
          </p>
        )}
      </div>

      <AuthorCard/>

      <div>
        {sections.map((section, index) => (
          <SectionRenderer key={index} section={section} index={index} />
        ))}
      </div>
    </div>
  );
};

export default BlogContent;
