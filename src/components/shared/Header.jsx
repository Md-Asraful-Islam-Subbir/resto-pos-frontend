import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../https";
import { removeUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";

const Header = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      console.log(data);
      dispatch(removeUser());
      navigate("/auth");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="flex justify-between items-center py-1 px-2 bg-[#062117] relative z-50">
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={logo} className="h-6 w-6 ml-2" alt="restro logo" />
          <h1 className="text-base font-semibold text-[#f5f5f5] tracking-wide">
            BiteByte
          </h1>
        </div>

        {/* SEARCH - Desktop */}
        <div className="hidden lg:flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-2.5 py-1 w-[500px]">
          <FaSearch className="text-[#f5f5f5]" />
          <input
            type="text"
            placeholder="Search"
            className="bg-[#1f1f1f] outline-none text-[#f5f5f5] w-full"
          />
        </div>

        {/* Desktop User Details */}
        <div className="hidden lg:flex items-center gap-2">
          {userData.role === "Admin" && (
            <div
              onClick={() => navigate("/dashboard")}
              className="bg-[#1f1f1f] rounded-[7px] p-3 cursor-pointer hover:bg-[#2a2a2a] transition-colors"
            >
              <MdDashboard className="text-[#f5f5f5] text-lg" />
            </div>
          )}
          <div className="bg-[#1f1f1f] rounded-[7px] p-3 cursor-pointer hover:bg-[#2a2a2a] transition-colors">
            <FaBell className="text-[#f5f5f5] text-lg" />
          </div>
          <div className="flex items-center gap-3 cursor-pointer">
            <FaUserCircle className="text-[#f5f5f5] text-lg" />
            <div className="flex flex-col items-start">
              <h1 className="text-md text-[#f5f5f5] font-medium tracking-wide">
                {userData.name || "TEST USER"}
              </h1>
              <p className="text-xs text-[#ababab] font-medium">
                {userData.role || "Role"}
              </p>
            </div>
            <IoLogOutOutline
              onClick={handleLogout}
              className="text-[#f5f5f5] ml-2 cursor-pointer hover:text-red-500 transition-colors"
              size={30}
            />
          </div>
        </div>

        {/* Mobile/Tablet Icons */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Search Icon for Mobile */}
          <div
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="bg-[#1f1f1f] rounded-[7px] p-2 cursor-pointer"
          >
            <FaSearch className="text-[#f5f5f5] text-lg" />
          </div>

          {/* Notification Icon */}
          <div className="bg-[#1f1f1f] rounded-[7px] p-2 cursor-pointer relative">
            <FaBell className="text-[#f5f5f5] text-lg" />
          </div>

          {/* Menu Icon */}
          <div
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-[#1f1f1f] rounded-[7px] p-2 cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <IoClose className="text-[#f5f5f5] text-xl" />
            ) : (
              <IoMenu className="text-[#f5f5f5] text-xl" />
            )}
          </div>
        </div>
      </header>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="lg:hidden fixed top-[52px] left-0 right-0 bg-[#062117] p-3 z-40 shadow-lg animate-slideDown">
          <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-3 py-2 w-full">
            <FaSearch className="text-[#f5f5f5]" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#1f1f1f] outline-none text-[#f5f5f5] w-full"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile/Tablet Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-[52px] left-0 right-0 bg-[#062117] z-40 shadow-lg animate-slideDown">
          <div className="flex flex-col p-4 gap-4">
            {/* User Info */}
            <div className="flex items-center gap-3 pb-4 border-b border-[#2a2a2a]">
              <FaUserCircle className="text-[#f5f5f5] text-4xl" />
              <div className="flex flex-col">
                <h1 className="text-md text-[#f5f5f5] font-medium tracking-wide">
                  {userData.name || "TEST USER"}
                </h1>
                <p className="text-xs text-[#ababab] font-medium">
                  {userData.role || "Role"}
                </p>
              </div>
            </div>

            {/* Dashboard Link for Admin */}
            {userData.role === "Admin" && (
              <div
                onClick={() => {
                  navigate("/dashboard");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 p-3 bg-[#1f1f1f] rounded-[10px] cursor-pointer hover:bg-[#2a2a2a] transition-colors"
              >
                <MdDashboard className="text-[#f5f5f5] text-xl" />
                <span className="text-[#f5f5f5] font-medium">Dashboard</span>
              </div>
            )}

            {/* Logout Button */}
            <div
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 bg-[#1f1f1f] rounded-[10px] cursor-pointer hover:bg-red-600 transition-colors"
            >
              <IoLogOutOutline className="text-[#f5f5f5] text-xl" />
              <span className="text-[#f5f5f5] font-medium">Logout</span>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Header;