"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ServiceCard from "@/components/ServiceCard";
import { Search, Filter, MapPin, ArrowUpDown, RotateCcw } from "lucide-react";

const CATEGORIES = [
  "All",
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
  "Wedding Fashion",
];

function BrowseServicesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (category && category !== "All") params.append("category", category);
        if (location) params.append("location", location);
        if (sort !== "newest") params.append("sort", sort);

        const res = await fetch(`${apiUrl}/services?${params.toString()}`);
        const data = await res.json();
        if (data.success) {
          setServices(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchServices();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, category, location, sort]);

  const handleReset = () => {
    setSearch("");
    setCategory("All");
    setLocation("");
    setSort("newest");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Browse Wedding Services
        </h1>
        <p className="text-gray-600 mt-2">
          Search, filter, and compare verified vendors to find the perfect match
          for your big day.
        </p>
      </div>

      {/* Search, Filter & Sort Bar */}
      <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search by Name */}
        <div className="relative lg:col-span-2">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service by name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 text-sm"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <Filter className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 text-sm bg-white"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="relative">
          <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Filter by city/location"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 text-sm"
          />
        </div>

        {/* Sort by Price */}
        <div className="relative">
          <ArrowUpDown className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 text-sm bg-white"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results Count & Reset */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <p>
          Showing{" "}
          <span className="font-bold text-gray-900">{services.length}</span>{" "}
          approved services
        </p>
        {(search || category !== "All" || location || sort !== "newest") && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-medium cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Reset Filters
          </button>
        )}
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="h-80 bg-rose-100/50 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      ) : services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-rose-100 space-y-3">
          <p className="text-lg font-semibold text-gray-800">
            No services matched your filters
          </p>
          <p className="text-sm text-gray-500">
            Try clearing your search or selecting a different category.
          </p>
          <button
            onClick={handleReset}
            className="mt-2 bg-rose-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-rose-700 transition"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function BrowseServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-rose-600 font-medium">
          Loading services...
        </div>
      }
    >
      <BrowseServicesContent />
    </Suspense>
  );
}

