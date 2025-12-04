"use client";

import { Check, Container, Ship, Plane, Truck, Warehouse, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";

export const Service = () => {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.2 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const features = [
    "Standard, refrigerated, and specialized containers",
    "Full container (FCL) and less than container (LCL) shipments",
    "Real-time container tracking and monitoring",
    "Temperature-controlled logistics solutions",
    "Customs clearance and documentation support",
  ];

  const services = [
    { icon: Container, label: "Container", active: true },
    { icon: Ship, label: "Ocean", active: false },
    { icon: Plane, label: "Air", active: false },
    { icon: Truck, label: "Ground", active: false },
    { icon: Warehouse, label: "Warehouse", active: false },
  ];

  return (
    <section className="relative py-24 bg-slate-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image Section */}
          <motion.div
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            variants={fadeInLeft}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/20 to-cyan-500/10 rounded-3xl blur-2xl" />

              {/* Main image container */}
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl" />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full h-full rounded-3xl overflow-hidden border border-slate-700/50"
                >
                  <Image
                    src="/images/box.jpeg"
                    alt="Container shipping"
                    fill
                    className="object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                </motion.div>

                {/* Floating stats card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-6 -right-6 p-5 bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Container className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">2.5M+</p>
                      <p className="text-sm text-slate-400">Containers Shipped</p>
                    </div>
                  </div>
                </motion.div>

                {/* Service type tabs floating */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -top-4 left-4 right-4 flex gap-2 p-2 bg-slate-800/90 backdrop-blur-xl rounded-xl border border-slate-700/50"
                >
                  {services.map((service, idx) => (
                    <button
                      key={idx}
                      className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                        service.active
                          ? "bg-blue-500/20 border border-blue-500/30"
                          : "hover:bg-slate-700/50"
                      }`}
                    >
                      <service.icon
                        className={`w-4 h-4 ${
                          service.active ? "text-blue-400" : "text-slate-400"
                        }`}
                      />
                      <span
                        className={`text-[10px] ${
                          service.active ? "text-blue-300" : "text-slate-500"
                        }`}
                      >
                        {service.label}
                      </span>
                    </button>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content Section */}
          <motion.div
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="order-1 lg:order-2"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
            >
              <Container className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">Container Shipping</span>
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Efficient Container{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Transport
              </span>{" "}
              Solutions
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-400 mb-8 leading-relaxed"
            >
              From standard containers to specialized equipment, we provide
              comprehensive container shipping services for all your cargo needs,
              with expert handling and reliable delivery across the globe.
            </motion.p>

            {/* Features list */}
            <motion.div variants={staggerContainer} className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                    <Check className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-slate-300">{feature}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-600/25"
              >
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold hover:bg-slate-700 transition-all"
              >
                Get a Quote
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};