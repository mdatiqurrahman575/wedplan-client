import Link from "next/link";
import { HeartCrack, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-rose-100 p-4 rounded-full text-rose-600 mb-4">
        <HeartCrack className="w-12 h-12" />
      </div>
      <h1 className="text-5xl font-extrabold text-gray-900 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-6">
        Oops! The wedding page you are looking for does not exist or has been
        moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 py-3 rounded-xl transition"
      >
        <Home className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  );
}

