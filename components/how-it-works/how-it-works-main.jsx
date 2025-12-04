"use client";

import React, { useState, useEffect } from 'react';
import Hero from './sections/Hero';
import StepCard from './sections/StepCard';
import Journey from './sections/Journey';
import BottomBanner from './sections/BottomBanner';
import { fetchStrapiData } from "@/helpers/strapiClient";
import Loader from "@/components/generic/Loader";

const DEFAULT_STEPS = [
    {
      title: "Create your profile enter your medical history and symptoms",
      description: "Tell us about your skin, lifestyle, and any concerns you want addressed. Our platform securely collects your skin history, images and internal triggers symptoms. Your information is encrypted and protected at every step.",
      imageSrc: "/hiw_1.jpg",
      imageAlt: "Create profile app screen",
      isReversed: false,
      buttonText: "Start free consultation",
    },
    {
      title: "Speak with a licensed medical provider understand your options",
      description: "Get connected with a licensed medical provider in your state to start your diagnosis and talk about potential treatments. On our online platform, there are doctors at the ready to answer your questions – on your terms and in your own time.",
      imageSrc: "/hiw_2.jpg",
      imageAlt: "Chat with provider app screen",
      isReversed: true,
    },
    {
      title: "free delivery get your treatment shipped to your door",
      description: "We know you're busy. After you are diagnosed, if your healthcare provider decides a prescription we offer is right for you, you'll get your meds shipped by mail, right to your door.",
      imageSrc: "/hiw_3.jpg",
      imageAlt: "Product delivery",
      isReversed: false,
    },
    {
      title: "speak with a licensed medical provider understand your options",
      description: "Get connected with a licensed medical provider in your state to start your diagnosis and talk about potential treatments. On our online platform, there are doctors at the ready to answer your questions – on your terms and in your own time.",
      imageSrc: "/hiw_4.jpg",
      imageAlt: "Follow up chat",
      isReversed: true,
    },
  ];

export default function HowItWorks() {
  const [howItWorksData, setHowItWorksData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await fetchStrapiData("/api/cr-how-it-works?populate=deep");

      if (error) {
        console.warn("Failed to load how it works data:", error);
      }

      setHowItWorksData(data?.data?.attributes);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Loader />
      </div>
    );
  }

  const steps = howItWorksData?.steps || DEFAULT_STEPS;

  return (
    <main className="w-full">
      <Hero data={howItWorksData?.hero_section} />
      <section className="px-6 md:px-20 py-16 mx-auto">
        {steps.map((step, index) => (
            <StepCard key={index} {...step} />
        ))}
      </section>

      <Journey data={howItWorksData?.journey_section} />
      <BottomBanner data={howItWorksData?.bottom_banner_section} />
    </main>
  );
}
