// components/dashboards/VolunteerDashboard.jsx
'use client';

import { useSession } from '@/lib/auth-client';
import {
  Users,
  Droplet,
  CheckCircle,
  Activity,
  ArrowRight,
  Sparkles,
  Clock,
  MapPin,
  BarChart3,
  Phone,
  CalendarDays,
  ClipboardList,
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

// Dummy data (replace with API later)
const stats = [
  {
    title: 'Open Requests',
    value: 320,
    icon: Droplet,
    gradient: 'from-red-500 to-rose-600',
    shadow: 'shadow-red-500/30',
  },
  {
    title: 'In Progress',
    value: 215,
    icon: Activity,
    gradient: 'from-blue-500 to-indigo-600',
    shadow: 'shadow-blue-500/30',
  },
  {
    title: 'Fulfilled Today',
    value: 48,
    icon: CheckCircle,
    gradient: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-500/30',
  },
  {
    title: 'Registered Donors',
    value: 1256,
    icon: Users,
    gradient: 'from-purple-500 to-violet-600',
    shadow: 'shadow-purple-500/30',
  },
];

const weeklyData = [
  { day: 'Sat', requests: 22 },
  { day: 'Sun', requests: 18 },
  { day: 'Mon', requests: 30 },
  { day: 'Tue', requests: 25 },
  { day: 'Wed', requests: 35 },
  { day: 'Thu', requests: 28 },
  { day: 'Fri', requests: 40 },
];

const recentDonors = [
  {
    id: 1,
    name: 'Karim Uddin',
    bloodGroup: 'O+',
    location: 'Dhaka',
    date: '2026-03-20',
  },
  {
    id: 2,
    name: 'Ayesha Siddiqua',
    bloodGroup: 'A-',
    location: 'Chittagong',
    date: '2026-03-19',
  },
  {
    id: 3,
    name: 'Rafiq Hasan',
    bloodGroup: 'B+',
    location: 'Rajshahi',
    date: '2026-03-19',
  },
  {
    id: 4,
    name: 'Sadia Rahman',
    bloodGroup: 'AB+',
    location: 'Sylhet',
    date: '2026-03-18',
  },
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

const VolunteerDashboard = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-red-200 border-t-red-600 rounded-full animate-spin" />
            <Droplet
              size={24}
              className="absolute inset-0 m-auto text-red-600 animate-pulse"
            />
          </div>
          <p className="text-gray-500 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-1">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#2d1b3e] p-8 md:p-10 text-white shadow-xl shadow-indigo-500/10">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-bl from-red-600/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-gradient-to-tr from-rose-600/10 to-transparent rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider border border-white/10">
              <Sparkles size={14} className="text-yellow-300" />
              Volunteer Panel
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mt-4 tracking-tight">
              Welcome back,{' '}
              <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                {user?.name || 'Volunteer'}
              </span>
            </h1>
            <p className="text-gray-300 mt-3 text-base md:text-lg font-light max-w-xl leading-relaxed">
              Manage blood donation requests and help connect donors with
              patients in need.
            </p>
          </div>
          <Link
            href="/dashboard/all-requests"
            className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 group"
          >
            <Droplet size={18} />
            View All Requests
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-lg shadow-gray-100/50 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-full -mr-4 -mt-4" />
            <div className="relative flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {stat.title}
                </p>
                <p className="text-3xl font-extrabold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center text-white shadow-lg ${stat.shadow}`}
              >
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart & Recent Donors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Requests Chart */}
        <div className="lg:col-span-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-lg shadow-gray-100/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
            <BarChart3 className="text-red-500" size={22} />
            Requests This Week
          </h3>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  width={30}
                />
                <Tooltip
                  contentStyle={{
                    background: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                    padding: '8px 12px',
                  }}
                  cursor={{ fill: 'rgba(239, 68, 68, 0.05)' }}
                />
                <Bar
                  dataKey="requests"
                  fill="url(#volBarGradient)"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={32}
                />
                <defs>
                  <linearGradient
                    id="volBarGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
                    <stop offset="100%" stopColor="#dc2626" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Donors */}
        <div className="bg-white/40 backdrop-blur-md border border-white/60 shadow-lg shadow-gray-100/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Users className="text-red-500" size={22} />
            Recent Donors
          </h3>
          <div className="space-y-3">
            {recentDonors.map((donor) => (
              <div
                key={donor.id}
                className="flex items-center justify-between bg-white/60 p-3 rounded-xl"
              >
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    {donor.name}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin size={10} /> {donor.location}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 bg-red-50 text-red-700 rounded-full text-xs font-bold">
                    {donor.bloodGroup}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(donor.date).toLocaleDateString('en-BD')}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/dashboard/donors"
            className="mt-4 text-xs font-semibold text-red-600 hover:underline flex items-center gap-1"
          >
            View All Donors <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Upcoming Camps & Quick Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upcoming Blood Camps */}
        <div className="bg-white/40 backdrop-blur-md border border-white/60 shadow-lg shadow-gray-100/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <CalendarDays className="text-red-500" size={22} />
            Upcoming Blood Camps
          </h3>
          <div className="space-y-4">
            {upcomingCamps.map((camp) => (
              <div
                key={camp.id}
                className="flex items-center gap-4 bg-white/60 p-4 rounded-xl"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                  <CalendarDays size={24} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{camp.location}</p>
                  <p className="text-xs text-gray-500">
                    {camp.date} • {camp.time}
                  </p>
                </div>
                <button className="px-3 py-1.5 text-xs font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tasks */}
        <div className="bg-white/40 backdrop-blur-md border border-white/60 shadow-lg shadow-gray-100/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <ClipboardList className="text-red-500" size={22} />
            Quick Tasks
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-4 bg-white/60 hover:bg-white rounded-xl transition-colors text-left">
              <Users size={18} className="text-blue-500" />
              <span className="text-sm font-medium text-gray-700">
                Assign donor to pending request
              </span>
            </button>
            <button className="w-full flex items-center gap-3 p-4 bg-white/60 hover:bg-white rounded-xl transition-colors text-left">
              <Phone size={18} className="text-emerald-500" />
              <span className="text-sm font-medium text-gray-700">
                Verify donor eligibility
              </span>
            </button>
            <button className="w-full flex items-center gap-3 p-4 bg-white/60 hover:bg-white rounded-xl transition-colors text-left">
              <MapPin size={18} className="text-red-500" />
              <span className="text-sm font-medium text-gray-700">
                Update camp location
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;