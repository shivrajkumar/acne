import React from "react";
import { BlogTableOfContents } from "./blogToc";
import BlogContent from "./blogContent";

const BlogDump = ({ blog }) => {
  console.log("Blog Dump Data:", blog);

  return (
    <>
      <div className="mb-32">
        <div className="md:container md:mx-auto w-full md:flex">
          <div className="w-full sticky md:w-2/5 md:top-24 md:self-star hidden md:block">
            <BlogTableOfContents items={blog.toc} sections={blog.section} />
          </div>

          <div className="w-full md:w-5/5 mt-6">
            <BlogContent article={blog} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDump;