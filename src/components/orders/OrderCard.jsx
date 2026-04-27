import React from "react";
import { FaCheckDouble, FaLongArrowAltRight } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { formatDateAndTime, getAvatarName } from "../../utils/index";

const OrderCard = ({ key, order }) => {
  console.log(order);

  return (
    <div 
      key={key} 
      className="w-full sm:w-[350px] md:w-[380px] lg:w-[400px] bg-gray-700 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4"
    >
      <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
        <button className="bg-[#f6b100] p-2 sm:p-3 text-sm sm:text-base font-bold rounded-lg flex-shrink-0">
          {getAvatarName(order.customerDetails.name)}
        </button>

        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-start gap-0.5 sm:gap-1">
            <h1 className="text-[#f5f5f5] text-sm sm:text-base font-semibold tracking-wide">
              {order.customerDetails.name}
            </h1>
            <p className="text-[#ababab] text-xs sm:text-sm">
              #{Math.floor(new Date(order.orderDate).getTime())} / Dine in
            </p>
            <p className="text-[#ababab] text-xs sm:text-sm">
              Table{" "}
              <FaLongArrowAltRight className="text-[#ababab] ml-1 sm:ml-2 inline" />{" "}
              {order.table ? order.table.tableNo : "N/A"}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1 sm:gap-2">
            {order.orderStatus === "Ready" ? (
              <>
                <p className="text-green-600 bg-[#2e4a40] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-xs sm:text-sm">
                  <FaCheckDouble className="inline mr-1 sm:mr-2" /> {order.orderStatus}
                </p>
                <p className="text-[#ababab] text-xs sm:text-sm">
                  <FaCircle className="inline mr-1 sm:mr-2 text-green-600" /> Ready to
                  serve
                </p>
              </>
            ) : (
              <>
                <p className="text-yellow-600 bg-[#4a452e] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-xs sm:text-sm">
                  <FaCircle className="inline mr-1 sm:mr-2" /> {order.orderStatus}
                </p>
                <p className="text-[#ababab] text-xs sm:text-sm">
                  <FaCircle className="inline mr-1 sm:mr-2 text-yellow-600" /> Preparing
                  your order
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-3 sm:mt-4 text-[#ababab] text-xs sm:text-sm">
        <p>{formatDateAndTime(order.orderDate)}</p>
        <p>{order.items.length} Items</p>
      </div>

      <hr className="w-full mt-3 sm:mt-4 border-t border-gray-500" />

      <div className="flex items-center justify-between mt-1 sm:mt-2">
        <h1 className="text-[#f5f5f5] text-sm sm:text-base font-normal">Total</h1>
        <p className="text-[#f5f5f5] text-sm sm:text-base font-normal">
          ${order.bills.totalWithTax.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;