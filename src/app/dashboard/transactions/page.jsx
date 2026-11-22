"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/api";
import { CreditCard } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const res = await fetchWithAuth("/admin/transactions");
        setTransactions(res.data);
      } catch (error) {
        toast.error(error.message || "Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };
    loadTransactions();
  }, []);

  if (loading) {
    return (
      <div className="text-rose-600 font-medium">
        Loading Stripe transactions...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Vendor Subscription Transactions
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Read-only log of all verified Stripe subscription payments.
        </p>
      </div>

      {transactions.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl border border-rose-100 text-center text-gray-500 flex flex-col items-center gap-2">
          <CreditCard className="w-8 h-8 text-gray-400" />
          <p>No Stripe payment transactions recorded yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-rose-100 overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-rose-50/70 border-b border-rose-100 text-gray-700">
                <th className="p-4 font-semibold">Vendor Email</th>
                <th className="p-4 font-semibold">Plan</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Session ID</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((tx) => (
                <tr key={tx._id} className="hover:bg-rose-50/20">
                  <td className="p-4 font-medium text-gray-900">
                    {tx.vendorEmail || tx.vendorId}
                  </td>
                  <td className="p-4 text-amber-700 font-semibold">
                    {tx.plan}
                  </td>
                  <td className="p-4 font-bold text-gray-900">
                    ${tx.amount} {tx.currency?.toUpperCase()}
                  </td>
                  <td className="p-4 text-xs text-gray-500 font-mono max-w-[160px] truncate">
                    {tx.stripeSessionId}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-gray-500">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
