'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  Calendar,
  Clock,
  Droplet,
  Search as SearchIcon,
  Loader2,
  Eye,
} from 'lucide-react';
import Link from 'next/link';

import districtsRaw from '../../../../data/districts.json';
import upazilasRaw from '../../../../data/upazilas.json';

const districtsInfo = districtsRaw[2].data;
const upazilasInfo = upazilasRaw[2].data;
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function SearchPage() {
  const router = useRouter();

  const [bloodGroup, setBloodGroup] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (district) {
      const selected = districtsInfo.find((d) => d.name === district);
      if (selected) {
        const upazilas = upazilasInfo.filter((u) => u.district_id === selected.id);
        setFilteredUpazilas(upazilas);
        if (!upazilas.find((u) => u.name === upazila)) {
          setUpazila('');
        }
      }
    } else {
      setFilteredUpazilas([]);
      setUpazila('');
    }
  }, [district]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!bloodGroup && !district && !upazila) {
      setError('Please select at least one filter to start.');
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);

    const params = new URLSearchParams();
    params.append('status', 'pending');
    if (bloodGroup) params.append('bloodGroup', bloodGroup);
    if (district) params.append('district', district);
    if (upazila) params.append('upazila', upazila);

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/donation-requests?${params.toString()}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Could not fetch requests. Please try again.');
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Find Blood Donation Needs
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            Search for active requests near you and help save a life today.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 md:p-8 mb-10">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* Blood Group */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg py-3 px-4 text-slate-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              >
                <option value="">Any Group</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                District
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg py-3 px-4 text-slate-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              >
                <option value="">Any District</option>
                {districtsInfo.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Upazila
              </label>
              <select
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                disabled={!district}
                className="w-full bg-white border border-slate-300 rounded-lg py-3 px-4 text-slate-900 disabled:bg-slate-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              >
                <option value="">Any Upazila</option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-sm disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    <SearchIcon size={18} />
                    Search
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {searched && (
          <div>
            {error && <div className="text-center text-red-600 mb-6 font-medium">{error}</div>}

            {!loading && !error && results.length === 0 && (
              <div className="text-center text-slate-500 py-12">
                <Droplet size={48} className="mx-auto mb-4 text-slate-300" />
                <p className="text-lg font-medium">No requests match your search.</p>
                <p className="text-sm mt-1">Try different filters or check back later.</p>
              </div>
            )}

            {results.length > 0 && (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  {results.length} Request{results.length > 1 ? 's' : ''} Found
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((req) => (
                    <div
                      key={req._id}
                      className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-slate-900">{req.recipientName}</h3>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold border border-red-100">
                          <Droplet size={14} />
                          {req.bloodGroup}
                        </span>
                      </div>

                      <div className="space-y-2 text-slate-600 text-sm mb-6">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-slate-400" />
                          <span>{req.district}, {req.upazila}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-slate-400" />
                          <span>{new Date(req.donationDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-slate-400" />
                          <span>{req.donationTime}</span>
                        </div>
                      </div>

                      <Link
                        href={`/donation-requests/${req._id}`}
                        className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-lg transition-colors"
                      >
                        <Eye size={18} />
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}