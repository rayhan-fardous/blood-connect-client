"use client";

import { useState, useEffect, use } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Clock,
  Droplet,
  ArrowLeft,
  User,
  Building2,
  MessageSquare,
  Loader2,
  AlertCircle,
  Heart,
  Sparkles,
} from "lucide-react";

export default function RequestDetailPage({ params }) {
  const { id } = use(params);
  const { data: session } = useSession();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/donation-requests/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Request not found");
        return res.json();
      })
      .then((data) => {
        setRequest(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center text-red-500">
          <AlertCircle size={32} className="mx-auto mb-2" />
          <p>{error}</p>
          <Link
            href="/dashboard/requests"
            className="text-sm underline mt-2 block"
          >
            Back to My Requests
          </Link>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="text-center py-12 text-gray-500">Request not found</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back link */}
      <Link
        href="/dashboard/requests"
        className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 mb-8 font-medium transition-colors"
      >
        <ArrowLeft size={20} />
        Back to My Requests
      </Link>

      {/* Main card – consistent glass style */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl shadow-gray-200/60 overflow-hidden">
        {/* subtle top gradient line */}
        <div className="h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />

        <div className="p-8 md:p-10 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-full text-xs font-semibold tracking-wider border border-red-200 mb-3">
                <Sparkles size={14} />
                Request Details
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                {request.recipientName}
              </h1>
              <p className="text-gray-500 mt-1">Blood Donation Request</p>
              {request.requesterName && (
                <div className="flex items-center gap-2 mt-3 text-gray-600">
                  <User size={16} className="text-red-500" />
                  <span className="text-sm">
                    Requested by {request.requesterName}
                  </span>
                </div>
              )}
            </div>
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-100 text-red-700 rounded-full text-lg font-bold border border-red-200 shadow-sm">
              <Droplet size={20} />
              {request.bloodGroup}
            </span>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left */}
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mt-0.5">
                  <MapPin size={18} className="text-red-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                    Location
                  </p>
                  <p className="text-gray-800 font-medium">
                    {request.district}, {request.upazila}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mt-0.5">
                  <Calendar size={18} className="text-red-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                    Date
                  </p>
                  <p className="text-gray-800 font-medium">
                    {new Date(request.donationDate).toLocaleDateString(
                      "en-BD",
                      {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mt-0.5">
                  <Clock size={18} className="text-red-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                    Time
                  </p>
                  <p className="text-gray-800 font-medium">
                    {request.donationTime}
                  </p>
                </div>
              </div>
              {request.hospitalName && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mt-0.5">
                    <Building2 size={18} className="text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                      Hospital
                    </p>
                    <p className="text-gray-800 font-medium">
                      {request.hospitalName}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right */}
            <div className="space-y-5">
              {/* Status */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                  Status
                </p>
                <span
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border ${
                    request.status === "pending"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : request.status === "inprogress"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : request.status === "done"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {request.status.charAt(0).toUpperCase() +
                    request.status.slice(1)}
                </span>
              </div>

              {/* Donor info if inprogress */}
              {request.status === "inprogress" && request.donorName && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Heart size={16} className="text-blue-500" />
                    <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      Assigned Donor
                    </p>
                  </div>
                  <p className="text-gray-800 font-medium">
                    {request.donorName}
                  </p>
                  {request.donorEmail && (
                    <p className="text-gray-600 text-sm mt-0.5">
                      {request.donorEmail}
                    </p>
                  )}
                </div>
              )}

              {/* Full address */}
              {request.fullAddress && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
                    Full Address
                  </p>
                  <p className="text-gray-700 text-sm">{request.fullAddress}</p>
                </div>
              )}
            </div>
          </div>

          {/* Request message */}
          {request.requestMessage && (
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare size={18} className="text-red-500" />
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Request Message
                </p>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {request.requestMessage}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
