'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Clock, Droplet, Eye, Search } from 'lucide-react';

export default function PublicRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/donation-requests?status=pending')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
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
      req.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-[#0b0f1c]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-red-200 border-t-red-600 rounded-full animate-spin" />
          <Droplet
            size={24}
            className="absolute inset-0 m-auto text-red-600 animate-pulse"
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0b0f1c] min-h-screen flex items-center justify-center">
        <p className="text-red-400 text-lg">Something went wrong: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f1c] py-16 px-4 relative pt-35">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-16 w-96 h-96 bg-rose-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Urgent Blood Needs{' '}
            <span className="bg-linear-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
              Near You
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Every request represents a life waiting for a hero. Find a request
            that matches your blood group and respond today.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-10">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, blood group, or district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
          />
        </div>

        {/* Cards Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            No pending requests match your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((req, index) => (
              <div
                key={req._id}
                className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500 ease-out hover:border-red-500/40 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Animated gradient top border – expands from left to right */}
                <span className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-linear-to-r from-red-600 to-rose-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

                {/* Blood group badge */}
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-white">
                    {req.recipientName}
                  </h2>
                  <span className="inline-flex items-center gap-1.5 px-3 py-5  text-red-500 rounded-full text-sm font-bold shadow-sm shadow-red-500 ">
                    <Droplet size={16} className="" />
                    {req.bloodGroup}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-red-400" />
                    <span>
                      {req.district}, {req.upazila}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-red-400" />
                    <span>
                      {new Date(req.donationDate).toLocaleDateString('en-BD', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-red-400" />
                    <span>{req.donationTime}</span>
                  </div>
                </div>

                {/* View button */}
                <Link
                  href={`/donation-requests/${req._id}`}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-red-600/20"
                >
                  <Eye size={18} />
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Entrance animation keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
}