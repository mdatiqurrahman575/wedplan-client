import { Suspense } from 'react';
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WedPlan | Your Dream Wedding Planning Platform",
  description:
    "Discover and book the best wedding venues, photographers, decorators, and caterers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-rose-50/30 text-gray-900`}
      >
        <Toaster position="top-right" />
        <Suspense fallback={<div className="h-16" />}>
          <Navbar />
        </Suspense>

        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

