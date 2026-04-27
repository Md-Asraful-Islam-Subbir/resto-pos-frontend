import React from "react";
import { itemsData, metricsData } from "../../constants";
import BottomNav from "../shared/BottomNav";

const Metrics = () => {
  return (
    <div className="w-full mx-auto py-0 px-0 sm:px-1 md:px-3 lg:px-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
        <div className="flex-1">
          <h2 className="font-semibold text-[#f5f5f5] text-lg sm:text-xl md:text-2xl leading-tight">
            Overall Performance
          </h2>
          <p className="text-[11px] sm:text-xs md:text-sm text-[#ababab] mt-1 sm:mt-1.5 line-clamp-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Distinctio, obcaecati?
          </p>
        </div>
        
        <button className="
          flex items-center gap-1 sm:gap-1.5 
          px-2.5 sm:px-3 md:px-4 
          py-1.5 sm:py-2 
          rounded-lg 
          text-[11px] sm:text-xs md:text-sm 
          text-[#f5f5f5] 
          bg-[#1a1a1a] hover:bg-[#262626]
          whitespace-nowrap
          transition-colors duration-150
          flex-shrink-0
        ">
          Last 1 Month
          <svg
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="4"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-5 sm:mb-6 md:mb-8">
        {metricsData.map((metric, index) => {
          return (
            <div
              key={index}
              className="
                shadow-sm rounded-lg 
                p-2.5 sm:p-3 md:p-4
                hover:shadow-md transition-shadow duration-200
              "
              style={{ backgroundColor: metric.color }}
            >
              <div className="flex justify-between items-start gap-1 sm:gap-2">
                <p className="font-medium text-[10px] sm:text-[11px] md:text-xs text-[#f5f5f5] leading-tight">
                  {metric.title}
                </p>
                <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
                  <svg
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    style={{ color: metric.isIncrease ? "#f5f5f5" : "#ef4444" }}
                  >
                    <path
                      d={metric.isIncrease ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                    />
                  </svg>
                  <p
                    className="font-medium text-[10px] sm:text-[11px] md:text-xs"
                    style={{ color: metric.isIncrease ? "#f5f5f5" : "#ef4444" }}
                  >
                    {metric.percentage}
                  </p>
                </div>
              </div>
              <p className="mt-1 sm:mt-1.5 md:mt-2 font-semibold text-base sm:text-lg md:text-xl lg:text-2xl text-[#f5f5f5]">
                {metric.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Item Details Section */}
      <div className="flex flex-col">
        <div className="mb-3 sm:mb-4 md:mb-5">
          <h2 className="font-semibold text-[#f5f5f5] text-lg sm:text-xl md:text-2xl leading-tight">
            Item Details
          </h2>
          <p className="text-[11px] sm:text-xs md:text-sm text-[#ababab] mt-1 sm:mt-1.5 line-clamp-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Distinctio, obcaecati?
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-16 sm:mb-0">
          {itemsData.map((item, index) => {
            return (
              <div 
                key={index} 
                className="
                  shadow-sm rounded-lg 
                  p-2.5 sm:p-3 md:p-4
                  hover:shadow-md transition-shadow duration-200
                " 
                style={{ backgroundColor: item.color }}
              >
                <div className="flex justify-between items-start gap-1 sm:gap-2">
                  <p className="font-medium text-[10px] sm:text-[11px] md:text-xs text-[#f5f5f5] leading-tight">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
                    <svg 
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      fill="none"
                    >
                      <path d="M5 15l-7 7 7 7" />
                    </svg>
                    <p className="font-medium text-[10px] sm:text-[11px] md:text-xs text-[#f5f5f5]">
                      {item.percentage}
                    </p>
                  </div>
                </div>
                <p className="mt-1 sm:mt-1.5 md:mt-2 font-semibold text-base sm:text-lg md:text-xl lg:text-2xl text-[#f5f5f5]">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Bottom Navigation - Mobile only */}
      <div className="sm:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default Metrics;