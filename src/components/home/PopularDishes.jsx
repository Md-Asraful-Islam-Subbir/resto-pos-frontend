// PopularDishes.js - Alternative with full height scrolling on mobile
import React from "react";
import { popularDishes } from "../../constants";

const PopularDishes = () => {
  return (
    <div className="mt-2 lg:mt-0 pr-0 lg:pr-8">
      <div className="bg-gray-700 w-full rounded-lg flex flex-col">
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <h1 className="text-[#f5f5f5] text-sm sm:text-base font-semibold tracking-wide">
            Popular Dishes
          </h1>
          <a href="" className="text-[#025cca] text-xs sm:text-sm font-semibold">
            View all
          </a>
        </div>

        {/* Show all content with max-height on mobile too, but larger */}
        <div className="overflow-y-auto max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] px-2 sm:px-4 pb-4 scrollbar-hide">
          {popularDishes.map((dish) => {
            return (
              <div
                key={dish.id}
                className="flex items-center gap-3 sm:gap-4 bg-gray-900 rounded-[10px] px-3 sm:px-6 py-3 sm:py-4 mt-3 sm:mt-4 mx-1 sm:mx-6"
              >
                <h1 className="text-[#f5f5f5] font-bold text-base sm:text-lg mr-2 sm:mr-4 flex-shrink-0">
                  {dish.id < 10 ? `0${dish.id}` : dish.id}
                </h1>
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h1 className="text-[#f5f5f5] font-semibold tracking-wide text-sm sm:text-base truncate">
                    {dish.name}
                  </h1>
                  <p className="text-[#f5f5f5] text-xs sm:text-sm font-semibold mt-1">
                    <span className="text-[#ababab]">Orders: </span>
                    {dish.numberOfOrders}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;