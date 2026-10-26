"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Ministers", href: "/#ministers" },
  { name: "Departments", href: "/#departments" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // On the root landing page, auth, and portal dashboard, render their own navigation
  if (pathname === "/" || pathname === "/portal/login" || pathname === "/auth" || pathname?.startsWith("/portal")) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-[#08162e]/95 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-xl shadow-black/40 py-3"
          : "bg-[#0B1E3D]/90 backdrop-blur-md border-b border-white/10 py-3.5 sm:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none min-w-0"
            aria-label="RCCG Rehoboth Chapel"
          >
            <Image
              src="/logo.png"
              alt="RCCG Logo"
              width={40}
              height={40}
              className="object-contain w-8 h-8 sm:w-10 sm:h-10 shrink-0"
              priority
            />
            <span className="text-[#D4AF37] font-serif font-bold text-sm sm:text-lg md:text-xl tracking-wide truncate">
              RCCG REHOBOTH CHAPEL
            </span>
          </Link>

          {/* Desktop Navigation Links (Visible on Desktop only) */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(link.href + "/");

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-[#D4AF37] bg-[#D4AF37]/15 font-semibold"
                      : "text-slate-200 hover:text-[#D4AF37] hover:bg-white/[0.06]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/portal"
              className="border border-white/20 hover:border-[#D4AF37] bg-white/[0.05] hover:bg-[#D4AF37]/15 text-slate-100 hover:text-[#D4AF37] text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm active:scale-95 group"
            >
              <svg
                className="w-4 h-4 text-[#D4AF37] transition-transform group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Portal</span>
            </Link>
            <Link
              href="/give"
              className="bg-[#D4AF37] hover:bg-[#c29d2e] text-[#0B1E3D] font-bold text-xs sm:text-sm tracking-wider uppercase px-5 py-2.5 rounded-xl shadow-md shadow-[#D4AF37]/20 hover:shadow-lg transition-all duration-300 active:scale-95"
            >
              GIVE
            </Link>
          </div>

          {/* Mobile Right: ONLY the Hamburger Toggle Button is Outside */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              className="w-10 h-10 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/15 flex flex-col items-center justify-center gap-1.5 focus:outline-none text-white transition active:scale-95"
            >
              <span
                className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-full bg-[#08162e]/98 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all duration-300 overflow-y-auto ${
          isOpen
            ? "max-h-[calc(100vh-65px)] py-5 opacity-100 visible"
            : "max-h-0 py-0 opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="max-w-md mx-auto px-5 flex flex-col gap-2">
          {/* Simple Navigation Links */}
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(link.href + "/");

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? "bg-[#D4AF37]/15 text-[#D4AF37] font-semibold border border-[#D4AF37]/30"
                    : "text-slate-200 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <span>{link.name}</span>
                <span className="text-[#D4AF37]">›</span>
              </Link>
            );
          })}

          {/* Action Buttons Inside Hamburger Menu */}
          <div className="pt-4 border-t border-white/10 mt-2 space-y-3">
            <Link
              href="/portal"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/[0.08] hover:bg-[#D4AF37]/20 border border-white/15 text-white text-sm font-semibold transition active:scale-98"
            >
              <svg className="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Portal</span>
            </Link>

            <Link
              href="/give"
              onClick={() => setIsOpen(false)}
              className="w-full block text-center py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#c29d2e] text-[#0B1E3D] font-bold text-xs uppercase tracking-wider shadow-md transition active:scale-98"
            >
              GIVE
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}