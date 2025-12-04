"use client";

import { Globe, MapPin, Truck, Clock, Plane } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

export const GlobalNetwork = () => {
  const { ref: sectionRef, inView: isSectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
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
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.2 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const features = [
    {
      icon: MapPin,
      title: "220+ Countries & Territories",
      description: "Comprehensive global coverage for all your shipping needs with local expertise",
    },
    {
      icon: Globe,
      title: "Strategic Global Hubs",
      description: "Optimized routing through key logistics centers for faster delivery times",
    },
    {
      icon: Truck,
      title: "Multi-Modal Transport",
      description: "Seamless integration of air, sea, and ground freight solutions",
    },
    {
      icon: Clock,
      title: "24/7 Operations",
      description: "Round-the-clock logistics support ensuring uninterrupted service",
    },
  ];

  const networkPoints = [
    { top: "25%", left: "15%", delay: 0, label: "Americas" },
    { top: "30%", left: "45%", delay: 0.3, label: "Europe" },
    { top: "35%", left: "75%", delay: 0.6, label: "Asia Pacific" },
    { top: "55%", left: "25%", delay: 0.9, label: "South America" },
    { top: "60%", left: "55%", delay: 1.2, label: "Africa" },
    { top: "65%", left: "82%", delay: 1.5, label: "Oceania" },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Global Network</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Connecting Businesses{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Our extensive global network ensures your shipments reach virtually any
            destination with efficiency and reliability.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Features */}
          <motion.div
            initial="hidden"
            animate={isSectionInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInLeft}
                className="group relative p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 hover:bg-slate-800/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right - Interactive Map */}
          <motion.div
            initial="hidden"
            animate={isSectionInView ? "visible" : "hidden"}
            variants={fadeInRight}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-500/10 rounded-3xl blur-2xl" />

              {/* Map container */}
              <div className="relative bg-slate-800/30 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-8 overflow-hidden">
                {/* Animated grid overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Map image */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/images/map.png"
                    alt="Global shipping network"
                    width={400}
                    height={400}
                    className="w-full h-auto opacity-60"
                  />
                </motion.div>

                {/* Network pulse points */}
                {networkPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    className="absolute group cursor-pointer"
                    style={{ top: point.top, left: point.left }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: point.delay + 0.5, duration: 0.5 }}
                  >
                    {/* Outer pulse */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-500/40"
                      animate={{
                        scale: [1, 2.5, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: point.delay,
                      }}
                      style={{ width: "16px", height: "16px", margin: "-4px" }}
                    />
                    {/* Core dot */}
                    <div className="relative w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50">
                      <div className="absolute inset-0 rounded-full bg-blue-400 animate-pulse" />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {point.label}
                    </div>
                  </motion.div>
                ))}

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <motion.path
                    d="M 60 100 Q 180 80 200 120"
                    stroke="rgba(59, 130, 246, 0.3)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                  <motion.path
                    d="M 200 120 Q 280 100 300 140"
                    stroke="rgba(59, 130, 246, 0.3)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1.5 }}
                  />
                </svg>

                {/* Stats overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="absolute bottom-4 left-4 right-4 p-4 bg-slate-900/90 backdrop-blur-sm rounded-xl border border-slate-700/50"
                >
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xl font-bold text-blue-400">50+</p>
                      <p className="text-xs text-slate-400">Distribution Hubs</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-cyan-400">24/7</p>
                      <p className="text-xs text-slate-400">Operations</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-blue-400">99%</p>
                      <p className="text-xs text-slate-400">Uptime</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating plane animation */}
              <motion.div
                className="absolute -top-4 -right-4 p-3 bg-slate-800/80 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-xl"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Plane className="w-6 h-6 text-blue-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};