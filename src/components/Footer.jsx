"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import Logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 text-slate-400 pt-24 pb-12 overflow-hidden border-t border-slate-900 select-none">
      {/* Soft Ambient Vector Glows */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <div className="absolute -top-40 left-1/3 w-120 h-120 bg-red-950/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-10 w-[24rem] h-96 bg-slate-900/40 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 pb-16">
          {/* Brand Engine Identity Column */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative overflow-hidden rounded-2xl p-1.5 bg-white/3 border border-white/8 group-hover:border-red-500/30 transition-all duration-500 shadow-xl">
                <Image
                  src={Logo}
                  height={36}
                  width={36}
                  alt="BloodBridge Logo"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col">
                <h2 className="font-black text-2xl tracking-tight text-white transition-colors duration-300">
                  Blood<span className="text-red-500">Connect</span>
                </h2>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-500 mt-0.5">
                  Connecting Donors, Saving Lives.
                </p>
              </div>
            </Link>

            <p className="text-slate-400 text-base font-light leading-relaxed max-w-sm">
              Connecting donors with patients in real time. Every single drop
              matters—join us to change lives across Bangladesh.
            </p>

            {/* Premium Social Connects */}
            <div className="flex items-center gap-3 pt-2">
              {["Facebook", "Twitter", "Instagram"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="inline-flex items-center justify-center text-xs font-medium px-4 py-2 rounded-xl bg-slate-900 border border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-850 transition-all duration-300 group"
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
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Links */}
            <div>
              <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-5">
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
                      className="inline-flex hover:text-red-400 transition-all duration-300 hover:translate-x-1 font-light"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Support */}
            <div>
              <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-5">
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
                      className="inline-flex hover:text-red-400 transition-all duration-300 hover:translate-x-1 font-light"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Details */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-5">
                Get In Touch
              </h3>
              <ul className="space-y-4 text-xs sm:text-sm">
                <li className="flex items-start gap-3 group">
                  <Phone
                    size={16}
                    className="text-slate-500 group-hover:text-red-500 transition-colors mt-0.5 shrink-0"
                  />
                  <span className="font-light text-slate-400">
                    +880 1785-473355
                  </span>
                </li>
                <li className="flex items-start gap-3 group">
                  <Mail
                    size={16}
                    className="text-slate-500 group-hover:text-red-500 transition-colors mt-0.5 shrink-0"
                  />
                  <span className="font-light text-slate-400 break-all">
                    info@bloodconnect.org
                  </span>
                </li>
                <li className="flex items-start gap-3 group">
                  <MapPin
                    size={16}
                    className="text-slate-500 group-hover:text-red-500 transition-colors mt-0.5 shrink-0"
                  />
                  <span className="font-light text-slate-400 leading-relaxed">
                    Level 4, Plot 16, Block C, Banani, Dhaka-1213, Bangladesh
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="border-t border-slate-900/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-slate-500 font-light flex items-center gap-1 order-2 md:order-1">
            © {currentYear} BloodConnect. Built with{" "}
            <Heart
              size={12}
              className="text-red-500 fill-red-500 inline animate-pulse"
            />{" "}
            for humanity.
          </p>

          <div className="flex gap-6 text-slate-500 font-light order-1 md:order-2">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
              (policy) => (
                <a
                  key={policy}
                  href="#"
                  className="hover:text-slate-300 transition-colors"
                >
                  {policy}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
