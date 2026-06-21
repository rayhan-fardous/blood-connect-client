// app/dashboard/create-donation-request/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession } from '@/lib/auth-client';
import {
  User,
  MapPin,
  Calendar,
  Clock,
  Droplet,
  ChevronDown,
  FileText,
  ArrowRight,
  Heart,
  Sparkles,
  Building2,
  MessageSquare,
  MailIcon,
} from 'lucide-react';

// JSON data – adjust paths if needed
import districtsRaw from '../../../../../data/districts.json';
import upazilasRaw from '../../../../../data/upazilas.json';

const districtsInfo = districtsRaw[2].data;
const upazilasInfo = upazilasRaw[2].data;
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Fixed floating blood cells (no randomness → no hydration mismatch)
const floatingCells = [
  {
    width: 180,
    height: 180,
    top: '10%',
    left: '5%',
    duration: '18s',
    delay: '0s',
  },
  {
    width: 140,
    height: 140,
    top: '70%',
    left: '80%',
    duration: '22s',
    delay: '1s',
  },
  {
    width: 220,
    height: 220,
    top: '40%',
    left: '60%',
    duration: '20s',
    delay: '2.5s',
  },
  {
    width: 160,
    height: 160,
    top: '80%',
    left: '20%',
    duration: '24s',
    delay: '0.5s',
  },
];

export default function CreateDonationRequestPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  // Read‑only fields from logged‑in user
  const requesterName = user?.name || '';
  const requesterEmail = user?.email || '';

  const [formData, setFormData] = useState({
    recipientName: '',
    recipientDistrict: '',
    recipientUpazila: '',
    hospitalName: '',
    fullAddress: '',
    bloodGroup: '',
    donationDate: '',
    donationTime: '',
    requestMessage: '',
  });
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Filter upazilas based on selected district
  useEffect(() => {
    if (formData.recipientDistrict) {
      const selected = districtsInfo.find(
        (d) => d.name === formData.recipientDistrict
      );
      if (selected) {
        const upazilas = upazilasInfo.filter(
          (u) => u.district_id === selected.id
        );
        setFilteredUpazilas(upazilas);
        if (!upazilas.find((u) => u.name === formData.recipientUpazila)) {
          setFormData((prev) => ({ ...prev, recipientUpazila: '' }));
        }
      }
    } else {
      setFilteredUpazilas([]);
      setFormData((prev) => ({ ...prev, recipientUpazila: '' }));
    }
  }, [formData.recipientDistrict]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
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
      setError('Please fill all required fields.');
      return;
    }

    // Build final request object (including read‑only fields)
    const donationRequest = {
      requesterName,
      requesterEmail,
      ...formData,
      status: 'pending', // default status
    };

    setLoading(true);
    // Simulate API call (replace later)
    setTimeout(() => {
      console.log('Donation request created:', donationRequest);
      toast.success('Donation request created successfully!');
      setLoading(false);
      router.push('/dashboard/requests'); // go to My Requests
    }, 1500);
  };

  return (
    <div className="relative min-h-screen">
      {/* Premium Background: floating blood cells */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingCells.map((cell, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-red-500/10 blur-3xl animate-float-${i + 1}`}
            style={{
              width: `${cell.width}px`,
              height: `${cell.height}px`,
              top: cell.top,
              left: cell.left,
              animationDuration: cell.duration,
              animationDelay: cell.delay,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-red-600 bg-red-50 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-red-200 shadow-sm">
            <Sparkles size={16} className="animate-pulse" />
            New Donation Request
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Create Donation Request
          </h1>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            Provide the recipient details and where the donor should go.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl shadow-gray-200/60 overflow-hidden">
          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Requester Info (Read‑only) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                    Requester Name
                  </label>
                  <div className="relative">
                    <User
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      value={requesterName}
                      disabled
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-600 cursor-not-allowed"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                    Requester Email
                  </label>
                  <div className="relative">
                    <MailIcon
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="email"
                      value={requesterEmail}
                      disabled
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-600 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Recipient Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                  Recipient Name
                </label>
                <div className="relative group">
                  <User
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition"
                  />
                  <input
                    type="text"
                    name="recipientName"
                    required
                    value={formData.recipientName}
                    onChange={handleChange}
                    placeholder="Enter recipient's full name"
                    className="w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Recipient District & Upazila */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                    Recipient District
                  </label>
                  <div className="relative group">
                    <MapPin
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition"
                    />
                    <select
                      name="recipientDistrict"
                      required
                      value={formData.recipientDistrict}
                      onChange={handleChange}
                      className="w-full appearance-none pl-12 pr-10 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer"
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                    Recipient Upazila
                  </label>
                  <div className="relative group">
                    <MapPin
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition"
                    />
                    <select
                      name="recipientUpazila"
                      required
                      value={formData.recipientUpazila}
                      onChange={handleChange}
                      disabled={!formData.recipientDistrict}
                      className="w-full appearance-none pl-12 pr-10 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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

              {/* Hospital Name & Full Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                    Hospital Name
                  </label>
                  <div className="relative group">
                    <Building2
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition"
                    />
                    <input
                      type="text"
                      name="hospitalName"
                      required
                      value={formData.hospitalName}
                      onChange={handleChange}
                      placeholder="e.g., Dhaka Medical College Hospital"
                      className="w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                    Full Address Line
                  </label>
                  <div className="relative group">
                    <MapPin
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition"
                    />
                    <input
                      type="text"
                      name="fullAddress"
                      required
                      value={formData.fullAddress}
                      onChange={handleChange}
                      placeholder="e.g., Zahir Raihan Rd, Dhaka"
                      className="w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
              </div>

              {/* Blood Group & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                    Blood Group
                  </label>
                  <div className="relative group">
                    <Droplet
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition"
                    />
                    <select
                      name="bloodGroup"
                      required
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="w-full appearance-none pl-12 pr-10 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer"
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                    Donation Date
                  </label>
                  <div className="relative group">
                    <Calendar
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition"
                    />
                    <input
                      type="date"
                      name="donationDate"
                      required
                      value={formData.donationDate}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
              </div>

              {/* Donation Time & Request Message */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                    Donation Time
                  </label>
                  <div className="relative group">
                    <Clock
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition"
                    />
                    <input
                      type="time"
                      name="donationTime"
                      required
                      value={formData.donationTime}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                    Request Message
                  </label>
                  <div className="relative group">
                    <MessageSquare
                      size={20}
                      className="absolute left-4 top-4 text-gray-400 group-focus-within:text-red-500 transition"
                    />
                    <textarea
                      name="requestMessage"
                      required
                      rows={4}
                      value={formData.requestMessage}
                      onChange={handleChange}
                      placeholder="Why is blood needed? (details)"
                      className="w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"
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
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold py-4 rounded-xl shadow-lg shadow-red-600/25 transition-all disabled:opacity-70 group"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Submit Request
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
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-25px) scale(1.05);
          }
        }
        .animate-float-1 {
          animation: float 18s infinite ease-in-out;
        }
        .animate-float-2 {
          animation: float 22s infinite ease-in-out;
        }
        .animate-float-3 {
          animation: float 20s infinite ease-in-out;
        }
        .animate-float-4 {
          animation: float 24s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}