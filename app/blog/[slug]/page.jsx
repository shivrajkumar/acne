import React from "react";
import BlogDump from "@/components/blogs/components/blogDump";
import blogs from '@/components/blogs/data/blog.json'

const page = async ({params}) => {
  const { slug } = params;
  const blogData = blogs.find(blog => blog.slug === slug);

  return <BlogDump blog={blogData}/>
};

export default page;
