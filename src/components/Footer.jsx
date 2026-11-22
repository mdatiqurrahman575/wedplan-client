"use client";
import Link from "next/link";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-rose-600 p-2 rounded-xl text-white">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span className="text-2xl font-bold text-white">WedPlan</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your trusted wedding planning marketplace. Discover top-rated
              venues, photographers, decorators, and caterers to make your
              special day unforgettable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-rose-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-rose-400 transition"
                >
                  Browse Services
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="hover:text-rose-400 transition"
                >
                  Become a Vendor
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-rose-400 transition"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Top Categories</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Photography & Videography</li>
              <li>Wedding Venues</li>
              <li>Decoration & Florist</li>
              <li>Catering Services</li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-500" /> support@wedplan.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-500" /> +880 1700-000000
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500" /> Dhaka, Bangladesh
              </li>
            </ul>
            {/* Social Icons (Including X logo) */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-rose-400 transition text-sm font-medium"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-rose-400 transition text-sm font-medium"
              >
                Instagram
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-rose-400 transition flex items-center gap-1 text-sm font-medium"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm text-slate-500">
          © 2026 WedPlan. All rights reserved. Crafted with love for your dream
          wedding.
        </div>
      </div>
    </footer>
  );
}
