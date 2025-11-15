"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "./blogCard";
import { Spin, Pagination, Typography } from "antd";
import { STRAPI_DEV_URL, STRAPI_PROD_URL } from "../../../constants/constants";

const { Text } = Typography;

const BlogLanding = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);

  async function getBlogs(page = 1) {
    try {
      const res = await fetch(
        `${STRAPI_PROD_URL}/api/cr-blogs?populate=*&pagination[page]=${page}&pagination[pageSize]=25`,
        { method: "GET", next: { revalidate: 300 } }
      );

      if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);

      return await res.json();
    } catch (err) {
      console.error("Error fetching blogs:", err);
      return {
        data: [],
        meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } },
      };
    }
  }

  const fetchBlogs = async (page) => {
    setLoading(true);
    try {
      const response = await getBlogs(page);
      setBlogs(response.data || []);
      setTotalPages(response.meta?.pagination?.pageCount || 0);
      setTotalBlogs(response.meta?.pagination?.total || 0);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error in fetchBlogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(1);
  }, []);

  const handlePageChange = (page) => {
    fetchBlogs(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {blogs.length > 0 ? (
            <div className="mt-12 mb-8 px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {blogs.map((item) => (
                  <div key={item.id} className="flex justify-center">
                    <BlogCard
                      title={item.title}
                      imageSrc={
                        item.cover_image?.[0]?.formats?.small?.url ||
                        item.cover_image?.[0]?.url
                      }
                      date={new Date(item.publishedAt).toDateString()}
                      description={item.summary}
                      readTime="5"
                      slug={item.slug}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-[200px]">
              <Text type="secondary">No blogs found</Text>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center sm:justify-end mt-4 mb-8 px-4">
              <Pagination
                current={currentPage}
                total={totalBlogs}
                pageSize={25}
                onChange={handlePageChange}
                showSizeChanger={false}
                showQuickJumper
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default BlogLanding;
