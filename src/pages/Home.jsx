import React, { useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import Greetings from "../components/home/Greetings";
import { BsCashCoin, BsGraphUp } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import MiniCard from "../components/home/MiniCard";
import RecentOrders from "../components/home/RecentOrders";
import PopularDishes from "../components/home/PopularDishes";
import { IoFastFoodOutline } from "react-icons/io5";

const Home = () => {
  useEffect(() => {
    document.title = "POS | Home";
  }, []);

  return (
    <section className="bg-gray-900 min-h-screen flex flex-col">

      {/* Main Content */}
      <div className="flex-1 pb-24 lg:pb-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4">

          {/* Greeting */}
          <Greetings />

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-6">
            
            <MiniCard 
              title="Total Revenue" 
              icon={<BsCashCoin />} 
              number={12540} 
              footerNum={12.5}
              trend="up"
              bgColor="from-emerald-500 to-emerald-600"
            />

            <MiniCard 
              title="Active Orders" 
              icon={<GrInProgress />} 
              number={16} 
              footerNum={8.2}
              trend="up"
              bgColor="from-amber-500 to-amber-600"
            />

            <MiniCard 
              title="Today's Sales" 
              icon={<BsGraphUp />} 
              number={89} 
              footerNum={5.1}
              trend="down"
              bgColor="from-blue-500 to-blue-600"
            />

            <MiniCard 
              title="Menu Items" 
              icon={<IoFastFoodOutline />} 
              number={42} 
              footerNum={0}
              trend="neutral"
              bgColor="from-purple-500 to-purple-600"
            />
          </div>

          {/* Orders + Popular */}
          <div className="flex flex-col lg:flex-row gap-4 mt-6">
            
            {/* Recent Orders */}
            <div className="w-full lg:flex-[3]">
              <RecentOrders />
            </div>

            {/* Popular Dishes */}
            <div className="w-full lg:flex-[3]">
              <PopularDishes />
            </div>

          </div>

        </div>
      </div>

      {/* ✅ Mobile Bottom Nav (Fixed & Visible) */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] lg:hidden">
        <div className="bg-gray-800 shadow-2xl border-t border-gray-700">
          <BottomNav />
        </div>
      </div>

      {/* ✅ Desktop Bottom Nav */}
      <div className="hidden lg:block">
        <BottomNav />
      </div>

    </section>
  );
};

export default Home;