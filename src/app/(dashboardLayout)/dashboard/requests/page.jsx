// app/dashboard/my-donation-requests/page.jsx
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
  ArrowLeft,
  Filter,
} from 'lucide-react';
import toast from 'react-hot-toast';

// Dummy data for all donation requests (replace with API later)
const allRequestsData = [
  {
    id: 'req-1',
    recipientName: 'Rahim Uddin',
    district: 'Dhaka',
    upazila: 'Dhanmondi',
    donationDate: '2026-03-15',
    donationTime: '10:00 AM',
    bloodGroup: 'A+',
    status: 'pending',
    donorInfo: null,
  },
  {
    id: 'req-2',
    recipientName: 'Sumaiya Akter',
    district: 'Chittagong',
    upazila: 'Panchlaish',
    donationDate: '2026-03-18',
    donationTime: '02:30 PM',
    bloodGroup: 'O-',
    status: 'inprogress',
    donorInfo: { name: 'Karim Uddin', email: 'karim@example.com' },
  },
  {
    id: 'req-3',
    recipientName: 'Abul Kalam',
    district: 'Rajshahi',
    upazila: 'Boalia',
    donationDate: '2026-03-20',
    donationTime: '11:15 AM',
    bloodGroup: 'AB+',
    status: 'done',
    donorInfo: { name: 'Karim Uddin', email: 'karim@example.com' },
  },
  {
    id: 'req-4',
    recipientName: 'Fatema Begum',
    district: 'Sylhet',
    upazila: 'Sadar',
    donationDate: '2026-03-22',
    donationTime: '09:00 AM',
    bloodGroup: 'B+',
    status: 'canceled',
    donorInfo: null,
  },
  {
    id: 'req-5',
    recipientName: 'Sohan Rahman',
    district: 'Barisal',
    upazila: 'Bakerganj',
    donationDate: '2026-03-25',
    donationTime: '03:45 PM',
    bloodGroup: 'A-',
    status: 'pending',
    donorInfo: null,
  },
  {
    id: 'req-6',
    recipientName: 'Nusrat Jahan',
    district: 'Khulna',
    upazila: 'Dighalia',
    donationDate: '2026-03-28',
    donationTime: '12:00 PM',
    bloodGroup: 'O+',
    status: 'inprogress',
    donorInfo: { name: 'Karim Uddin', email: 'karim@example.com' },
  },
  {
    id: 'req-7',
    recipientName: 'Maruf Hasan',
    district: 'Rajshahi',
    upazila: 'Bagha',
    donationDate: '2026-04-02',
    donationTime: '08:30 AM',
    bloodGroup: 'AB-',
    status: 'done',
    donorInfo: { name: 'Karim Uddin', email: 'karim@example.com' },
  },
  {
    id: 'req-8',
    recipientName: 'Lima Chowdhury',
    district: 'Dhaka',
    upazila: 'Mirpur',
    donationDate: '2026-04-05',
    donationTime: '02:00 PM',
    bloodGroup: 'B-',
    status: 'canceled',
    donorInfo: null,
  },
  // Add more to test pagination
  {
    id: 'req-9',
    recipientName: 'Imran Hossain',
    district: 'Chittagong',
    upazila: 'Kotwali',
    donationDate: '2026-04-08',
    donationTime: '10:15 AM',
    bloodGroup: 'A+',
    status: 'pending',
    donorInfo: null,
  },
  {
    id: 'req-10',
    recipientName: 'Zara Ahmed',
    district: 'Sylhet',
    upazila: 'Moulvibazar',
    donationDate: '2026-04-11',
    donationTime: '11:45 AM',
    bloodGroup: 'O-',
    status: 'done',
    donorInfo: { name: 'Karim Uddin', email: 'karim@example.com' },
  },
];

const ITEMS_PER_PAGE = 4; // Adjust as needed

export default function MyDonationRequestsPage() {
  const [requests, setRequests] = useState(allRequestsData);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter requests
  const filteredRequests =
    filterStatus === 'all'
      ? requests
      : requests.filter((req) => req.status === filterStatus);

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRequests = filteredRequests.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset page when filter changes
  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

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
    const styles = {
      pending: 'bg-gray-100 text-gray-700 border-gray-200',
      inprogress: 'bg-blue-50 text-blue-700 border-blue-200',
      done: 'bg-green-50 text-green-700 border-green-200',
      canceled: 'bg-red-50 text-red-700 border-red-200',
    };
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
          styles[status]
        }`}
      >
        {status === 'inprogress'
          ? 'In Progress'
          : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const Pagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return (
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
        >
          Prev
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-9 h-9 rounded-lg text-sm font-medium ${
              currentPage === page
                ? 'bg-red-600 text-white shadow'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-gray-400 hover:text-red-600 transition"
            >
              <ArrowLeft size={20} />
            </Link>
            My Donation Requests
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            All donation requests you have created.
          </p>
        </div>
        {/* Filter dropdown */}
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
          <Filter
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="text-left px-5 py-3 font-semibold text-gray-500">
                Name
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
                    {req.status === 'inprogress' && req.donorInfo && (
                      <div className="mt-2 text-xs text-gray-500">
                        Donor: {req.donorInfo.name} ({req.donorInfo.email})
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
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
                  <div className="mt-3">
                    <StatusBadge status={req.status} />
                  </div>
                  {req.status === 'inprogress' && req.donorInfo && (
                    <div className="mt-2 text-xs text-gray-500">
                      Donor: {req.donorInfo.name} ({req.donorInfo.email})
                    </div>
                  )}
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
      <Pagination />

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