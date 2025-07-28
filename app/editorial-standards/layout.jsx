import React from "react";
import AcneFooter from "@/components/generic/AcneFooter";
import AcneMarqueeBanner from "@/components/generic/AcneMarqueeBanner";
import AcneHeader from "@/components/generic/Header/AcneHeader";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Clear Ritual Editorial Policy",
  url: "https://clearritual.com/pages/editorial-policy",
  description:
    "Learn how Clear Ritual creates science-backed, dermatologist-reviewed skincare content. Our editorial process ensures clinical accuracy, transparency, and reader trust.",
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Clear Ritual's content philosophy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We believe skincare content should be rooted in science, not trends. Our goal is to provide honest, clear, and clinically reviewed information that helps readers make informed decisions.",
        },
      },
      {
        "@type": "Question",
        name: "Who writes Clear Ritual's content?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our content is written by a team of dermatologists, researchers, and science writers with deep subject-matter expertise. Every piece is reviewed for medical accuracy, clarity, and reader usefulness.",
        },
      },
      {
        "@type": "Question",
        name: "How does Clear Ritual research its articles?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We use peer-reviewed journals, clinical trials, and verified data from independent sources. We never rely on sponsored research or marketing-led claims.",
        },
      },
      {
        "@type": "Question",
        name: "What topics does Clear Ritual cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We cover barrier health, acne, pigmentation, sensitivity, gut-skin connections, and ingredient science. Every topic is chosen to support skin literacy and root-cause understanding.",
        },
      },
      {
        "@type": "Question",
        name: "What is Clear Ritual's content review process?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every article is reviewed by our in-house medical and regulatory team. We check for scientific accuracy, ingredient compliance, and tone clarity. Content is not published unless it meets all quality checks.",
        },
      },
      {
        "@type": "Question",
        name: "How is Clear Ritual's content different?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We don't oversimplify or overpromise. Our content is created to inform, not persuade. It's written to help users understand their skin better—not sell a product.",
        },
      },
    ],
  },
};

export const metadata = {
  title: "How We Write at Clear Ritual - Editorial Policy and Review Process",
  description: "Learn how Clear Ritual creates science-backed, dermatologist-reviewed skincare content. No fluff, no hype - just honest, medically sound information you can trust.",
  openGraph: {
    type: "website",
    title: "Our Editorial Policy - How We Write, Review and Research at Clear Ritual",
    description: "Discover Clear Ritual's dermatologist-approved acne treatments. Take our free skin test and get a personalised plan for visible, lasting results.",
    url: "clearritual.com/pages/editorial-policy"
  }
};

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
      <AcneMarqueeBanner />
      <AcneHeader />
      {children}
      <AcneFooter />
    </div>
  );
};

export default Layout;
