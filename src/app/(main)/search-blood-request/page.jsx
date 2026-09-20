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
  Sparkles,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Info,
} from 'lucide-react';
import Link from 'next/link';

import districtsRaw from '../../../../data/districts.json';
import upazilasRaw from '../../../../data/upazilas.json';
import {
  CAN_DONATE_TO,
  calculateUrgency,
  isBiologicallyCompatible,
} from '@/lib/bloodCompatibility';

const districtsInfo = districtsRaw[2].data;
const upazilasInfo = upazilasRaw[2].data;
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function SearchPage() {
  const router = useRouter();

  const [bloodGroup, setBloodGroup] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  // Smart Compatibility & Urgency states
  const [smartMatch, setSmartMatch] = useState(true);
  const [sortByUrgency, setSortByUrgency] = useState(true);

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
    if (e) e.preventDefault();
    if (!bloodGroup && !district && !upazila) {
      setError('Please select at least one filter to start.');
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);

    const params = new URLSearchParams();
    params.append('status', 'pending');
    if (bloodGroup) {
      params.append('bloodGroup', bloodGroup);
      if (smartMatch) {
        params.append('smartMatch', 'true');
        params.append('donorBloodGroup', bloodGroup);
      }
    }
    if (district) params.append('district', district);
    if (upazila) params.append('upazila', upazila);
    if (sortByUrgency) params.append('sortByUrgency', 'true');

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/donation-requests?${params.toString()}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Could not fetch requests. Please try again.');
      let data = await res.json();

      // Client-side urgency calculation fallback / reinforcement
      data = data.map((item) => {
        const urgency = calculateUrgency(item.donationDate, item.donationTime);
        return {
          ...item,
          urgencyLevel: item.urgencyLevel || urgency.level,
          urgencyLabel: urgency.label,
          hoursRemaining: item.hoursRemaining !== undefined ? item.hoursRemaining : urgency.hoursRemaining,
        };
      });

      if (sortByUrgency) {
        const order = { critical: 1, high: 2, standard: 3 };
        data.sort((a, b) => (order[a.urgencyLevel] || 3) - (order[b.urgencyLevel] || 3));
      }

      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCompatibilityExplanation = () => {
    if (!bloodGroup || !smartMatch) return null;
    const recipients = CAN_DONATE_TO[bloodGroup] || [];
    if (bloodGroup === 'O-') {
      return '🌟 You are a Universal Donor (O-). Your red blood cells can be safely given to all 8 blood types!';
    }
    if (bloodGroup === 'AB+') {
      return '🩸 As an AB+ donor, you can donate red blood cells to AB+ patients. (For plasma, you are a universal donor!)';
    }
    return `🧬 As a ${bloodGroup} donor, you can safely donate to: ${recipients.join(', ')}. Showing all compatible patients.`;
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
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-sm disabled:opacity-70 cursor-pointer"
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

          {/* AI / Smart Compatibility Options Bar */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={smartMatch}
                  onChange={(e) => setSmartMatch(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer"
                />
                <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-500" />
                  Smart Biological Compatibility Match (ABO / Rh Matrix)
                </span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={sortByUrgency}
                  onChange={(e) => setSortByUrgency(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer"
                />
                <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                  <Flame size={14} className="text-rose-500" />
                  Prioritize Critical Emergencies
                </span>
              </label>
            </div>

            <span className="text-[11px] text-slate-500">
              {smartMatch ? '⚡ Matches all biologically compatible blood types' : '🔒 Strict exact group matching'}
            </span>
          </div>

          {/* Compatibility Explanation Banner */}
          {getCompatibilityExplanation() && (
            <div className="mt-4 p-3 bg-gradient-to-r from-red-50 via-rose-50 to-amber-50 border border-red-200/80 rounded-xl text-xs text-slate-700 flex items-start gap-2.5">
              <Sparkles size={16} className="text-red-600 shrink-0 mt-0.5" />
              <span>{getCompatibilityExplanation()}</span>
            </div>
          )}
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {results.length} Request{results.length > 1 ? 's' : ''} Found
                  </h2>
                  <span className="text-xs text-slate-500">
                    Sorted by {sortByUrgency ? 'Emergency Urgency Priority' : 'Standard Order'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((req) => (
                    <div
                      key={req._id}
                      className={`bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden ${
                        req.urgencyLevel === 'critical'
                          ? 'border-red-300 ring-1 ring-red-200'
                          : 'border-slate-200'
                      }`}
                    >
                      {/* Top Urgency & Blood Group Bar */}
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          {req.urgencyLevel === 'critical' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-100 text-red-700 text-[11px] font-bold rounded-full border border-red-200 animate-pulse mb-1.5">
                              <Flame size={12} />
                              🚨 Critical ({req.urgencyLabel || 'Immediate'})
                            </span>
                          )}
                          {req.urgencyLevel === 'high' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[11px] font-bold rounded-full border border-amber-200 mb-1.5">
                              <AlertTriangle size={12} />
                              ⚠️ High Priority ({req.urgencyLabel})
                            </span>
                          )}
                          {req.urgencyLevel === 'standard' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-medium rounded-full mb-1.5">
                              Scheduled ({req.urgencyLabel || 'Upcoming'})
                            </span>
                          )}
                          <h3 className="text-lg font-bold text-slate-900">{req.recipientName}</h3>
                        </div>

                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-extrabold border border-red-200 shrink-0">
                          <Droplet size={14} />
                          {req.bloodGroup}
                        </span>
                      </div>

                      {/* Compatibility Tag if cross-matched */}
                      {smartMatch && bloodGroup && req.bloodGroup !== bloodGroup && (
                        <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-md mb-3 flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-emerald-600" />
                          <span>Biologically compatible with your {bloodGroup} blood!</span>
                        </div>
                      )}

                      {/* Hospital & Address */}
                      {req.hospitalName && (
                        <p className="text-xs font-semibold text-slate-700 mb-2 truncate">
                          🏥 {req.hospitalName}
                        </p>
                      )}

                      <div className="space-y-2 text-slate-600 text-sm mb-6">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-slate-400 shrink-0" />
                          <span className="truncate">{req.district}, {req.upazila}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-slate-400 shrink-0" />
                          <span>{new Date(req.donationDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-slate-400 shrink-0" />
                          <span>{req.donationTime}</span>
                        </div>
                      </div>

                      <Link
                        href={`/donation-requests/${req._id}`}
                        className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
                      >
                        <Eye size={16} />
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