"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
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
  ArrowLeft,
  Filter,
  Loader2,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
} from "lucide-react";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 4;

export default function MyDonationRequestsPage() {
  const { data: session, isPending: sessionLoading } = useSession();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch only the current donor's requests
  useEffect(() => {
    if (!session?.user?.email) return;

    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/my-donation-requests?email=${session.user.email}`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch requests");
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
  }, [session?.user?.email]);

  // Filter by status
  const filteredRequests =
    filterStatus === "all"
      ? requests
      : requests.filter((req) => req.status === filterStatus);

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRequests = filteredRequests.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  // Status change – calls backend PUT
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/donation-requests/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: newStatus } : req,
          ),
        );
        toast.success(`Request marked as ${newStatus}`);
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  // Delete – calls backend DELETE
  const handleDelete = async () => {
    const { id } = deleteModal;
    if (!id) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/donation-requests/${id}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();
      if (data.success) {
        setRequests((prev) => prev.filter((req) => req._id !== id));
        toast.success("Request deleted");
      } else {
        toast.error(data.message || "Deletion failed");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setDeleteModal({ open: false, id: null });
    }
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      pending:
        "bg-amber-50 text-amber-700 border-amber-200/60 ring-amber-500/10",
      inprogress: "bg-sky-50 text-sky-700 border-sky-200/60 ring-sky-500/10",
      done: "bg-emerald-50 text-emerald-700 border-emerald-200/60 ring-emerald-500/10",
      canceled: "bg-rose-50 text-rose-700 border-rose-200/60 ring-rose-500/10",
    };
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ring-1 ring-inset ${
          styles[status] || "bg-gray-50 text-gray-600 border-gray-200"
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-75" />
        {status === "inprogress"
          ? "In Progress"
          : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const Pagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl disabled:opacity-40 hover:bg-gray-50 disabled:hover:bg-white transition shadow-sm cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        <div className="hidden sm:flex items-center gap-1.5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                currentPage === page
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/10 scale-105"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl disabled:opacity-40 hover:bg-gray-50 disabled:hover:bg-white transition shadow-sm cursor-pointer disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    );
  };

  if (sessionLoading || loading) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-rose-600 animate-spin" />
        <p className="text-sm font-medium text-gray-500 animate-pulse">
          Loading requests...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 max-w-md mx-auto">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={24} />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Failed to load data</h3>
        <p className="text-gray-500 mt-2 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition shadow-sm shadow-rose-600/15"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6">
      {/* Action Header Card */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-gray-100 bg-gray-50/50"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              My Donation Requests
            </h1>
            <p className="text-gray-500 mt-0.5 text-sm">
              Track and configure updates on your medical blood request
              listings.
            </p>
          </div>
        </div>

        {/* Filter Input Block */}
        <div className="relative w-full sm:w-auto min-w-[160px]">
          <select
            value={filterStatus}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-200 rounded-xl pl-10 pr-10 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all shadow-sm cursor-pointer hover:border-gray-300"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
          <Filter
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-sm">
        {paginatedRequests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Recipient</th>
                  <th className="py-4 px-6">Blood Type</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Schedule</th>
                  <th className="py-4 px-6">Status / Assigned</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {paginatedRequests.map((req) => (
                  <tr
                    key={req._id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    {/* Recipient info column */}
                    <td className="py-4 px-6 font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">
                      {req.recipientName}
                    </td>

                    {/* Blood Group Icon */}
                    <td className="py-4 px-6">
                      <span className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 inline-flex items-center justify-center font-extrabold text-xs shadow-sm">
                        {req.bloodGroup}
                      </span>
                    </td>

                    {/* Location Field */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-gray-600 max-w-[180px]">
                        <MapPin size={14} className="text-gray-400 shrink-0" />
                        <span
                          className="truncate"
                          title={`${req.district}, ${req.upazila}`}
                        >
                          {req.district}, {req.upazila}
                        </span>
                      </div>
                    </td>

                    {/* Schedule Column */}
                    <td className="py-4 px-6">
                      <div className="space-y-1 text-xs font-medium">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <Calendar size={13} className="text-gray-400" />
                          <span>
                            {new Date(req.donationDate).toLocaleDateString(
                              "en-BD",
                              { dateStyle: "medium" },
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 pl-[18.5px]">
                          <Clock size={12} className="text-gray-400" />
                          <span>{req.donationTime}</span>
                        </div>
                      </div>
                    </td>

                    {/* Status & Donor Profile Card row cell */}
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <StatusBadge status={req.status} />
                        {req.status === "inprogress" && req.donorName && (
                          <div className="flex items-start gap-2 p-2 bg-slate-50 border border-slate-100 rounded-lg max-w-[200px]">
                            <User
                              size={13}
                              className="text-slate-400 mt-0.5 shrink-0"
                            />
                            <div className="text-[11px] leading-tight text-slate-600 truncate">
                              <span className="font-semibold block text-slate-800 truncate">
                                {req.donorName}
                              </span>
                              <span className="text-slate-400 block truncate">
                                {req.donorEmail}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Flexible Operation controls toolbelt */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/dashboard/requests/${req._id}`}
                          className="p-2 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          href={`/dashboard/requests/${req._id}/edit`}
                          className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                          title="Edit Request"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() =>
                            setDeleteModal({ open: true, id: req._id })
                          }
                          className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete Request"
                        >
                          <Trash2 size={16} />
                        </button>

                        {req.status === "inprogress" && (
                          <div className="flex items-center gap-1 border-l border-gray-100 pl-1.5 ml-1">
                            <button
                              onClick={() =>
                                handleStatusChange(req._id, "done")
                              }
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                              title="Mark Done"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(req._id, "canceled")
                              }
                              className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                              title="Cancel Request"
                            >
                              <XCircle size={16} />
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
        ) : (
          <div className="bg-gray-50/50 border-2 border-dashed border-gray-200/60 rounded-2xl py-16 px-4 text-center m-4">
            <p className="text-gray-400 font-medium max-w-xs mx-auto text-sm">
              No matching donation requests found under this filter choice.
            </p>
          </div>
        )}
      </div>

      <Pagination />

      {/* Structural Confirmation Overlay */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md transition-opacity">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <div className="p-2 bg-rose-50 rounded-xl">
                <AlertTriangle size={22} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Delete Request?
              </h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Are you sure you want to drop this active request context? This
              sequence cannot be rolled back.
            </p>
            <div className="flex justify-end gap-2.5">
              <button
                onClick={() => setDeleteModal({ open: false, id: null })}
                className="px-4 py-2 border border-gray-200 rounded-xl text-gray-700 text-sm font-semibold hover:bg-gray-50 transition cursor-pointer"
              >
                Go Back
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-xl transition shadow-sm shadow-rose-600/10 cursor-pointer"
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
