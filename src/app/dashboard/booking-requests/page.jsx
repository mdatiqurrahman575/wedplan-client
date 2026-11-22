"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/api";
import {
  Calendar,
  MapPin,
  User,
  Mail,
  CheckCircle2,
  XCircle,
  MessageSquare,
} from "lucide-react";
import toast from "react-hot-toast";

export default function BookingRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const loadRequests = async () => {
    try {
      const res = await fetchWithAuth("/vendor/booking-requests");
      setRequests(res.data);
    } catch (error) {
      toast.error(error.message || "Failed to load booking requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleStatusChange = async (bookingId, status) => {
    setUpdatingId(bookingId);
    try {
      const res = await fetchWithAuth(`/bookings/${bookingId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      toast.success(res.message || `Booking ${status.toLowerCase()}!`);
      loadRequests();
    } catch (error) {
      toast.error(error.message || "Failed to update booking");
    } finally {
      setUpdatingId(null);
    }
  };

  const badgeStyle = (status) => {
    if (status === "Accepted") return "bg-emerald-100 text-emerald-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    if (status === "Cancelled") return "bg-gray-100 text-gray-600";
    return "bg-amber-100 text-amber-700";
  };

  if (loading) {
    return (
      <div className="text-rose-600 font-medium">
        Loading booking requests...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Booking Requests</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review customer requests. Once accepted or rejected, the decision
          cannot be changed.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl border border-rose-100 text-center text-gray-500">
          No booking requests received yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-lg font-bold text-gray-900">
                    {req.serviceName}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeStyle(req.status)}`}
                  >
                    {req.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-rose-500" />{" "}
                    {req.customerName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-rose-500" />{" "}
                    {req.customerEmail}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" /> Date:{" "}
                    <strong>{req.eventDate}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />{" "}
                    {req.eventLocation}
                  </span>
                </div>

                {req.message && (
                  <p className="text-xs text-gray-500 bg-rose-50/60 p-2.5 rounded-xl flex items-start gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>{req.message}</span>
                  </p>
                )}
              </div>

              {/* Requirement: Accept or Reject Pending requests once */}
              {req.status === "Pending" && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleStatusChange(req._id, "Accepted")}
                    disabled={updatingId === req._id}
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition cursor-pointer disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(req._id, "Rejected")}
                    disabled={updatingId === req._id}
                    className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition cursor-pointer disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
