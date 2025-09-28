"use client";

import Image from "next/image";
import Button from "./Button";
import { motion, AnimatePresence } from "framer-motion";

const gradients = [
  "from-red-500 to-orange-400",
  "from-blue-600 to-cyan-400",
  "from-purple-600 to-indigo-500",
  "from-emerald-500 to-teal-400",
  "from-pink-500 to-rose-400",
  "from-yellow-500 to-amber-400",
  "from-sky-500 to-blue-500",
  "from-fuchsia-500 to-purple-500",
];

export default function HeroSection({ featuredEvent }) {
  if (!featuredEvent) return null;

  const gradientClass =
    featuredEvent.gradient ||
    gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <section className="relative min-h-[400px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.section
          key={featuredEvent.id || featuredEvent.title}
          className={`bg-gradient-to-r ${gradientClass} text-white py-16`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <div className="container mx-auto px-4 overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Text content */}
              <motion.div
                className="flex-1 space-y-6"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <div className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm">
                  Thời gian: {featuredEvent.date} - {featuredEvent.time}
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  {featuredEvent.title}
                </h1>

                <p className="text-xl text-white/90 leading-relaxed">
                  {featuredEvent.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button variant="secondary" size="lg">
                    Chi tiết
                  </Button>
                </div>
              </motion.div>

              {/* Image */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
              >
                <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={
                      featuredEvent.image || "/research-conference-academic.jpg"
                    }
                    alt={featuredEvent.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>
    </section>
  );
}
