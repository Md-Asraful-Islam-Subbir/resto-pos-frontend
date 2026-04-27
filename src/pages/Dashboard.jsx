import React, { useState, useEffect } from "react";
import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";

import Metrics from "../components/dashboard/Metrics";
import Modal from "../components/dashboard/Modal";
import BottomNav from "../components/shared/BottomNav";
import PaymentInfo from "../components/dashboard/PaymentInfo";
import OrdersControl from "../components/orders/OrdersControl";

import CategoryModal from "../components/dashboard/CategoryModal";
import DishModal from "../components/dashboard/DishModal";

const buttons = [
  { label: "Table", icon: <MdTableBar className="text-[11px] sm:text-xs md:text-sm" />, action: "table" },
  { label: "Category", icon: <MdCategory className="text-[11px] sm:text-xs md:text-sm" />, action: "category" },
  { label: "Dishes", icon: <BiSolidDish className="text-[11px] sm:text-xs md:text-sm" />, action: "dishes" },
];

const tabs = ["Metrics", "Orders", "Payments"];

const Dashboard = () => {
  useEffect(() => {
    document.title = "POS | Admin Dashboard";
  }, []);

  const [activeTab, setActiveTab] = useState("Metrics");

  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);

  const handleOpenModal = (action) => {
    if (action === "table") setIsTableModalOpen(true);
    if (action === "category") setIsCategoryModalOpen(true);
    if (action === "dishes") setIsDishModalOpen(true);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Bottom padding for mobile nav */}
      <div className="pb-14 sm:pb-0">
        
        {/* 🔥 HEADER (STICKY + CLEAN) */}
        <div className="
          sticky top-0 z-50
          bg-gray-900/95 backdrop-blur-sm
          border-b border-gray-800
        ">
          <div className="
            w-full
            px-3 sm:px-5 md:px-6 lg:px-8 xl:px-10
            py-2.5 sm:py-3 md:py-3.5
          ">
            {/* Mobile & Tablet Layout - Stacked */}
            <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
              
              {/* ACTION BUTTONS - Scrollable on mobile */}
              <div className="flex gap-1 sm:gap-1.5 overflow-x-auto scrollbar-hide -mx-1 px-1">
                {buttons.map(({ label, icon, action }) => (
                  <button
                    key={action}
                    onClick={() => handleOpenModal(action)}
                    className="
                      flex items-center gap-1 sm:gap-1.5
                      bg-[#1f1f1f] hover:bg-[#2a2a2a] active:bg-[#333333]
                      px-2 sm:px-3 md:px-3.5
                      py-1.5 sm:py-2
                      text-[11px] sm:text-xs md:text-xs
                      font-medium
                      rounded-lg
                      whitespace-nowrap
                      transition-colors duration-150
                      flex-shrink-0
                    "
                  >
                    <span className="flex-shrink-0">{icon}</span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* TABS - Scrollable on mobile */}
              <div className="flex gap-1 sm:gap-1.5 overflow-x-auto scrollbar-hide -mx-1 px-1">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      px-2.5 sm:px-3.5 md:px-4
                      py-1.5 sm:py-2
                      text-[11px] sm:text-xs md:text-xs
                      font-medium
                      rounded-lg
                      whitespace-nowrap
                      transition-all duration-150
                      flex-shrink-0
                      ${
                        activeTab === tab
                          ? "bg-[#3b82f6] text-white shadow-lg shadow-blue-500/20"
                          : "bg-[#1f1f1f] text-gray-300 hover:bg-[#2a2a2a] hover:text-white"
                      }
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 🔥 CONTENT AREA */}
        <div className="
          w-full
          px-3 sm:px-5 md:px-6 lg:px-8 xl:px-10
          py-3 sm:py-4 md:py-5
        ">
          {/* Content with fade transition */}
          <div className="animate-fadeIn">
            {activeTab === "Metrics" && <Metrics />}
            {activeTab === "Orders" && <OrdersControl />}
            {activeTab === "Payments" && <PaymentInfo />}
          </div>
        </div>

        {/* MODALS */}
        {isTableModalOpen && (
          <Modal setIsTableModalOpen={setIsTableModalOpen} />
        )}
        {isCategoryModalOpen && (
          <CategoryModal setOpen={setIsCategoryModalOpen} />
        )}
        {isDishModalOpen && <DishModal setOpen={setIsDishModalOpen} />}
        
      </div>

      {/* Bottom Navigation - Visible only on mobile */}
      <div className="sm:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default Dashboard;