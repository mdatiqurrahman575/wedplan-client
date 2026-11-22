"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { fetchWithAuth } from "@/lib/api";
import { Crown, Check, Loader2, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export default function SubscriptionPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const currentPlan = session?.user?.subscriptionPlan || "Free";

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth("/payments/create-checkout-session", {
        method: "POST",
      });
      if (res.url) {
        window.location.href = res.url;
      }
    } catch (error) {
      toast.error(error.message || "Could not start Stripe checkout.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Vendor Subscription Plans
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Upgrade to Premium to unlock unlimited wedding service listings and
          priority visibility.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free Plan Card */}
        <div
          className={`bg-white p-7 rounded-3xl border-2 flex flex-col justify-between space-y-6 ${
            currentPlan === "Free"
              ? "border-rose-500 shadow-sm"
              : "border-gray-100"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Free Starter</h2>
              {currentPlan === "Free" && (
                <span className="text-xs font-bold bg-rose-100 text-rose-700 px-3 py-1 rounded-full">
                  Current Plan
                </span>
              )}
            </div>
            <p className="text-3xl font-extrabold text-gray-900">
              $0{" "}
              <span className="text-sm font-normal text-gray-500">
                / forever
              </span>
            </p>
            <ul className="space-y-3 text-sm text-gray-600 pt-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" /> List up to{" "}
                <strong>3 active services</strong>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" /> Receive & manage
                customer bookings
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" /> Standard vendor
                profile
              </li>
            </ul>
          </div>

          <button
            disabled
            className="w-full py-3 rounded-xl border border-gray-200 text-gray-400 font-semibold text-sm cursor-not-allowed"
          >
            {currentPlan === "Free" ? "Active Plan" : "Included"}
          </button>
        </div>

        {/* Premium Plan Card */}
        <div
          className={`bg-gradient-to-br from-rose-950 via-rose-900 to-amber-900 text-white p-7 rounded-3xl border-2 flex flex-col justify-between space-y-6 shadow-lg ${
            currentPlan === "Premium"
              ? "border-amber-400"
              : "border-transparent"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-300" /> Premium Pro
              </h2>
              {currentPlan === "Premium" && (
                <span className="text-xs font-bold bg-amber-400 text-slate-950 px-3 py-1 rounded-full">
                  Active Plan
                </span>
              )}
            </div>
            <p className="text-3xl font-extrabold">
              $29{" "}
              <span className="text-sm font-normal text-rose-200">
                / 30 days
              </span>
            </p>
            <ul className="space-y-3 text-sm text-rose-100 pt-2">
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />{" "}
                <strong>Unlimited</strong> active wedding services
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-300" /> Priority placement
                in search results
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-300" /> Verified Premium
                Vendor badge
              </li>
            </ul>
          </div>

          {currentPlan === "Premium" ? (
            <button
              disabled
              className="w-full py-3 rounded-xl bg-white/15 text-amber-200 font-semibold text-sm cursor-not-allowed"
            >
              You are a Premium Vendor
            </button>
          ) : (
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Redirecting to Stripe..." : "Upgrade to Premium"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
