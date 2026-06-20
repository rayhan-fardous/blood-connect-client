"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Bell, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/assets/logo.png";
import { useSession } from "@/lib/auth-client";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // Better Auth session
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const user = session?.user;

  console.log(user);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => router.push("/login");

  const handleLogout = async () => {
    const { authClient } = await import("@/lib/auth-client");
    await authClient.signOut();
    setDropdownOpen(false);
    router.push("/");
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
              <>
                <NavItem path="/funding" label="Funding" />

                {/* Clean Notification Icon */}
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

                {/* Avatar Dropdown - no chevron */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 rounded-full border border-white/20 hover:border-red-500/50 transition-all"
                  >
                    <img
                      src={
                        user?.image ||
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ef4444' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z' /%3E%3C/svg%3E"
                      }
                      width={32}
                      height={32}
                      className="rounded-full object-cover w-8 h-8"
                      alt="user"
                    />
                  </button>

                  {/* DROPDOWN */}
                  {dropdownOpen && (
                    <div className="absolute right-0 top-14 w-56 bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-100 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 z-50">
                      <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                        <p className="font-semibold text-gray-800">
                          Hello, {user?.name?.split(" ")[0] || "User"}!
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <div className="p-2 flex flex-col gap-1">
                        <Link
                          href="/dashboard"
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <div className="h-px bg-gray-100 my-1" />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
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
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/donation-requests"
                className="text-gray-700 font-medium p-2 rounded-xl hover:bg-red-50 hover:text-red-600 transition"
                onClick={() => setMobileOpen(false)}
              >
                Donation Requests
              </Link>

              {!isLoggedIn ? (
                <>
                  <Link
                    href="/register"
                    className="text-gray-800 font-medium hover:text-red-600 transition"
                    onClick={() => setMobileOpen(false)}
                  >
                    Register
                  </Link>
                  <button
                    onClick={() => {
                      handleLogin();
                      setMobileOpen(false);
                    }}
                    className="w-full bg-red-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-red-700 transition"
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/funding"
                    className="text-gray-800 font-medium hover:text-red-600 transition"
                    onClick={() => setMobileOpen(false)}
                  >
                    Funding
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-gray-800 font-medium hover:text-red-600 transition"
                    onClick={() => setMobileOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="w-full text-center text-red-600 font-medium py-3 border border-red-200 rounded-xl hover:bg-red-50 transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
