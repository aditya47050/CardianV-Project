import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Circadian AI",
  description: "Advanced heart health monitoring powered by AI",
  icons: {
    icon: "/assets/favicon.png",
  },
  openGraph: {
    title: "Circadian AI",
    description: "Advanced heart health monitoring powered by AI",
    images: ["/assets/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900 selection:bg-circadian-100 selection:text-circadian-700">
        {children}
      </body>
    </html>
  );
}
