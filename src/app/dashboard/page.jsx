"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { fetchWithAuth } from "@/lib/api";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Briefcase,
  Users,
  DollarSign,
  Crown,
} from "lucide-react";
import toast from "react-hot-toast";

export default function DashboardOverviewPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = session?.user;
  const role = user?.role || "Customer";

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetchWithAuth("/dashboard/stats");
        setStats(res.data);
      } catch (error) {
        toast.error(error.message || "Failed to load dashboard overview");
      } finally {
        setLoading(false);
      }
    };
    if (user) loadStats();
  }, [user]);

  if (loading || !stats) {
    return (
      <div className="text-rose-600 font-medium">Loading overview stats...</div>
    );
  }

  let cards = [];

  if (role === "Admin") {
    cards = [
      {
        label: "Total Users",
        value: stats.totalUsers,
        icon: Users,
        color: "bg-blue-50 text-blue-600",
      },
      {
        label: "Total Vendors",
        value: stats.totalVendors,
        icon: Briefcase,
        color: "bg-purple-50 text-purple-600",
      },
      {
        label: "Total Services",
        value: stats.totalServices,
        icon: CheckCircle2,
        color: "bg-emerald-50 text-emerald-600",
      },
      {
        label: "Pending Approvals",
        value: stats.pendingServices,
        icon: Clock,
        color: "bg-amber-50 text-amber-600",
      },
      {
        label: "Total Transactions",
        value: stats.totalTransactions,
        icon: DollarSign,
        color: "bg-rose-50 text-rose-600",
      },
    ];
  } else if (role === "Vendor") {
    cards = [
      {
        label: "Total Services",
        value: stats.totalServices,
        icon: Briefcase,
        color: "bg-blue-50 text-blue-600",
      },
      {
        label: "Active Services",
        value: stats.activeServices,
        icon: CheckCircle2,
        color: "bg-emerald-50 text-emerald-600",
      },
      {
        label: "Pending Requests",
        value: stats.pendingRequests,
        icon: Clock,
        color: "bg-amber-50 text-amber-600",
      },
      {
        label: "Accepted Bookings",
        value: stats.acceptedBookings,
        icon: CalendarCheck,
        color: "bg-rose-50 text-rose-600",
      },
      {
        label: "Current Plan",
        value: stats.subscriptionPlan,
        icon: Crown,
        color: "bg-purple-50 text-purple-600",
      },
    ];
  } else {
    cards = [
      {
        label: "Total Bookings",
        value: stats.totalBookings,
        icon: CalendarCheck,
        color: "bg-blue-50 text-blue-600",
      },
      {
        label: "Pending Requests",
        value: stats.pendingBookings,
        icon: Clock,
        color: "bg-amber-50 text-amber-600",
      },
      {
        label: "Accepted Bookings",
        value: stats.acceptedBookings,
        icon: CheckCircle2,
        color: "bg-emerald-50 text-emerald-600",
      },
      {
        label: "Rejected Bookings",
        value: stats.rejectedBookings,
        icon: XCircle,
        color: "bg-red-50 text-red-600",
      },
    ];
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Here is a quick summary of your {role} account activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm flex items-center gap-4"
            >
              <div className={`p-3.5 rounded-xl ${card.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  {card.label}
                </p>
                <p className="text-2xl font-extrabold text-gray-900 mt-0.5">
                  {card.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

