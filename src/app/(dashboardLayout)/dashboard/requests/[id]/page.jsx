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
  ExternalLink,
  ClipboardText,
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
      <div className="flex flex-col gap-3 justify-center items-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-rose-600 animate-spin" />
        <p className="text-sm font-medium text-gray-400 animate-pulse">Loading core details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] px-4">
        <div className="text-center max-w-sm bg-white p-6 rounded-2xl border border-gray-100 shadow-xl">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">An Error Occurred</h3>
          <p className="text-gray-500 text-sm mt-1">{error}</p>
          <Link
            href="/dashboard/requests"
            className="mt-5 inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition shadow-sm"
          >
            Back to My Requests
          </Link>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="text-center py-16 text-gray-400 font-medium text-sm">Request context metadata not found</div>
    );
  }

  // Define structured badge styles maps dynamically
  const statusConfig = {
    pending: "bg-amber-50 text-amber-700 border-amber-200/60 ring-amber-500/10",
    inprogress: "bg-sky-50 text-sky-700 border-sky-200/60 ring-sky-500/10",
    done: "bg-emerald-50 text-emerald-700 border-emerald-200/60 ring-emerald-500/10",
    canceled: "bg-rose-50 text-rose-700 border-rose-200/60 ring-rose-500/10",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top action header navigation bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/requests"
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-600 hover:text-rose-600 bg-white border border-gray-200/80 rounded-xl hover:border-gray-300 transition shadow-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Requests</span>
        </Link>
        
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ring-1 ring-inset ${statusConfig[request.status] || "bg-gray-50 border-gray-200 text-gray-600"}`}>
          <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-85" />
          {request.status === "inprogress" ? "In Progress" : request.status.charAt(0).toUpperCase() + request.status.slice(1)}
        </span>
      </div>

      {/* Primary Structural Layout Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column Section: Focus Card Details */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-100 rounded-lg text-[11px] font-bold uppercase tracking-wider mb-2">
                <Sparkles size={12} />
                Critical Requirement
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                {request.recipientName}
              </h1>
              {request.requesterName && (
                <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-gray-500">
                  <User size={14} className="text-gray-400" />
                  <span>Listed by <span className="text-gray-700 font-semibold">{request.requesterName}</span></span>
                </div>
              )}
            </div>

            {/* Blood type visual block representation */}
            <div className="flex flex-row sm:flex-col items-center justify-center p-3 bg-rose-50/50 border border-rose-100 rounded-xl min-w-[76px] text-center shrink-0">
              <Droplet size={20} className="text-rose-600 mb-0.5" />
              <span className="text-xl font-black text-rose-700 tracking-tighter">{request.bloodGroup}</span>
            </div>
          </div>

          {/* Core Schedule Matrix Metadata */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Logistic Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3.5 bg-gray-50/50 rounded-xl border border-gray-100">
                <div className="p-2 bg-white border border-gray-200/60 text-rose-600 rounded-lg shadow-sm"><Calendar size={16} /></div>
                <div>
                  <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Date Target</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {new Date(request.donationDate).toLocaleDateString("en-BD", { dateStyle: "long" })}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-gray-50/50 rounded-xl border border-gray-100">
                <div className="p-2 bg-white border border-gray-200/60 text-rose-600 rounded-lg shadow-sm"><Clock size={16} /></div>
                <div>
                  <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Schedule Time</span>
                  <span className="text-sm font-semibold text-gray-800">{request.donationTime}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-gray-50/50 rounded-xl border border-gray-100 sm:col-span-2">
                <div className="p-2 bg-white border border-gray-200/60 text-rose-600 rounded-lg shadow-sm"><MapPin size={16} /></div>
                <div>
                  <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Regional Area</span>
                  <span className="text-sm font-semibold text-gray-800">{request.district}, {request.upazila}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Extended descriptive context content */}
          {request.requestMessage && (
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <MessageSquare size={14} />
                <span>Patient Condition Summary</span>
              </div>
              <p className="text-sm text-gray-600 bg-slate-50 border border-slate-100 p-4 rounded-xl leading-relaxed">
                {request.requestMessage}
              </p>
            </div>
          )}
        </div>

        {/* Right Column Sidebars: Structural Secondary Data Widgets */}
        <div className="space-y-6">
          {/* Institution Medical Location Panel */}
          {request.hospitalName && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-rose-50 text-rose-600 rounded-lg"><Building2 size={16} /></div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Medical Facility</h4>
              </div>
              <p className="text-sm font-bold text-gray-900 leading-tight">{request.hospitalName}</p>
              {request.fullAddress && (
                <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-50 leading-relaxed">
                  {request.fullAddress}
                </p>
              )}
            </div>
          )}

          {/* Assigned Donor workflow micro-card block */}
          {request.status === "inprogress" && request.donorName ? (
            <div className="bg-slate-900 border border-slate-950 text-white rounded-2xl p-5 shadow-lg shadow-slate-900/10 relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-28 h-28 bg-white/5 rounded-full blur-xl" />
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-white/10 text-rose-400 rounded-lg"><Heart size={16} className="fill-current" /></div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Donor</h4>
              </div>
              <div className="space-y-1">
                <p className="text-base font-bold text-white tracking-tight">{request.donorName}</p>
                {request.donorEmail && (
                  <p className="text-xs text-slate-400 break-all">{request.donorEmail}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-amber-50/50 border border-amber-200/70 rounded-2xl p-5 text-center">
              <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Awaiting Assignment</p>
              <p className="text-xs text-amber-600/90 leading-normal max-w-[200px] mx-auto">
                No local dynamic fulfillment match has locked assignment parameters yet.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}