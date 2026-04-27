import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsBell, BsPersonCircle } from "react-icons/bs";

const Greetings = () => {
  const userData = useSelector(state => state.user);
  const [dateTime, setDateTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = dateTime.getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, [dateTime]);

  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date) =>
    `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <BsPersonCircle className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-white text-lg sm:text-xl font-bold">
              {greeting}, {userData.name || "User"}!
            </h1>
            <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Ready to serve
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="hidden sm:block text-right">
            <h1 className="text-white text-2xl font-bold tracking-wider tabular-nums">
              {formatTime(dateTime)}
            </h1>
            <p className="text-gray-400 text-sm">{formatDate(dateTime)}</p>
          </div>
          
          <button className="relative p-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-all duration-300 hover:scale-105 group">
            <BsBell className="text-gray-300 group-hover:text-white text-xl transition-colors" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Mobile time display */}
          <div className="sm:hidden text-right">
            <h1 className="text-white text-lg font-bold">{formatTime(dateTime)}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Greetings;