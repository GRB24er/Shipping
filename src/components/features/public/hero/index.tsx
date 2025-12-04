"use client";

import { Info, ArrowRight, Package, Globe, Shield } from "lucide-react";
import Image from "next/image";
import TrackingForm from "../../../tracking.form";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

export const Hero = () => {
  const { ref: leftSectionRef, inView: isLeftInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: rightSectionRef, inView: isRightInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, delay: 0.2 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const stats = [
    { icon: Package, value: "10M+", label: "Packages Delivered" },
    { icon: Globe, value: "190+", label: "Countries Covered" },
    { icon: Shield, value: "99.9%", label: "Secure Delivery" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[100px]" />
        
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.5)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
            </linearGradient>
          </defs>
          <motion.line
            x1="0"
            y1="30%"
            x2="100%"
            y2="30%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          />
        </svg>
      </div>

      {/* Globe image positioned absolutely */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] as const }}
        className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] hidden lg:block"
      >
        <Image
          src="/images/globe.webp"
          fill
          alt="globe"
          className="object-contain opacity-50 animate-spin"
          style={{ animationDuration: "60s" }}
        />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-screen items-center">
          {/* Left Content */}
          <motion.div
            ref={leftSectionRef}
            initial="hidden"
            animate={isLeftInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="w-full lg:w-1/2 pt-24 lg:pt-32 pb-12 lg:pb-20"
          >
            <div className="flex flex-col gap-6">
              {/* Badge */}
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-medium text-blue-300 tracking-wide">
                    Real-Time Tracking Available
                  </span>
                </span>
              </motion.div>

              {/* Heading */}
              <motion.div variants={fadeInUp}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                  We Deliver Your{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Package
                  </span>{" "}
                  Anywhere!
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={fadeInUp}
                className="text-lg text-slate-400 leading-relaxed max-w-xl"
              >
                Fast, secure, and reliable shipping solutions for businesses and
                individuals. Track your packages in real-time with our advanced
                logistics network spanning 190+ countries.
              </motion.p>

              {/* Tracking Form Card */}
              <motion.div variants={fadeIn} className="mt-2">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-blue-600/20 rounded-2xl blur-xl" />

                  <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <Package className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Track Your Shipment</h3>
                        <p className="text-xs text-slate-400">Enter tracking number to get started</p>
                      </div>
                    </div>

                    <TrackingForm />

                    <div className="flex items-start gap-2 mt-4 pt-4 border-t border-slate-700/50">
                      <Info size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-500">
                        Enter your tracking number (usually 8-12 digits) found in your
                        order confirmation email or shipping label.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={staggerChildren}
                className="grid grid-cols-3 gap-4 mt-6"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="text-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/30"
                  >
                    <stat.icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            ref={rightSectionRef}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={
              isRightInView
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: 60, scale: 0.95 }
            }
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.2 }}
            className="relative w-full lg:w-1/2 hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-full blur-[80px]" />
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 p-4 bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Secure</p>
                    <p className="text-xs text-slate-400">256-bit Encrypted</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-5 -left-10 p-4 bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Global</p>
                    <p className="text-xs text-slate-400">190+ Countries</p>
                  </div>
                </div>
              </motion.div>

              {/* Main image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/images/delivery-man.png"
                  width={450}
                  height={450}
                  alt="delivery-man"
                  className="relative z-10 drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </div>
  );
};