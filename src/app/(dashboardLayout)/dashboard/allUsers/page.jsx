'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  ShieldCheck,
  UserX,
  UserCheck,
  Shield,
  Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 5;

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter users
  const fetchUsers = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/users')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then((data) => {
       
        const normalized = data.map((u) => ({
          ...u,
          id: u._id ? u._id.toString() : u.id, 
          roll: (u.roll || 'donor').toLowerCase(),
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
    if (
      searchTerm &&
      !user?.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !user?.email.toLowerCase().includes(searchTerm.toLowerCase())
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
      const res = await fetch(`http://localhost:5000/api/users/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ...body }),
      });
      const data = await res.json();
      if (data.success) {
        fetchUsers(); // refresh list
        toast.success('User updated');
      } else {
        toast.error(data.message || 'Update failed');
      }
    } catch (err) {
      toast.error('Network error');
    }
  };

  const handleBlock = (email) => updateUser(email, { status: 'blocked' });
  const handleUnblock = (email) => updateUser(email, { status: 'active' });
  const handleMakeVolunteer = (email) =>
    updateUser(email, { role: 'volunteer' });
  const handleMakeAdmin = (email) => updateUser(email, { role: 'admin' });

  // Role badge
  const roleBadge = (role) => {
    const colors = {
      donor: 'bg-gray-100 text-gray-700 border-gray-200',
      volunteer: 'bg-blue-50 text-blue-700 border-blue-200',
      admin: 'bg-red-50 text-red-700 border-red-200',
    };
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors[role]}`}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  // Status badge
  const statusBadge = (status) => {
    const colors =
      status === 'active'
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
        : 'bg-red-50 text-red-700 border-red-200';
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors}`}
      >
        {status === 'active' ? 'Active' : 'Blocked'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>{error}</p>
        <button onClick={fetchUsers} className="underline mt-2">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-1">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
        <p className="text-gray-500 text-sm">
          Manage platform users and their roles.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search name or email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
          <Filter
            size={14}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="text-left px-5 py-3 font-semibold text-gray-500">
                User
              </th>
              <th className="text-left px-5 py-3 font-semibold text-gray-500">
                Email
              </th>
              <th className="text-left px-5 py-3 font-semibold text-gray-500">
                Role
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
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => {
                const role = user.roll || 'donor';
                const status = user.status || 'active';
                const email = user.email; // required for update

                return (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50/30 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.image || '/default-avatar.png'}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover border border-gray-200"
                        />
                        <span className="font-medium text-gray-900">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{user.email}</td>
                    <td className="px-5 py-4">{roleBadge(role)}</td>
                    <td className="px-5 py-4">{statusBadge(status)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {/* Block / Unblock */}
                        {status === 'active' && (
                          <button
                            onClick={() => handleBlock(email)}
                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="Block User"
                          >
                            <UserX size={16} />
                          </button>
                        )}
                        {status === 'blocked' && (
                          <button
                            onClick={() => handleUnblock(email)}
                            className="p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                            title="Unblock User"
                          >
                            <UserCheck size={16} />
                          </button>
                        )}

                        {/* Make Volunteer (only if donor) */}
                        {role === 'donor' && (
                          <button
                            onClick={() => handleMakeVolunteer(email)}
                            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Make Volunteer"
                          >
                            <Shield size={16} />
                          </button>
                        )}

                        {/* Make Admin (if not already admin) */}
                        {role !== 'admin' && (
                          <button
                            onClick={() => handleMakeAdmin(email)}
                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="Make Admin"
                          >
                            <ShieldCheck size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-12 text-center text-gray-400"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {paginatedUsers.length > 0 ? (
          paginatedUsers.map((user) => {
            const role = user.roll || 'donor';
            const status = user.status || 'active';
            const email = user.email;

            return (
              <div
                key={user.id}
                className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 p-4 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={user.image || '/default-avatar.png'}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                  <div className="flex gap-2">
                    {roleBadge(role)}
                    {statusBadge(status)}
                  </div>
                  <div className="flex items-center gap-2">
                    {status === 'active' && (
                      <button
                        onClick={() => handleBlock(email)}
                        className="text-red-600"
                      >
                        <UserX size={18} />
                      </button>
                    )}
                    {status === 'blocked' && (
                      <button
                        onClick={() => handleUnblock(email)}
                        className="text-emerald-600"
                      >
                        <UserCheck size={18} />
                      </button>
                    )}
                    {role === 'donor' && (
                      <button
                        onClick={() => handleMakeVolunteer(email)}
                        className="text-blue-600"
                      >
                        <Shield size={18} />
                      </button>
                    )}
                    {role !== 'admin' && (
                      <button
                        onClick={() => handleMakeAdmin(email)}
                        className="text-red-600"
                      >
                        <ShieldCheck size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
          );
          })
        ) : (
          <p className="text-center text-gray-400 py-12">No users found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-lg text-sm font-medium ${
                currentPage === page
                  ? 'bg-red-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllUsers;