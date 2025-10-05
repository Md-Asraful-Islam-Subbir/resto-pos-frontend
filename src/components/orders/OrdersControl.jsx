import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDateAndTime } from "../../utils/index";

const OrdersControl = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/order", {
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
      await axios.put(
        `http://localhost:4000/api/order/${orderId}`,
        { orderStatus: newStatus },
        { withCredentials: true }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
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
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Orders Control</h1>
        <p className="text-gray-400">
          Manage and track all restaurant orders efficiently
        </p>
      </div>

      {/* Filters */}
      <div className="mb-3 flex flex-wrap gap-3">
        {["all", "pending", "in-progress", "ready", "completed", "cancelled"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-5 py-2 rounded-lg font-medium transition-colors ${
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
        <div className="text-center py-20 text-gray-400">
          {filter === "all"
            ? "No orders found."
            : `No ${statusText[filter]} orders yet.`}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-200"
            >
              {/* Order Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-white">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {formatDateAndTime(order.orderDate)}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    statusColors[order.orderStatus]
                  }`}
                >
                  {statusText[order.orderStatus]}
                </span>
              </div>

              {/* Customer Info */}
              <div className="mb-4 text-gray-300 text-sm space-y-1">
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
              <div className="mb-4 text-gray-300">
                <p className="text-sm mb-2">
                  Items ({order.items.length}):
                </p>
                <div className="space-y-1">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-sm items-center"
                    >
                      <span className="truncate">{item.quantity}x {item.name}</span>
                      <span className="text-gray-400 ml-2">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <p className="text-xs text-gray-500 mt-1">
                      +{order.items.length - 3} more items
                    </p>
                  )}
                </div>
              </div>

              {/* Total & Status Update */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <div className="text-lg font-bold text-white">
                  ৳{order.bills.totalWithTax.toFixed(2)}
                </div>

                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
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
