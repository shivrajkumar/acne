import React from 'react';
import Hero from './sections/Hero';
import StepCard from './sections/StepCard';
import Journey from './sections/Journey';
import BottomBanner from './sections/BottomBanner';

export default function HowItWorks() {

  const steps = [
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
      description: "We know you’re busy. After you are diagnosed, if your healthcare provider decides a prescription we offer is right for you, you’ll get your meds shipped by mail, right to your door.",
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

  return (
    <main className="w-full">
      <Hero />
      <section className="px-6 md:px-20 py-16 mx-auto">
        {steps.map((step, index) => (
            <StepCard key={index} {...step} />
        ))}
      </section>

      <Journey />
      <BottomBanner />
    </main>
  );
}
