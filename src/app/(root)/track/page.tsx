"use client";

import { useState } from "react";
import TrackingForm from "@/components/tracking.form";
import Link from "next/link";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Real-Time Updates",
    description: "Track every movement with live GPS positioning and instant status notifications",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
        />
      </svg>
    ),
    title: "Global Coverage",
    description: "Seamless tracking across 190+ countries with unified international logistics",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Secure & Verified",
    description: "Enterprise-grade encryption with blockchain-verified chain of custody",
  },
];

const faqs = [
  {
    question: "How quickly does tracking information become available?",
    answer:
      "Tracking data is synchronized within minutes of pickup. Initial scans typically appear within 15-30 minutes, with full tracking history available as your shipment moves through our global network.",
  },
  {
    question: "What should I do if tracking hasn't updated?",
    answer:
      "If your shipment shows no movement for 48+ hours, our Priority Support team is available 24/7. Contact us via live chat or call for immediate assistance with escalation protocols.",
  },
  {
    question: "Can I track multiple shipments simultaneously?",
    answer:
      "Yes. Business accounts support bulk tracking of up to 500 shipments via our dashboard. You can also set up automated webhook notifications for real-time status updates to your systems.",
  },
  {
    question: "What tracking formats are supported?",
    answer:
      "We support all standard formats including our proprietary ASY tracking numbers, plus full compatibility with partner carrier formats (UPS, FedEx, DHL, USPS) for cross-carrier visibility.",
  },
];

export default function TrackingPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-16 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-blue-300 tracking-wide">
                Live Tracking Available
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Track Your{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Shipment
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Monitor your packages with precision. Real-time location data, predictive delivery
              estimates, and complete visibility across our global logistics network.
            </p>
          </div>
        </section>

        {/* Tracking Form Section */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-blue-600/20 rounded-2xl blur-xl" />

              {/* Card */}
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
                {/* Header gradient line */}
                <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600" />

                <div className="p-8 sm:p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <svg
                        className="w-6 h-6 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">Enter Tracking Number</h2>
                      <p className="text-sm text-slate-400">
                        AWB, tracking ID, or reference number
                      </p>
                    </div>
                  </div>

                  <TrackingForm />

                  {/* Sample tracking hint */}
                  <div className="mt-6 pt-6 border-t border-slate-700/50">
                    <p className="text-xs text-slate-500 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Example format: ASY-1234567890, AWB-9876543210
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Enterprise-Grade Tracking
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                Advanced logistics visibility powered by cutting-edge technology
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 hover:bg-slate-800/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                  <div className="relative">
                    <div className="p-3 w-fit rounded-lg bg-blue-500/10 text-blue-400 mb-4 group-hover:bg-blue-500/20 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/50">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-400">Everything you need to know about shipment tracking</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-700/50 overflow-hidden bg-slate-800/20 hover:bg-slate-800/30 transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                  >
                    <span className="font-medium text-white pr-8">{faq.question}</span>
                    <span
                      className={`flex-shrink-0 p-1 rounded-full bg-slate-700/50 transition-transform duration-200 ${
                        expandedFaq === index ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        className="w-4 h-4 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      expandedFaq === index ? "max-h-48" : "max-h-0"
                    }`}
                  >
                    <p className="px-6 pb-5 text-slate-400 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/50">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20" />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="relative px-8 py-12 sm:px-12 sm:py-16 text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Need Help With Your Shipment?
                </h3>
                <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                  Our logistics specialists are available 24/7 to assist with tracking issues,
                  delivery modifications, or any shipping concerns.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Live Chat Support
                  </Link>
                  <Link
                    href="tel:+18003876789"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-transparent border border-slate-500 text-white font-semibold hover:bg-white/5 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    +1 (800) ASYNCSHIP
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}