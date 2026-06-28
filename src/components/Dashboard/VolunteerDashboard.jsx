// components/dashboards/VolunteerDashboard.jsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import {
  Users,
  Droplet,
  ArrowRight,
  Sparkles,
  HandCoins,
  MapPin,
  BarChart3,
  Phone,
  CalendarDays,
  ClipboardList,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function VolunteerDashboard() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Dynamic API metrics
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalFunding, setTotalFunding] = useState(0);
  const [bloodRequests, setBloodRequests] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);
  const [recentDonors, setRecentDonors] = useState([]);

  // Static visualization data
  const weeklyData = [
    { day: 'Sat', requests: 22 },
    { day: 'Sun', requests: 18 },
    { day: 'Mon', requests: 30 },
    { day: 'Tue', requests: 25 },
    { day: 'Wed', requests: 35 },
    { day: 'Thu', requests: 28 },
    { day: 'Fri', requests: 40 },
  ];

  const upcomingCamps = [
    {
      id: 1,
      location: 'Dhaka Medical College',
      date: '2026-03-25',
      time: '9 AM - 4 PM',
    },
    {
      id: 2,
      location: 'Chittagong General Hospital',
      date: '2026-03-28',
      time: '10 AM - 3 PM',
    },
  ];

  const fetchData = async () => {
    try {
      const fundingRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/funding`);
      const fundings = await fundingRes.json();
      const totalFunding = fundings.reduce((sum, f) => sum + f.amount, 0);
      setTotalFunding(totalFunding);

      const usersRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
      const users = await usersRes.json();

      const donorCount = users.filter(
        (u) => (u.roll || 'Donor').toLowerCase() === 'donor'
      ).length;
      setTotalDonors(donorCount);

      const donorsOnly = users
        .filter((u) => (u.roll || 'Donor').toLowerCase() === 'donor')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4)
        .map((u) => ({
          id: u.id || u._id,
          name: u.name,
          bloodGroup: u.bloodGroup || 'N/A',
          location: u.district ? `${u.upazila || ''}, ${u.district}` : 'N/A',
          date: u.createdAt,
          image: u.image || '/default-avatar.png',
        }));
      setRecentDonors(donorsOnly);

      const requestsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/donation-requests`);
      const requests = await requestsRes.json();
      setBloodRequests(requests.length);
    } catch (err) {
      console.error('Volunteer data fetch error:', err);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchData();

    const handleStatsUpdate = () => fetchData();
    window.addEventListener('statsUpdated', handleStatsUpdate);
    return () => window.removeEventListener('statsUpdated', handleStatsUpdate);
  }, []);

  if (isPending || loadingStats) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-rose-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 antialiased text-slate-800">
      
      {/* Premium Crimson & Carbon Accent Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-zinc-900 p-6 md:p-10 text-white border border-slate-800 shadow-2xl">
        {/* Modern ambient ruby/rose glow effects */}
        <div className="absolute -top-24 -right-12 w-80 h-80 bg-rose-500/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-36 -left-16 w-72 h-72 bg-slate-500/5 rounded-full blur-[70px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium tracking-wide text-rose-400">
              <Sparkles size={13} className="text-rose-500 fill-rose-500/20" />
              Volunteer Operations Panel
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Welcome back,{' '}
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                {user?.name || 'Volunteer'}
              </span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base font-normal leading-relaxed">
              Manage ongoing blood donation requests, orchestrate safe field camps, and help bridge communication channels between donors and healthcare recipients.
            </p>
          </div>
          <Link
            href="/dashboard/allDonationRequests"
            className="flex items-center gap-2 bg-gradient-to-r from-slate-50 to-white text-slate-950 hover:from-rose-600 hover:to-rose-500 hover:text-white px-5 py-3 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 group shadow-md shrink-0 border border-slate-200/10"
          >
            <Droplet size={14} />
            View All Requests
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Analytics Metrics Cards (Fully Dynamic Text Pluralization) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          {
            title: 'Total Active Donors',
            value: `${totalDonors.toLocaleString()} ${totalDonors === 1 ? 'Donor' : 'Donors'}`,
            icon: Users,
            col: 'text-blue-600 bg-blue-50 border-blue-100',
          },
          {
            title: 'Aggregated Funding',
            value: `$ ${totalFunding.toLocaleString()}`,
            icon: HandCoins,
            col: 'text-emerald-600 bg-emerald-50 border-emerald-100',
          },
          {
            title: 'Urgent Blood Requests',
            value: `${bloodRequests.toLocaleString()} ${bloodRequests === 1 ? 'Post' : 'Posts'}`,
            icon: Droplet,
            col: 'text-rose-600 bg-rose-50 border-rose-100',
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                {stat.title}
              </p>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${stat.col}`}>
                <stat.icon size={16} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Grid: Chart & Recent Registrations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Analysis Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 shadow-sm rounded-xl p-5">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-6 tracking-tight">
            <BarChart3 className="text-rose-600" size={18} />
            Requests This Week
          </h3>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }}
                  width={40}
                />
                <Tooltip
                  contentStyle={{
                    background: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                    padding: '8px 12px',
                  }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                  labelStyle={{ color: '#94a3b8', fontSize: '10px', fontWeight: 600, uppercase: true }}
                  cursor={{ fill: 'rgba(244, 63, 94, 0.04)' }}
                />
                <Bar
                  dataKey="requests"
                  fill="url(#volBarGradient)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={28}
                />
                <defs>
                  <linearGradient id="volBarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity={1} />
                    <stop offset="100%" stopColor="#be123c" stopOpacity={0.85} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Registered Donors Feed */}
        <div className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4 tracking-tight">
              <Users className="text-rose-600" size={18} />
              Recent Donors
            </h3>
            <div className="space-y-3">
              {recentDonors.length > 0 ? (
                recentDonors.map((donor) => (
                  <div
                    key={donor.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800 text-xs truncate">
                        {donor.name}
                      </p>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 font-medium truncate">
                        <MapPin size={11} className="text-slate-400 shrink-0" /> {donor.location}
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <span className="inline-block px-2 py-0.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-md text-[10px] font-extrabold tracking-wide">
                        {donor.bloodGroup}
                      </span>
                      <p className="text-[10px] text-slate-400 font-medium mt-1">
                        {new Date(donor.date).toLocaleDateString('en-BD')}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-8 text-xs font-medium text-slate-400">
                  No medical donors registered yet.
                </p>
              )}
            </div>
          </div>
          <Link
            href="/dashboard/donors"
            className="mt-4 text-xs font-bold text-rose-600 hover:text-rose-700 inline-flex items-center gap-1 transition-colors"
          >
            View All Registered Donors <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Grid: Upcoming Event Hubs & Utility Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Blood Drives / Campaigns */}
        <div className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-5">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4 tracking-tight">
            <CalendarDays className="text-rose-600" size={18} />
            Upcoming Donation Camps
          </h3>
          <div className="space-y-3">
            {upcomingCamps.map((camp) => (
              <div
                key={camp.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div className="w-10 h-10 bg-rose-50 border border-rose-100 rounded-lg flex items-center justify-center text-rose-600 shrink-0">
                  <CalendarDays size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{camp.location}</p>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {camp.date} &bull; {camp.time}
                  </p>
                </div>
                <button className="px-3 py-1.5 text-[11px] font-bold bg-slate-900 hover:bg-rose-600 text-white rounded-lg transition-colors shadow-sm shrink-0">
                  Join Team
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Operations Tasks */}
        <div className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-5">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4 tracking-tight">
            <ClipboardList className="text-rose-600" size={18} />
            Immediate Operations Checklists
          </h3>
          <div className="space-y-2.5">
            {[
              { text: 'Assign donor profiles to pending targets', icon: Users, col: 'text-blue-600 bg-blue-50' },
              { text: 'Verify system donor eligibility parameters', icon: Phone, col: 'text-emerald-600 bg-emerald-50' },
              { text: 'Update scheduled deployment sector sites', icon: MapPin, col: 'text-rose-600 bg-rose-50' },
            ].map((task, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 p-3 bg-slate-50/70 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all text-left group"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${task.col}`}>
                  <task.icon size={14} />
                </div>
                <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                  {task.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}