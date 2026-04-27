import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDateAndTime } from "../../utils/index";

const OrdersControl = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchOrders = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_BACKEND_URL;
      const { data } = await axios.get(`${BASE_URL}/api/order`, {
        withCredentials: true,
      });
      setOrders(data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

 const handleStatusChange = async (orderId, newStatus) => {
  try {
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    await axios.put(
      `${BASE_URL}/api/order/${orderId}`,
      { orderStatus: newStatus },
      { withCredentials: true }
    );

    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId
          ? { ...order, orderStatus: newStatus }
          : order
      )
    );
  } catch (err) {
    console.error("Error updating order status:", err);
  }
};

  const statusColors = {
    pending: "bg-yellow-500 text-black",
    "in-progress": "bg-blue-500 text-white",
    ready: "bg-green-500 text-white",
    completed: "bg-gray-500 text-white",
    cancelled: "bg-red-500 text-white",
  };

  const statusText = {
    pending: "Pending",
    "in-progress": "In Progress",
    ready: "Ready",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.orderStatus === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Orders Control</h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Manage and track all restaurant orders efficiently
        </p>
      </div>

      {/* Filters */}
      <div className="mb-3 sm:mb-4 md:mb-6 flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
        {["all", "pending", "in-progress", "ready", "completed", "cancelled"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-5 md:py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {status === "all" ? "All Orders" : statusText[status]}
            </button>
          )
        )}
      </div>

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 sm:py-16 md:py-20 text-gray-400 text-sm sm:text-base">
          {filter === "all"
            ? "No orders found."
            : `No ${statusText[filter]} orders yet.`}
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-800 rounded-xl shadow-md p-3 sm:p-4 md:p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-200"
            >
              {/* Order Header */}
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <div>
                  <h3 className="font-semibold text-sm sm:text-base md:text-lg text-white">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {formatDateAndTime(order.orderDate)}
                  </p>
                </div>
                <span
                  className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${
                    statusColors[order.orderStatus]
                  }`}
                >
                  {statusText[order.orderStatus]}
                </span>
              </div>

              {/* Customer Info */}
              <div className="mb-3 sm:mb-4 text-gray-300 text-xs sm:text-sm space-y-0.5 sm:space-y-1">
                <p>
                  <span className="font-medium">Customer:</span>{" "}
                  {order.customerDetails.name}
                </p>
                <p>
                  <span className="font-medium">Guests:</span>{" "}
                  {order.customerDetails.guests}
                </p>
                <p>
                  <span className="font-medium">Table:</span>{" "}
                  {order.table ? order.table.tableNo : "N/A"}
                </p>
              </div>

              {/* Order Items */}
              <div className="mb-3 sm:mb-4 text-gray-300">
                <p className="text-xs sm:text-sm mb-1 sm:mb-2">
                  Items ({order.items.length}):
                </p>
                <div className="space-y-0.5 sm:space-y-1">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-xs sm:text-sm items-center"
                    >
                      <span className="truncate max-w-[150px] sm:max-w-[180px] md:max-w-[200px]">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="text-gray-400 ml-2 flex-shrink-0">
                        ৳{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">
                      +{order.items.length - 3} more items
                    </p>
                  )}
                </div>
              </div>

              {/* Total & Status Update */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-3 sm:pt-4 border-t border-gray-700 gap-2 sm:gap-0">
                <div className="text-base sm:text-lg md:text-xl font-bold text-white">
                   ৳{order.items.reduce((sum, i) => sum + i.price, 0).toFixed(2)}
                </div>

                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="w-full sm:w-auto bg-gray-700 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  {["pending","in-progress","ready","completed","cancelled"].map(
                    (status) => (
                      <option key={status} value={status}>
                        {statusText[status]}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersControl;