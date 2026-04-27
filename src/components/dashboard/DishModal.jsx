import React, { useState, useEffect } from "react";
import { addDish, getCategories } from "../../https";

const DishModal = ({ setOpen }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getCategories();
      setCategories(res.data.data);
    };
    fetch();
  }, []);

  const handleSubmit = async () => {
    await addDish({ name, price, category });
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg w-[300px]">
        <h2 className="text-white mb-4">Add Dish</h2>

        <input
          placeholder="Dish Name"
          className="w-full mb-2 p-2"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Price"
          type="number"
          className="w-full mb-2 p-2"
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          className="w-full mb-4 p-2"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="bg-green-500 px-4 py-2 w-full"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default DishModal;