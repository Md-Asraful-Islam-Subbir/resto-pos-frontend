import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const [tranId, setTranId] = useState(null);
  const [payment, setPayment] = useState(null);

  // Extract tran_id from query string
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("tran_id");
    setTranId(id);

    if (id) {
      // Optional: fetch payment details from backend
      fetch(`${import.meta.env.VITE_API_URL}/api/payments/${id}`)
        .then(res => res.json())
        .then(data => setPayment(data))
        .catch(err => console.error(err));
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4 text-green-500">Payment Successful ✅</h1>
      <p className="mb-2">Transaction ID: <strong>{tranId}</strong></p>
      {payment && (
        <p className="mb-2">Amount Paid: <strong>৳{payment.amount}</strong></p>
      )}
      <Link
        to="/"
        className="mt-6 bg-green-500 text-gray-900 px-6 py-2 rounded font-semibold"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default PaymentSuccess;
