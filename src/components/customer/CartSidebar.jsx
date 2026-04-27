// src/components/customer/CartSidebar.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../../redux/slices/cartSlice";
import { FaTrash, FaPlus, FaMinus, FaTimes, FaCreditCard } from "react-icons/fa";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items || []);
  const totalAmount = useSelector((state) => state.cart.totalAmount || 0);
  const { table } = useSelector((state) => state.customer || { table: null });

  const handleUpdateQuantity = (dishId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(dishId));
    } else {
      dispatch(updateQuantity({ dishId, quantity: newQuantity }));
    }
  };

  const handleCheckout = () => {
    if (!table) {
      enqueueSnackbar("Please select a table first", { variant: "warning" });
      onClose();
      navigate("/tables");
      return;
    }
    
    if (cartItems.length === 0) {
      enqueueSnackbar("Your cart is empty", { variant: "warning" });
      return;
    }
    
    // Navigate to checkout page
    navigate("/checkout");
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 z-50 shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-white text-xl font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ height: "calc(100vh - 180px)" }}>
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              <div className="text-6xl mb-4">🛒</div>
              <p>Your cart is empty</p>
              <p className="text-sm mt-2">Add items from the menu</p>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.dishId}
                  className="bg-gray-800 rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{item.name}</h3>
                    <p className="text-[#f1b135] text-sm">₹{item.price}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-1">
                      <button
                        onClick={() => handleUpdateQuantity(item.dishId, item.quantity - 1)}
                        className="p-1 hover:bg-gray-600 rounded transition"
                      >
                        <FaMinus className="text-white text-xs" />
                      </button>
                      <span className="text-white min-w-[30px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.dishId, item.quantity + 1)}
                        className="p-1 hover:bg-gray-600 rounded transition"
                      >
                        <FaPlus className="text-white text-xs" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => dispatch(removeFromCart(item.dishId))}
                      className="text-red-500 hover:text-red-400 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-900">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400">Total Amount:</span>
            <span className="text-white text-xl font-bold">₹{totalAmount}</span>
          </div>
          
          {table && (
            <div className="bg-gray-800 rounded-lg p-2 mb-4 text-center">
              <p className="text-gray-400 text-sm">Table Number: {table.tableNo}</p>
            </div>
          )}
          
          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
              cartItems.length === 0
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-[#f1b135] text-gray-900 hover:opacity-90"
            }`}
          >
            <FaCreditCard />
            Proceed to Checkout
          </button>
          
          {cartItems.length > 0 && (
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full mt-2 py-2 rounded-lg text-red-500 hover:text-red-400 transition text-sm"
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;