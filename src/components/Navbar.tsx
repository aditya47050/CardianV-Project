"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${scrolled ? "py-3 glass shadow-xs" : "py-5 bg-transparent"
        }`}
    >
      <div className="container-width">
        <div className="flex items-center justify-between">
          {/* Left: Brand Logo */}
          <div className="flex-1 flex justify-start">
            <Link
              href="/"
              className="relative z-50 flex items-center space-x-3 group"
            >
              <div className="flex items-center space-x-2">
                <Image
                  src="/assets/logo.png"
                  alt="Circadian AI Logo"
                  width={220}
                  height={80}
                  className="h-20 sm:h-24 md:h-24 w-auto object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10 justify-center">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm md:text-[15px] font-medium transition-colors duration-200 ${isActive
                    ? "text-[#23bde0] font-semibold"
                    : "text-slate-600 hover:text-[#23bde0]"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Get Started Button & Mobile Menu Button */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            <Link
              href="/analyze"
              className="hidden md:inline-flex button-hover items-center justify-center rounded-xl bg-[#23bde0] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1caed0] transition-all duration-200"
            >
              Get Started
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 p-2 text-slate-700 hover:text-[#23bde0] md:hidden focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu Drawer */}
          <div
            className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-md transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-center items-center ${isOpen ? "translate-x-0" : "translate-x-full"
              }`}
          >
            <nav className="flex flex-col items-center space-y-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-2xl font-medium transition-colors ${pathname === item.href
                    ? "text-[#23bde0] font-bold"
                    : "text-slate-800 hover:text-[#23bde0]"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/analyze"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#23bde0] px-8 py-3 text-lg font-semibold text-white shadow-md hover:bg-[#1caed0] transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
