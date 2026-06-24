// components/dashboards/AdminDashboard.jsx
'use client';

import { useSession } from '@/lib/auth-client';
import {
  Users,
  HandCoins,
  Droplet,
  Activity,
  ArrowRight,
  Sparkles,
  TrendingUp,
  BarChart3,
  PieChart,
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

// Static dummy data (replace with API later)
const stats = [
  {
    title: 'Total Donors',
    value: 1256,
    icon: Users,
    gradient: 'from-blue-500 to-indigo-600',
    shadow: 'shadow-blue-500/30',
  },
  {
    title: 'Total Funding',
    value: '৳ 185,000',
    icon: HandCoins,
    gradient: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-500/30',
  },
  {
    title: 'Blood Requests',
    value: 843,
    icon: Droplet,
    gradient: 'from-red-500 to-rose-600',
    shadow: 'shadow-red-500/30',
  },
];

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

const AdminDashboard = () => {
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
          <p className="text-gray-500 font-medium">
            Loading admin dashboard...
          </p>
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
              Admin Panel
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mt-4 tracking-tight">
              Welcome back,{' '}
              <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                {user?.name || 'Admin'}
              </span>
            </h1>
            <p className="text-gray-300 mt-3 text-base md:text-lg font-light max-w-xl leading-relaxed">
              Oversee the platform and track life‑saving activities in real
              time.
            </p>
          </div>
          <Link
            href="/dashboard/allUsers"
            className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 group"
          >
            <Users size={18} />
            Manage Users
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Monthly Requests Bar Chart */}
        <div className="lg:col-span-3 bg-white/40 backdrop-blur-md border border-white/60 shadow-lg shadow-gray-100/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
            <BarChart3 className="text-red-500" size={22} />
            Monthly Blood Requests
          </h3>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyRequestsData}
                margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
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
                  fill="url(#adminBarGradient)"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={32}
                />
                <defs>
                  <linearGradient
                    id="adminBarGradient"
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

        {/* Status Pie Chart */}
        <div className="lg:col-span-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-lg shadow-gray-100/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
            <PieChart className="text-red-500" size={22} />
            Request Status
          </h3>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                    padding: '8px 12px',
                  }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Links or Recent Activity (extra) */}
      <div className="bg-white/40 backdrop-blur-md border border-white/60 shadow-lg shadow-gray-100/50 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
          <Activity className="text-red-500" size={22} />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'View All Users', href: '/dashboard/allUsers', icon: Users },
            {
              label: 'Manage Requests',
              href: '/dashboard/requests',
              icon: Droplet,
            },
            {
              label: 'Funding Overview',
              href: '/dashboard/funding',
              icon: HandCoins,
            },
            { label: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/60 hover:bg-white hover:shadow-md transition-all"
            >
              <action.icon size={24} className="text-red-500" />
              <span className="text-sm font-medium text-gray-700">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;