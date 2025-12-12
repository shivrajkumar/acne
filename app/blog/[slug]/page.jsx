import { notFound } from "next/navigation";
import { STRAPI_DEV_URL, STRAPI_PROD_URL, SITE_BASE_URL } from "../../../constants/constants";
import { BlogRenderer } from "@/components/blogs/components/blogRenderer";

async function getBlogBySlug(slug) {
  try {
    const res = await fetch(
      `${STRAPI_DEV_URL}/api/cr-blogs?filters[slug][$eq]=${slug}&populate=*`,
      {
        method: "GET",
        next: { revalidate: 300 },
      }
    );


    if (!res.ok) {
      throw new Error(`Failed to fetch blog: ${res.status}`);
    }

    return res.json();
  } catch (err) {
    console.error("Error fetching blog by slug:", err);
    return { data: [] };
  }
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const blogRes = await getBlogBySlug(slug);
  const postData = blogRes?.data?.[0];

  if (!postData) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const title = postData.meta_title || postData.title || "Kibo Hair Transplant Blog";
  const description = postData.meta_description || postData.summary || "Expert hair transplant insights and guides from Kibo";
  const imageUrl = postData.cover_image?.[0]?.url || null;
  const canonicalUrl = `${SITE_BASE_URL}/blog/${slug}`;

  return {
    title,
    description,
    keywords: postData.keywords || "hair transplant, FUE, hair restoration, Kibo",
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      publishedTime: postData.publishedAt,
      modifiedTime: postData.updatedAt,
      authors: ["Kibo Hair Transplant"],
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: postData.banner_image_alt_text || title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

const Page = async ({ params }) => {
  const { slug } = params;
  const blogRes = await getBlogBySlug(slug);
  const postData = blogRes?.data?.[0];

  if (!postData) {
    notFound();
  }

  return (
    <>
      <BlogRenderer article={postData} />
    </>
  );
};

export default Page;