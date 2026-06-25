"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Search,
  HeartPulse,
  Users,
  Droplets,
  MapPin,
} from "lucide-react";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-red-50 via-white to-rose-50">
      {/* Animated Background */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-red-500/20 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-0 h-125 w-125 rounded-full bg-rose-500/20 blur-3xl"
      />

      <div className="container mx-auto px-6 py-20 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/80 px-4 py-2 backdrop-blur-md"
            >
              <HeartPulse size={18} className="text-red-600" />
              <span className="text-sm font-medium text-red-600">
                Trusted Blood Donation Platform
              </span>
            </motion.div>

            <motion.h1
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-6 text-5xl font-black leading-tight text-gray-900 md:text-7xl"
            >
              Donate Blood,
              <span className="block bg-linear-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
                Save Lives
              </span>
            </motion.h1>

            <motion.p
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600"
            >
              Every donation creates hope. Connect with donors instantly and
              help save lives across Bangladesh through a trusted blood donation
              network.
            </motion.p>

            {/* Buttons */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <motion.div
                whileHover={{
                  y: -4,
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <Link
                  href="/register"
                  className="group flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-8 py-4 font-semibold text-white shadow-lg shadow-red-500/30 transition-all hover:bg-red-700"
                >
                  Become Donor
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{
                  y: -4,
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <Link
                  href="/search-blood-request"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white/80 px-8 py-4 font-semibold text-gray-700 backdrop-blur-md transition-all hover:bg-white"
                >
                  <Search size={18} />
                  Find Donors
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-14 grid grid-cols-3 gap-6"
            >
              <div>
                <h3 className="text-3xl font-black text-red-600">12K+</h3>
                <p className="mt-1 text-sm text-gray-500">Active Donors</p>
              </div>

              <div>
                <h3 className="text-3xl font-black text-red-600">5K+</h3>
                <p className="mt-1 text-sm text-gray-500">Lives Saved</p>
              </div>

              <div>
                <h3 className="text-3xl font-black text-red-600">64</h3>
                <p className="mt-1 text-sm text-gray-500">Districts</p>
              </div>
            </motion.div>
          </div>

          {/* Right Image Section */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
            }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[32px] border border-white/50 bg-white/30 p-3 shadow-2xl backdrop-blur-xl">
              <img
                src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1200"
                alt="Blood Donation"
                className="h-137.5 w-full rounded-3xl object-cover"
              />
            </div>

            {/* Floating Card 1 */}
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-5 top-10 rounded-2xl border border-white/50 bg-white/90 p-4 shadow-xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <Users className="text-red-600" />
                <div>
                  <h4 className="font-bold">12,000+</h4>
                  <p className="text-sm text-gray-500">Active Donors</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-5 top-28 rounded-2xl border border-white/50 bg-white/90 p-4 shadow-xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <Droplets className="text-red-600" />
                <div>
                  <h4 className="font-bold">A+</h4>
                  <p className="text-sm text-gray-500">Available Now</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 3 */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-8 left-10 rounded-2xl border border-white/50 bg-white/90 p-4 shadow-xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <MapPin className="text-red-600" />
                <div>
                  <h4 className="font-bold">Nationwide</h4>
                  <p className="text-sm text-gray-500">64 District Coverage</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
