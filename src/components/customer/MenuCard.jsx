import React, { useEffect, useState } from "react";
import { getCategories, getDishes } from "../../https";

const MenuCard = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getCategories();
        setCategories(data.data);
        if (data.data.length > 0) {
          setSelectedCategory(data.data[0]._id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    const fetchDishes = async () => {
      setLoading(true);
      try {
        const { data } = await getDishes(selectedCategory);
        setDishes(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white">
      
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-[#111]/80 backdrop-blur-md border-b border-[#222] px-4 py-3">
        <h1 className="text-2xl font-bold text-[#f1b135] tracking-wide">
          🍽️ Restaurant Menu
        </h1>

        {/* Categories */}
        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat._id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
                ${
                  selectedCategory === cat._id
                    ? "bg-[#f1b135] text-black shadow-md scale-105"
                    : "bg-[#1f1f1f] text-gray-300 hover:bg-[#2a2a2a]"
                }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4">

        {loading ? (
          <p className="text-gray-400">Loading dishes...</p>
        ) : dishes.length === 0 ? (
          <p className="text-gray-400">No dishes available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            
            {dishes.map((dish) => (
              <div
                key={dish._id}
                className="bg-[#1b1b1b] rounded-2xl p-4 border border-[#2a2a2a]
                hover:shadow-[0_0_15px_rgba(241,177,53,0.2)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Fake Image Placeholder */}
                <div className="h-32 rounded-xl bg-gradient-to-br from-[#2a2a2a] to-[#111] mb-3 flex items-center justify-center text-gray-500 text-sm">
                  🍽️ Image
                </div>

                {/* Dish Name */}
                <h2 className="text-lg font-semibold tracking-wide">
                  {dish.name}
                </h2>

                {/* Description Placeholder */}
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  Delicious freshly prepared dish with premium ingredients.
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center mt-4">
                  <span className="text-[#f1b135] font-bold text-lg">
                    ৳ {dish.price}
                  </span>

                  <button className="bg-[#f1b135] text-black px-3 py-1 rounded-lg text-sm font-semibold hover:scale-105 transition">
                    Add
                  </button>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default MenuCard;