"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  User,
  PlusCircle,
  Briefcase,
  ClipboardList,
  Crown,
  Users,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

export default function DashboardSidebar({ role = "Customer" }) {
  const pathname = usePathname();

  const customerLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    {
      name: "My Bookings",
      href: "/dashboard/my-bookings",
      icon: CalendarCheck,
    },
    { name: "Profile Settings", href: "/dashboard/profile", icon: User },
  ];

  const vendorLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Add Service", href: "/dashboard/add-service", icon: PlusCircle },
    { name: "My Services", href: "/dashboard/my-services", icon: Briefcase },
    {
      name: "Booking Requests",
      href: "/dashboard/booking-requests",
      icon: ClipboardList,
    },
    { name: "Subscription", href: "/dashboard/subscription", icon: Crown },
    { name: "Profile Settings", href: "/dashboard/profile", icon: User },
  ];

  const adminLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Manage Users", href: "/dashboard/manage-users", icon: Users },
    {
      name: "Manage Services",
      href: "/dashboard/manage-services",
      icon: ShieldCheck,
    },
    { name: "Transactions", href: "/dashboard/transactions", icon: CreditCard },
  ];

  let links = customerLinks;
  if (role === "Vendor") links = vendorLinks;
  if (role === "Admin") links = adminLinks;

  return (
    <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-rose-100 p-4 shrink-0">
      <div className="mb-4 px-3">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
          {role} Panel
        </span>
      </div>
      <nav className="flex md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                isActive
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-rose-50 hover:text-rose-600"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

