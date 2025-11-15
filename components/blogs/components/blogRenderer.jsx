"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { HeadingStepByStep } from "./headingStepByStep";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

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

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-8">
      <h3 className="font-semibold text-sm text-gray-900 mb-3">
        Table of Contents
      </h3>
      <ul className="space-y-1 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToHeading(item.id)}
              className={`text-left w-full hover:text-blue-600 transition-colors ${
                activeId === item.id
                  ? "text-blue-600 font-medium"
                  : "text-gray-700"
              }`}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

function extractText(children) {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");

  if (React.isValidElement(children)) {
    return extractText(children.props.children ?? "");
  }

  return "";
}

export const BlogRenderer = ({ article }) => {
  const {
    title,
    coverImage,
    cover_image,
    publishedAt,
    content,
    banner_image_alt_text,
  } = article;

  console.log('article', article)

  const imageUrl = cover_image?.[0]?.url || coverImage?.data?.attributes?.url;
  const imageAlt =
    banner_image_alt_text ||
    cover_image?.[0]?.alternativeText ||
    title;

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
    <div className="md:container px-0 relative">
      <div className="flex gap-8">
        <article className="flex-1 px-4 mb-10">
          <header>
            <HeadingStepByStep heading={title} />

            {/* Flex container for TOC and Image */}
            <div className="my-8">
              <TableOfContents items={tocItems} />

              {/* {imageUrl && (
                <div className="flex-1">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    width={500}
                    height={500}
                    className="w-full rounded-lg object-cover"
                    priority
                  />
                </div>
              )} */}
            </div>

            {publishedAt && (
              <p className="mb-8 text-sm text-gray-500">
                Published on {new Date(publishedAt).toDateString()}
              </p>
            )}
          </header>

          {content && (
            <section className="prose prose-sm md:prose-lg max-w-none">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={customRenderers}
              >
                {content}
              </ReactMarkdown>
            </section>
          )}
        </article>
      </div>

      {/* Back to Top Button */}
      {/* {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-52 right-6 p-3 rounded-full bg-[#333333] text-white shadow-lg"
          aria-label="Back to top"
        >
          <ArrowUpwardIcon />
        </button>
      )} */}
    </div>
  );
};
