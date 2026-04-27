import React, { useEffect, useState } from "react";
import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";

import { getCategories, getDishes } from "../../https";

const MenuContainer = () => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [items, setItems] = useState([]);

  const [itemCount, setItemCount] = useState(0);
  const [itemId, setItemId] = useState(null);

  const dispatch = useDispatch();

  // Fetch categories
  useEffect(() => {
  const fetchData = async () => {
    const res = await getCategories();

    const categoriesData = res?.data?.data || [];
    setCategories(categoriesData);

    if (categoriesData.length > 0) {
      setSelected(categoriesData[0]);
    }
  };

  fetchData();
}, []);

useEffect(() => {
  if (!selected) return;

  const fetchItems = async () => {
    const res = await getDishes(selected._id);

    const dishesData = res?.data?.data || [];
    setItems(dishesData);
  };

  fetchItems();
}, [selected]);

  // Quantity
  const increment = (id) => {
    setItemId(id);
    if (itemCount >= 5) return;
    setItemCount((prev) => prev + 1);
  };

  const decrement = (id) => {
    setItemId(id);
    if (itemCount <= 0) return;
    setItemCount((prev) => prev - 1);
  };

  const handleAddToCart = (item) => {
    if (itemCount === 0) return;

    dispatch(
      addItems({
        id: new Date(),
        name: item.name,
        pricePerQuantity: item.price,
        quantity: itemCount,
        price: item.price * itemCount,
      })
    );

    setItemCount(0);
  };

  return (
    <>
      {/* Categories */}
      <div className="grid grid-cols-4 gap-4 px-10 py-2">
        {categories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => {
              setSelected(cat);
              setItemCount(0);
            }}
            className="p-4 rounded-lg cursor-pointer"
            style={{ backgroundColor: cat.bgColor }}
          >
            <div className="flex justify-between">
              <h1 className="text-white font-semibold">
                {cat.icon} {cat.name}
              </h1>

              {selected?._id === cat._id && (
                <GrRadialSelected className="text-white" />
              )}
            </div>
          </div>
        ))}
      </div>

      <hr className="border-[#2a2a2a] border-t-2 mt-2" />

      {/* Dishes */}
      <div className="grid grid-cols-4 gap-4 px-10 py-2">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-gray-800/50 p-4 rounded-lg hover:bg-[#2c5c72]"
          >
            <div className="flex justify-between">
              <h1 className="text-white">{item.name}</h1>

              <button
                onClick={() => handleAddToCart(item)}
                className="bg-[#2e4a40] text-green-400 p-1 rounded"
              >
                <FaShoppingCart size={12} />
              </button>
            </div>

            <p className="text-white font-bold mt-2">৳{item.price}</p>

            <div className="flex justify-between mt-2 bg-[#802222] px-2 py-1 rounded">
              <button onClick={() => decrement(item._id)}>-</button>
              <span>{itemId === item._id ? itemCount : 0}</span>
              <button onClick={() => increment(item._id)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MenuContainer;