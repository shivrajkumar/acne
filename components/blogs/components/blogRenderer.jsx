"use client";
import React, { useEffect, useState } from "react";
import { Image, Button, Typography, Card } from "antd";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { UpCircleOutlined } from "@ant-design/icons";
import { HeadingStepByStep } from "./headingStepByStep";

const { Text } = Typography;

function extractText(children) {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");

  if (React.isValidElement(children)) {
    return extractText(children.props.children || "");
  }

  return "";
}

const TableOfContents = ({ items }) => {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    const headerOffset = 120;
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <Card size="small" className="mb-4" title="Table of Contents">
      <ul className="space-y-1 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <Button
              type="text"
              onClick={() => scrollToHeading(item.id)}
              className={activeId === item.id ? "text-blue-600 font-medium" : "text-gray-700"}
            >
              {item.text}
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export const BlogRenderer = ({ article }) => {
  const { title, coverImage, cover_image, publishedAt, content, banner_image_alt_text } = article;
  const imageUrl = cover_image?.[0]?.url || coverImage?.data?.attributes?.url;
  const imageAlt = banner_image_alt_text || cover_image?.[0]?.alternativeText || title;
  const [tocItems, setTocItems] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > window.innerHeight * 2);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addHeading = (level, children) => {
    if (level !== 2) return "";
    const text = extractText(children).trim();
    if (!text) return "";

    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    setTocItems((prev) => {
      if (!prev.find((i) => i.id === id)) {
        return [...prev, { id, text, level }];
      }
      return prev;
    });

    return id;
  };

  const customRenderers = {
    h2: ({ children, ...props }) => {
      const id = addHeading(2, children);
      return (
        <h2 id={id} {...props} className="scroll-mt-32">
          {children}
        </h2>
      );
    },
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="md:container px-0 relative pb-20">
      <div className="flex gap-8">
        <article className="flex-1 min-w-0">
          <header>
            <HeadingStepByStep heading={title} />

            <div className="flex justify-between items-start gap-6 my-8">
              <TableOfContents items={tocItems} />

              {imageUrl && (
                <div className="flex-1">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    width={500}
                    height={500}
                    className="w-full rounded-lg object-cover"
                  />
                </div>
              )}
            </div>

            {publishedAt && (
              <Text type="secondary" className="mb-8 block">
                Published on {new Date(publishedAt).toDateString()}
              </Text>
            )}
          </header>

          {content && (
            <section className="prose prose-sm md:prose-lg max-w-none">
              <ReactMarkdown rehypePlugins={[rehypeRaw]} components={customRenderers}>
                {content}
              </ReactMarkdown>
            </section>
          )}
        </article>
      </div>

      {showScrollTop && (
        <Button
          type="primary"
          shape="circle"
          icon={<UpCircleOutlined />}
          size="large"
          onClick={scrollToTop}
          style={{ position: "fixed", bottom: 52, right: 24 }}
        />
      )}
    </div>
  );
};
