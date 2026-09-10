import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, HeartPulse, Activity, Stethoscope } from "lucide-react";

export default function ServicesPage() {
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
              <span>Our Services</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            Smartphone Heart Analysis & Diagnostics
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-light mb-12">
            Simply place your phone near your heart to detect abnormalities and potential diseases with advanced AI technology.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-circadian-50/50 border border-circadian-100">
              <HeartPulse className="h-8 w-8 text-circadian-600 mb-4" />
              <h3 className="text-lg font-bold mb-2">Heart Analysis</h3>
              <p className="text-sm text-gray-600">Acoustic waveform and murmur analysis via standard mobile sensors.</p>
            </div>
            <div className="p-6 rounded-2xl bg-circadian-50/50 border border-circadian-100">
              <Activity className="h-8 w-8 text-circadian-600 mb-4" />
              <h3 className="text-lg font-bold mb-2">Diagnostic Tools</h3>
              <p className="text-sm text-gray-600">Real-time pattern recognition and anomaly detection algorithms.</p>
            </div>
            <div className="p-6 rounded-2xl bg-circadian-50/50 border border-circadian-100">
              <Stethoscope className="h-8 w-8 text-circadian-600 mb-4" />
              <h3 className="text-lg font-bold mb-2">Health Integration</h3>
              <p className="text-sm text-gray-600">EHR-ready reporting and longitudinal trend tracking over time.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
