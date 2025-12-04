"use client";

import {
  MessageCircle,
  Phone,
  Mail,
  HelpCircle,
  Send,
  CheckCircle,
  Headphones,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

const supportRequestSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  category: z.enum([
    "General Inquiry",
    "Shipping Issue",
    "Tracking",
    "Billing",
    "Other",
  ]),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type SupportRequestType = z.infer<typeof supportRequestSchema>;

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

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our support team",
    value: "+1 (912) 980-1024",
    action: "tel:+19129801024",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Get a response within 24 hours",
    value: "support@asyncship.com",
    action: "mailto:support@asyncship.com",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with us in real-time",
    value: "Available 24/7",
    action: "#chat",
  },
];

const faqs = [
  {
    question: "How do I track my shipment?",
    answer: "Use your tracking number on our Track page for real-time updates.",
  },
  {
    question: "What are your delivery times?",
    answer: "Delivery times vary by service: Express (1-2 days), Standard (3-5 days), Economy (5-7 days).",
  },
  {
    question: "How do I file a claim?",
    answer: "Submit a support request with your tracking number and issue details.",
  },
];

export default function SupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formRef, formInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const form = useForm<SupportRequestType>({
    resolver: zodResolver(supportRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      category: "General Inquiry",
      message: "",
    },
  });

  const onSubmit = async (_values: SupportRequestType) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      form.reset();
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Submission error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
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
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Headphones className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">24/7 Support</span>
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Customer{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Support
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            We&apos;re here to help you with any questions or concerns about your
            shipments. Our dedicated support team is ready to assist you.
          </motion.p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          ref={contactRef}
          initial="hidden"
          animate={contactInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.title}
              href={method.action}
              variants={fadeInUp}
            >
              <Card className="group h-full bg-slate-800/30 border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 hover:bg-slate-800/50 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                      <method.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {method.title}
                      </h3>
                      <p className="text-sm text-slate-400 mb-2">
                        {method.description}
                      </p>
                      <p className="text-sm font-medium text-blue-400">
                        {method.value}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </motion.div>

        {/* Support Request Form */}
        <motion.div
          ref={formRef}
          initial="hidden"
          animate={formInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="max-w-2xl mx-auto mb-20"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-blue-600/20 rounded-3xl blur-xl" />

            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 sm:p-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Submit a Support Request
                </h2>
                <p className="text-slate-400">
                  Fill out the form below and we&apos;ll get back to you shortly.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                            className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Email Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="you@example.com"
                              {...field}
                              className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">
                            Phone Number (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="(555) 123-4567"
                              {...field}
                              className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Support Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white focus:border-blue-500 focus:ring-blue-500/20">
                              <SelectValue placeholder="Select a support category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="General Inquiry" className="text-slate-300 focus:bg-slate-700 focus:text-white">
                              General Inquiry
                            </SelectItem>
                            <SelectItem value="Shipping Issue" className="text-slate-300 focus:bg-slate-700 focus:text-white">
                              Shipping Issue
                            </SelectItem>
                            <SelectItem value="Tracking" className="text-slate-300 focus:bg-slate-700 focus:text-white">
                              Tracking
                            </SelectItem>
                            <SelectItem value="Billing" className="text-slate-300 focus:bg-slate-700 focus:text-white">
                              Billing
                            </SelectItem>
                            <SelectItem value="Other" className="text-slate-300 focus:bg-slate-700 focus:text-white">
                              Other
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Your Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your issue or inquiry in detail"
                            className="min-h-[120px] bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <p className="text-emerald-300">
                        Thank you! Your support request has been submitted successfully.
                      </p>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-6 shadow-lg shadow-blue-600/25"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Support Request
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          ref={faqRef}
          initial="hidden"
          animate={faqInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div variants={fadeInUp} className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Check out our
              comprehensive FAQ or contact our support team.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10"
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-slate-800/30 border-slate-700/50 text-left">
                  <CardContent className="p-6">
                    <h4 className="text-white font-semibold mb-2">{faq.question}</h4>
                    <p className="text-slate-400 text-sm">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Button
              variant="outline"
              className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700 hover:border-slate-600"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              View Full FAQ
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}