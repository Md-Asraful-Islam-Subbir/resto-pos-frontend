import React, { useEffect, useRef } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../redux/slices/cartSlice";

const CartInfo = () => {
  const cartData = useSelector((state) => state.cart);
  const scrolLRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (scrolLRef.current) {
      scrolLRef.current.scrollTo({
        top: scrolLRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [cartData]);

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  return (
    <div className="px-4 py-1">
      <h1 className="text-base text-[#e4e4e4] font-semibold tracking-wide">
        Order Details
      </h1>
      <div
        className="mt-1 overflow-y-scroll scrollbar-hide h-[215px]"
        ref={scrolLRef}
      >
        {cartData.length === 0 ? (
          <p className="text-[#ababab] text-sm flex justify-center items-center h-[180px]">
            Your cart is empty. Start adding items!
          </p>
        ) : (
          cartData.map((item, index) => {
            return (
              <div
                key={item.id || index} // ✅ unique key (id preferred, fallback index)
                className="bg-[#1f1f1f] rounded-lg px-2 py-2 mb-1 flex items-center justify-between"
              >
                {/* Left side: Item name + quantity */}
                <div className="flex items-center gap-2">
                  <h1 className="text-[#f5f5f5] text-sm font-semibold truncate max-w-[120px]">
                    {item.name}
                  </h1>
                  <p className="text-[#ababab] text-xs">x{item.quantity}</p>
                </div>

                {/* Right side: Price + actions */}
                <div className="flex items-center gap-3">
                  <p className="text-[#f5f5f5] text-sm font-bold">
                    ৳{item.price}
                  </p>
                  <RiDeleteBin2Fill
                    onClick={() => handleRemove(item.id)}
                    className="text-[#ababab] cursor-pointer hover:text-red-400"
                    size={16}
                  />
                  <FaNotesMedical
                    className="text-[#ababab] cursor-pointer hover:text-blue-400"
                    size={16}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CartInfo;
