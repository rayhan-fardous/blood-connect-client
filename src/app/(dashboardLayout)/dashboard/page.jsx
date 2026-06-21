"use client";

import { useSession } from "@/lib/auth-client";
import {
  Droplet,
  Calendar,
  Award,
  Activity,
  Heart,
  MapPin,
  Phone,
  ArrowRight,
  TrendingUp,
  Clock,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function DashboardHome() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Safe fallback values
  const bloodGroup = user?.metadata?.bloodGroup || user?.bloodGroup || "A+";
  const phone = user?.metadata?.phone || user?.phone || "Not provided";
  const location = user?.metadata?.district
    ? `${user?.metadata?.upazila}, ${user?.metadata?.district}`
    : "Dhaka, Bangladesh";

  // Sample data for active/nearby blood donation requests
  const activeRequests = [
    {
      id: 1,
      patientName: "Farhana Yasmin",
      bloodGroup: "B+",
      bagsRequired: 2,
      hospital: "Sylhet MAG Osmani Medical College Hospital",
      location: "Sylhet",
      urgency: "Critical",
      date: "Today",
      contact: "+880 1611-223344",
    },
    {
      id: 2,
      patientName: "Tariqul Islam",
      bloodGroup: "O+",
      bagsRequired: 3,
      hospital: "Khulna Medical College Hospital",
      location: "Khulna",
      urgency: "High",
      date: "Tomorrow",
      contact: "+880 1912-987654",
    },
    {
      id: 3,
      patientName: "Nusrat Jahan",
      bloodGroup: "A-",
      bagsRequired: 1,
      hospital: "Barisal Sher-e-Bangla Medical College Hospital",
      location: "Barisal",
      urgency: "Normal",
      date: "In 3 days",
      contact: "+880 1314-556677",
    },
  ];

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
          <Droplet
            size={24}
            className="absolute inset-0 m-auto text-red-600 animate-pulse"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-1">
      {/* Welcome & Overview Header */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-red-600 via-rose-600 to-red-700 p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 bg-black/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider">
              Donor Dashboard
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight">
              Welcome Back, {user?.name || "Hero"}!
            </h1>
            <p className="text-red-100/90 mt-2 text-sm md:text-base font-light max-w-xl leading-relaxed">
              Your contribution saves lives. Check your eligibility, keep track
              of donation requests, and manage your schedule below.
            </p>
          </div>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:bg-red-50 transition transform hover:-translate-y-0.5 text-sm"
          >
            Update Profile
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Blood Group */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300 flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Your Blood Group
            </p>
            <p className="text-3xl font-extrabold text-gray-900">
              {bloodGroup}
            </p>
          </div>
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition duration-300">
            <Droplet size={24} className="fill-current" />
          </div>
        </div>

        {/* Total Donations */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300 flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Donations
            </p>
            <p className="text-3xl font-extrabold text-gray-900">3 Bags</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition duration-300">
            <Award size={24} />
          </div>
        </div>

        {/* Next Donation Eligibility */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300 flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Eligibility Status
            </p>
            <p className="text-xl font-extrabold text-emerald-600 flex items-center gap-1.5 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Eligible Now
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition duration-300">
            <Calendar size={24} />
          </div>
        </div>

        {/* Lives Saved */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300 flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Estimated Impact
            </p>
            <p className="text-3xl font-extrabold text-gray-900">
              9 Lives Saved
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500 group-hover:scale-110 transition duration-300">
            <Heart size={24} className="fill-current" />
          </div>
        </div>
      </div>

      {/* Main Content Sections: Active Requests & Quick Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Active Blood Requests (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Activity className="text-red-500" size={20} />
              Active Donation Requests Near You
            </h2>
            <Link
              href="/donation-requests"
              className="text-sm font-semibold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1"
            >
              View All
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {activeRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-100 transition duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">
                      {request.bloodGroup}
                    </span>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm md:text-base">
                        {request.patientName}
                      </h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin size={12} />
                        {request.hospital}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 pl-11">
                    <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-full">
                      <Clock size={12} />
                      Need: {request.date}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full font-semibold ${
                        request.urgency === "Critical"
                          ? "bg-rose-50 text-rose-600"
                          : request.urgency === "High"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {request.urgency} Urgency
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:self-center">
                  <a
                    href={`tel:${request.contact}`}
                    className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 hover:border-red-200 text-gray-700 hover:text-red-600 font-semibold rounded-xl text-sm transition"
                  >
                    <Phone size={14} />
                    Call
                  </a>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm shadow-md hover:shadow-lg transition">
                    Respond
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - User Info & Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Your Summary</h2>

          {/* Summary Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={user?.image || "/default-avatar.png"}
                alt="Avatar"
                className="w-14 h-14 rounded-full object-cover border-2 border-red-500/20 shadow-sm"
              />
              <div>
                <h3 className="font-bold text-gray-900">
                  {user?.name || "Blood Donor"}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
              </div>
            </div>

            <div className="border-t pt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Phone Number</span>
                <span className="text-gray-800 font-semibold">{phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Location</span>
                <span
                  className="text-gray-800 font-semibold text-right max-w-37.5 truncate"
                  title={location}
                >
                  {location}
                </span>
              </div>
            </div>

            <div className="bg-red-50/50 p-4 rounded-xl space-y-2 border border-red-100/30">
              <p className="text-xs text-red-800 font-semibold flex items-center gap-1">
                <TrendingUp size={14} />
                Next Eligible Donation:
              </p>
              <p className="text-sm text-gray-700 font-medium pl-5">
                Immediate (No active donation cycle is pending).
              </p>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-[#0f172a] text-white p-6 rounded-2xl shadow-xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-red-600/20 rounded-full blur-xl pointer-events-none" />
            <h3 className="font-bold text-lg">Need Blood for Someone?</h3>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Create a new blood request post. Our platform matches and alerts
              donors in your area instantly.
            </p>
            <button className="w-full mt-2 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-red-600/30">
              <Plus size={16} />
              Create Request Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
