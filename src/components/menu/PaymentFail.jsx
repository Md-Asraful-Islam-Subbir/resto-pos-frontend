import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const PaymentFail = () => {
  const location = useLocation();
  const [tranId, setTranId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setTranId(params.get("tran_id"));
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4 text-red-500">Payment Failed ❌</h1>
      <p className="mb-2">Transaction ID: <strong>{tranId}</strong></p>
      <p className="mb-2">Your payment could not be completed.</p>
      <Link
        to="/bill"
        className="mt-6 bg-red-500 text-gray-900 px-6 py-2 rounded font-semibold"
      >
        Retry Payment
      </Link>
    </div>
  );
};

export default PaymentFail;
