import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Privacy Policy & Terms
          </h1>
          <p className="text-gray-700 leading-relaxed">
            At Circadian AI, we take data privacy and patient confidentiality with the utmost seriousness. All acoustic monitoring telemetry and user signals processed by our algorithms are encrypted end-to-end and stored according to medical data standards.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
