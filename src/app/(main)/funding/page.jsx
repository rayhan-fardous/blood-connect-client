// app/(dashboardLayout)/funding/page.jsx
'use client';

import { useState } from 'react';
import { useSession } from '@/lib/auth-client';
import {
  HandCoins,
  Search,
  Loader2,
  DollarSign,
  Users,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import toast from 'react-hot-toast';

// Dummy data
const allFundings = [
  { id: 'f1', donorName: 'Fahim Ahmed', amount: 750, date: '2026-04-05' },
  { id: 'f2', donorName: 'Nafisa Islam', amount: 1500, date: '2026-04-07' },
  { id: 'f3', donorName: 'Tanvir Hossain', amount: 400, date: '2026-04-10' },
  { id: 'f4', donorName: 'Jannatul Ferdous', amount: 950, date: '2026-04-12' },
  { id: 'f5', donorName: 'Rakibul Hasan', amount: 250, date: '2026-04-14' },
  { id: 'f6', donorName: 'Shamima Akter', amount: 1200, date: '2026-04-16' },
  { id: 'f7', donorName: 'Mizanur Rahman', amount: 3000, date: '2026-04-18' },
  { id: 'f8', donorName: 'Farzana Yasmin', amount: 650, date: '2026-04-20' },
  { id: 'f9', donorName: 'Mehedi Hasan', amount: 1800, date: '2026-04-22' },
  { id: 'f10', donorName: 'Sadia Rahman', amount: 500, date: '2026-04-25' },
  { id: 'f11', donorName: 'Arif Khan', amount: 2200, date: '2026-04-27' },
  { id: 'f12', donorName: 'Tania Sultana', amount: 850, date: '2026-04-29' },
  { id: 'f13', donorName: 'Imran Hossain', amount: 1300, date: '2026-05-02' },
  { id: 'f14', donorName: 'Lima Chowdhury', amount: 450, date: '2026-05-04' },
  { id: 'f15', donorName: 'Sabbir Ahmed', amount: 1750, date: '2026-05-06' },
];

const ITEMS_PER_PAGE = 5;

export default function FundingPage() {
  const { data: session, isPending: sessionLoading } = useSession();
  const [fundings, setFundings] = useState(allFundings);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [fundAmount, setFundAmount] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);

  const totalDonors = new Set(fundings.map((f) => f.donorName)).size;
  const totalAmount = fundings.reduce((sum, f) => sum + f.amount, 0);

  const filtered = fundings.filter((f) =>
    f.donorName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleGiveFund = () => {
    if (!fundAmount || isNaN(fundAmount) || Number(fundAmount) <= 0) {
      toast.error('Enter a valid amount');
      return;
    }
    setPaymentLoading(true);
    setTimeout(() => {
      const newFunding = {
        id: `f${fundings.length + 1}`,
        donorName: session?.user?.name || 'You',
        amount: Number(fundAmount),
        date: new Date().toISOString().split('T')[0],
      };
      setFundings([newFunding, ...fundings]);
      toast.success('Thank you for your donation!');
      setShowModal(false);
      setFundAmount('');
      setPaymentLoading(false);
    }, 1500);
  };

  if (sessionLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0b0f1c]">
        <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
      </div>
    );
  }

  return (

    <div className="min-h-screen max-w-full  bg-[#0b0f1c]  px-4 md:px-8 py-8 pt-38">
      <div className="max-w-6xl mx-auto space-y-8">
    
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#2d1b3e] p-8 md:p-10 text-white shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider border border-white/10">
                <Sparkles size={14} className="text-yellow-300" />
                Community Support
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold mt-4 tracking-tight">
                Funding{' '}
                <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                  Platform
                </span>
              </h1>
              <p className="text-gray-300 mt-2 text-sm max-w-md">
                Every contribution keeps our life‑saving mission running.
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-red-600/30 transition-all"
            >
              <HandCoins size={18} />
              Give Fund
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HandCoins size={20} className="text-red-400" />
              Recent Donations
            </h2>

          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-gray-400">
                    Donor
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-400">
                    Amount
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-400">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {paginated.map((fund) => (
                  <tr
                    key={fund.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-5 py-4 font-medium text-white">
                      {fund.donorName}
                    </td>
                    <td className="px-5 py-4 text-emerald-300 font-semibold">
                      ${fund.amount.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-gray-300">
                      {new Date(fund.date).toLocaleDateString('en-BD', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
                {paginated.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-5 py-10 text-center text-gray-500"
                    >
                      No donations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {paginated.map((fund) => (
              <div
                key={fund.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-white">{fund.donorName}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(fund.date).toLocaleDateString('en-BD')}
                  </p>
                </div>
                <p className="text-emerald-300 font-bold">৳{fund.amount}</p>
              </div>
            ))}
            {paginated.length === 0 && (
              <p className="text-center text-gray-500 py-6">
                No donations found.
              </p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm bg-white/5 border border-gray-700 rounded-lg disabled:opacity-40 hover:bg-white/10 text-gray-300"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium ${
                      currentPage === page
                        ? 'bg-red-600 text-white'
                        : 'bg-white/5 border border-gray-700 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm bg-white/5 border border-gray-700 rounded-lg disabled:opacity-40 hover:bg-white/10 text-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Donation Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#1e1e2e] w-full max-w-md rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
              <div className="relative p-6 md:p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-white">
                    Make a Donation
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-white transition"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-5">
                  <p className="text-sm text-gray-300">
                    Your generosity helps us connect donors and save lives.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Amount ($)
                    </label>
                    <div className="relative">
                      <DollarSign
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={fundAmount}
                        onChange={(e) => setFundAmount(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleGiveFund}
                    disabled={paymentLoading}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-70"
                  >
                    {paymentLoading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <HandCoins size={18} /> Confirm Donation
                      </>
                    )}
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    Secure payment via Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}