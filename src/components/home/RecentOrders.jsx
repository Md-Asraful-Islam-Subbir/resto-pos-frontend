import React from "react";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";
import { useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders } from "../../https/index";

const RecentOrders = () => {
  const { data: resData, isError, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => await getOrders(),
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  // ✅ Safely get orders array
  const orders = resData?.data?.data || [];

  return (
    <div className="px-4 mt-2">
      <div className="bg-gray-700 w-full h-[350px] rounded-lg">
        <div className="flex justify-between items-center px-3 py-2">
          <h1 className="text-[#f5f5f5] text-base font-semibold tracking-wide">
            Recent Orders
          </h1>
          <a href="" className="text-[#025cca] text-sm font-semibold">
            View all
          </a>
        </div>

        <div className="flex items-center gap-4 bg-gray-900 rounded-[10px] px-3 py-2 mx-3">
          <FaSearch className="text-[#f5f5f5]" />
          <input
            type="text"
            placeholder="Search recent orders"
            className="bg-gray-900 outline-none text-[#f5f5f5] w-full"
          />
        </div>

        {/* Order list */}
        <div className="mt-2 px-2 overflow-y-scroll h-[200px] scrollbar-hide">
          {isLoading ? (
            <p className="text-gray-500">Loading orders...</p>
          ) : orders.length > 0 ? (
            orders.map((order) => <OrderList key={order._id} order={order} />)
          ) : (
            <p className="col-span-3 text-gray-500">No orders available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
