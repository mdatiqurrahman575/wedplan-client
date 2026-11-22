import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-rose-100 shadow-sm text-center space-y-5">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
          <XCircle className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Payment Cancelled</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Your Stripe checkout session was cancelled and no charges were made.
          You can upgrade anytime from your subscription page.
        </p>
        <div className="pt-2">
          <Link
            href="/dashboard/subscription"
            className="inline-flex items-center justify-center gap-2 w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-xl transition"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Subscription
          </Link>
        </div>
      </div>
    </div>
  );
}

