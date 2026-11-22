"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/api";
import { Calendar, MapPin, Store, XCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const loadBookings = async () => {
    try {
      const res = await fetchWithAuth("/customer/my-bookings");
      setBookings(res.data);
    } catch (error) {
      toast.error(error.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    setCancellingId(bookingId);
    try {
      const res = await fetchWithAuth(`/bookings/${bookingId}/cancel`, {
        method: "PATCH",
      });
      toast.success(res.message || "Booking cancelled!");
      loadBookings();
    } catch (error) {
      toast.error(error.message || "Could not cancel booking");
    } finally {
      setCancellingId(null);
    }
  };

  const statusBadge = (status) => {
    const styles = {
      Pending: "bg-amber-100 text-amber-700",
      Accepted: "bg-emerald-100 text-emerald-700",
      Rejected: "bg-red-100 text-red-700",
      Cancelled: "bg-gray-100 text-gray-600",
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  if (loading) {
    return (
      <div className="text-rose-600 font-medium">Loading your bookings...</div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track your wedding service requests and manage pending bookings.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl border border-rose-100 text-center text-gray-500">
          You have not booked any wedding services yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-lg font-bold text-gray-900">
                    {booking.serviceName}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusBadge(booking.status)}`}
                  >
                    {booking.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-rose-500" /> Vendor:{" "}
                  {booking.vendorName}
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-600 pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" /> Event
                    Date: <strong>{booking.eventDate}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />{" "}
                    {booking.eventLocation}
                  </span>
                  <span className="font-semibold text-rose-600">
                    Price: ${booking.servicePrice}
                  </span>
                </div>
              </div>

              {/* Requirement: Only Pending bookings can be cancelled */}
              {booking.status === "Pending" && (
                <button
                  onClick={() => handleCancel(booking._id)}
                  disabled={cancellingId === booking._id}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-sm font-medium transition cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {cancellingId === booking._id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
