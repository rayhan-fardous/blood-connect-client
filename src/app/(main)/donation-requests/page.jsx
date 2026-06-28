'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Clock, Droplet, ArrowRight, Search } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

export default function PublicRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/donation-requests?status=pending`)
      .then((res) => {
        if (!res.ok) throw new Error('Could not get data');
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
  }, []);

  const filtered = requests.filter(
    (req) =>
      req.recipientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.bloodGroup?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.district?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-slate-50">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-red-100 border-t-red-500 rounded-full animate-spin" />
          <Droplet size={24} className="text-red-500 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-red-500 font-medium mb-2">Something went wrong</p>
          <p className="text-sm text-slate-500">{error}. Please try reloading the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-12 md:py-20 px-4 pt-28 md:pt-36 relative">
      {/* Soft Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-red-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-rose-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Simple & Welcoming Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 bg-red-50 text-red-600 font-semibold text-xs rounded-full uppercase tracking-wider mb-3">
            Help Save Lives
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            People Who Need{' '}
            <span className="text-red-500">
              Blood Right Now
            </span>
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Every entry below is a real person looking for help. Look through the list, see if you have matching blood, and become their hero today.
          </p>
        </div>

        {/* Clean, Easy Search Bar */}
        <div className="relative max-w-md mx-auto mb-12 shadow-xs">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, blood group, or area..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 font-medium shadow-xs focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
          />
        </div>

        {/* Dynamic Layout: Empty State or Grid */}
        {paginated.length === 0 ? (
          <div className="text-center bg-white border border-slate-100 rounded-3xl p-12 max-w-md mx-auto shadow-xs">
            <p className="text-slate-500 text-lg font-medium">
              No requests found matching your search.
            </p>
            <p className="text-sm text-slate-400 mt-1">Try checking your spelling or looking for a different blood group.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((req, index) => (
              <div
                key={req._id}
                className="group relative bg-white border border-slate-100 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-slate-200 transition-all duration-300 animate-fade-in-up flex flex-col justify-between"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div>
                  {/* Card Header: Name & Blood Group Badge */}
                  <div className="flex justify-between items-start gap-4 mb-5">
                    <h2 className="text-xl font-bold text-slate-900 line-clamp-1 group-hover:text-red-500 transition-colors">
                      {req.recipientName}
                    </h2>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 rounded-xl text-sm font-extrabold border border-red-100 shrink-0">
                      <Droplet size={14} className="fill-current" />
                      {req.bloodGroup}
                    </span>
                  </div>

                  {/* Plain, Understandable Information Details */}
                  <div className="space-y-3 text-slate-600 text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                        <MapPin size={16} />
                      </div>
                      <span className="text-slate-700">
                        {req.district}, {req.upazila}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                        <Calendar size={16} />
                      </div>
                      <span className="text-slate-700">
                        {new Date(req.donationDate).toLocaleDateString('en-BD', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                        <Clock size={16} />
                      </div>
                      <span className="text-slate-700">{req.donationTime}</span>
                    </div>
                  </div>
                </div>

                {/* Friendly Action Button */}
                <Link
                  href={`/donation-requests/${req._id}`}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-red-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm shadow-xs"
                >
                  <span>View Details</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        )}
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm bg-white/5 border border-gray-700 rounded-lg disabled:opacity-40 hover:bg-white/10 text-gray-300 transition"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                  currentPage === page
                    ? 'bg-red-600 text-white shadow'
                    : 'bg-white/5 border border-gray-700 text-gray-300 hover:bg-white/10'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm bg-white/5 border border-gray-700 rounded-lg disabled:opacity-40 hover:bg-white/10 text-gray-300 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Smooth Entrance Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}