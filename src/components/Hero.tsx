import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Typewriter } from "./Typewriter";

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  typedTexts?: string[];
}

export function Hero({
  title = "Listening to Hearts. Protecting Lives.",
  subtitle = "Every heartbeat tells a story. We help physicians hear the ones that matter — catching the quiet signs of disease early, so families get more time together.",
  ctaText = "Start Your Journey",
  ctaLink = "/analyze",
  secondaryCtaText = "Learn More",
  secondaryCtaLink = "/about",
  typedTexts = [
    "We Save Lives",
    "We Analyze Heart Sounds",
    "We Detect Heart Disease",
  ],
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-tr from-white via-[#f7fcfe] to-[#e4f6fc] min-h-[90vh] w-full flex flex-col justify-center">
      {/* Background Soft Luminous Cyan Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full bg-[#23bde0]/15 blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full bg-[#23bde0]/10 blur-3xl" />
      </div>

      {/* Hero Outer Wrapper: w-full guarantees container-width does not shrink to fit-content */}
      <div className="w-full container-width relative z-10 pt-36 pb-20 md:pt-40 md:pb-28">
        {/* Fixed Two-Column CSS Grid Composition */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Fixed 7/12 Grid Region with tighter vertical spacing */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-4 sm:space-y-5 w-full min-w-0">
            {/* Pill Badge: Gradient with darker cyan on right side */}
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-[#cbf1fa] via-[#a3e5f5] to-[#a3e2f3] px-4 py-1.5 text-xs sm:text-[13px] font-medium text-[#126d83] shadow-xs">
              <span>AI-Powered Heart Analysis Technology</span>
            </div>

            {/* Title Block: Positioned close under the pill badge */}
            <div className="w-full min-h-[85px] sm:min-h-[110px] md:min-h-[135px] flex items-start overflow-hidden">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium italic tracking-tight text-[#1890ac] leading-[1.15] w-full break-words whitespace-normal">
                {typedTexts && typedTexts.length > 0 ? (
                  <Typewriter
                    texts={typedTexts}
                    className="text-[#1890ac] italic inline w-full break-words whitespace-normal"
                  />
                ) : (
                  <span className="italic text-[#1890ac]">{title}</span>
                )}
              </h1>
            </div>

            {/* Subtitle */}
            <p className="font-serif text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed font-light">
              {subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-1">
              <Link
                href={ctaLink}
                className="button-hover inline-flex items-center justify-center rounded-xl bg-[#23bde0] px-7 py-3.5 text-base font-semibold text-white shadow-[0_4px_14px_rgba(35,189,224,0.35)] hover:bg-[#1caed0] transition-all duration-300"
              >
                <span>{ctaText}</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              {secondaryCtaText && secondaryCtaLink && (
                <Link
                  href={secondaryCtaLink}
                  className="button-hover inline-flex items-center justify-center rounded-xl border border-[#bdebf5] bg-white px-7 py-3.5 text-base font-semibold text-[#23bde0] hover:bg-[#f2fbfe] transition-all duration-300"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: Fixed 5/12 Grid Region */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center w-full min-w-0">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square rounded-[36px] bg-white/90 backdrop-blur-sm p-8 sm:p-12 border border-white shadow-[0_20px_60px_rgba(35,189,224,0.12)] flex items-center justify-center text-center transition-all duration-300 hover:shadow-[0_25px_70px_rgba(35,189,224,0.18)]">
              <Image
                src="/assets/logo.png"
                alt="Circadian AI Logo"
                width={300}
                height={300}
                className="w-full h-auto max-h-[260px] sm:max-h-[300px] object-contain select-none"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
