"use client";


import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { fetchWithAuth } from "@/lib/api";
import {
  MapPin,
  Tag,
  Store,
  Calendar,
  MessageSquare,
  ArrowLeft,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

function ServiceDetailsContent() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [message, setMessage] = useState("");

  const todayDate = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.push(`/sign-in?callbackUrl=/services/${id}`);
      return;
    }

    const loadDetails = async () => {
      try {
        const res = await fetchWithAuth(`/services/${id}`);
        setService(res.data);
      } catch (error) {
        toast.error(error.message || "Failed to load service details");
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [id, session, isPending, router]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetchWithAuth("/bookings", {
        method: "POST",
        body: JSON.stringify({
          serviceId: id,
          eventDate,
          eventLocation,
          message,
        }),
      });
      toast.success(res.message || "Booking request sent!");
      router.push("/dashboard/my-bookings");
    } catch (error) {
      toast.error(error.message || "Could not submit booking.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-rose-600 font-semibold">
        Loading service details...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-lg font-semibold text-gray-700">
          Service not found or unavailable.
        </p>
        <Link
          href="/services"
          className="text-rose-600 font-medium hover:underline"
        >
          Back to Services
        </Link>
      </div>
    );
  }

  const userRole = session?.user?.role || "Customer";
  const coverImage =
    Array.isArray(service.images) && service.images.length > 0
      ? service.images.at(0)
      : "https://unsplash.com";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-rose-600"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Browse Services
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Service Info & Gallery */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl overflow-hidden bg-rose-50 border border-rose-100 h-80 sm:h-96">
            <img
              src={coverImage}
              alt={service.serviceName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Tag className="w-3.5 h-3.5" /> {service.category}
              </span>
              <span className="text-2xl font-extrabold text-rose-600">
                ${service.price}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {service.serviceName}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 pt-1">
              <span className="flex items-center gap-1.5">
                <Store className="w-4 h-4 text-rose-500" />
                {service.vendorInfo?.businessName || service.vendorName}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-600" />
                {service.location}
              </span>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">
                Package Description
              </h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {service.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Booking Card (Customer Only) */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm sticky top-24 space-y-5">
            <h2 className="text-xl font-bold text-gray-900">
              Book This Service
            </h2>

            {userRole !== "Customer" ? (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-sm flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
                <p>
                  You are logged in as <strong>{userRole}</strong>. Only
                  accounts with the <strong>Customer</strong> role can submit
                  service bookings.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="date"
                      required
                      min={todayDate}
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Venue / Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      placeholder="e.g. Sheraton Grand Ballroom, Dhaka"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Note (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share guest count or custom preferences..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? "Submitting Request..." : "Request Booking"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}




export default function ServiceDetailsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">লোড হচ্ছে...</div>}>
      <ServiceDetailsContent />
    </Suspense>
  );
}


