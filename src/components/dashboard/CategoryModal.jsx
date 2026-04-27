import React, { useState } from "react";
import { addCategory } from "../../https";

const CategoryModal = ({ setOpen }) => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("🍽️");
  const [bgColor, setBgColor] = useState("#1a1a1a");

  const handleSubmit = async () => {
    await addCategory({ name, icon, bgColor });
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg w-[300px]">
        <h2 className="text-white mb-4">Add Category</h2>

        <input
          placeholder="Name"
          className="w-full mb-2 p-2"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Icon (🍕)"
          className="w-full mb-2 p-2"
          onChange={(e) => setIcon(e.target.value)}
        />

        <input
          type="color"
          className="w-full mb-4"
          onChange={(e) => setBgColor(e.target.value)}
        />

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

export default CategoryModal;