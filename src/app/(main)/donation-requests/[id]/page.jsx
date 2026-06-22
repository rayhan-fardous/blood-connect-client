// app/donation-requests/[id]/page.jsx
'use client';

import { useState, useEffect, use } from 'react';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  Calendar,
  Clock,
  Droplet,
  Loader2,
  ArrowLeft,
  User,
  Mail,
  Phone,
  MessageSquare,
  AlertCircle,
  Building,
  Heart,
  X,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function RequestDetailsPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [confirming, setConfirming] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!sessionLoading && !session) {
      router.push('/login');
    }
  }, [session, sessionLoading, router]);

  // Fetch request details
  useEffect(() => {
    if (!session) return;
    fetch(`http://localhost:5000/api/donation-requests/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Request not found');
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
  }, [id, session]);

  // Confirm donation handler
  const handleConfirmDonation = async () => {
    if (!session?.user) return;
    setConfirming(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/donation-requests/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: 'inprogress',
            donorName: session.user.name,
            donorEmail: session.user.email,
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success(
          'Thank you! You have joined this request. Status is now In Progress.'
        );
        setShowModal(false);
        // Optionally refresh the request details or redirect
        // Refetch to see updated status
        setRequest((prev) => ({ ...prev, status: 'inprogress' }));
      } else {
        toast.error(data.message || 'Failed to confirm donation');
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setConfirming(false);
    }
  };

  // Loading & Error States
  if (sessionLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0b0f1c]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-red-200 border-t-red-600 rounded-full animate-spin" />
            <Droplet
              size={24}
              className="absolute inset-0 m-auto text-red-600 animate-pulse"
            />
          </div>
          <p className="text-gray-400">Loading request details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0b0f1c] flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle size={48} className="text-red-400 mx-auto" />
          <p className="text-red-400 text-lg">{error}</p>
          <Link
            href="/donation-requests"
            className="text-red-500 hover:text-red-400 underline"
          >
            Go back
          </Link>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-[#0b0f1c] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Droplet size={48} className="text-gray-600 mx-auto" />
          <p className="text-gray-400 text-lg">Request not found</p>
          <Link
            href="/donation-requests"
            className="text-red-500 hover:text-red-400 underline"
          >
            Browse other requests
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f1c] py-12 px-4 pt-32">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/donation-requests"
          className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 mb-8 font-medium transition-colors group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to requests
        </Link>

        {/* Main card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl shadow-red-900/10 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                {request.recipientName}
              </h1>
              <p className="text-gray-400 mt-1">Blood Donation Request</p>
              {request.requesterName && (
                <div className="flex items-center gap-2 mt-3 text-gray-300">
                  <User size={16} className="text-red-400" />
                  <span className="text-sm">
                    Requested by {request.requesterName}
                  </span>
                </div>
              )}
            </div>
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-red-600/20 text-red-300 rounded-full text-lg font-bold border border-red-500/30">
              <Droplet size={20} />
              {request.bloodGroup}
            </span>
          </div>

          {/* Location & Timing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={20} className="text-red-400" />
                <span className="text-base font-medium">
                  {request.district}, {request.upazila}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar size={20} className="text-red-400" />
                <span className="text-base font-medium">
                  {new Date(request.donationDate).toLocaleDateString('en-BD', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Clock size={20} className="text-red-400" />
                <span className="text-base font-medium">
                  {request.donationTime}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Status */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-sm text-gray-400 mb-2">Request Status</p>
                <span
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border ${
                    request.status === 'pending'
                      ? 'bg-amber-600/20 text-amber-300 border-amber-500/30'
                      : request.status === 'inprogress'
                        ? 'bg-blue-600/20 text-blue-300 border-blue-500/30'
                        : request.status === 'done'
                          ? 'bg-green-600/20 text-green-300 border-green-500/30'
                          : 'bg-gray-600/20 text-gray-300 border-gray-500/30'
                  }`}
                >
                  {request.status.charAt(0).toUpperCase() +
                    request.status.slice(1)}
                </span>
              </div>

              {/* Hospital */}
              {request.hospitalName && (
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-sm text-gray-400 mb-1">Hospital</p>
                  <div className="flex items-center gap-2 text-white">
                    <Building size={16} className="text-red-400" />
                    <p className="font-medium">{request.hospitalName}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Extra details: address, message */}
          {(request.fullAddress || request.requestMessage) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {request.fullAddress && (
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-sm text-gray-400 mb-2">Full Address</p>
                  <p className="text-white text-sm">{request.fullAddress}</p>
                </div>
              )}
              {request.requestMessage && (
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare size={16} className="text-red-400" />
                    <p className="text-sm font-medium text-gray-300">
                      Request Message
                    </p>
                  </div>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {request.requestMessage}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Donor Info (if already in progress) */}
          {request.status === 'inprogress' && request.donorName && (
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-sm text-gray-400 mb-2">Assigned Donor</p>
              <div className="flex items-center gap-2 text-white">
                <User size={16} className="text-red-400" />
                <p className="font-medium">
                  {request.donorName} ({request.donorEmail})
                </p>
              </div>
            </div>
          )}

          {/* Donate Button – visible only if pending */}
          {request.status === 'pending' && (
            <button
              onClick={() => setShowModal(true)}
              className="mt-8 w-full flex items-center justify-center gap-2 bg-linear-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-red-600/25"
            >
              <Heart size={20} />I Want to Donate
            </button>
          )}
        </div>
      </div>

      {/* Donate Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#1e1e2e] w-full max-w-md rounded-3xl border border-white/10 shadow-2xl shadow-red-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
            <div className="relative p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-white">
                  Confirm Donation
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Donor Name
                  </label>
                  <input
                    type="text"
                    value={session?.user?.name || ''}
                    disabled
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white opacity-70 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Donor Email
                  </label>
                  <input
                    type="email"
                    value={session?.user?.email || ''}
                    disabled
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white opacity-70 cursor-not-allowed"
                  />
                </div>


                <button
                  onClick={handleConfirmDonation}
                  disabled={confirming}
                  className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-70"
                >
                  {confirming ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      <Heart size={18} />
                      Confirm Donation
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}