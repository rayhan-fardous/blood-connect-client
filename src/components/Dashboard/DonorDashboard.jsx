// app/dashboard/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import {
  Droplet,
  Calendar,
  Activity,
  Heart,
  MapPin,
  Phone,
  ArrowRight,
  Plus,
  Sparkles,
  Target,
  Eye,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ClipboardList,
  Layers
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
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/donation-requests?email=${user.email}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load requests');
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/donation-requests/${id}`,
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
      toast.error('A network error occurred');
    }
  };

  const handleDelete = async () => {
    const { id } = deleteModal;
    if (!id) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/donation-requests/${id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (data.success) {
        setMyRequests((prev) => prev.filter((req) => req._id !== id));
        toast.success('Request deleted successfully');
      } else {
        toast.error(data.message || 'Deletion failed');
      }
    } catch (err) {
      toast.error('A network error occurred');
    } finally {
      setDeleteModal({ open: false, id: null });
    }
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      pending: 'bg-slate-50 text-slate-600 border-slate-200',
      inprogress: 'bg-amber-50 text-amber-700 border-amber-200',
      done: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      canceled: 'bg-rose-50 text-rose-700 border-rose-200',
    };
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border tracking-wide ${styles[status] || styles.pending}`}
      >
        {status === 'inprogress'
          ? 'In Progress'
          : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (isPending || requestsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-rose-100 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-rose-600 rounded-full animate-spin" />
            <Droplet size={24} className="text-rose-600 animate-pulse fill-rose-600/10" />
          </div>
          <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mt-2">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (requestsError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
        <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-4 border border-rose-100 shadow-sm">
          <AlertTriangle size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Failed to load data</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-xs leading-relaxed">{requestsError}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-slate-800 antialiased">
      
      {/* Modern Carbon & Light-Crimson Accent Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-neutral-900 p-6 md:p-10 text-white border border-slate-800/80 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-12 w-80 h-80 bg-rose-500/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-36 -left-16 w-72 h-72 bg-slate-500/10 rounded-full blur-[70px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium tracking-wide text-slate-300">
              <Sparkles size={13} className="text-rose-500 fill-rose-500/20" />
              Donor Panel
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Welcome back,{' '}
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                {user?.name || 'Life Saver'}
              </span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base font-normal leading-relaxed">
              Track your blood requests, check your donation eligibility, and see how many lives you are helping to save below.
            </p>
          </div>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 bg-gradient-to-r from-slate-50 to-white text-slate-950 hover:from-rose-600 hover:to-rose-500 hover:text-white px-5 py-3 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 group shadow-md shrink-0 border border-slate-200/20"
          >
            <Target size={14} />
            Edit Profile
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Analytics Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: 'Blood Type', val: bloodGroup, icon: Droplet, col: 'text-rose-600 bg-rose-50 border-rose-100' },
          { 
            title: 'Requests Created', 
            val: `${myRequests.length} ${myRequests.length === 1 ? 'Post' : 'Posts'}`, 
            icon: Layers, 
            col: 'text-slate-700 bg-slate-50 border-slate-200' 
          },
          { title: 'Donation Status', val: 'Eligible to Donate', icon: Calendar, col: 'text-emerald-600 bg-emerald-50 border-emerald-100', customValClass: 'text-emerald-600 flex items-center gap-2 text-sm font-bold' },
          { title: 'Lives Impacted', val: Math.max(0, myRequests.length * 2), icon: Heart, col: 'text-purple-600 bg-purple-50 border-purple-100' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">{stat.title}</p>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${stat.col}`}>
                <stat.icon size={16} />
              </div>
            </div>
            <div className="mt-4">
              {stat.customValClass ? (
                <p className={`${stat.customValClass}`}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  {stat.val}
                </p>
              ) : (
                <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{stat.val}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Requests Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
            <Activity className="text-rose-600" size={20} />
            My Recent Requests
          </h2>
          <Link
            href="/dashboard/requests"
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition"
          >
            View All Posts
            <ArrowRight size={13} />
          </Link>
        </div>

        {recentRequests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 max-w-md mx-auto">
            <ClipboardList className="mx-auto text-slate-300 mb-3" size={40} />
            <h4 className="text-sm font-bold text-slate-800">No requests found</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">Any blood help requests you post will appear here.</p>
          </div>
        ) : (
          <>
            {/* Desktop View Table */}
            <div className="hidden md:block overflow-hidden bg-white rounded-xl border border-slate-200/80 shadow-sm">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold tracking-wider uppercase">
                  <tr>
                    <th className="px-6 py-4">Recipient</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4 text-center">Blood Group</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                  {recentRequests.map((req) => (
                    <tr key={req._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{req.recipientName}</td>
                      <td className="px-6 py-4 max-w-[200px] truncate text-slate-500">{req.upazila}, {req.district}</td>
                      <td className="px-6 py-4">
                        <span className="text-slate-900 font-semibold">
                          {new Date(req.donationDate).toLocaleDateString('en-BD', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="block text-[10px] text-slate-400 mt-0.5 font-normal">{req.donationTime}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2.5 py-1 rounded bg-rose-50 text-rose-600 font-black border border-rose-100">
                          {req.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-4"><StatusBadge status={req.status} /></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/dashboard/requests/${req._id}`} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="View details">
                            <Eye size={15} />
                          </Link>
                          <Link href={`/dashboard/requests/${req._id}/edit`} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition" title="Edit request">
                            <Pencil size={15} />
                          </Link>
                          <button onClick={() => setDeleteModal({ open: true, id: req._id })} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Delete request">
                            <Trash2 size={15} />
                          </button>
                          {req.status === 'inprogress' && (
                            <div className="flex items-center gap-1 ml-1 border-l pl-2 border-slate-200">
                              <button onClick={() => handleStatusChange(req._id, 'done')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition" title="Mark as Completed">
                                <CheckCircle size={15} />
                              </button>
                              <button onClick={() => handleStatusChange(req._id, 'canceled')} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Cancel request">
                                <XCircle size={15} />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View Cards */}
            <div className="md:hidden space-y-4">
              {recentRequests.map((req) => (
                <div key={req._id} className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm space-y-3.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{req.recipientName}</h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <MapPin size={13} className="shrink-0" /> {req.upazila}, {req.district}
                      </p>
                    </div>
                    <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs border border-rose-100">
                      {req.bloodGroup}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 pt-3 border-t border-slate-100 flex justify-between items-center">
                    <div>
                      <span className="block font-semibold text-slate-800">
                        {new Date(req.donationDate).toLocaleDateString('en-BD')}
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">{req.donationTime}</span>
                    </div>
                    <StatusBadge status={req.status} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                    <Link href={`/dashboard/requests/${req._id}`} className="py-2 px-1 text-center text-xs font-semibold text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                      Details
                    </Link>
                    <Link href={`/dashboard/requests/${req._id}/edit`} className="py-2 px-1 text-center text-xs font-semibold text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                      Edit
                    </Link>
                    <button onClick={() => setDeleteModal({ open: true, id: req._id })} className="py-2 px-1 text-center text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 transform transition-all duration-200 scale-100">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                <AlertTriangle size={18} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Delete Request</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Are you sure you want to permanently delete this donation request? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2.5">
              <button
                onClick={() => setDeleteModal({ open: false, id: null })}
                className="px-4 py-2.5 border border-slate-200 text-xs font-bold rounded-lg text-slate-600 hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2.5 bg-rose-600 text-xs font-bold text-white rounded-lg hover:bg-rose-700 transition shadow-md cursor-pointer"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Summary & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src={user?.image || '/default-avatar.png'}
              alt="User avatar"
              className="w-12 h-12 rounded-xl object-cover border border-slate-100 bg-slate-50 shadow-sm"
            />
            <div>
              <h3 className="font-bold text-sm text-slate-900 leading-snug">{user?.name || 'Blood Donor'}</h3>
              <p className="text-[11px] text-slate-400 font-normal mt-0.5">{user?.email}</p>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-3.5 space-y-3 text-xs font-medium">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 flex items-center gap-1.5"><Phone size={13} /> Phone Number</span>
              <span className="text-slate-800 font-bold tracking-tight">{phone}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 flex items-center gap-1.5"><MapPin size={13} /> Location</span>
              <span className="text-slate-800 font-bold text-right truncate max-w-[200px]" title={location}>{location}</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 p-3.5 rounded-lg border border-slate-200/60 mt-1">
            <div className="flex items-center gap-1.5 text-slate-800 font-bold text-[10px] tracking-wider uppercase">
              <Activity size={12} className="text-slate-600" />
              Eligibility Note
            </div>
            <p className="text-xs text-slate-600 mt-1 font-normal leading-relaxed">You are cleared to donate immediately. No waiting period is currently active.</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-slate-900 text-white p-5 shadow-lg border border-slate-800 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-28 h-28 bg-rose-600/10 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-2 max-w-md">
            <h3 className="font-bold text-sm tracking-tight">Need Emergency Blood?</h3>
            <p className="text-xs text-slate-400 font-normal leading-relaxed">
              Create an urgent request post instantly. Our system will immediately notify available blood donors located within your local area.
            </p>
          </div>
          <Link
            href="/dashboard/create-request"
            className="w-full flex items-center justify-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs py-3 rounded-lg transition duration-200 shadow-md mt-5 tracking-wide"
          >
            <Plus size={14} />
            Create Request Post
          </Link>
        </div>
      </div>
    </div>
  );
}