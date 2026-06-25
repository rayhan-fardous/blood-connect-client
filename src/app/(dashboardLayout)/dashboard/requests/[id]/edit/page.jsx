// app/dashboard/requests/[id]/edit/page.jsx
"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  User,
  MapPin,
  Calendar,
  Clock,
  Droplet,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Building2,
  MessageSquare,
  Loader2,
  AlertCircle,
} from "lucide-react";

import districtsRaw from "../../../../../../../data/districts.json";
import upazilasRaw from "../../../../../../../data/upazilas.json";

const districtsInfo = districtsRaw[2].data;
const upazilasInfo = upazilasRaw[2].data;
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function EditRequestPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/donation-requests/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not retrieve request configurations");
        return res.json();
      })
      .then((data) => {
        setFormData({
          recipientName: data.recipientName || "",
          recipientDistrict: data.district || "",
          recipientUpazila: data.upazila || "",
          hospitalName: data.hospitalName || "",
          fullAddress: data.fullAddress || "",
          bloodGroup: data.bloodGroup || "",
          donationDate: data.donationDate || "",
          donationTime: data.donationTime || "",
          requestMessage: data.requestMessage || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load request metadata details.");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (formData.recipientDistrict) {
      const selected = districtsInfo.find(
        (d) => d.name === formData.recipientDistrict,
      );
      if (selected) {
        const upazilas = upazilasInfo.filter(
          (u) => u.district_id === selected.id,
        );
        setFilteredUpazilas(upazilas);
        if (!upazilas.find((u) => u.name === formData.recipientUpazila)) {
          setFormData((prev) => ({ ...prev, recipientUpazila: "" }));
        }
      }
    } else {
      setFilteredUpazilas([]);
      setFormData((prev) => ({ ...prev, recipientUpazila: "" }));
    }
  }, [formData.recipientDistrict]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const {
      recipientName,
      recipientDistrict,
      recipientUpazila,
      hospitalName,
      fullAddress,
      bloodGroup,
      donationDate,
      donationTime,
      requestMessage,
    } = formData;

    if (
      !recipientName ||
      !recipientDistrict ||
      !recipientUpazila ||
      !hospitalName ||
      !fullAddress ||
      !bloodGroup ||
      !donationDate ||
      !donationTime ||
      !requestMessage
    ) {
      setError("Please ensure all parameters are securely configured.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        recipientName,
        district: recipientDistrict,
        upazila: recipientUpazila,
        hospitalName,
        fullAddress,
        bloodGroup,
        donationDate,
        donationTime,
        requestMessage,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/donation-requests/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Update sequence validation failed");

      toast.success("Request synchronized successfully!");
      router.push("/dashboard/requests");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-rose-600 animate-spin" />
        <p className="text-sm font-medium text-gray-500 animate-pulse">Initializing configuration variables...</p>
      </div>
    );
  }

  if (error && !formData.recipientName) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] px-4">
        <div className="text-center max-w-sm bg-white p-6 rounded-2xl border border-gray-100 shadow-xl">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Synchronization Error</h3>
          <p className="text-gray-500 text-sm mt-1">{error}</p>
          <Link
            href="/dashboard/requests"
            className="mt-5 inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition shadow-sm"
          >
            Return to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Top action header navigation bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/requests"
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-600 hover:text-rose-600 bg-white border border-gray-200/80 rounded-xl hover:border-gray-300 transition shadow-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Requests</span>
        </Link>
      </div>

      {/* Main Structural Settings Input Panel */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-slate-50/50">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Modify Request Profile
          </h1>
          <p className="text-gray-500 mt-0.5 text-xs">
            Amend operational timelines, locations, or medical recipient profile options.
          </p>
        </div>

        <form onSubmit={handleUpdate} className="p-6 md:p-8 space-y-6">
          
          {/* Recipient Input Row */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Patient / Recipient Full Name
            </label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="recipientName"
                required
                value={formData.recipientName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* District & Upazila Split Block Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Region District
              </label>
              <div className="relative">
                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="recipientDistrict"
                  required
                  value={formData.recipientDistrict}
                  onChange={handleChange}
                  className="w-full appearance-none pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm cursor-pointer"
                >
                  <option value="" disabled>Select global district</option>
                  {districtsInfo.map((d) => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Local Upazila Area
              </label>
              <div className="relative">
                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="recipientUpazila"
                  required
                  value={formData.recipientUpazila}
                  onChange={handleChange}
                  disabled={!formData.recipientDistrict}
                  className="w-full appearance-none pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm disabled:opacity-40 disabled:bg-gray-50 cursor-pointer disabled:cursor-not-allowed"
                >
                  <option value="" disabled>Select regional sub-area</option>
                  {filteredUpazilas.map((u) => (
                    <option key={u.id} value={u.name}>{u.name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Hospital & Address Structural Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Medical Facility Name
              </label>
              <div className="relative">
                <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="hospitalName"
                  required
                  value={formData.hospitalName}
                  onChange={handleChange}
                  placeholder="General Hospital Center"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Fulfillment Street Address
              </label>
              <div className="relative">
                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="fullAddress"
                  required
                  value={formData.fullAddress}
                  onChange={handleChange}
                  placeholder="Room 402, Building A"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Blood Group Type Specifier & Target Datelines */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Blood Factor Code
              </label>
              <div className="relative">
                <Droplet size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="bloodGroup"
                  required
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full appearance-none pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm font-semibold cursor-pointer"
                >
                  <option value="" disabled>Select blood group</option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Donation Target Date
              </label>
              <div className="relative">
                <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="donationDate"
                  required
                  value={formData.donationDate}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Donation Target Time
              </label>
              <div className="relative">
                <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="time"
                  name="donationTime"
                  required
                  value={formData.donationTime}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Condition Log / Descriptive Context Summary */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Patient Status / Diagnostic Notes
            </label>
            <div className="relative">
              <MessageSquare size={18} className="absolute left-4 top-4 text-gray-400" />
              <textarea
                name="requestMessage"
                required
                rows={4}
                value={formData.requestMessage}
                onChange={handleChange}
                placeholder="Please describe medical urgency parameters..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm resize-none leading-relaxed"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-xs text-center font-medium">
              {error}
            </div>
          )}

          {/* Form Action Submit Button Trigger */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl shadow-md shadow-rose-600/10 hover:shadow-lg transition-all disabled:opacity-60 cursor-pointer group text-sm"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Saving Updates...</span>
                </>
              ) : (
                <>
                  <span>Update Request Profile</span>
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}