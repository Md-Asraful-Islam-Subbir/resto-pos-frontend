import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalPrice } from "../../redux/slices/cartSlice";
import {
  addOrder,
  createOrderRazorpay,
  updateTable,
  verifyPaymentRazorpay,
} from "../../https/index";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { removeAllItems } from "../../redux/slices/cartSlice";
import { removeCustomer } from "../../redux/slices/customerSlice";
import Invoice from "../invoice/Invoice";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Bill = () => {
  const dispatch = useDispatch();

  const customerData = useSelector((state) => state.customer);
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  const [paymentMethod, setPaymentMethod] = useState();
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderInfo, setOrderInfo] = useState();

const handlePlaceOrder = async () => {
  console.log("button clicked");
  if (!paymentMethod) {
    enqueueSnackbar("Please select a payment method!", { variant: "warning" });
    return;
  }

if (paymentMethod === "Online") {
  try {
    console.log("🔄 Initiating SSLCommerz payment...");  // step 1

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/ssl-init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Number(totalPriceWithTax.toFixed(2)),
        customer: {
          name: customerData.customerName || "Guest",
          phone: customerData.customerPhone || "01700000000",
          email: customerData.customerEmail || "guest@example.com",
          address: customerData.address || "Dhaka",
          city: customerData.city || "Dhaka",
        },
      }),
    });

    console.log("✅ Response status:", res.status); // step 2

    const data = await res.json();
    console.log("✅ API Response:", data); // step 3

    if (data.url) {
      console.log("🔀 Redirecting to SSLCommerz:", data.url); // step 4
      window.location.href = data.url;
    } else {
      enqueueSnackbar(data.message || "Failed to initiate payment", { variant: "error" });
    }
  } catch (err) {
    console.error("❌ Payment Error:", err); // step 5
    enqueueSnackbar("Payment Failed!", { variant: "error" });
  }
}
else {
    // Cash Order
    const orderData = {
      customerDetails: {
        name: customerData.customerName,
        phone: customerData.customerPhone,
        guests: customerData.guests,
      },
      orderStatus: "In Progress",
      bills: {
        total: total,
        tax: tax,
        totalWithTax: totalPriceWithTax,
      },
      items: cartData,
      table: customerData.table.tableId,
      paymentMethod: paymentMethod,
    };

    orderMutation.mutate(orderData);
  }
};

  const orderMutation = useMutation({
    mutationFn: (reqData) => addOrder(reqData),
    onSuccess: (resData) => {
      const { data } = resData.data;
      console.log(data);

      setOrderInfo(data);

      // Update Table
      const tableData = {
        status: "Booked",
        orderId: data._id,
        tableId: data.table,
      };

      setTimeout(() => {
        tableUpdateMutation.mutate(tableData);
      }, 1500);

      enqueueSnackbar("Order Placed!", {
        variant: "success",
      });
      setShowInvoice(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const tableUpdateMutation = useMutation({
    mutationFn: (reqData) => updateTable(reqData),
    onSuccess: (resData) => {
      console.log(resData);
      dispatch(removeCustomer());
      dispatch(removeAllItems());
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <div className="flex items-center justify-between px-2 mt-1">
        <p className="text-xs text-[#ababab] font-normal mt-1">
          Items({cartData.lenght})
        </p>
        <h1 className="text-[#f5f5f5] text-sm font-bold">
          ৳{total.toFixed(2)}
        </h1>
      </div>
      <div className="flex items-center justify-between px-2 mt-1">
        <p className="text-xs text-[#ababab] font-normal mt-1">Tax(5.25%)</p>
        <h1 className="text-[#f5f5f5] text-sm font-bold">৳{tax.toFixed(2)}</h1>
      </div>
      <div className="flex items-center justify-between px-2 mt-1">
        <p className="text-xs text-[#ababab] font-normal mt-1">
          Total With Tax
        </p>
        <h1 className="text-[#f5f5f5] text-sm font-bold">
          ৳{totalPriceWithTax.toFixed(2)}
        </h1>
      </div>
      <div className="flex items-center gap-3 px-2 mt-1">
        <button
          onClick={() => setPaymentMethod("Cash")}
          className={`bg-[#1f1f1f] px-2 py-1 w-full rounded-lg text-[#ababab] font-semibold ${
            paymentMethod === "Cash" ? "bg-[#383737]" : ""
          }`}
        >
          Cash
        </button>
        <button
          onClick={() => setPaymentMethod("Online")}
          className={`bg-[#1f1f1f] px-2 py-1 w-full rounded-lg text-[#ababab] font-semibold ${
            paymentMethod === "Online" ? "bg-[#383737]" : ""
          }`}
        >
          Online
        </button>
      </div>

      <div className="flex items-center gap-3 px-2 mt-1">
        <button className="bg-[#025cca] px-2 py-1 w-full rounded-lg text-[#f5f5f5] font-semibold text-lg">
          Print Receipt
        </button>
        <button
          onClick={handlePlaceOrder}
          className="bg-[#f6b100] px-2 py-1 w-full rounded-lg text-[#1f1f1f] font-semibold text-lg"
        >
          Place Order
        </button>
      </div>

      {showInvoice && (
        <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
      )}
    </>
  );
};

export default Bill;
