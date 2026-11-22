"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/api";
import { CheckCircle2, XCircle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ManageServicesPage() {
  const [services, setServices] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const loadServices = async () => {
    try {
      const query = statusFilter !== "All" ? `?status=${statusFilter}` : "";
      const res = await fetchWithAuth(`/admin/services${query}`);
      setServices(res.data);
    } catch (error) {
      toast.error(error.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, [statusFilter]);

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await fetchWithAuth(`/admin/services/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      toast.success(res.message);
      loadServices();
    } catch (error) {
      toast.error(error.message || "Status update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetchWithAuth(`/services/${id}`, { method: "DELETE" });
      toast.success(res.message);
      loadServices();
    } catch (error) {
      toast.error(error.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Services</h1>
          <p className="text-sm text-gray-500 mt-1">
            Review vendor service submissions and approve or reject listings.
          </p>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending Review</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <div className="text-rose-600 font-medium">Loading services...</div>
      ) : services.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl border border-rose-100 text-center text-gray-500">
          No services found for this filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {services.map((s) => (
            <div
              key={s._id}
              className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-lg font-bold text-gray-900">
                    {s.serviceName}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      s.status === "Approved"
                        ? "bg-emerald-100 text-emerald-700"
                        : s.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Vendor: <strong>{s.vendorName}</strong> ({s.vendorEmail}) •{" "}
                  {s.category} • {s.location} •{" "}
                  <strong className="text-rose-600">${s.price}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {s.status !== "Approved" && (
                  <button
                    onClick={() => handleStatusUpdate(s._id, "Approved")}
                    className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                  </button>
                )}
                {s.status !== "Rejected" && (
                  <button
                    onClick={() => handleStatusUpdate(s._id, "Rejected")}
                    className="inline-flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Reject
                  </button>
                )}
                <button
                  onClick={() => handleDelete(s._id)}
                  className="p-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                  title="Delete Service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
