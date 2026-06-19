"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Bell, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/assets/logo.png";

const Navbar = ({ isLoggedIn = false, user = null }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // Scroll Effect Logic
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => router.push("/login");

  const handleLogout = () => {
    console.log("Logout");
    setDropdownOpen(false);
  };

  // Modernized Colors: Optimized for a light Hero section background
  const textColor = scrolled ? "text-gray-700" : "text-gray-600";
  const logoTextColor = scrolled ? "text-gray-900" : "text-gray-800";

  // Premium Link Component with Modern Hover Effects
  const NavItem = ({ path, label }) => {
    const isActive = pathname === path;

    return (
      <Link
        href={path}
        className={`relative px-3 py-2 font-medium text-sm tracking-wide transition-all duration-300 rounded-xl ${
          isActive
            ? "text-red-600 bg-red-50/50"
            : `${textColor} hover:text-red-600 hover:bg-gray-50/80`
        }`}
      >
        {label}

        {isActive && (
          <motion.div
            layoutId="navbar-indicator"
            className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-red-600"
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 30,
            }}
          />
        )}
      </Link>
    );
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className={`fixed w-full top-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "backdrop-blur-2xl bg-white/80 border-b border-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.04)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative overflow-hidden rounded-full p-1 bg-white shadow-sm border border-gray-100 group-hover:border-red-500/50 transition-colors">
              <Image
                src={Logo}
                height={32}
                width={32}
                alt="BloodBridge Logo"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col">
              <h1
                className={`font-extrabold text-2xl tracking-tight transition-colors duration-300 ${logoTextColor}`}
              >
                Blood<span className="text-red-600">Connect</span>
              </h1>
              <p className="text-[10px] font-semibold tracking-wider uppercase text-gray-400">
                Connecting Donors, Saving Lives.
              </p>
            </div>
          </Link>
        </motion.div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-2">
          <NavItem path="/" label="Home" />
          <NavItem path="/donation-requests" label="Donation Requests" />
          <NavItem path="/funding" label="Funding" />
          <NavItem path="/dashboard" label="Dashboard" />

          {/* AUTH SECTION */}
          <div className="flex items-center gap-4 border-l border-gray-200 pl-4 ml-2">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/register"
                  className={`font-semibold text-sm transition-colors duration-300 ${textColor} hover:text-red-600`}
                >
                  Register
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleLogin}
                  className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-500/20 transition-all hover:bg-red-700"
                >
                  Login
                </motion.button>
              </>
            ) : (
              <div className="flex items-center gap-5 relative">
                {/* Notification */}
                <button
                  className={`relative transition-colors ${textColor} hover:text-red-600`}
                >
                  <motion.div
                    whileHover={{ rotate: [-10, 10, -10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Bell className="w-5 h-5" />
                  </motion.div>
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse" />
                </button>

                {/* USER PROFILE */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1 transition-all hover:scale-105 hover:shadow-sm"
                >
                  <Image
                    src={user?.avatar || "/default-avatar.png"}
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                    alt="user"
                  />
                  <ChevronDown className={`w-4 h-4 mr-1 ${textColor}`} />
                </button>

                {/* DROPDOWN */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-14 w-56 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden"
                    >
                      {/* existing dropdown content */}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-xl transition-colors text-gray-700 bg-gray-50 hover:bg-gray-100"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white border-b border-gray-100 shadow-xl"
          >
            <div className="flex flex-col p-6 space-y-3">
              <Link
                href="/"
                className="text-gray-700 font-medium p-2 rounded-xl hover:bg-red-50 hover:text-red-600 transition"
              >
                Home
              </Link>
              <Link
                href="/donation-requests"
                className="text-gray-700 font-medium p-2 rounded-xl hover:bg-red-50 hover:text-red-600 transition"
              >
                Donation Requests
              </Link>
              <Link
                href="/funding"
                className="text-gray-700 font-medium p-2 rounded-xl hover:bg-red-50 hover:text-red-600 transition"
              >
                Funding
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-700 font-medium p-2 rounded-xl hover:bg-red-50 hover:text-red-600 transition"
              >
                Dashboard
              </Link>

              <div className="h-px bg-gray-100 my-2" />

              {!isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/register"
                    className="text-center font-medium text-gray-600 py-2 hover:text-red-600"
                  >
                    Register
                  </Link>
                  <button
                    onClick={handleLogin}
                    className="w-full bg-red-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-red-700 transition"
                  >
                    Login
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full text-center text-red-600 font-medium py-3 border border-red-100 rounded-xl hover:bg-red-50 transition"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
