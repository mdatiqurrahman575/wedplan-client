// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { fetchWithAuth, uploadImageToImgBB } from "@/lib/api";
// import { Upload, Loader2, PlusCircle } from "lucide-react";
// import toast from "react-hot-toast";

// const CATEGORIES = [
//   "Photography & Videography",
//   "Wedding Venues",
//   "Decoration & Florist",
//   "Catering Services",
//   "Makeup & Styling",
//   "Wedding Fashion",
// ];

// export default function AddServicePage() {
//   const router = useRouter();
//   const [serviceName, setServiceName] = useState("");
//   const [category, setCategory] = useState(CATEGORIES.at(0));
//   const [price, setPrice] = useState("");
//   const [location, setLocation] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageFiles, setImageFiles] = useState([]);
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (imageFiles.length === 0) {
//       toast.error("Please select at least one service image.");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const uploadedUrls = [];
//       for (const file of imageFiles) {
//         const url = await uploadImageToImgBB(file);
//         uploadedUrls.push(url);
//       }

//       const res = await fetchWithAuth("/services", {
//         method: "POST",
//         body: JSON.stringify({
//           serviceName,
//           category,
//           price: parseFloat(price),
//           location,
//           description,
//           images: uploadedUrls,
//         }),
//       });

//       toast.success(res.message || "Service submitted for Admin approval!");
//       router.push("/dashboard/my-services");
//     } catch (error) {
//       toast.error(error.message || "Failed to add service.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">
//           Add New Wedding Service
//         </h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Submit your package for Admin review. Free plan vendors can list up to
//           3 active services.
//         </p>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm space-y-4"
//       >
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Service / Package Name
//           </label>
//           <input
//             type="text"
//             required
//             value={serviceName}
//             onChange={(e) => setServiceName(e.target.value)}
//             placeholder="e.g. Royal Cinematic Wedding Photography"
//             className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 text-sm"
//           />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Category
//             </label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 text-sm bg-white"
//             >
//               {CATEGORIES.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Package Price ($ USD)
//             </label>
//             <input
//               type="number"
//               required
//               min="1"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               placeholder="e.g. 1200"
//               className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 text-sm"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Service Location / City
//           </label>
//           <input
//             type="text"
//             required
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             placeholder="e.g. Dhaka, Chittagong, Sylhet"
//             className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 text-sm"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Service Images
//           </label>
//           <label className="flex flex-col items-center justify-center gap-1.5 w-full p-5 border-2 border-dashed border-rose-200 rounded-xl cursor-pointer hover:bg-rose-50/40 transition text-sm text-gray-600">
//             <Upload className="w-6 h-6 text-rose-600" />
//             <span>
//               {imageFiles.length > 0
//                 ? `${imageFiles.length} image(s) selected`
//                 : "Click to upload service photos (JPG/PNG)"}
//             </span>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
//               className="hidden"
//             />
//           </label>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Package Details & Inclusions
//           </label>
//           <textarea
//             rows={4}
//             required
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Describe what is included in your wedding package..."
//             className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 text-sm"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={submitting}
//           className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
//         >
//           {submitting ? (
//             <Loader2 className="w-4 h-4 animate-spin" />
//           ) : (
//             <PlusCircle className="w-4 h-4" />
//           )}
//           {submitting ? "Uploading & Creating..." : "Submit Service"}
//         </button>
//       </form>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth, uploadImageToImgBB } from "@/lib/api";
import { Upload, Loader2, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

const CATEGORIES = [
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
  "Wedding Fashion",
];

export default function AddServicePage() {
  const router = useRouter();
  const [serviceName, setServiceName] = useState("");
  const [category, setCategory] = useState(CATEGORIES.at(0));
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageFiles.length === 0) {
      toast.error("Please select at least one service image.");
      return;
    }

    setSubmitting(true);
    try {
      const uploadedUrls = [];
      for (const file of imageFiles) {
        const url = await uploadImageToImgBB(file);
        uploadedUrls.push(url);
      }

      const res = await fetchWithAuth("/services", {
        method: "POST",
        body: JSON.stringify({
          serviceName,
          category,
          price: parseFloat(price),
          location,
          description,
          images: uploadedUrls,
        }),
      });

      // যদি রেসপন্সের ভেতর লিমিট শেষ হওয়ার মেসেজ থাকে
      const resMsg = res?.message || "";
      if (
        resMsg.toLowerCase().includes("limit") ||
        resMsg.toLowerCase().includes("max 3") ||
        resMsg.toLowerCase().includes("upgrade")
      ) {
        toast.error(
          "Free plan limit reached (Max 3 services). Upgrade to Premium!",
        );
        router.push("/dashboard/subscription");
        return;
      }

      toast.success(res.message || "Service submitted for Admin approval!");
      router.push("/dashboard/my-services");
    } catch (error) {
      const errorMsg = error?.message || "Failed to add service.";

      // যদি এরর ব্লকে লিমিট শেষ হওয়ার মেসেজ আসে
      if (
        errorMsg.toLowerCase().includes("limit") ||
        errorMsg.toLowerCase().includes("max 3") ||
        errorMsg.toLowerCase().includes("upgrade")
      ) {
        toast.error(
          "Free plan limit reached (Max 3 services). Upgrade to Premium!",
        );
        router.push("/dashboard/subscription");
        return;
      }

      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Add New Wedding Service
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Submit your package for Admin review. Free plan vendors can list up to
          3 active services.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service / Package Name
          </label>
          <input
            type="text"
            required
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="e.g. Royal Cinematic Wedding Photography"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 text-sm bg-white"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Package Price ($ USD)
            </label>
            <input
              type="number"
              required
              min="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 1200"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Location / City
          </label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Dhaka, Chittagong, Sylhet"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Images
          </label>
          <label className="flex flex-col items-center justify-center gap-1.5 w-full p-5 border-2 border-dashed border-rose-200 rounded-xl cursor-pointer hover:bg-rose-50/40 transition text-sm text-gray-600">
            <Upload className="w-6 h-6 text-rose-600" />
            <span>
              {imageFiles.length > 0
                ? `${imageFiles.length} image(s) selected`
                : "Click to upload service photos (JPG/PNG)"}
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
              className="hidden"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Package Details & Inclusions
          </label>
          <textarea
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what is included in your wedding package..."
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <PlusCircle className="w-4 h-4" />
          )}
          {submitting ? "Uploading & Creating..." : "Submit Service"}
        </button>
      </form>
    </div>
  );
}
