// app/dashboard/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
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
  Sparkles,
  Users,
  Target,
  Eye,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function DonorDashboard() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [myRequests, setMyRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [requestsError, setRequestsError] = useState(null);

  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });


  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:5000/api/donation-requests?email=${user.email}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch requests');
        return res.json();
      })
      .then((data) => {
        setMyRequests(data);
        setRequestsLoading(false);
      })
      .catch((err) => {
        setRequestsError(err.message);
        setRequestsLoading(false);
      });
  }, [user?.email]);

 
  const bloodGroup = user?.bloodGroup || 'N/A';
  const phone = user?.phone || 'Not provided';
  const location = user?.district
    ? `${user.upazila || ''}, ${user.district}`
    : 'Not set';


 
  const recentRequests = [...myRequests]
    .sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate))
    .slice(0, 3);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/donation-requests/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setMyRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: newStatus } : req
          )
        );
        toast.success(`Request marked as ${newStatus}`);
      } else {
        toast.error(data.message || 'Update failed');
      }
    } catch (err) {
      toast.error('Network error');
    }
  };

  const handleDelete = async () => {
    const { id } = deleteModal;
    if (!id) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/donation-requests/${id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (data.success) {
        setMyRequests((prev) => prev.filter((req) => req._id !== id));
        toast.success('Request deleted');
      } else {
        toast.error(data.message || 'Deletion failed');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setDeleteModal({ open: false, id: null });
    }
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      pending: 'bg-gray-100 text-gray-700 border-gray-200',
      inprogress: 'bg-blue-50 text-blue-700 border-blue-200',
      done: 'bg-green-50 text-green-700 border-green-200',
      canceled: 'bg-red-50 text-red-700 border-red-200',
    };
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}
      >
        {status === 'inprogress'
          ? 'In Progress'
          : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (isPending || requestsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-red-200 border-t-red-600 rounded-full animate-spin" />
            <Droplet
              size={24}
              className="absolute inset-0 m-auto text-red-600 animate-pulse"
            />
          </div>
          <p className="text-gray-500 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (requestsError) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>Error loading requests: {requestsError}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-1">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#2d1b3e] p-8 md:p-10 text-white shadow-xl shadow-indigo-500/10">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-bl from-red-600/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-gradient-to-tr from-rose-600/10 to-transparent rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider border border-white/10">
              <Sparkles size={14} className="text-yellow-300" />
              Donor Dashboard
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mt-4 tracking-tight">
              Welcome back,{' '}
              <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                {user?.name || 'Hero'}
              </span>
            </h1>
            <p className="text-gray-300 mt-3 text-base md:text-lg font-light max-w-xl leading-relaxed">
              Every drop you donate brings hope. Check active requests, your
              impact, and stay ready to save lives.
            </p>
          </div>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 group"
          >
            <Target size={18} />
            Update Profile
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="relative overflow-hidden rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-lg shadow-gray-100/50 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-red-100/40 rounded-bl-full -mr-4 -mt-4" />
          <div className="relative space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Blood Group
              </p>
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition">
                <Droplet size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{bloodGroup}</p>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-lg shadow-gray-100/50 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-100/40 rounded-bl-full -mr-4 -mt-4" />
          <div className="relative space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Total Donations
              </p>
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition">
                <Award size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {myRequests.length} Bags
            </p>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-lg shadow-gray-100/50 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100/40 rounded-bl-full -mr-4 -mt-4" />
          <div className="relative space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Eligibility
              </p>
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition">
                <Calendar size={20} />
              </div>
            </div>
            <p className="text-xl font-bold text-emerald-600 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Eligible Now
            </p>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-lg shadow-gray-100/50 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-100/40 rounded-bl-full -mr-4 -mt-4" />
          <div className="relative space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Lives Impacted
              </p>
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500 group-hover:scale-110 transition">
                <Heart size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {Math.max(0, myRequests.length * 3)}
            </p>
          </div>
        </div>
      </div>

      {/* MY RECENT DONATION REQUESTS */}
      {recentRequests.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Activity className="text-red-500" size={22} />
              My Recent Donation Requests
            </h2>
            <Link
              href="/dashboard/requests"
              className="text-sm font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              View All My Requests
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500">
                    Recipient
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500">
                    Location
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500">
                    Date & Time
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500">
                    Blood
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500">
                    Status
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentRequests.map((req) => (
                  <tr
                    key={req._id}
                    className="hover:bg-gray-50/30 transition-colors"
                  >
                    <td className="px-5 py-4 font-medium text-gray-900">
                      {req.recipientName}
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {req.district}, {req.upazila}
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      <span className="block">
                        {new Date(req.donationDate).toLocaleDateString('en-BD')}
                      </span>
                      <span className="text-xs text-gray-400">
                        {req.donationTime}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 inline-flex items-center justify-center font-bold text-xs">
                        {req.bloodGroup}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/requests/${req._id}`}
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="View"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          href={`/dashboard/requests/${req._id}/edit`}
                          className="p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() =>
                            setDeleteModal({ open: true, id: req._id })
                          }
                          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                        {req.status === 'inprogress' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(req._id, 'done')}
                              className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg"
                              title="Mark Done"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(req._id, 'canceled')
                              }
                              className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                              title="Cancel"
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}
                      </div>
                      {req.status === 'inprogress' && req.donorName && (
                        <div className="mt-2 text-xs text-gray-500">
                          Donor: {req.donorName} ({req.donorEmail})
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {recentRequests.map((req) => (
              <div
               key={req._id}
                className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 p-4 shadow-sm"
              >
                
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertTriangle size={24} />
              <h3 className="text-lg font-bold">Delete Request?</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this donation request? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal({ open: false, id: null })}
                className="px-4 py-2 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* USER SUMMARY & QUICK ACTION (side by side) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 shadow-lg p-6 space-y-5">
          <div className="flex items-center gap-4">
            <img
              src={user?.image || '/default-avatar.png'}
              alt="Avatar"
              className="w-14 h-14 rounded-full object-cover border-2 border-red-100 shadow-sm"
            />
            <div>
              <h3 className="font-bold text-gray-900">
                {user?.name || 'Blood Donor'}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
            </div>
          </div>
          <div className="border-t pt-4 space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Phone</span>
              <span className="text-gray-800 font-semibold">{phone}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Location</span>
              <span
                className="text-gray-800 font-semibold text-right max-w-[150px] truncate"
                title={location}
              >
                {location}
              </span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 rounded-xl border border-red-100">
            <div className="flex items-center gap-2 text-red-800 font-semibold text-xs">
              <TrendingUp size={14} />
              Next Eligible Donation
            </div>
            <p className="text-sm text-gray-700 mt-1 font-medium">
              Immediate (no pending cycle)
            </p>
          </div>
        </div>

        
        <div className="relative overflow-hidden rounded-2xl bg-[#0f172a] text-white p-6 shadow-xl shadow-indigo-900/20">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-500/20 rounded-full blur-2xl" />
          <div className="relative space-y-4">
            <h3 className="font-bold text-lg">Need Blood for Someone?</h3>
            <p className="text-sm text-gray-300 font-light leading-relaxed">
              Create a new blood request post. Our platform matches and alerts
              donors in your area instantly.
            </p>
            <Link
              href="/dashboard/create-request"
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-red-600/30"
            >
              <Plus size={16} />
              Create Request Post
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}