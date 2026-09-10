import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow pt-36 pb-24">
        <div className="container-width max-w-2xl">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-circadian-600 hover:text-circadian-700 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
          <div className="flex justify-center w-full mb-6">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-[#cbf1fa] via-[#a3e5f5] to-[#a3e2f3] px-4 py-1.5 text-xs sm:text-sm font-medium text-[#126d83] shadow-xs">
              <span>Contact Us</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            We&apos;re Here to Support You
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            We&apos;re committed to providing exceptional support for our customers and partners. Feel free to reach out to us directly.
          </p>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-white to-circadian-50 border border-circadian-100 shadow-soft">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-circadian-100 text-circadian-600 flex items-center justify-center">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Email Support</p>
                <a
                  href="mailto:adityamandhare47050@gmail.com"
                  className="text-lg font-bold text-circadian-700 hover:underline"
                >
                  adityamandhare47050@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
