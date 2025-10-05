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
        const res = await axios.get("http://localhost:4000/api/payments");
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

  if (loading) return <div className="text-white">Loading payment info...</div>;
  if (error) return <div className="text-white">{error}</div>;
  if (payments.length === 0) return <div className="text-white">No payments found</div>;

  return (
    <div className="payment-info text-white">
      <h2 className="text-2xl mb-4">All Payments</h2>
      <table className="min-w-full bg-[#1a1a1a] p-4 rounded-lg">
        <thead>
          <tr>
            <th className="p-2">Transaction ID</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Currency</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id} className="border-b border-gray-700">
              <td className="p-2">{payment.tran_id}</td>
              <td className="p-2">{payment.amount}</td>
              <td className="p-2">{payment.currency}</td>
              <td className="p-2">{payment.status}</td>
              <td className="p-2">{new Date(payment.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentInfo;
