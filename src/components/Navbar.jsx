
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import {
  Heart,
  Menu,
  X,
  LayoutDashboard,
  User,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import toast from "react-hot-toast";

const DEFAULT_AVATAR = "https://flaticon.com";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const user = session?.user;

  const getValidAvatar = (imgUrl) => {
    if (
      !imgUrl ||
      imgUrl === "https://ibb.co" ||
      imgUrl === "https://pexels.com" ||
      imgUrl === "https://pexels.com"
    ) {
      return DEFAULT_AVATAR;
    }
    return imgUrl;
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("wedplan-theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("wedplan-theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("wedplan-theme", "dark");
      setDarkMode(true);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setDropdownOpen(false);
      setMobileMenuOpen(false);
      toast.success("Logged out successfully!");
      window.location.href = "/";
    } catch (error) {
      toast.error("Failed to logout.");
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Services", href: "/services" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-rose-100 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-rose-600 p-2 rounded-xl text-white">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
              WedPlan
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-rose-600 font-semibold"
                    : "text-gray-700 dark:text-slate-200 hover:text-rose-600"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {user && (
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  pathname.startsWith("/dashboard")
                    ? "text-rose-600 font-semibold"
                    : "text-gray-700 dark:text-slate-200 hover:text-rose-600"
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl border border-rose-100 dark:border-slate-700 text-gray-700 dark:text-amber-400 hover:bg-rose-50 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {isPending ? (
              <div className="h-9 w-24 bg-rose-50 dark:bg-slate-800 animate-pulse rounded-lg" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-rose-50 dark:bg-slate-800 hover:bg-rose-100 px-3 py-1.5 rounded-full border border-rose-200 dark:border-slate-700 transition cursor-pointer"
                >
                  <img
                    src={getValidAvatar(user.image)}
                    alt={user.name || "User"}
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_AVATAR;
                    }}
                    className="w-8 h-8 rounded-full object-cover border border-rose-300"
                  />
                  <span className="text-sm font-medium text-gray-800 dark:text-slate-100 max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-600 dark:text-slate-300" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-rose-100 dark:border-slate-800 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-800">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-rose-600 font-medium">
                        {user.role || "Customer"}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-slate-800 hover:text-rose-600"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-slate-800 hover:text-rose-600"
                    >
                      <User className="w-4 h-4" /> Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-gray-700 dark:text-slate-200 hover:text-rose-600 px-3 py-2 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="text-sm font-medium bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg shadow-sm transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl border border-rose-100 dark:border-slate-700 text-gray-700 dark:text-amber-400"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 dark:text-slate-200 p-2"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-rose-100 dark:border-slate-800 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-gray-700 dark:text-slate-200 hover:text-rose-600"
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-medium text-gray-700 dark:text-slate-200 hover:text-rose-600"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-medium text-gray-700 dark:text-slate-200 hover:text-rose-600"
              >
                Profile Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 text-base font-medium text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 border border-rose-200 dark:border-slate-700 rounded-lg text-rose-600 font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 bg-rose-600 text-white rounded-lg font-medium"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

