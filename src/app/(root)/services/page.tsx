"use client";

import {
  Truck,
  Globe,
  Plane,
  Ship as ShipIcon,
  Warehouse,
  Clock,
  Shield,
  Zap,
  ArrowRight,
  Check,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

type ServiceType = {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
  gradient: string;
};

const services: ServiceType[] = [
  {
    icon: Truck,
    title: "Ground Shipping",
    description:
      "Reliable and cost-effective ground transportation for your packages.",
    details: [
      "Nationwide coverage",
      "Flexible delivery options",
      "Tracking and real-time updates",
      "Suitable for most package sizes",
    ],
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Plane,
    title: "Air Freight",
    description: "Fast and efficient international air shipping solutions.",
    details: [
      "Global air transportation",
      "Expedited shipping options",
      "Climate-controlled transport",
      "Ideal for time-sensitive shipments",
    ],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: ShipIcon,
    title: "Ocean Freight",
    description: "Comprehensive international maritime shipping services.",
    details: [
      "Full container and less-than-container loads",
      "Intercontinental shipping",
      "Competitive pricing",
      "End-to-end logistics support",
    ],
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    description: "Secure storage and inventory management solutions.",
    details: [
      "Climate-controlled facilities",
      "Inventory tracking",
      "Custom storage solutions",
      "24/7 security monitoring",
    ],
    gradient: "from-indigo-500 to-blue-500",
  },
];

const additionalServices = [
  {
    icon: Shield,
    title: "Insurance",
    description: "Comprehensive shipping insurance for peace of mind.",
  },
  {
    icon: Clock,
    title: "Express Delivery",
    description: "Guaranteed same-day and next-day shipping options.",
  },
  {
    icon: Zap,
    title: "Custom Clearance",
    description: "Smooth international shipping and customs processing.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
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

export default function ServicesPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [tabsRef, tabsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">Our Services</span>
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Logistics
            </span>{" "}
            Solutions
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            We offer end-to-end shipping and logistics services tailored to meet
            your unique business and personal shipping needs.
          </motion.p>
        </motion.div>

        {/* Main Services Section */}
        <motion.div
          ref={servicesRef}
          initial="hidden"
          animate={servicesInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={fadeInUp}>
              <Card className="group h-full bg-slate-800/30 border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 hover:bg-slate-800/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="relative">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-white hover:bg-slate-700/50"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 mb-4 text-sm">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-center gap-3 text-sm text-slate-300"
                      >
                        <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-blue-400" />
                        </div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabbed Additional Services Section */}
        <motion.div
          ref={tabsRef}
          initial="hidden"
          animate={tabsInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mb-24"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Additional Logistics Services
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Explore our range of specialized shipping and logistics solutions
              designed to meet diverse shipping requirements.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Tabs defaultValue="international" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-xl mx-auto mb-10 bg-slate-800/50 border border-slate-700/50 p-1 rounded-xl">
                <TabsTrigger
                  value="international"
                  className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400"
                >
                  International
                </TabsTrigger>
                <TabsTrigger
                  value="domestic"
                  className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400"
                >
                  Domestic
                </TabsTrigger>
                <TabsTrigger
                  value="specialized"
                  className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400"
                >
                  Specialized
                </TabsTrigger>
              </TabsList>

              <TabsContent value="international" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {additionalServices.map((service) => (
                    <Card
                      key={service.title}
                      className="group bg-slate-800/30 border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 hover:bg-slate-800/50"
                    >
                      <CardContent className="flex items-center gap-4 p-6">
                        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                          <service.icon className="h-8 w-8 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">
                            {service.title}
                          </h4>
                          <p className="text-slate-400 text-sm">
                            {service.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="domestic">
                <div className="relative p-12 rounded-2xl bg-slate-800/30 border border-slate-700/50 text-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-500/5" />
                  <div className="relative">
                    <Truck className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Nationwide Domestic Shipping
                    </h3>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                      Our domestic shipping services cover every corner of the country,
                      ensuring reliable and efficient delivery for businesses and
                      individuals.
                    </p>
                    <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-600/25">
                      Get Domestic Rates
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="specialized">
                <div className="relative p-12 rounded-2xl bg-slate-800/30 border border-slate-700/50 text-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-blue-500/5" />
                  <div className="relative">
                    <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Custom Logistics Solutions
                    </h3>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                      We offer tailored logistics solutions for unique shipping
                      requirements, including hazardous materials, temperature-sensitive
                      goods, and high-value shipments.
                    </p>
                    <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-600/25">
                      Contact Specialized Services
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          ref={ctaRef}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600" />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)`,
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Ship?
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Our logistics experts are ready to help you find the perfect shipping
                solution for your unique needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                  asChild
                >
                  <Link href="/ship">
                    Request a Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button className="bg-white text-blue-600 hover:bg-white/90 font-semibold">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}