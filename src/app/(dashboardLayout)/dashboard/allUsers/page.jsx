// app/(dashboardLayout)/all-users/page.jsx
'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  ChevronDown,
  ShieldCheck,
  UserX,
  UserCheck,
  Shield,
  Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 5;

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then((data) => {
        const normalized = data.map((u) => ({
          ...u,
          id: u._id ? u._id.toString() : u.id,
          role: (u.role || u.roll || 'donor').toLowerCase(),
          status: (u.status || 'active').toLowerCase(),
        }));
        setUsers(normalized);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    if (statusFilter !== 'all' && user.status !== statusFilter) return false;
    if (roleFilter !== 'all' && user.role !== roleFilter) return false;
    if (
      searchTerm &&
      !user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const updateUser = async (email, body) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ...body }),
      });
      const data = await res.json();
      if (data.success) {
        fetchUsers();
        toast.success('User updated successfully');
      } else {
        toast.error(data.message || 'Update failed');
      }
    } catch (err) {
      toast.error('Network error');
    }
  };

  const handleBlock = (email) => updateUser(email, { status: 'blocked' });
  const handleUnblock = (email) => updateUser(email, { status: 'active' });
  const handleMakeVolunteer = (email) => updateUser(email, { role: 'volunteer' });
  const handleMakeAdmin = (email) => updateUser(email, { role: 'admin' });

  const RoleBadge = ({ role }) => {
    const colors = {
      donor: 'bg-gray-100 text-gray-700 border-gray-200',
      volunteer: 'bg-blue-50 text-blue-700 border-blue-200',
      admin: 'bg-red-50 text-red-700 border-red-200',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors[role] || colors.donor}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const StatusBadge = ({ status }) => {
    const colors =
      status === 'active'
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
        : 'bg-red-50 text-red-700 border-red-200';
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors}`}>
        {status === 'active' ? 'Active' : 'Blocked'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-slate-50">
        <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 bg-white max-w-xl mx-auto my-10 border border-slate-200 rounded-xl p-6">
        <p className="text-sm text-slate-600">{error}</p>
        <button onClick={fetchUsers} className="mt-4 underline text-xs font-semibold text-red-600">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">All Users</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Manage platform users, coordinate controls, and assign security roles.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300/30 transition-all"
            />
          </div>

          {/* Role Filter */}
          <div className="relative min-w-[140px]">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full appearance-none bg-slate-50/50 border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:border-slate-300 transition-all cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="donor">Donor</option>
              <option value="volunteer">Volunteer</option>
              <option value="admin">Admin</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative min-w-[140px]">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full appearance-none bg-slate-50/50 border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:border-slate-300 transition-all cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Desktop Interface (Table) */}
        <div className="hidden md:block overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Email</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.image || '/default-avatar.png'}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 bg-slate-100"
                        />
                        <span className="font-medium text-slate-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{user.email}</td>
                    <td className="px-6 py-4">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {user.status === 'active' ? (
                          <button
                            onClick={() => handleBlock(user.email)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Block User"
                          >
                            <UserX size={16} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUnblock(user.email)}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                            title="Unblock User"
                          >
                            <UserCheck size={16} />
                          </button>
                        )}

                        {user.role === 'donor' && (
                          <button
                            onClick={() => handleMakeVolunteer(user.email)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="Make Volunteer"
                          >
                            <Shield size={16} />
                          </button>
                        )}

                        {user.role !== 'admin' && (
                          <button
                            onClick={() => handleMakeAdmin(user.email)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Make Admin"
                          >
                            <ShieldCheck size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-sm">
                    No users found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Interface (Cards) */}
        <div className="md:hidden space-y-4">
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <div key={user.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={user.image || '/default-avatar.png'}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 bg-slate-100"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 leading-tight">{user.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <div className="flex gap-1.5">
                    <RoleBadge role={user.role} />
                    <StatusBadge status={user.status} />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {user.status === 'active' ? (
                      <button onClick={() => handleBlock(user.email)} className="p-1 text-slate-400 hover:text-red-600">
                        <UserX size={16} />
                      </button>
                    ) : (
                      <button onClick={() => handleUnblock(user.email)} className="p-1 text-slate-400 hover:text-emerald-600">
                        <UserCheck size={16} />
                      </button>
                    )}
                    {user.role === 'donor' && (
                      <button onClick={() => handleMakeVolunteer(user.email)} className="p-1 text-slate-400 hover:text-blue-600">
                        <Shield size={16} />
                      </button>
                    )}
                    {user.role !== 'admin' && (
                      <button onClick={() => handleMakeAdmin(user.email)} className="p-1 text-slate-400 hover:text-red-600">
                        <ShieldCheck size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-400 py-12 text-sm bg-white border border-slate-200 rounded-xl">
              No users found matching the selected filters.
            </p>
          )}
        </div>

        {/* Pagination Block */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1.5 mt-4 pt-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 rounded-lg disabled:opacity-40 hover:bg-slate-50 transition-colors"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                  currentPage === page
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 rounded-lg disabled:opacity-40 hover:bg-slate-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
}