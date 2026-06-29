// app/(dashboardLayout)/funding/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  HandCoins,
  Loader2,
  DollarSign,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 5;

export default function FundingPage() {
  const { data: session, isPending: sessionLoading } = useSession();
  const router = useRouter();
  const [fundings, setFundings] = useState([]);

  useEffect(() => {
    if (!sessionLoading && !session) {
      router.push("/login");
    }
  }, [session, sessionLoading, router]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Fetch real funding data from backend
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/funding`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not load the donation history.");
        return res.json();
      })
      .then((data) => {
        setFundings(data);
        setFetchLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setFetchLoading(false);
      });
  }, []);

  // Sort by date and exact time descending (with MongoDB _id tie-breaker for identical times)
  const sortedFundings = [...fundings].sort((a, b) => {
    const dateDiff = new Date(b.date) - new Date(a.date);
    if (dateDiff === 0 && b._id && a._id) {
      return b._id.localeCompare(a._id);
    }
    return dateDiff;
  });

  // Pagination logic applied to the sorted array
  const totalPages = Math.ceil(sortedFundings.length / ITEMS_PER_PAGE);
  const paginated = sortedFundings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleGiveFund = async () => {
    if (!session?.user) {
      toast.error("Please log in");
      return;
    }
    if (!fundAmount || isNaN(fundAmount) || Number(fundAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    setPaymentLoading(true);

    try {
      const res = await fetch("/api/checkout-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(fundAmount),
          donorName: session.user.name,
          donorEmail: session.user.email,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Failed to create payment session");
        setPaymentLoading(false);
      }
    } catch (err) {
      toast.error("Network error");
      setPaymentLoading(false);
    }
  };

  // Loading / error states
  if (sessionLoading || fetchLoading || !session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-3">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        <p className="text-sm font-medium text-slate-500">
          Loading platform details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs max-w-sm text-center">
          <p className="text-red-500 font-medium mb-1">Something went wrong</p>
          <p className="text-sm text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-full bg-slate-50 px-4 md:px-8 py-12 pt-28 md:pt-36 relative text-slate-800">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Main Banner hero card */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-100 p-6 md:p-10 shadow-xs">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-100/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-rose-100/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-xs font-semibold border border-slate-100">
                <Sparkles size={12} className="text-amber-500 fill-current" />
                Community Support
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-3">
                Support Our <span className="text-red-500">Mission</span>
              </h1>
              <p className="text-slate-600 mt-2 text-sm md:text-base max-w-md leading-relaxed">
                Your donations help us cover server costs, send urgent blood
                alert SMS messages, and keep our platform free for everyone.
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3.5 rounded-2xl transition shadow-xs shrink-0"
            >
              <HandCoins size={16} />
              Make a Donation
            </button>
          </div>
        </div>

        {/* Donation Log Section */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
              <HandCoins size={16} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Recent Contributions
            </h2>
          </div>

          {/* Desktop Responsive Table Layout */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-xs tracking-wider">
                  <th className="px-4 py-3">Supporter Name</th>
                  <th className="px-4 py-3">Gift Amount</th>
                  <th className="px-4 py-3">Received On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                {paginated.map((fund) => (
                  <tr
                    key={fund._id}
                    className="hover:bg-slate-50/50 transition"
                  >
                    <td className="px-4 py-4 text-slate-900 font-bold">
                      {fund.donorName}
                    </td>
                    <td className="px-4 py-4 text-emerald-600 font-semibold">
                      ${fund.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-slate-500">
                      {new Date(fund.date).toLocaleDateString("en-BD", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
                {paginated.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-12 text-center text-slate-400 font-normal"
                    >
                      No contributions listed yet. Be the first to help out!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Clean Mobile Custom Cards Layout */}
          <div className="md:hidden space-y-3">
            {paginated.map((fund) => (
              <div
                key={fund._id}
                className="bg-slate-50/60 border border-slate-100 rounded-2xl p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-bold text-slate-900 text-sm">
                    {fund.donorName}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {new Date(fund.date).toLocaleDateString("en-BD", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <p className="text-emerald-600 font-bold text-base">
                  ${fund.amount.toLocaleString()}
                </p>
              </div>
            ))}
            {paginated.length === 0 && (
              <p className="text-center text-slate-400 text-sm py-8">
                No contributions listed yet. Be the first to help out!
              </p>
            )}
          </div>

          {/* Simple Pagination Control Rows */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-1.5 mt-6 border-t border-slate-50 pt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl disabled:opacity-40 disabled:hover:bg-slate-50 hover:bg-slate-100 transition"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition ${
                      currentPage === page
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl disabled:opacity-40 disabled:hover:bg-slate-50 hover:bg-slate-100 transition"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Secure Donation Modal Pop-up */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
            <div className="bg-white w-full max-w-md rounded-3xl border border-slate-100 shadow-xl relative overflow-hidden p-6 md:p-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Send Your Support
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700 transition"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-5">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Every dollar goes directly into upgrading platform security,
                  server stability, and improving donor matching alerts.
                </p>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Amount ($ USD)
                  </label>
                  <div className="relative">
                    <DollarSign
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={fundAmount}
                      onChange={(e) => setFundAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition"
                    />
                  </div>
                </div>

                <button
                  onClick={handleGiveFund}
                  disabled={paymentLoading}
                  className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl transition shadow-xs disabled:opacity-70"
                >
                  {paymentLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      <HandCoins size={16} />
                      <span>Confirm Donation</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-400 text-center">
                  Secure checkout handled safely via Stripe
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
