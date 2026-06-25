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
  ArrowRight,
  Sparkles,
  Building2,
  MessageSquare,
  MailIcon,
} from 'lucide-react';

// JSON data
import districtsRaw from '../../../../../data/districts.json';
import upazilasRaw from '../../../../../data/upazilas.json';

const districtsInfo = districtsRaw[2].data;
const upazilasInfo = upazilasRaw[2].data;
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function CreateDonationRequestPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

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
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

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
      requesterName,
      requesterEmail,
    };

    try {
      const res = await fetch('http://localhost:5000/api/create-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create request');
      }

      toast.success('Donation request posted successfully!');
      router.push('/dashboard/requests');
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-red-700 bg-red-50 rounded-full border border-red-100 mb-3">
            <Sparkles size={12} className="text-red-500" />
            Urgent Request
          </div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Ask for Blood Donation
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Fill out this form to look for a blood donor. Please double-check all details before posting.
          </p>
        </div>

        {/* Main Card Form */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Section 1: Your Info */}
            <div>
              <h2 className="text-sm font-semibold text-slate-900 mb-3">Your Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={requesterName || "Your Account Name"}
                    disabled
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 text-sm cursor-not-allowed"
                  />
                </div>
                <div className="relative">
                  <MailIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={requesterEmail || "Your Account Email"}
                    disabled
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 text-sm cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Section 2: Patient Info */}
            <div>
              <h2 className="text-sm font-semibold text-slate-900 mb-3">Patient Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Patient's Full Name
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      name="recipientName"
                      required
                      value={formData.recipientName}
                      onChange={handleChange}
                      placeholder="Enter patient name"
                      className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Blood Group
                  </label>
                  <div className="relative">
                    <Droplet size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <select
                      name="bloodGroup"
                      required
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="w-full appearance-none pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20 cursor-pointer transition-all"
                    >
                      <option value="" disabled>Select</option>
                      {bloodGroups.map((group) => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Section 3: Location */}
            <div>
              <h2 className="text-sm font-semibold text-slate-900 mb-3">Where is Blood Needed?</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    District
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <select
                      name="recipientDistrict"
                      required
                      value={formData.recipientDistrict}
                      onChange={handleChange}
                      className="w-full appearance-none pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20 cursor-pointer transition-all"
                    >
                      <option value="" disabled>Choose district</option>
                      {districtsInfo.map((d) => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Upazila / Sub-District
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <select
                      name="recipientUpazila"
                      required
                      value={formData.recipientUpazila}
                      onChange={handleChange}
                      disabled={!formData.recipientDistrict}
                      className="w-full appearance-none pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20 cursor-pointer transition-all disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
                    >
                      <option value="" disabled>Choose upazila</option>
                      {filteredUpazilas.map((u) => (
                        <option key={u.id} value={u.name}>{u.name}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Hospital Name
                  </label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      name="hospitalName"
                      required
                      value={formData.hospitalName}
                      onChange={handleChange}
                      placeholder="e.g. Dhaka Medical College Hospital"
                      className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Full Address Details
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      name="fullAddress"
                      required
                      value={formData.fullAddress}
                      onChange={handleChange}
                      placeholder="e.g. Ward 4, Road 12, Sector 3"
                      className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Section 4: Date & Details */}
            <div>
              <h2 className="text-sm font-semibold text-slate-900 mb-3">Date & Extra Details</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Donation Date
                  </label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="date"
                      name="donationDate"
                      required
                      value={formData.donationDate}
                      onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Donation Time
                  </label>
                  <div className="relative">
                    <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="time"
                      name="donationTime"
                      required
                      value={formData.donationTime}
                      onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Why is the blood needed? (Message for donors)
                </label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-3 top-3 text-slate-400 pointer-events-none" />
                  <textarea
                    name="requestMessage"
                    required
                    rows={4}
                    value={formData.requestMessage}
                    onChange={handleChange}
                    placeholder="Write a clear note about why the patient needs blood (e.g., surgery, accident, pregnancy, etc.)..."
                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20 transition-all resize-none min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            {/* Error Area & Submit Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <div className="w-full sm:max-w-xs">
                {error && (
                  <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg p-2.5 text-center sm:text-left">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto min-w-[160px] inline-flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:pointer-events-none group"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Post Request
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}