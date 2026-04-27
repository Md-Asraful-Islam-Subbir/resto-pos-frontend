import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";
import { useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders } from "../../https/index";

const RecentOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: resData, isError, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => await getOrders(),
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  const orders = resData?.data?.data || [];
  
  // Only filter by search term, not by status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerDetails?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-xl h-full">
      {/* Header */}
      <div className="flex justify-between items-center px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-700">
        <div>
          <h2 className="text-white text-base lg:text-lg font-bold">Recent Orders</h2>
          <p className="text-gray-400 text-xs lg:text-sm mt-0.5">
            {filteredOrders.length} active orders
          </p>
        </div>
        <a href="" className="text-[#025cca] text-xs lg:text-sm font-semibold">
          View all
        </a>
      </div>

      {/* Search Bar */}
      <div className="px-4 lg:px-6 py-3">
        <div className="flex items-center gap-3 lg:gap-4 bg-gray-900 rounded-[10px] px-3 py-2 lg:py-2.5">
          <FaSearch className="text-[#f5f5f5] text-sm" />
          <input
            type="text"
            placeholder="Search recent orders"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-900 outline-none text-[#f5f5f5] w-full text-sm"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 lg:px-6 pb-4">
        <div className="overflow-y-auto max-h-[350px] lg:max-h-[500px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 scrollbar-hide">
          {isLoading ? (
            <div className="flex items-center justify-center py-8 lg:py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredOrders.length > 0 ? (
            <div className="space-y-2 mt-2">
              {filteredOrders.map((order) => (
                <OrderList key={order._id} order={order} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 lg:py-12">
              <div className="text-gray-500 text-lg mb-2">🔍</div>
              <p className="text-gray-400 text-sm">No orders found</p>
              <p className="text-gray-500 text-xs mt-1">Try adjusting your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;