// app/dashboard/requests/[id]/edit/page.jsx
"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  User,
  MapPin,
  Calendar,
  Clock,
  Droplet,
  ChevronDown,
  ArrowRight,
  Building2,
  MessageSquare,
  Loader2,
} from "lucide-react";

import districtsRaw from "../../../../../../../data/districts.json";
import upazilasRaw from "../../../../../../../data/upazilas.json";

const districtsInfo = districtsRaw[2].data;
const upazilasInfo = upazilasRaw[2].data;
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function EditRequestPage({ params }) {
  const { id } = use(params); // request ID
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
    fetch(`http://localhost:5000/api/donation-requests/${id}`)
      .then((res) => res.json())
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
        setError("Failed to load request");
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
      setError("Please fill all required fields.");
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
        `http://localhost:5000/api/donation-requests/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Update failed");

      toast.success("Request updated successfully!");
      router.push("/dashboard/requests"); // back to My Requests
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
      </div>
    );
  }

  if (error && !formData.recipientName) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">
        Edit Donation Request
      </h1>

      <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-gray-100 shadow-lg p-8">
        <form onSubmit={handleUpdate} className="space-y-8">
          {/* Recipient Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Recipient Name
            </label>
            <div className="relative">
              <User
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="recipientName"
                required
                value={formData.recipientName}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* District & Upazila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                District
              </label>
              <div className="relative">
                <MapPin
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <select
                  name="recipientDistrict"
                  required
                  value={formData.recipientDistrict}
                  onChange={handleChange}
                  className="w-full appearance-none pl-12 pr-10 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="" disabled>
                    Select district
                  </option>
                  {districtsInfo.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={20}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upazila
              </label>
              <div className="relative">
                <MapPin
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <select
                  name="recipientUpazila"
                  required
                  value={formData.recipientUpazila}
                  onChange={handleChange}
                  disabled={!formData.recipientDistrict}
                  className="w-full appearance-none pl-12 pr-10 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                >
                  <option value="" disabled>
                    Select upazila
                  </option>
                  {filteredUpazilas.map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={20}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Hospital & Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hospital Name
              </label>
              <div className="relative">
                <Building2
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="hospitalName"
                  required
                  value={formData.hospitalName}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Address
              </label>
              <div className="relative">
                <MapPin
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="fullAddress"
                  required
                  value={formData.fullAddress}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Blood Group & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Blood Group
              </label>
              <div className="relative">
                <Droplet
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <select
                  name="bloodGroup"
                  required
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full appearance-none pl-12 pr-10 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="" disabled>
                    Select blood group
                  </option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={20}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Donation Date
              </label>
              <div className="relative">
                <Calendar
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="date"
                  name="donationDate"
                  required
                  value={formData.donationDate}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Time & Message */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Donation Time
              </label>
              <div className="relative">
                <Clock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="time"
                  name="donationTime"
                  required
                  value={formData.donationTime}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Request Message
              </label>
              <div className="relative">
                <MessageSquare
                  size={20}
                  className="absolute left-4 top-4 text-gray-400"
                />
                <textarea
                  name="requestMessage"
                  required
                  rows={4}
                  value={formData.requestMessage}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold py-4 rounded-xl shadow-lg shadow-red-600/25 transition-all disabled:opacity-70"
          >
            {submitting ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                Update Donation Request
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
