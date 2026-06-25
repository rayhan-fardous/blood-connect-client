"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import Logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-50 text-slate-600 pt-20 pb-12 overflow-hidden border-t border-slate-200 select-none">
      {/* Soft Ambient Light Glows */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <div className="absolute -top-40 left-1/3 w-96 h-96 bg-red-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-10 w-[24rem] h-96 bg-slate-200/50 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 pb-16">
          
          {/* Identity Column */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative overflow-hidden rounded-2xl p-1.5 bg-white border border-slate-200 group-hover:border-red-200 transition-all duration-500 shadow-sm group-hover:shadow-md">
                <Image
                  src={Logo}
                  height={36}
                  width={36}
                  alt="BloodBridge Logo"
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

            <p className="text-slate-600 text-base font-normal leading-relaxed max-w-sm">
              Connecting donors with patients in real time. Every single drop
              matters—join us to change lives across Bangladesh.
            </p>

            {/* Social Connects */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {["Facebook", "Twitter", "Instagram"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="inline-flex items-center justify-center text-xs font-medium px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-100 transition-all duration-300 group shadow-sm"
                >
                  {platform}
                  <ArrowUpRight
                    size={12}
                    className="ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links Modules */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            
            {/* Column 1: Links */}
            <div>
              <h3 className="text-slate-900 font-bold text-sm tracking-wider uppercase mb-4">
                Explore
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  { name: "Donation Requests", href: "/donation-requests" },
                  { name: "Search Donors", href: "/search" },
                  { name: "Join as Donor", href: "/register" },
                  { name: "Funding", href: "/funding" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="inline-flex text-slate-600 hover:text-red-600 transition-all duration-300 hover:translate-x-1 font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Support */}
            <div>
              <h3 className="text-slate-900 font-bold text-sm tracking-wider uppercase mb-4">
                Support
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Contact Us", href: "/contact" },
                  { name: "FAQ Center", href: "/faq" },
                  { name: "Privacy Policy", href: "/privacy" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="inline-flex text-slate-600 hover:text-red-600 transition-all duration-300 hover:translate-x-1 font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Details */}
            <div>
              <h3 className="text-slate-900 font-bold text-sm tracking-wider uppercase mb-4">
                Get In Touch
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3 group">
                  <Phone
                    size={16}
                    className="text-slate-400 group-hover:text-red-600 transition-colors mt-0.5 shrink-0"
                  />
                  <span className="font-medium text-slate-600">
                    +880 1785-473355
                  </span>
                </li>
                <li className="flex items-start gap-3 group">
                  <Mail
                    size={16}
                    className="text-slate-400 group-hover:text-red-600 transition-colors mt-0.5 shrink-0"
                  />
                  <span className="font-medium text-slate-600 break-all">
                    info@bloodconnect.org
                  </span>
                </li>
                <li className="flex items-start gap-3 group">
                  <MapPin
                    size={16}
                    className="text-slate-400 group-hover:text-red-600 transition-colors mt-0.5 shrink-0"
                  />
                  <span className="font-medium text-slate-600 leading-relaxed">
                    Level 4, Plot 16, Block C, Banani, Dhaka-1213, Bangladesh
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-slate-400 font-medium flex items-center gap-1 order-2 md:order-1">
            © {currentYear} BloodConnect. Built with{" "}
            <Heart
              size={12}
              className="text-red-500 fill-red-500 inline animate-pulse"
            />{" "}
            for humanity.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-slate-400 font-medium order-1 md:order-2">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
              (policy) => (
                <Link
                  key={policy}
                  href="#"
                  className="hover:text-slate-700 transition-colors"
                >
                  {policy}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;