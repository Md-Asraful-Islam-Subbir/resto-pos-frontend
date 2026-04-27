import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentInfo = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://resto-pos-backend.onrender.com/api/payments");
        setPayments(res.data.payments); // backend returns { payments: [...] }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch payments");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-white"></div>
          <p className="text-gray-400 text-sm sm:text-base">Loading payment info...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-center">
          <p className="text-red-400 text-sm sm:text-base">{error}</p>
        </div>
      </div>
    );
  }

  // Empty State
  if (payments.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <svg 
            className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1.5"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          <p className="text-gray-400 text-sm sm:text-base">No payments found</p>
        </div>
      </div>
    );
  }

  // Format currency
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'BDT',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Status color mapping
  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'completed':
      case 'success':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed':
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'processing':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="payment-info text-white">
      {/* Header */}
      <div className="mb-4 sm:mb-5 md:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#f5f5f5]">
          All Payments
        </h2>
        <p className="text-[11px] sm:text-xs md:text-sm text-[#ababab] mt-1">
          Total {payments.length} payment{payments.length !== 1 ? 's' : ''} recorded
        </p>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-3 sm:space-y-4">
        {payments.map((payment) => (
          <div
            key={payment._id}
            className="bg-[#1a1a1a] rounded-lg p-3 sm:p-4 border border-gray-800 hover:border-gray-700 transition-colors duration-200"
          >
            <div className="flex justify-between items-start mb-2 sm:mb-3">
              <div className="flex-1 min-w-0">
                <p className="text-[11px] sm:text-xs text-gray-400 mb-0.5">Transaction ID</p>
                <p className="text-xs sm:text-sm font-medium text-[#f5f5f5] truncate">
                  {payment.tran_id}
                </p>
              </div>
              <span
                className={`
                  flex-shrink-0 ml-2
                  px-2 py-0.5 sm:px-2.5 sm:py-1 
                  rounded-full 
                  text-[10px] sm:text-xs 
                  font-medium border
                  ${getStatusColor(payment.status)}
                `}
              >
                {payment.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div>
                <p className="text-[10px] sm:text-[11px] text-gray-400 mb-0.5">Amount</p>
                <p className="text-xs sm:text-sm font-semibold text-[#f5f5f5]">
                  {formatCurrency(payment.amount, payment.currency)}
                </p>
              </div>
              <div>
                <p className="text-[10px] sm:text-[11px] text-gray-400 mb-0.5">Currency</p>
                <p className="text-xs sm:text-sm text-[#f5f5f5] uppercase">
                  {payment.currency}
                </p>
              </div>
            </div>

            <div className="pt-2 sm:pt-3 border-t border-gray-700/50">
              <p className="text-[10px] sm:text-[11px] text-gray-400 mb-0.5">Date</p>
              <p className="text-[10px] sm:text-xs text-[#ababab]">
                {new Date(payment.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto rounded-lg border border-gray-800">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#1a1a1a]">
              <th className="p-3 md:p-4 text-left text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="p-3 md:p-4 text-left text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="p-3 md:p-4 text-left text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider">
                Currency
              </th>
              <th className="p-3 md:p-4 text-left text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="p-3 md:p-4 text-left text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {payments.map((payment) => (
              <tr 
                key={payment._id} 
                className="bg-[#1a1a1a]/50 hover:bg-[#1f1f1f] transition-colors duration-150"
              >
                <td className="p-3 md:p-4 text-xs md:text-sm text-[#f5f5f5] font-mono">
                  <span className="truncate block max-w-[150px] md:max-w-[200px]">
                    {payment.tran_id}
                  </span>
                </td>
                <td className="p-3 md:p-4 text-xs md:text-sm font-semibold text-[#f5f5f5]">
                  {formatCurrency(payment.amount, payment.currency)}
                </td>
                <td className="p-3 md:p-4 text-xs md:text-sm text-[#f5f5f5] uppercase">
                  {payment.currency}
                </td>
                <td className="p-3 md:p-4">
                  <span
                    className={`
                      inline-block
                      px-2 py-0.5 md:px-2.5 md:py-1 
                      rounded-full 
                      text-[10px] md:text-xs 
                      font-medium border
                      ${getStatusColor(payment.status)}
                    `}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="p-3 md:p-4 text-xs md:text-sm text-[#ababab] whitespace-nowrap">
                  {new Date(payment.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="mt-4 sm:mt-6 text-[10px] sm:text-xs text-gray-500">
        Last updated: {new Date().toLocaleString()}
      </div>
    </div>
  );
};

export default PaymentInfo;