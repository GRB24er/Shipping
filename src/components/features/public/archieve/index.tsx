"use client";

import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { ArrowRight, Package, Globe, Truck, Award, Users, Clock } from "lucide-react";
import Link from "next/link";

export const Achievement = () => {
  const [containerRef, containerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [statsRef, statsInView] = useInView({
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
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  const stats = [
    {
      icon: Package,
      value: "9.8M",
      label: "Successful Deliveries",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Globe,
      value: "12.4K",
      label: "Global Business Partners",
      color: "from-cyan-500 to-teal-500",
    },
    {
      icon: Truck,
      value: "98%",
      label: "On-time Delivery Rate",
      color: "from-blue-500 to-indigo-500",
    },
  ];

  const highlights = [
    { icon: Award, text: "Industry-leading logistics provider" },
    { icon: Users, text: "Dedicated support team available 24/7" },
    { icon: Clock, text: "Average delivery time 40% faster" },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div ref={containerRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image Section */}
          <motion.div
            initial="hidden"
            animate={containerInView ? "visible" : "hidden"}
            variants={fadeInLeft}
            className="relative"
          >
            <div className="relative max-w-lg mx-auto lg:mx-0">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/20 to-cyan-500/10 rounded-[2rem] blur-2xl" />

              {/* Main image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl"
              >
                <Image
                  src="/images/port.jpeg"
                  alt="Port operations with cargo containers"
                  fill
                  className="object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <div className="flex items-center gap-4 p-4 bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">25+ Years</p>
                      <p className="text-sm text-slate-400">of Excellence in Logistics</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -top-6 -right-6 p-4 bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-xl hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Verified</p>
                    <p className="text-xs text-slate-400">ISO 9001 Certified</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content Section */}
          <motion.div
            initial="hidden"
            animate={containerInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-8"
          >
            <div>
              <motion.span
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
              >
                <Award className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">Why Choose Us</span>
              </motion.span>

              <motion.h2
                variants={fadeInUp}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
              >
                Setting New Standards in{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Global Logistics
                </span>
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-slate-400 leading-relaxed"
              >
                We combine industry expertise with cutting-edge technology to ensure
                your shipments are secure, timely, and efficient. Our comprehensive
                logistics network spans across 190+ countries.
              </motion.p>
            </div>

            {/* Highlights */}
            <motion.div variants={staggerContainer} className="space-y-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-slate-600/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-slate-300">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp}>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-600/25"
              >
                Discover Our Services
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mt-20 grid sm:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              className="group relative p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/50 transition-all text-center"
            >
              {/* Gradient hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div className="relative">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} p-0.5`}>
                  <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <motion.p
                  className="text-4xl font-bold text-white mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-slate-400">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};