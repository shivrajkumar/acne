import React from "react";
import { BlogTableOfContents } from "./blogToc";
import BlogContent from "./blogContent";

const BlogDump = ({ blog }) => {
  return (
    <>
      <div className="md:container md:mx-auto w-full md:flex">
        <div className="hidden md:block md:w-2/5">
          <div className="sticky top-24">
            <BlogTableOfContents items={blog.toc} sections={blog.section} />
          </div>
        </div>

        <div className="w-full md:w-4/5 mt-6">
          <BlogContent article={blog} />
        </div>
      </div>
    </>
  );
};

export default BlogDump;
