// import { Inter } from "next/font/google";
import "./globals.css";
import React, { Suspense } from "react";
import ErrorBoundary from "@components/error/ErrorBoundary";
import ShopfloBridge from "@constants/shopflowbridge";
import { UTMManager } from "@helpers/UTMManager";
import Script from "next/script";
import { lato } from "./fonts";
import MoengageInit from "@/components/generic/MoengageInit";
import UserDataCapture from "@/components/generic/UserDataCapture";
import ScrollTracker from "@/components/ScrollTracker";
import PixelInit from "@/components/generic/Pixel";
import { PublicEnvScript } from 'next-runtime-env';
import UmamiTracker from "@components/generic/UmamiTracker";

export const metadata = {
  title: "Clear Ritual: Personalised Acne Solutions Backed by Experts",
  description:
    "Discover Clear Ritual's dermatologist-approved acne treatments. Take our free skin test and get a personalised acne care plan tailored for visible, lasting results.",
  openGraph: {
    type: "website",
    title: "Clear Ritual: Personalised Acne Solutions Backed by Experts",
    description:
      "Discover Clear Ritual's dermatologist-approved acne treatments. Take our free skin test and get a personalised plan for visible, lasting results.",
    url: "https://www.clearritual.com/",
    images: [
      {
        url: "https://www.clearritual.com/path-to-homepage-hero-image.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clear Ritual: Personalised Acne Solutions",
    description:
      "Take the free skin test and discover dermatologist-approved acne treatments, personalised for you.",
    images: ["https://www.clearritual.com/path-to-homepage-hero-image.jpg"],
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="en"
      className={`${lato.variable}`}
    >
      <meta name="robots" content="index,follow" />
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/mjr0vlf.css" />
        <PublicEnvScript />
        <Script src="/gtmHeadScript.js" strategy="beforeInteractive" />
        <UmamiTracker />
        {/* Clarity Script */}
        <Script
          id="clarityscript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "r5ez6x39tu");`,
          }}
          strategy="lazyOnload"
        ></Script>
        {/* GtagScripts */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-98XNY2R926"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-98XNY2R926');
            `,
          }}
        />

        {/* WebPage Schema */}
        <Script
          id="webpage-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Clear Ritual: Personalised Acne Solutions Backed by Experts",
              url: "https://www.clearritual.com/",
              description:
                "Discover Clear Ritual's dermatologist-approved acne treatments. Take our free skin test and get a personalised acne care plan tailored for visible, lasting results.",
              inLanguage: "en",
              isPartOf: {
                "@type": "WebSite",
                url: "https://www.clearritual.com/",
              },
            }),
          }}
        />

        {/* Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Clear Ritual",
              url: "https://www.clearritual.com/",
              logo: "https://www.clearritual.com/path-to-your-logo.png",
              sameAs: [
                "https://www.instagram.com/clear.ritual/",
                "https://x.com/ClearRitual",
              ],
              description:
                "Clear Ritual provides personalised acne treatment plans combining Ayurveda, dermatology, and advanced science for clear, healthy skin.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-8424004697",
                contactType: "Customer Service",
                areaServed: "IN",
                availableLanguage: "English",
              },
            }),
          }}
        />

        {/* FAQ Schema */}
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How does the Clear Ritual skin test work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our proprietary algorithm, developed with dermatologists and powered by AI, analyses both external and internal skin factors to recommend personalised, research-backed acne treatments.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are the recommended products safe for sensitive skin?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, every product is dermatologist-tested, hypoallergenic, and free from harsh chemicals to ensure safety for sensitive skin.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How is Clear Ritual different from other skincare brands?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Clear Ritual offers personalised acne solutions using real data and dermatologist expertise, not generic trends. Your plan evolves as your skin does.",
                  },
                },
                {
                  "@type": "Question",
                  name: "When can I expect to see results?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Most users begin to see improvement within 4-6 weeks of consistent use. Your personalized plan includes timeline expectations based on your specific skin condition.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body style={{ fontSize: "16px" }} className="font-sophiaPro">
        <PixelInit />
        <ScrollTracker />
        {/* <ErrorBoundary> */}
          <UserDataCapture />
          <main>{children}</main>
        {/* </ErrorBoundary> */}
        <Suspense>
          <UTMManager />
        </Suspense>
        <MoengageInit />
      </body>
      <ShopfloBridge />
    </html>
  );
}