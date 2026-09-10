import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white to-circadian-50/30 border-t border-circadian-100/50">
      <div className="container-width py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-foreground mb-6"
            >
              <Image
                src="/assets/logo.png"
                alt="Circadian AI"
                width={200}
                height={80}
                className="h-20 sm:h-24 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-700 max-w-sm mb-6 text-sm leading-relaxed">
              Pioneering AI solutions that analyze heart sounds to detect early
              signs of disease with high accuracy.
            </p>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-circadian-600 tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-700 text-sm hover:text-circadian-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-circadian-600 tracking-wider uppercase mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="text-gray-700 text-sm hover:text-circadian-600 transition-colors"
                >
                  Heart Analysis
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-700 text-sm hover:text-circadian-600 transition-colors"
                >
                  Diagnostic Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-700 text-sm hover:text-circadian-600 transition-colors"
                >
                  Health Integration
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-circadian-600 tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-700 text-sm hover:text-circadian-600 transition-colors"
                >
                  Privacy & Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-16 pt-8 border-t border-circadian-100/50 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-circadian-600 font-medium">
            © {currentYear} CircadianAI. All rights reserved.
          </p>
          <p className="text-circadian-600 mt-4 md:mt-0 font-medium">
            <a
              href="mailto:adityamandhare47050@gmail.com"
              className="hover:text-circadian-700 transition-colors underline-offset-4 hover:underline"
            >
              adityamandhare47050@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
