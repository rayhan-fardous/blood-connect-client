// app/(dashboardLayout)/all-blood-donation-request/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Eye,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MapPin,
  Calendar,
  Clock,
  ChevronDown,
  Search,
  Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 5;

export default function AllDonationRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchRequests = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/donation-requests?')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch requests');
        return res.json();
      })
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter((req) => {
    if (filterStatus !== 'all' && req.status !== filterStatus) return false;
    if (
      searchTerm &&
      !req.recipientName?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !req.requesterName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
        setRequests((prev) =>
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
        setRequests((prev) => prev.filter((req) => req._id !== id));
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
    const colors = {
      pending: 'bg-gray-100 text-gray-700 border-gray-200',
      inprogress: 'bg-blue-50 text-blue-700 border-blue-200',
      done: 'bg-green-50 text-green-700 border-green-200',
      canceled: 'bg-red-50 text-red-700 border-red-200',
    }; 
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors[status]}`}>
        {status === 'inprogress'
          ? 'In Progress'
          : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-slate-50">
        <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 bg-white max-w-xl mx-auto my-10 border border-slate-200 rounded-xl p-6">
        <p className="text-sm text-slate-600">{error}</p>
        <button onClick={fetchRequests} className="mt-4 underline text-xs font-semibold text-red-600">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              All Blood Donation Requests
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              Manage every donation request across the platform.
            </p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search recipient or requester..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300/30 transition-all"
            />
          </div>
          <div className="relative min-w-[160px]">
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full appearance-none bg-slate-50/50 border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:border-slate-300 transition-all cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
              <option value="canceled">Canceled</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Desktop Interface (Table) */}
        <div className="hidden md:block overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Recipient</th>
                <th className="px-6 py-3.5">Requester</th>
                <th className="px-6 py-3.5">Location</th>
                <th className="px-6 py-3.5">Date & Time</th>
                <th className="px-6 py-3.5 text-center">Blood</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedRequests.length > 0 ? (
                paginatedRequests.map((req) => (
                  <tr key={req._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {req.recipientName}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-800">{req.requesterName}</span>
                        <span className="text-xs text-slate-400">{req.requesterEmail}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {req.district}, {req.upazila}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      <span className="block font-medium text-slate-700">
                        {new Date(req.donationDate).toLocaleDateString('en-BD')}
                      </span>
                      <span className="text-xs text-slate-400">{req.donationTime}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="w-7 h-7 rounded-full bg-red-50 text-red-600 inline-flex items-center justify-center font-bold text-xs border border-red-100/60">
                        {req.bloodGroup}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/dashboard/requests/${req._id}`}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          href={`/dashboard/requests/${req._id}/edit`}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                          title="Edit Request"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => setDeleteModal({ open: true, id: req._id })}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete Request"
                        >
                          <Trash2 size={16} />
                        </button>
                        
                        {req.status === 'inprogress' && (
                          <div className="flex items-center gap-1 pl-1.5 border-l border-slate-200 ml-1">
                            <button
                              onClick={() => handleStatusChange(req._id, 'done')}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                              title="Mark as Done"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button
                              onClick={() => handleStatusChange(req._id, 'canceled')}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                              title="Cancel Request"
                            >
                              <XCircle size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400 text-sm">
                    No donation requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Interface (Cards) */}
        <div className="md:hidden space-y-4">
          {paginatedRequests.length > 0 ? (
            paginatedRequests.map((req) => (
              <div key={req._id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900">{req.recipientName}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Requested by: {req.requesterName} ({req.requesterEmail})
                    </p>
                  </div>
                  <span className="w-7 h-7 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs border border-red-100">
                    {req.bloodGroup}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-500 border-y border-slate-100 py-2.5">
                  <p className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-slate-400" /> {req.district}, {req.upazila}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-slate-400" /> {new Date(req.donationDate).toLocaleDateString('en-BD')}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock size={13} className="text-slate-400" /> {req.donationTime}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <StatusBadge status={req.status} />
                  
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/requests/${req._id}`} className="p-1 text-slate-400 hover:text-slate-700">
                      <Eye size={16} />
                    </Link>
                    <Link href={`/dashboard/requests/${req._id}/edit`} className="p-1 text-slate-400 hover:text-slate-700">
                      <Pencil size={16} />
                    </Link>
                    <button onClick={() => setDeleteModal({ open: true, id: req._id })} className="p-1 text-slate-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                    {req.status === 'inprogress' && (
                      <>
                        <button onClick={() => handleStatusChange(req._id, 'done')} className="p-1 text-emerald-600">
                          <CheckCircle size={16} />
                        </button>
                        <button onClick={() => handleStatusChange(req._id, 'canceled')} className="p-1 text-red-600">
                          <XCircle size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-400 py-12 text-sm bg-white border border-slate-200 rounded-xl">
              No donation requests found.
            </p>
          )}
        </div>

        {/* Control Footer / Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1.5 mt-4 pt-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 rounded-lg disabled:opacity-40 hover:bg-slate-50 transition-colors"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                  currentPage === page
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 rounded-lg disabled:opacity-40 hover:bg-slate-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Delete Dialog */}
        {deleteModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px]">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm border border-slate-200 shadow-xl m-4">
              <div className="flex items-center gap-2.5 text-red-600 mb-3">
                <AlertTriangle size={20} />
                <h3 className="text-base font-bold text-slate-900">Delete Request?</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-5">
                Are you sure you want to delete this donation request? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2.5">
                <button
                  onClick={() => setDeleteModal({ open: false, id: null })}
                  className="px-3.5 py-2 border border-slate-200 text-slate-700 font-medium text-xs rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-3.5 py-2 bg-red-600 text-white font-medium text-xs rounded-lg hover:bg-red-500 active:bg-red-700 transition-colors shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}