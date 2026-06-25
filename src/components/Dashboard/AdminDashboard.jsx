// components/dashboards/AdminDashboard.jsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import {
  Users,
  HandCoins,
  Droplet,
  Activity,
  ArrowRight,
  Sparkles,
  BarChart3,
  PieChart,
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
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export default function AdminDashboard() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [totalDonors, setTotalDonors] = useState(0);
  const [totalFunding, setTotalFunding] = useState(0);
  const [bloodRequests, setBloodRequests] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);

  // Static chart data
  const monthlyRequestsData = [
    { month: 'Jan', requests: 65 },
    { month: 'Feb', requests: 78 },
    { month: 'Mar', requests: 92 },
    { month: 'Apr', requests: 81 },
    { month: 'May', requests: 110 },
    { month: 'Jun', requests: 105 },
    { month: 'Jul', requests: 130 },
    { month: 'Aug', requests: 122 },
    { month: 'Sep', requests: 98 },
    { month: 'Oct', requests: 115 },
    { month: 'Nov', requests: 140 },
    { month: 'Dec', requests: 155 },
  ];

  const statusData = [
    { name: 'Pending', value: 320, color: '#6b7280' },
    { name: 'In Progress', value: 215, color: '#3b82f6' },
    { name: 'Done', value: 250, color: '#10b981' },
    { name: 'Canceled', value: 58, color: '#ef4444' },
  ];

  const fetchStats = async () => {
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

      const requestsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/donation-requests`);
      const requests = await requestsRes.json();
      setBloodRequests(requests.length);
    } catch (err) {
      console.error('Stats fetch error:', err);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();

    const handleStatsUpdate = () => {
      fetchStats();
    };
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
      
      {/* Premium Crimson Premium & Carbon Accent Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-zinc-900 p-6 md:p-10 text-white border border-slate-800 shadow-2xl">
        {/* Modern ambient ruby/rose glow effects */}
        <div className="absolute -top-24 -right-12 w-80 h-80 bg-rose-500/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-36 -left-16 w-72 h-72 bg-slate-500/5 rounded-full blur-[70px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium tracking-wide text-rose-400">
              <Sparkles size={13} className="text-rose-500 fill-rose-500/20" />
              Administrative Overview
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Welcome back,{' '}
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                {user?.name || 'Administrator'}
              </span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base font-normal leading-relaxed">
              Oversee the core platform frameworks, track transaction activities, and monitor emergency healthcare requests in real-time.
            </p>
          </div>
          <Link
            href="/dashboard/allUsers"
            className="flex items-center gap-2 bg-gradient-to-r from-slate-50 to-white text-slate-950 hover:from-rose-600 hover:to-rose-500 hover:text-white px-5 py-3 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 group shadow-md shrink-0 border border-slate-200/10"
          >
            <Users size={14} />
            Manage Users
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Analytics Metrics Cards (Fully Dynamic Text Pluralization) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          {
            title: 'Registered Donors',
            value: `${totalDonors.toLocaleString()} ${totalDonors === 1 ? 'Donor' : 'Donors'}`,
            icon: Users,
            col: 'text-blue-600 bg-blue-50 border-blue-100',
          },
          {
            title: 'Platform Funding',
            value: `৳ ${totalFunding.toLocaleString()}`,
            icon: HandCoins,
            col: 'text-emerald-600 bg-emerald-50 border-emerald-100',
          },
          {
            title: 'Blood Requests',
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Monthly Requests Bar Chart */}
        <div className="lg:col-span-3 bg-white border border-slate-200/80 shadow-sm rounded-xl p-5">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-6 tracking-tight">
            <BarChart3 className="text-rose-600" size={18} />
            Monthly Blood Requests
          </h3>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyRequestsData}
                margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="month"
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
                  fill="url(#adminBarGradient)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={28}
                />
                <defs>
                  <linearGradient id="adminBarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity={1} />
                    <stop offset="100%" stopColor="#be123c" stopOpacity={0.85} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Pie Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 shadow-sm rounded-xl p-5">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-6 tracking-tight">
            <PieChart className="text-rose-600" size={18} />
            Request Status Spread
          </h3>
          <div className="w-full h-72 flex flex-col justify-between">
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      fontSize: '12px',
                    }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            {/* Minimalist Grid Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-500 px-2 pb-1">
              {statusData.map((entry, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                  <span className="truncate">{entry.name} ({entry.value})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links / Navigation Action Blocks */}
      <div className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 tracking-tight">
          <Activity className="text-rose-600" size={18} />
          System Control Dashboard Quick Links
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'View All Users', href: '/dashboard/allUsers', icon: Users, color: 'text-blue-600 bg-blue-50 border-blue-100' },
            { label: 'Manage Requests', href: '/dashboard/allDonationRequests', icon: Droplet, color: 'text-rose-600 bg-rose-50 border-rose-100' },
            { label: 'Funding Overview', href: '/funding', icon: HandCoins, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
            { label: 'System Reports', href: '#', icon: BarChart3, color: 'text-slate-600 bg-slate-50 border-slate-200' },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center justify-center text-center gap-2.5 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-200 group"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${action.color} group-hover:scale-105 transition-transform`}>
                <action.icon size={18} />
              </div>
              <span className="text-xs font-bold text-slate-700 tracking-wide">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}