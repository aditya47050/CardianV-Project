import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function QuieterCareSection() {
  const points = [
    {
      title: "Catch It Early",
      description:
        "Surface the small signals long before they grow into something frightening.",
    },
    {
      title: "Trust the Signal",
      description:
        "Up to 96%+ accuracy across a wide range of cardiac conditions — backed by careful clinical work.",
    },
    {
      title: "Better Days Ahead",
      description:
        "Earlier answers mean gentler treatments, calmer follow-ups, and more good days at home.",
    },
    {
      title: "Kinder on the System",
      description:
        "Fewer late-stage emergencies. More space for clinicians to do the work they love.",
    },
  ];

  return (
    <section className="section-padding bg-gray-50 border-t border-gray-100">
      <div className="container-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Text & Benefits */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-gray-900">
              A Quieter Kind of Cardiac Care
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-light">
              Circadian was built around a simple belief: catching a heart problem
              early should feel less like a battle and more like a conversation.
            </p>

            <div className="space-y-6">
              {points.map((point) => (
                <div key={point.title} className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-circadian-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {point.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-0.5 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/services"
                className="inline-flex items-center text-circadian-600 font-semibold hover:text-circadian-700 transition-colors group"
              >
                <span>Learn more about our services</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Logo Card Graphic */}
          <div className="relative">
            <div className="aspect-square w-full md:max-w-md mx-auto bg-gradient-to-br from-circadian-400 to-circadian-600 rounded-3xl shadow-xl overflow-hidden relative group transition-transform duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xs flex items-center justify-center p-8">
                <Image
                  src="/assets/circadian-card-logo.png"
                  alt="Circadian AI Logo"
                  width={300}
                  height={300}
                  className="w-2/3 h-auto object-contain filter drop-shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
