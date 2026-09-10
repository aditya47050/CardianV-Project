import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow pt-36 pb-24">
        <div className="container-width max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-circadian-600 hover:text-circadian-700 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
          <div className="flex justify-center w-full mb-6">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-[#cbf1fa] via-[#a3e5f5] to-[#a3e2f3] px-4 py-1.5 text-xs sm:text-sm font-medium text-[#126d83] shadow-xs">
              <span>Our Story</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6 font-sans">
            Pioneering the Future of Heart Health
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-light mb-12">
            We&apos;re on a mission to revolutionize how people monitor and understand their heart health through advanced AI technology and smartphone capabilities.
          </p>

          <div className="prose prose-lg text-gray-700 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            <p>
              At CircadianAI, we believe that accessible heart monitoring is essential for preventative healthcare. Our mission is to provide cutting-edge AI-powered tools that help individuals detect potential heart issues early and take control of their heart health.
            </p>
            <p>
              We&apos;re dedicated to making sophisticated heart analysis accessible to everyone through the device they already carry — their smartphone. Through continuous innovation and refinement of our sound analysis algorithms, we strive to create technology that can detect abnormalities and potentially life-threatening conditions before they become emergencies.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
