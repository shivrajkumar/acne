import BlogLanding from "@/components/blogs/components/blogLanding";
import { SITE_BASE_URL } from "@/constants/urls";

export const metadata = {
  title: "Hair Transplant Blog | Expert Insights & Guides | Kibo Clinics",
  description: "Discover expert insights on hair transplant procedures, FUE techniques, recovery tips, and hair restoration guides from Kibo's experienced team.",
  keywords: "hair transplant blog, FUE hair transplant, hair restoration guides, hair transplant tips, Kibo clinics blog",
  alternates: {
    canonical: `${SITE_BASE_URL}/blog`,
  },
  openGraph: {
    title: "Hair Transplant Blog | Expert Insights & Guides | Kibo Clinics",
    description: "Discover expert insights on hair transplant procedures, FUE techniques, recovery tips, and hair restoration guides from Kibo's experienced team.",
    type: "website",
    url: `${SITE_BASE_URL}/blog`,
    siteName: "Kibo Clinics",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hair Transplant Blog | Expert Insights & Guides | Kibo Clinics",
    description: "Discover expert insights on hair transplant procedures, FUE techniques, recovery tips, and hair restoration guides from Kibo's experienced team.",
  },
};

const Page = async () => {
  return <BlogLanding />;
};

export default Page;
