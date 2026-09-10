"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { QuoteSection } from "@/components/QuoteSection";
import { CareListensSection } from "@/components/CareListensSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { QuieterCareSection } from "@/components/QuieterCareSection";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const typedTexts = [
    "We Analyze Heart Sounds",
    "We Detect Heart Disease",
    "We Save Lives",
  ];

  return (
    <div
      className={`w-full transition-opacity duration-500 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <Navbar />
      <main>
        <Hero
          title="Listening to Hearts. Protecting Lives."
          subtitle="Every heartbeat tells a story. We help physicians hear the ones that matter — catching the quiet signs of disease early, so families get more time together."
          ctaText="Start Your Journey"
          ctaLink="/analyze"
          secondaryCtaText="Learn More"
          secondaryCtaLink="/about"
          typedTexts={typedTexts}
        />
        <QuoteSection />
        <CareListensSection />
        <HowItWorksSection />
        <QuieterCareSection />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
