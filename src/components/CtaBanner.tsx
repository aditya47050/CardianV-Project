import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="rounded-2xl bg-gradient-to-r from-circadian-600 to-circadian-800 shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
          
          <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between z-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-sans">
                Let&apos;s listen to more hearts, together.
              </h2>
              <p className="mt-4 text-lg text-circadian-100 max-w-xl font-light">
                Bring Circadian into your practice and give your patients the
                early answers they deserve.
              </p>
            </div>
            
            <div className="mt-8 lg:mt-0 lg:ml-8 flex-shrink-0">
              <Link
                href="/analyze"
                className="button-hover inline-flex items-center justify-center rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-circadian-700 shadow-md hover:bg-circadian-50 transition-all duration-300"
              >
                <span>Get Started Now</span>
                <ArrowRight className="ml-2 h-5 w-5 text-circadian-600" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
