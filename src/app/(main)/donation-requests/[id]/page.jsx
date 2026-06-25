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
        if (!res.ok) throw new Error('We could not find this request.');
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
          'Thank you! You have signed up to help. The request is now in progress.'
        );
        setShowModal(false);
        setRequest((prev) => ({ ...prev, status: 'inprogress' }));
      } else {
        toast.error(data.message || 'Could not save your donation.');
      }
    } catch (err) {
      toast.error('Something went wrong. Please check your internet connection.');
    } finally {
      setConfirming(false);
    }
  };

  // Loading & Error States
  if (sessionLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-red-100 border-t-red-500 rounded-full animate-spin" />
            <Droplet size={24} className="text-red-500 animate-pulse" />
          </div>
          <p className="text-sm font-medium text-slate-500">Loading details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-sm bg-white p-8 rounded-2xl border border-slate-100 shadow-xs">
          <AlertCircle size={40} className="text-red-500 mx-auto" />
          <p className="text-slate-800 font-semibold">{error}</p>
          <Link
            href="/donation-requests"
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm px-4 py-2 rounded-xl transition"
          >
            Go back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4 pt-28 md:pt-36 relative">
      {/* Soft Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/3 w-96 h-96 bg-red-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Friendly Back Button */}
        <Link
          href="/donation-requests"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 font-medium text-sm transition group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to all requests
        </Link>

        {/* Main Details Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-xs space-y-8">
          
          {/* Card Header: Recipient Name & Blood Badge */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-100">
            <div>
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                {request.recipientName}
              </h1>
              <p className="text-sm font-medium text-slate-500 mt-1">Needs a Blood Donor</p>
              
              {request.requesterName && (
                <div className="flex items-center gap-2 mt-3 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 w-fit text-xs font-medium">
                  <User size={14} className="text-slate-400" />
                  <span>Posted by {request.requesterName}</span>
                </div>
              )}
            </div>
            
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 rounded-2xl text-xl font-black border border-red-100">
              <Droplet size={18} className="fill-current" />
              {request.bloodGroup}
            </span>
          </div>

          {/* Logistics Layout: Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <MapPin size={16} />
                </div>
                <span>{request.district}, {request.upazila}</span>
              </div>
              
              <div className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <Calendar size={16} />
                </div>
                <span>
                  {new Date(request.donationDate).toLocaleDateString('en-BD', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              
              <div className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <Clock size={16} />
                </div>
                <span>Needed around {request.donationTime}</span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Request Progress Status Tracker */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100/80">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Current Status</p>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border ${
                    request.status === 'pending'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : request.status === 'inprogress'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : request.status === 'done'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {request.status === 'pending' && 'Waiting for Donor'}
                  {request.status === 'inprogress' && 'Donor Found / On the Way'}
                  {request.status === 'done' && 'Completed'}
                  {!['pending', 'inprogress', 'done'].includes(request.status) && request.status}
                </span>
              </div>

              {/* Hospital Block */}
              {request.hospitalName && (
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100/80">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Hospital Location</p>
                  <div className="flex items-center gap-2 text-slate-800 text-sm font-semibold">
                    <Building size={14} className="text-slate-400" />
                    <p>{request.hospitalName}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Simple Custom Details Blocks */}
          {(request.fullAddress || request.requestMessage) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {request.fullAddress && (
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Exact Address</p>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed">{request.fullAddress}</p>
                </div>
              )}
              {request.requestMessage && (
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <div className="flex items-center gap-1.5 mb-2">
                    <MessageSquare size={14} className="text-slate-400" />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Note from Family</p>
                  </div>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed italic">
                    "{request.requestMessage}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Assigned Donor Summary Panel */}
          {request.status === 'inprogress' && request.donorName && (
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Heart size={16} className="fill-current" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Donor Assigned</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  {request.donorName} is covering this request.
                </p>
              </div>
            </div>
          )}

          {/* Interactive Core Action Button */}
          {request.status === 'pending' && (
            <button
              onClick={() => setShowModal(true)}
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-2xl transition shadow-xs"
            >
              <Heart size={18} className="fill-current" />
              <span>I Want to Donate</span>
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl border border-slate-100 shadow-xl relative overflow-hidden p-6 md:p-8">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Confirm Your Donation
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-800 transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Explanatory Prompt */}
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              By confirming, you agree to contact the family and show up at the hospital. Your profile details below will be shared with them.
            </p>

            {/* Disabled Input Fields */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={session?.user?.name || ''}
                  disabled
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium text-sm cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  value={session?.user?.email || ''}
                  disabled
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium text-sm cursor-not-allowed"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={confirming}
                className="w-full order-2 sm:order-1 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-3 rounded-xl transition text-sm disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDonation}
                disabled={confirming}
                className="w-full order-1 sm:order-2 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition text-sm shadow-xs disabled:opacity-70"
              >
                {confirming ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <Heart size={16} className="fill-current" />
                    <span>Confirm</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}