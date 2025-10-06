"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "./blogCard";
import { Spin, Pagination, Typography, Row, Col } from "antd";
import { STRAPI_DEV_URL, STRAPI_PROD_URL } from "../../../constants/constants";

const { Title, Text } = Typography;

const BlogLanding = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);

  async function getBlogs(page = 1) {
    try {
      const res = await fetch(
        `${STRAPI_DEV_URL}/api/cr-blogs?populate=*&pagination[page]=${page}&pagination[pageSize]=25`,
        { method: "GET", next: { revalidate: 300 } }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch blogs: ${res.status}`);
      }

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

  console.log('blogs', blogs)

  return (
    <>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          {blogs.length > 0 ? (
            <Row gutter={[32, 32]} className="mt-12 mb-8">
              {blogs.map((item) => (
                <Col key={item.id} xs={24} sm={12} lg={8}>
                  <BlogCard
                    title={item.title}
                    imageSrc={item.cover_image?.[0]?.formats?.small?.url || item.cover_image?.[0]?.url}
                    date={new Date(item.publishedAt).toDateString()}
                    description={item.summary}
                    readTime="5"
                    slug={item.slug}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
              <Text type="secondary">No blogs found</Text>
            </div>
          )}

          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16, marginBottom: 32 }}>
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
