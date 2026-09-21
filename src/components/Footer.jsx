"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import Logo from "@/assets/logo.png";

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com" },
  { name: "Twitter", href: "https://x.com" },
  { name: "Instagram", href: "https://instagram.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
];

const exploreLinks = [
  { name: "Donation Requests", href: "/donation-requests" },
  { name: "Search Donors", href: "/search-blood-request" },
  { name: "Join as Donor", href: "/register" },
  { name: "Funding", href: "/funding" },
];

const supportLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "FAQ Center", href: "/faq" },
  { name: "Privacy Policy", href: "/privacy" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Settings", href: "/cookies" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-50 text-slate-600 pt-16 sm:pt-20 pb-12 overflow-hidden border-t border-slate-200 select-none">
      {/* Soft Ambient Light Glows */}
      <div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 left-1/3 w-96 h-96 bg-red-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-slate-200/50 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 xl:gap-16 pb-12 sm:pb-16">
          
          {/* Identity Column */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative overflow-hidden rounded-2xl p-1.5 bg-white border border-slate-200 group-hover:border-red-200 transition-all duration-500 shadow-sm group-hover:shadow-md">
                <Image
                  src={Logo}
                  height={36}
                  width={36}
                  alt="BloodConnect Logo"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col">
                <h2 className="font-black text-2xl tracking-tight text-slate-900 transition-colors duration-300">
                  Blood<span className="text-red-600">Connect</span>
                </h2>
                <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mt-0.5">
                  Connecting Donors, Saving Lives.
                </p>
              </div>
            </Link>

            <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed max-w-sm">
              Connecting donors with patients in real time. Every single drop
              matters—join us to change lives across Bangladesh.
            </p>

            {/* Social Connects */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="inline-flex items-center justify-center text-xs font-semibold px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-100 transition-all duration-300 group shadow-xs"
                >
                  {item.name}
                  <ArrowUpRight
                    size={12}
                    className="ml-1 opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links Modules */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6">
            
            {/* Column 1: Explore */}
            <div>
              <h3 className="text-slate-900 font-bold text-xs sm:text-sm tracking-wider uppercase mb-4">
                Explore
              </h3>
              <ul className="space-y-3 text-sm">
                {exploreLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="inline-flex py-0.5 text-slate-600 hover:text-red-600 transition-all duration-300 hover:translate-x-1 font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Support */}
            <div>
              <h3 className="text-slate-900 font-bold text-xs sm:text-sm tracking-wider uppercase mb-4">
                Support
              </h3>
              <ul className="space-y-3 text-sm">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="inline-flex py-0.5 text-slate-600 hover:text-red-600 transition-all duration-300 hover:translate-x-1 font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Details */}
            <div className="sm:col-span-2 md:col-span-1">
              <h3 className="text-slate-900 font-bold text-xs sm:text-sm tracking-wider uppercase mb-4">
                Get In Touch
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3 group">
                  <Phone
                    size={16}
                    className="text-slate-400 group-hover:text-red-600 transition-colors mt-0.5 shrink-0"
                  />
                  <a
                    href="tel:+8801785473355"
                    className="font-medium text-slate-600 hover:text-red-600 transition-colors"
                  >
                    +880 1785-473355
                  </a>
                </li>
                <li className="flex items-start gap-3 group">
                  <Mail
                    size={16}
                    className="text-slate-400 group-hover:text-red-600 transition-colors mt-0.5 shrink-0"
                  />
                  <a
                    href="mailto:info@bloodconnect.org"
                    className="font-medium text-slate-600 hover:text-red-600 transition-colors break-all"
                  >
                    info@bloodconnect.org
                  </a>
                </li>
                <li className="flex items-start gap-3 group">
                  <MapPin
                    size={16}
                    className="text-slate-400 group-hover:text-red-600 transition-colors mt-0.5 shrink-0"
                  />
                  <a
                    href="https://maps.google.com/?q=Banani,Dhaka,Bangladesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-slate-600 hover:text-red-600 transition-colors leading-relaxed"
                  >
                    Level 4, Plot 16, Block C, Banani, Dhaka-1213, Bangladesh
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-slate-400 font-medium flex items-center gap-1 order-2 sm:order-1 text-center sm:text-left">
            © {currentYear} BloodConnect. Built with{" "}
            <Heart
              size={12}
              className="text-red-500 fill-red-500 inline animate-pulse"
            />{" "}
            for humanity.
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-slate-400 font-medium order-1 sm:order-2">
            {legalLinks.map((policy) => (
              <Link
                key={policy.name}
                href={policy.href}
                className="hover:text-red-600 transition-colors py-1"
              >
                {policy.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;