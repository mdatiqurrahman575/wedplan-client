"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import {
  Camera,
  Building2,
  Flower2,
  Utensils,
  Sparkles,
  Shirt,
  ShieldCheck,
  CalendarCheck,
  Search,
  ArrowRight,
  DollarSign,
} from "lucide-react";

const CATEGORIES = [
  {
    name: "Photography & Videography",
    icon: Camera,
    desc: "Capture every timeless moment",
  },
  {
    name: "Wedding Venues",
    icon: Building2,
    desc: "Luxury halls & outdoor gardens",
  },
  {
    name: "Decoration & Florist",
    icon: Flower2,
    desc: "Elegant stage & floral themes",
  },
  {
    name: "Catering Services",
    icon: Utensils,
    desc: "Exquisite menus for your guests",
  },
  {
    name: "Makeup & Styling",
    icon: Sparkles,
    desc: "Bridal & groom makeover experts",
  },
  {
    name: "Wedding Fashion",
    icon: Shirt,
    desc: "Designer bridal & groom attire",
  },
];

export default function HomePage() {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${apiUrl}/services?limit=6`);
        const data = await res.json();
        if (data.success) {
          setFeaturedServices(data.data);
        }
      } catch (error) {
        console.error("Error loading featured services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-rose-950 via-rose-900 to-amber-900 text-white py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="inline-block bg-rose-500/20 border border-rose-400/30 text-rose-200 text-sm font-medium px-4 py-1.5 rounded-full">
              ✨ Plan Your Dream Wedding Effortlessly
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Crafting Memories That Last{" "}
              <span className="text-amber-300">Forever</span>
            </h1>
            <p className="text-lg text-rose-100/90 max-w-xl leading-relaxed">
              Connect with verified wedding photographers, luxury venues,
              florists, and caterers all in one place. Transparent pricing and
              hassle-free booking.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/services"
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-7 py-3.5 rounded-xl transition flex items-center gap-2 shadow-lg"
              >
                Explore Services <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/sign-up"
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-7 py-3.5 rounded-xl transition"
              >
                Join as a Vendor
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <img
              src="/410114453.jpg"
              alt="Dream Wedding Couple"
              className="rounded-3xl shadow-2xl border-4 border-white/15 object-cover w-full h-[420px]"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. 6 Wedding Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Explore Wedding Categories
          </h2>
          <p className="text-gray-600 mt-2">
            Find specialized professionals tailored to every part of your
            celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={`/services?category=${encodeURIComponent(cat.name)}`}
                  className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-rose-100 shadow-sm hover:shadow-md hover:border-rose-300 transition group"
                >
                  <div className="p-3.5 bg-rose-50 text-rose-600 rounded-xl group-hover:bg-rose-600 group-hover:text-white transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-rose-600 transition">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{cat.desc}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Wedding Services
            </h2>
            <p className="text-gray-600 mt-1">
              Handpicked and admin-approved packages for your big day.
            </p>
          </div>
          <Link
            href="/services"
            className="text-rose-600 font-semibold hover:text-rose-700 inline-flex items-center gap-1"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-rose-100/50 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : featuredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-rose-100">
            <p className="text-gray-500">
              No featured services available yet. Vendors can add services from
              their dashboard!
            </p>
          </div>
        )}
      </section>
      {/* 4. Why Choose WedPlan? Section */}
      <section className="bg-white py-20 border-y border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose WedPlan?
            </h2>
            <p className="text-gray-600 mt-2">
              We ensure quality, trust, and simplicity for both couples and
              wedding professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-rose-50/50 border border-rose-100 text-center space-y-3"
            >
              <div className="w-14 h-14 mx-auto bg-rose-600 text-white rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Admin-Verified Vendors
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every service is manually reviewed and approved by our team
                before going live to guarantee authenticity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl bg-amber-50/50 border border-amber-100 text-center space-y-3"
            >
              <div className="w-14 h-14 mx-auto bg-amber-600 text-white rounded-2xl flex items-center justify-center">
                <DollarSign className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Transparent Pricing
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Compare upfront package prices, filter by location, and book
                directly without hidden agency fees.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl bg-rose-50/50 border border-rose-100 text-center space-y-3"
            >
              <div className="w-14 h-14 mx-auto bg-rose-600 text-white rounded-2xl flex items-center justify-center">
                <CalendarCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Smart Date Protection
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Real-time booking tracking prevents double bookings on your
                event date and keeps you updated.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. How WedPlan Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-gray-900">
            How WedPlan Works
          </h2>
          <p className="text-gray-600 mt-2">
            Three simple steps to book your ideal wedding services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Search & Compare",
              desc: "Browse services across 6 categories, filter by city, and sort packages by your budget.",
              icon: Search,
            },
            {
              step: "02",
              title: "Send Booking Request",
              desc: "Pick your wedding date, add event location details, and submit your request directly to the vendor.",
              icon: CalendarCheck,
            },
            {
              step: "03",
              title: "Celebrate Stress-Free",
              desc: "Once the vendor accepts your request, track everything seamlessly from your customer dashboard.",
              icon: Sparkles,
            },
          ].map((item, idx) => {
            const StepIcon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12 }}
                className="relative bg-white p-8 rounded-2xl border border-rose-100 shadow-sm space-y-4"
              >
                <span className="text-4xl font-black text-rose-100 absolute top-5 right-6">
                  {item.step}
                </span>
                <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center">
                  <StepIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

