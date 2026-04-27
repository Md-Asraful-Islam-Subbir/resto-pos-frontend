import React, { useState } from "react";
import { register } from "../../https";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

const Register = ({ setIsRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelection = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  const registerMutation = useMutation({
    mutationFn: (reqData) => register(reqData),
    onSuccess: (res) => {
      const { data } = res;
      enqueueSnackbar(data.message, { variant: "success" });
      setFormData({ name: "", email: "", phone: "", password: "", role: "" });
      setTimeout(() => {
        setIsRegister(false);
      }, 1500);
    },
    onError: (error) => {
      const { response } = error;
      const message = response.data.message;
      enqueueSnackbar(message, { variant: "error" });
    },
  });

  // Check if selected role is customer
  const isCustomer = formData.role === "Customer";

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        {/* Name Field - Dynamic Label */}
        <div>
          <label className="block text-[#ababab] mb-1.5 text-xs sm:text-sm font-medium">
            {isCustomer ? "Full Name" : "Employee Name"}
          </label>
          <div className="flex items-center rounded-lg py-2.5 xl:py-3 px-3 xl:px-4 bg-[#1f1f1f]">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={isCustomer ? "Enter your full name" : "Enter employee name"}
              className="bg-transparent flex-1 text-white focus:outline-none text-xs sm:text-sm w-full placeholder:text-[#555]"
              required
            />
          </div>
        </div>

        {/* Email Field - Dynamic Label */}
        <div className="mt-2 xl:mt-2.5">
          <label className="block text-[#ababab] mb-1.5 text-xs sm:text-sm font-medium">
            {isCustomer ? "Email Address" : "Employee Email"}
          </label>
          <div className="flex items-center rounded-lg py-2.5 xl:py-3 px-3 xl:px-4 bg-[#1f1f1f]">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={isCustomer ? "Enter your email" : "Enter employee email"}
              className="bg-transparent flex-1 text-white focus:outline-none text-xs sm:text-sm w-full placeholder:text-[#555]"
              required
            />
          </div>
        </div>

        {/* Phone Field - Dynamic Label */}
        <div className="mt-2 xl:mt-2.5">
          <label className="block text-[#ababab] mb-1.5 text-xs sm:text-sm font-medium">
            {isCustomer ? "Phone Number" : "Employee Phone"}
          </label>
          <div className="flex items-center rounded-lg py-2.5 xl:py-3 px-3 xl:px-4 bg-[#1f1f1f]">
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={isCustomer ? "Enter your phone number" : "Enter employee phone"}
              className="bg-transparent flex-1 text-white focus:outline-none text-xs sm:text-sm w-full placeholder:text-[#555]"
              required
            />
          </div>
        </div>

        {/* Password Field - Dynamic Label */}
        <div className="mt-2 xl:mt-2.5">
          <label className="block text-[#ababab] mb-1.5 text-xs sm:text-sm font-medium">
            {isCustomer ? "Create Password" : "Password"}
          </label>
          <div className="flex items-center rounded-lg py-2.5 xl:py-3 px-3 xl:px-4 bg-[#1f1f1f]">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={isCustomer ? "Create a strong password" : "Enter password"}
              className="bg-transparent flex-1 text-white focus:outline-none text-xs sm:text-sm w-full placeholder:text-[#555]"
              required
            />
          </div>
          {isCustomer && (
            <p className="text-[#777] text-xs mt-1">
              Password must be at least 6 characters
            </p>
          )}
        </div>

        {/* Role Selection - Keep the instruction but change text */}
        <div className="mt-2 xl:mt-2.5">
          <label className="block text-[#fc0202] mb-1.5 text-xs sm:text-sm font-medium">
            {isCustomer 
              ? "Select your role (Customer) then fill other details" 
              : "Choose your role first, then fill other details"}
          </label>
          <div className="flex items-center gap-2 xl:gap-3">
            {["Waiter", "Customer", "Admin"].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleSelection(role)}
                className={`py-2.5 xl:py-3 px-3 xl:px-4 w-full rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200
                  ${formData.role === role ? "bg-indigo-700 text-white" : "bg-[#1f1f1f] text-[#ababab]"}`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button - Dynamic Text */}
        <button
          type="submit"
          className="w-full rounded-lg mt-3 xl:mt-4 py-2.5 xl:py-3 text-sm xl:text-base bg-[#f1b135] text-gray-900 font-bold transition-opacity hover:opacity-90"
        >
          {isCustomer ? "Register as Customer" : "Register as Employee"}
        </button>
      </form>

      {/* Additional info for customers */}
      {isCustomer && (
        <div className="mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-800/50">
          <p className="text-blue-300 text-xs text-center">
            📝 By registering as a customer, you can:
            <br />
            • Browse our menu
            <br />
            • Place orders from your table
            <br />
            • Track your order status
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;