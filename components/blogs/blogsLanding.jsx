"use client";
import { Button } from "antd";
import React, { useState } from "react";
import BlogCard from "./components/blogCard";
import { blogLandingData } from "./data/data";
import ReturnToDiagnostic from "./components/returnToDiagnostics";
import FilterButtons from "./components/filterButtons";

const BlogsLanding = () => {
  const [selectedFilter, setSelectedFilter] = useState("All Articles");
  const filters = ["All Articles", "Acne Education", "Skin Education"];
  const filteredBlogs = selectedFilter === "All Articles" ? blogLandingData : blogLandingData.filter((blog) => blog.filter === selectedFilter);

  const handleClick = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="px-4 md:px-10">
      <div className="flex flex-col gap-5">
        <div className="text-[40px] md:text-[87px] font-sophiaPro">
          Clear Ritual Blog
        </div>
        <div className="text-lg md:text-[24px] font-sophiaPro">
          Medically-backed answers to your health and wellness questions.
        </div>

        {/* Filters */}
        <FilterButtons filters={filters} onClick={handleClick} selectedFilter={selectedFilter}/>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {filteredBlogs?.map((item) => (
            <BlogCard
              image={item.image}
              date={item.date}
              readTime={item.readTime}
              title={item.title}
              description={item.description}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
      <ReturnToDiagnostic/>
    </div>
  );
};

export default BlogsLanding;
