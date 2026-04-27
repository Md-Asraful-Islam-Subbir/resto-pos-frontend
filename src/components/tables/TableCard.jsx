import React from "react";
import { useNavigate } from "react-router-dom";
import { getAvatarName, getBgColor } from "../../utils";
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";
import { FaLongArrowAltRight } from "react-icons/fa";
import axios from "axios";

const TableCard = ({ id, name, status, initials, seats }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =========================
  // SELECT TABLE
  // =========================
  const handleClick = () => {
    if (status === "Booked") return;

    dispatch(
      updateTable({
        table: { tableId: id, tableNo: name },
      })
    );

    navigate("/menu");
  };

  // =========================
  // TOGGLE STATUS
  // =========================
 const handleToggleStatus = async (e) => {
  e.stopPropagation();

  const newStatus = status === "Booked" ? "Available" : "Booked";

  try {
    await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/table/${id}`,
      {
        status: newStatus,
        orderId: null,
      },
      { withCredentials: true }
    );

    // UPDATE UI WITHOUT REFRESH
    setTables((prev) =>
      prev.map((table) =>
        table._id === id
          ? { ...table, status: newStatus }
          : table
      )
    );
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div
      onClick={handleClick}
      className="relative w-full bg-gray-700 hover:bg-gray-800 rounded-xl p-3 sm:p-4 md:p-5 cursor-pointer transition"
    >
      {/* TOGGLE BUTTON */}
      <button
        onClick={handleToggleStatus}
        className="absolute top-2 left-2 text-[10px] px-2 py-1 bg-blue-600 text-white rounded"
      >
        {status === "Booked" ? "Make Available" : "Book"}
      </button>

      {/* STATUS BADGE */}
      <span
        className={`absolute top-2 right-2 text-[10px] sm:text-xs md:text-sm px-2 py-1 rounded-md font-medium ${
          status === "Booked"
            ? "text-green-500 bg-[#2e4a40]"
            : "text-white bg-[#664a04]"
        }`}
      >
        {status}
      </span>

      {/* TITLE */}
      <h1 className="text-sm sm:text-base md:text-lg font-semibold text-white pr-12">
        Table
        <FaLongArrowAltRight className="inline mx-1 text-gray-400" />
        {name}
      </h1>

      {/* AVATAR */}
      <div className="flex justify-center items-center my-4">
        <div
          className="flex items-center justify-center rounded-full text-white font-semibold w-12 h-12"
          style={{
            backgroundColor: initials ? getBgColor() : "#1f1f1f",
          }}
        >
          {getAvatarName(initials) || "N/A"}
        </div>
      </div>

      {/* SEATS */}
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-400">Seats</p>
        <p className="text-sm text-white font-medium">{seats}</p>
      </div>
    </div>
  );
};

export default TableCard;