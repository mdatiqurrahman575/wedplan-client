// "use client";

// import { useState, Suspense } from "react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { signIn } from "@/lib/auth-client";
// import { Heart, Eye, EyeOff, Loader2 } from "lucide-react";
// import toast from "react-hot-toast";

// function SignInForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { error } = await signIn.email({
//         email,
//         password,
//       });

//       if (error) {
//         toast.error(error.message || "Invalid email or password.");
//       } else {
//         toast.success("Signed in successfully!");
//         router.push(callbackUrl);
//         router.refresh();
//       }
//     } catch (err) {
//       toast.error("Failed to sign in. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       await signIn.social({
//         provider: "google",
//         callbackURL: callbackUrl,
//       });
//     } catch (error) {
//       toast.error("Google sign in failed.");
//     }
//   };

//   return (
//     <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-rose-100 space-y-6">
//       <div className="text-center">
//         <div className="mx-auto w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-3">
//           <Heart className="w-6 h-6 fill-current" />
//         </div>
//         <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Sign in to manage your wedding plans
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Email Address
//           </label>
//           <input
//             type="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="you@example.com"
//             className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Password
//           </label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 pr-10"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//             >
//               {showPassword ? (
//                 <EyeOff className="w-4 h-4" />
//               ) : (
//                 <Eye className="w-4 h-4" />
//               )}
//             </button>
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
//         >
//           {loading && <Loader2 className="w-4 h-4 animate-spin" />}
//           {loading ? "Signing In..." : "Sign In"}
//         </button>
//       </form>

//       <div className="relative flex py-1 items-center">
//         <div className="flex-grow border-t border-gray-200"></div>
//         <span className="flex-shrink mx-3 text-xs text-gray-400 uppercase">
//           Or continue with
//         </span>
//         <div className="flex-grow border-t border-gray-200"></div>
//       </div>

//       <button
//         type="button"
//         onClick={handleGoogleSignIn}
//         className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
//       >
//         <img src="https://svgrepo.com" alt="Google" className="w-5 h-5" />
//         Sign In with Google
//       </button>

//       <p className="text-center text-sm text-gray-600">
//         Don&apos;t have an account?{" "}
//         <Link
//           href="/sign-up"
//           className="text-rose-600 font-semibold hover:underline"
//         >
//           Sign Up
//         </Link>
//       </p>
//     </div>
//   );
// }

// export default function SignInPage() {
//   return (
//     <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <Suspense
//         fallback={<div className="text-rose-600 font-medium">Loading...</div>}
//       >
//         <SignInForm />
//       </Suspense>
//     </div>
//   );
// }

"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Heart, Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
      } else {
        toast.success("Signed in successfully!");
        window.location.href = callbackUrl;
      }
    } catch (err) {
      toast.error("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
    } catch (error) {
      toast.error("Google sign in failed.");
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-rose-100 space-y-6">
      <div className="text-center">
        <div className="mx-auto w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-3">
          <Heart className="w-6 h-6 fill-current" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-sm text-gray-500 mt-1">
          Sign in to manage your wedding plans
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Enter your password"
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
          {loading ? "Signing In..." : "Sign In"}
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
        onClick={handleGoogleSignIn}
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
        Sign In with Google
      </button>

      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-rose-600 font-semibold hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense
        fallback={<div className="text-rose-600 font-medium">Loading...</div>}
      >
        <SignInForm />
      </Suspense>
    </div>
  );
}

