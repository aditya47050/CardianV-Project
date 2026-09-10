import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeartAnalyzer } from "@/components/HeartAnalyzer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Start Heart Analysis | Circadian AI",
  description: "Upload acoustic telemetry for instant AI heart health diagnostic analysis.",
};

export default function AnalyzePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-white via-[#f7fcfe] to-[#e4f6fc]">
      <Navbar />
      <main className="flex-grow pt-32 sm:pt-36 pb-20">
        <div className="container-width max-w-4xl">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-xs sm:text-sm font-semibold text-[#10a37f] hover:text-[#0c7a5f] transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </div>

          <HeartAnalyzer />
        </div>
      </main>
      <Footer />
    </div>
  );
}
