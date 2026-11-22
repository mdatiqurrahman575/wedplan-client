"use client";

import { Suspense } from "react";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import DashboardSidebar from "@/components/DashboardSidebar";
import toast from "react-hot-toast";

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const user = session?.user;
  const role = user?.role || "Customer";

  useEffect(() => {
    if (isPending) return;

    if (!user) {
      router.push("/sign-in?callbackUrl=/dashboard");
      return;
    }

    // URL Role Protection
    const customerOnly = ["/dashboard/my-bookings"];
    const vendorOnly = [
      "/dashboard/add-service",
      "/dashboard/my-services",
      "/dashboard/booking-requests",
      "/dashboard/subscription",
    ];
    const adminOnly = [
      "/dashboard/manage-users",
      "/dashboard/manage-services",
      "/dashboard/transactions",
    ];

    if (customerOnly.includes(pathname) && role !== "Customer") {
      toast.error("Access denied! Customer route only.");
      router.push("/dashboard");
    } else if (vendorOnly.includes(pathname) && role !== "Vendor") {
      toast.error("Access denied! Vendor route only.");
      router.push("/dashboard");
    } else if (adminOnly.includes(pathname) && role !== "Admin") {
      toast.error("Access denied! Admin route only.");
      router.push("/dashboard");
    }
  }, [user, isPending, role, pathname, router]);

  if (isPending || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-rose-600 font-semibold">
        Verifying dashboard access...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-140px)] flex flex-col md:flex-row bg-white/60 border-x border-rose-100">
      <DashboardSidebar role={role} />
      <div className="flex-grow p-6 sm:p-8">
        <Suspense
          fallback={<div className="p-10 text-center">লোড হচ্ছে...</div>}
        >
          {children}
        </Suspense>
      </div>
    </div>
  );
}
