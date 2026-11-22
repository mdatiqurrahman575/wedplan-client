"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchWithAuth } from "@/lib/api";
import { PlusCircle, Trash2, Edit3, Eye, EyeOff, Check, X } from "lucide-react";
import toast from "react-hot-toast";

export default function MyServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    serviceName: "",
    price: "",
    location: "",
  });

  const loadMyServices = async () => {
    try {
      const res = await fetchWithAuth("/vendor/my-services");
      setServices(res.data);
    } catch (error) {
      toast.error(error.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyServices();
  }, []);

  const handleToggleActive = async (service) => {
    try {
      const res = await fetchWithAuth(`/services/${service._id}`, {
        method: "PATCH",
        body: JSON.stringify({ isActive: !service.isActive }),
      });
      toast.success(res.message || "Availability updated!");
      loadMyServices();
    } catch (error) {
      toast.error(error.message || "Failed to update status");
    }
  };

  const startEdit = (service) => {
    setEditingId(service._id);
    setEditForm({
      serviceName: service.serviceName,
      price: service.price,
      location: service.location,
    });
  };

  const handleSaveEdit = async (id) => {
    try {
      const res = await fetchWithAuth(`/services/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          serviceName: editForm.serviceName,
          price: parseFloat(editForm.price),
          location: editForm.location,
        }),
      });
      toast.success(res.message || "Service updated!");
      setEditingId(null);
      loadMyServices();
    } catch (error) {
      toast.error(error.message || "Update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetchWithAuth(`/services/${id}`, { method: "DELETE" });
      toast.success(res.message || "Service deleted!");
      loadMyServices();
    } catch (error) {
      toast.error(error.message || "Delete failed");
    }
  };

  const statusColor = (status) => {
    if (status === "Approved") return "bg-emerald-100 text-emerald-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    return "bg-amber-100 text-amber-700";
  };

  if (loading) {
    return (
      <div className="text-rose-600 font-medium">Loading your services...</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Services</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your wedding packages, availability, and pricing.
          </p>
        </div>
        <Link
          href="/dashboard/add-service"
          className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition"
        >
          <PlusCircle className="w-4 h-4" /> Add New Service
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl border border-rose-100 text-center text-gray-500">
          You have not created any services yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {editingId === service._id ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-grow">
                  <input
                    type="text"
                    value={editForm.serviceName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, serviceName: e.target.value })
                    }
                    className="px-3 py-2 border border-gray-200 rounded-xl text-sm"
                  />
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: e.target.value })
                    }
                    className="px-3 py-2 border border-gray-200 rounded-xl text-sm"
                  />
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) =>
                      setEditForm({ ...editForm, location: e.target.value })
                    }
                    className="px-3 py-2 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-lg font-bold text-gray-900">
                      {service.serviceName}
                    </h3>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusColor(service.status)}`}
                    >
                      {service.status}
                    </span>
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                        service.isActive
                          ? "bg-blue-50 text-blue-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {service.isActive ? "Active" : "Hidden"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {service.category} • {service.location} •{" "}
                    <strong className="text-rose-600">${service.price}</strong>
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2 shrink-0">
                {editingId === service._id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(service._id)}
                      className="p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 cursor-pointer"
                      title="Save"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 cursor-pointer"
                      title="Cancel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleToggleActive(service)}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      {service.isActive ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                      {service.isActive ? "Hide" : "Show"}
                    </button>
                    <button
                      onClick={() => startEdit(service)}
                      className="p-2 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 cursor-pointer"
                      title="Edit Service"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="p-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

