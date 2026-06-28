"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  Home,
  HandCoins,
  Loader2,
  AlertCircle,
} from "lucide-react";

export const dynamic = 'force-dynamic';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/confirm-funding`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("recorded");
        } else {
          setStatus("error");
        }
      })
      .catch(() => {
        setStatus("error");
      });
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">
            Checking your payment status...
          </p>
        </div>
      </div>
    );
  }

  const isSuccess = status === "recorded";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 md:p-10 max-w-md w-full text-center">
        {/* Dynamic Status Icon */}
        <div className="mb-6 flex justify-center">
          {isSuccess ? (
            <CheckCircle size={64} className="text-emerald-500" />
          ) : (
            <AlertCircle size={64} className="text-amber-500" />
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
          {isSuccess ? "Thank You!" : "Payment Sent"}
        </h1>

        {/* Easy to read message */}
        <p className="text-slate-600 mb-8 leading-relaxed">
          {isSuccess
            ? "We received your donation. Thank you so much for your support!"
            : "Your payment went through, but we had trouble saving the details. Please contact our support team to help fix this."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl transition-colors w-full sm:w-auto"
          >
            <Home size={18} />
            Go Home
          </Link>
          <Link
            href="/funding"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm w-full sm:w-auto"
          >
            <HandCoins size={18} />
            See Funding
          </Link>
        </div>
      </div>
    </div>
  );
}
