import React from "react";
import { FaCheckDouble, FaLongArrowAltRight } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { getAvatarName } from "../../utils/index";

const OrderList = ({ order }) => {
  return (
    <div className="flex items-center gap-3 lg:gap-5 mb-3 p-2 hover:bg-gray-700/30 rounded-xl transition-all duration-200 cursor-pointer">
      <button className="bg-[#f6b100] p-2 lg:p-3 text-lg lg:text-xl font-bold rounded-lg flex-shrink-0">
        {getAvatarName(order.customerDetails.name)}
      </button>
      <div className="flex items-center justify-between w-[100%] gap-3">
        <div className="flex flex-col items-start gap-1 min-w-0">
          <h1 className="text-[#f5f5f5] text-sm lg:text-lg font-semibold tracking-wide truncate">
            {order.customerDetails.name}
          </h1>
          <p className="text-[#ababab] text-xs lg:text-sm">{order.items.length} Items</p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <h1 className="text-[#f6b100] font-semibold border border-[#f6b100] rounded-lg p-1 text-xs lg:text-sm whitespace-nowrap">
            Table <FaLongArrowAltRight className="text-[#ababab] ml-1 lg:ml-2 inline" />{" "}
            {order.table ? order.table.tableNo : "N/A"}
          </h1>

          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            {order.orderStatus === "Ready" ? (
              <>
                <p className="text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg text-xs lg:text-sm whitespace-nowrap">
                  <FaCheckDouble className="inline mr-1 lg:mr-2" /> {order.orderStatus}
                </p>
              </>
            ) : (
              <>
                <p className="text-yellow-600 bg-[#4a452e] px-2 py-1 rounded-lg text-xs lg:text-sm whitespace-nowrap">
                  <FaCircle className="inline mr-1 lg:mr-2" /> {order.orderStatus}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;