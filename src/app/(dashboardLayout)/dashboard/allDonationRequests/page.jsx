// app/(dashboardLayout)/all-blood-donation-request/page.jsx
'use client';

import { useState } from 'react';
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
  Filter,
  Search,
  Users,
} from 'lucide-react';
import toast from 'react-hot-toast';

// Dummy data – all requests from different users
const allRequests = [
  {
    id: 'req-1',
    recipientName: 'Nayeem Hasan',
    requesterName: 'Farzana Akter',
    requesterEmail: 'farzana@example.com',
    district: 'Mymensingh',
    upazila: 'Trishal',
    donationDate: '2026-04-10',
    donationTime: '09:30 AM',
    bloodGroup: 'O+',
    status: 'pending',
  },
  {
    id: 'req-2',
    recipientName: 'Jannatul Ferdous',
    requesterName: 'Mehedi Hasan',
    requesterEmail: 'mehedi@example.com',
    district: 'Comilla',
    upazila: 'Kotwali',
    donationDate: '2026-04-12',
    donationTime: '01:00 PM',
    bloodGroup: 'A+',
    status: 'inprogress',
  },
  {
    id: 'req-3',
    recipientName: 'Mahmudul Islam',
    requesterName: 'Nusrat Chowdhury',
    requesterEmail: 'nusrat.c@example.com',
    district: 'Rangpur',
    upazila: 'Gangachara',
    donationDate: '2026-04-15',
    donationTime: '11:45 AM',
    bloodGroup: 'B-',
    status: 'done',
  },
  {
    id: 'req-4',
    recipientName: 'Sadia Rahman',
    requesterName: 'Tanvir Ahmed',
    requesterEmail: 'tanvir@example.com',
    district: 'Jessore',
    upazila: 'Sadar',
    donationDate: '2026-04-18',
    donationTime: '04:00 PM',
    bloodGroup: 'AB+',
    status: 'pending',
  },
  {
    id: 'req-5',
    recipientName: 'Rakibul Hasan',
    requesterName: 'Shamima Akter',
    requesterEmail: 'shamima@example.com',
    district: 'Bogura',
    upazila: 'Shibganj',
    donationDate: '2026-04-20',
    donationTime: '08:15 AM',
    bloodGroup: 'O-',
    status: 'canceled',
  },
  {
    id: 'req-6',
    recipientName: 'Tania Sultana',
    requesterName: 'Arif Hossain',
    requesterEmail: 'arif@example.com',
    district: 'Noakhali',
    upazila: 'Begumganj',
    donationDate: '2026-04-23',
    donationTime: '03:30 PM',
    bloodGroup: 'A-',
    status: 'inprogress',
  },
  {
    id: 'req-7',
    recipientName: 'Mizanur Rahman',
    requesterName: 'Sabbir Khan',
    requesterEmail: 'sabbir@example.com',
    district: 'Dinajpur',
    upazila: 'Birganj',
    donationDate: '2026-04-25',
    donationTime: '10:45 AM',
    bloodGroup: 'B+',
    status: 'done',
  },
  {
    id: 'req-8',
    recipientName: 'Nafisa Islam',
    requesterName: 'Fahim Ahmed',
    requesterEmail: 'fahim@example.com',
    district: 'Sylhet',
    upazila: 'Beanibazar',
    donationDate: '2026-04-28',
    donationTime: '12:30 PM',
    bloodGroup: 'AB-',
    status: 'pending',
  },
];

const ITEMS_PER_PAGE = 5;

export default function allDonationRequests() {
  const [requests, setRequests] = useState(allRequests);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter & Search
  const filteredRequests = requests.filter((req) => {
    if (filterStatus !== 'all' && req.status !== filterStatus) return false;
    if (
      searchTerm &&
      !req.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !req.requesterName.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleStatusChange = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
    );
    toast.success(`Request marked as ${newStatus}`);
  };

  const handleDelete = () => {
    const { id } = deleteModal;
    if (!id) return;
    setRequests((prev) => prev.filter((req) => req.id !== id));
    setDeleteModal({ open: false, id: null });
    toast.success('Request deleted');
  };

  const StatusBadge = ({ status }) => {
    const colors = {
      pending: 'bg-gray-100 text-gray-700 border-gray-200',
      inprogress: 'bg-blue-50 text-blue-700 border-blue-200',
      done: 'bg-green-50 text-green-700 border-green-200',
      canceled: 'bg-red-50 text-red-700 border-red-200',
    };
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors[status]}`}
      >
        {status === 'inprogress'
          ? 'In Progress'
          : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            All Blood Donation Requests
          </h1>
          <p className="text-gray-500 text-sm">
            Manage every donation request across the platform.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search recipient or requester..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
          <Filter
            size={14}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
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
                Requester
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
            {paginatedRequests.length > 0 ? (
              paginatedRequests.map((req) => (
                <tr
                  key={req.id}
                  className="hover:bg-gray-50/30 transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-gray-900">
                    {req.recipientName}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">
                        {req.requesterName}
                      </span>
                      <span className="text-xs text-gray-400">
                        {req.requesterEmail}
                      </span>
                    </div>
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
                        href={`/dashboard/requests/${req.id}`}
                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </Link>
                      <Link
                        href={`/dashboard/requests/${req.id}/edit`}
                        className="p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                        title="Edit Request"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() =>
                          setDeleteModal({ open: true, id: req.id })
                        }
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete Request"
                      >
                        <Trash2 size={16} />
                      </button>
                      {req.status === 'inprogress' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(req.id, 'done')}
                            className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg"
                            title="Mark as Done"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(req.id, 'canceled')
                            }
                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="Cancel Request"
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-12 text-center text-gray-400"
                >
                  No donation requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {paginatedRequests.length > 0 ? (
          paginatedRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 p-4 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">
                    {req.recipientName}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Requested by: {req.requesterName} ({req.requesterEmail})
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin size={12} /> {req.district}, {req.upazila}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                    <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full">
                      <Calendar size={12} />{' '}
                      {new Date(req.donationDate).toLocaleDateString('en-BD')}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full">
                      <Clock size={12} /> {req.donationTime}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-bold text-xs">
                      {req.bloodGroup}
                    </span>
                  </div>
                  <div className="mt-2">
                    <StatusBadge status={req.status} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/dashboard/requests/${req.id}`}
                    className="text-blue-600"
                  >
                    <Eye size={18} />
                  </Link>
                  <Link
                    href={`/dashboard/requests/${req.id}/edit`}
                    className="text-emerald-600"
                  >
                    <Pencil size={18} />
                  </Link>
                  <button
                    onClick={() => setDeleteModal({ open: true, id: req.id })}
                    className="text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                  {req.status === 'inprogress' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(req.id, 'done')}
                        className="text-green-600"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button
                        onClick={() => handleStatusChange(req.id, 'canceled')}
                        className="text-red-600"
                      >
                        <XCircle size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 py-12">
            No donation requests found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-lg text-sm font-medium ${
                currentPage === page
                  ? 'bg-red-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
          >
            Next
          </button>
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
    </div>
  );
}