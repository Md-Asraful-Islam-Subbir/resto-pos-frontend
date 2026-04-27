import React from 'react';
import { BsArrowUp, BsArrowDown, BsDash } from 'react-icons/bs';

const MiniCard = ({ title, icon, number, footerNum, trend, bgColor }) => {
  const TrendIcon = trend === "up" ? BsArrowUp : trend === "down" ? BsArrowDown : BsDash;
  const trendColor = trend === "up" 
    ? "text-emerald-400" 
    : trend === "down" 
    ? "text-red-400" 
    : "text-gray-400";
  
  const trendBg = trend === "up" 
    ? "bg-emerald-500/20" 
    : trend === "down" 
    ? "bg-red-500/20" 
    : "bg-gray-500/20";

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-5 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-900/50 group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
          <h2 className="text-white text-2xl lg:text-3xl font-bold tracking-tight">
            {title.includes("Revenue") || title.includes("Sales") ? `$${number.toLocaleString()}` : number}
          </h2>
        </div>
        <div className={`bg-gradient-to-br ${bgColor} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-white text-xl">{icon}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {footerNum > 0 ? (
          <span className={`${trendBg} ${trendColor} px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1`}>
            <TrendIcon />
            {footerNum}%
          </span>
        ) : (
          <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded-lg text-xs font-semibold">
            No change
          </span>
        )}
        <span className="text-gray-500 text-xs">vs last week</span>
      </div>
    </div>
  );
};

export default MiniCard;