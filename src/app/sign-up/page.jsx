

"use client";

import { useState } from "react";
import Link from "next/link";
import { signUp, signIn } from "@/lib/auth-client";
import { uploadImageToImgBB } from "@/lib/api";
import { Heart, Eye, EyeOff, Upload, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Customer");
  const [businessName, setBusinessName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validatePassword = (pass) => {
    if (pass.length < 6) return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(pass))
      return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(pass))
      return "Password must contain at least one lowercase letter.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passError = validatePassword(password);
    if (passError) {
      toast.error(passError);
      return;
    }

    setLoading(true);
    try {
      let photoUrl = "https://pexels.com";
      if (imageFile) {
        photoUrl = await uploadImageToImgBB(imageFile);
      }

      const { error } = await signUp.email({
        email,
        password,
        name,
        image: photoUrl,
        role,
        businessName: role === "Vendor" ? businessName : "",
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
      } else {
        toast.success("Account created successfully!");
        window.location.href = "/dashboard";
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong during sign up.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      toast.error("Google authentication failed.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-rose-100 space-y-6">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-3">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Create Your Account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Join WedPlan as a Couple or Wedding Vendor
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection (Customer or Vendor only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["Customer", "Vendor"].map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className={`py-2 px-4 rounded-xl text-sm font-semibold border transition cursor-pointer ${
                    role === r
                      ? "bg-rose-600 text-white border-rose-600"
                      : "bg-white text-gray-700 border-gray-200 hover:border-rose-300"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
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
              placeholder="Enter your full name"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500"
            />
          </div>

          {role === "Vendor" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Royal Wedding Photography"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Profile Image Upload (ImgBB) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image (Optional)
            </label>
            <label className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-dashed border-rose-300 rounded-xl cursor-pointer hover:bg-rose-50/50 transition text-sm text-gray-600">
              <Upload className="w-4 h-4 text-rose-600" />
              <span className="truncate">
                {imageFile ? imageFile.name : "Choose a profile photo"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.item(0) || null)}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 chars, 1 uppercase, 1 lowercase"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-3 text-xs text-gray-400 uppercase">
            Or continue with
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-rose-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

