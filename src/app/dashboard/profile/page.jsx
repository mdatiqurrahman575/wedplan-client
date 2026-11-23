

"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { fetchWithAuth, uploadImageToImgBB } from "@/lib/api";
import { Upload, Loader2, Shield, Crown } from "lucide-react";
import toast from "react-hot-toast";

const DEFAULT_AVATAR = "https://flaticon.com";

export default function ProfileSettingsPage() {
  const { data: session, refetch } = useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [savedImage, setSavedImage] = useState("");
  const [saving, setSaving] = useState(false);

  const getValidAvatar = (imgUrl) => {
    if (
      !imgUrl ||
      imgUrl === "https://ibb.co" ||
      imgUrl === "https://pexels.com" ||
      imgUrl === "https://www.pexels.com"
    ) {
      return DEFAULT_AVATAR;
    }
    return imgUrl;
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setBusinessName(user.businessName || "");
      if (!savedImage) {
        setSavedImage(getValidAvatar(user.image));
      }
    }
  }, [user, savedImage]);

  const handleFileChange = (e) => {
    const file = e.target.files?.item(0) || null;
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl("");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let imageUrl = savedImage || getValidAvatar(user?.image);
      if (imageFile) {
        imageUrl = await uploadImageToImgBB(imageFile);
      }

      const res = await fetchWithAuth("/users/profile", {
        method: "PATCH",
        body: JSON.stringify({
          name,
          image: imageUrl,
          ...(user?.role === "Vendor" ? { businessName } : {}),
        }),
      });

      setSavedImage(imageUrl);
      toast.success(res.message || "Profile updated!");
      setImageFile(null);
      setPreviewUrl("");
      if (refetch) refetch();
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your personal details and profile photo.
        </p>
      </div>

      <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-100 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Shield className="w-4 h-4 text-rose-600" />
          <span>Account Role:</span>
          <strong className="text-rose-700">{user.role || "Customer"}</strong>
        </div>
        {user.role === "Vendor" && (
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Crown className="w-4 h-4 text-amber-600" />
            <span>Subscription Plan:</span>
            <strong className="text-amber-700">
              {user.subscriptionPlan || "Free"}
            </strong>
          </div>
        )}
      </div>

      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm space-y-5"
      >
        <div className="flex items-center gap-4">
          <img
            src={previewUrl || savedImage || DEFAULT_AVATAR}
            alt={user.name || "User Avatar"}
            onError={(e) => {
              e.currentTarget.src = DEFAULT_AVATAR;
            }}
            className="w-16 h-16 rounded-full object-cover border-2 border-rose-200"
          />
          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-sm font-medium cursor-pointer transition">
            <Upload className="w-4 h-4" />
            <span>{imageFile ? imageFile.name : "Change Photo"}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address (Read-only)
          </label>
          <input
            type="email"
            disabled
            value={user.email || ""}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 text-sm cursor-not-allowed"
          />
        </div>

        {user.role === "Vendor" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Name
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 text-sm"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {saving ? "Saving Changes..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

