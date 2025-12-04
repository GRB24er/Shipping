"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  ArrowRight,
  MapPin,
  Phone,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [footerRef, footerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Track Shipment", href: "/track" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  const serviceLinks = [
    { name: "Ground Shipping", href: "/services" },
    { name: "Air Freight", href: "/services" },
    { name: "Ocean Freight", href: "/services" },
    { name: "Warehousing", href: "/services" },
    { name: "Express Delivery", href: "/services" },
  ];

  const legalLinks = [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="relative bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative border-b border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="relative p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-slate-800">
              <div className="absolute inset-0 bg-slate-900/50 rounded-2xl" />
              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
                  <p className="text-slate-400">Subscribe for shipping tips and exclusive offers.</p>
                </div>
                <form onSubmit={handleSubmit} className="flex w-full lg:w-auto gap-3">
                  <div className="relative flex-1 lg:w-72">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2"
                  >
                    Subscribe
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        ref={footerRef}
        initial="hidden"
        animate={footerInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <Image src="/images/logo.png" width={180} height={50} alt="AsyncShip Logo" className="brightness-0 invert" />
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Reliable, efficient shipping and logistics solutions for businesses and individuals worldwide.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span></span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="mailto:admin@asyncship.org" className="hover:text-white transition-colors">admin@asyncship.org</a>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="tel:+19129801024" className="hover:text-white transition-colors"></a>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social, idx) => (
                <a key={idx} href={social.href} aria-label={social.label} className="w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-600 transition-all">
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/support" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Contact Us
                </Link>
              </li>
            </ul>
            <h4 className="text-white font-semibold mt-8 mb-4">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      <div className="relative border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} AsyncShip Logistics. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};