import React, { useEffect, useState } from "react";
import restaurant from "../assets/images/restaurant-img.jpg";
import logo from "../assets/images/logo.png";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

const Auth = () => {
  useEffect(() => {
    document.title = "POS | Auth";

    // Inject Google Font: Playfair Display for heading, Nunito for body
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Nunito:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const [isRegister, setIsRegister] = useState(false);

  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen w-full"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative items-center justify-center">
        <img
          className="w-full h-full object-cover"
          src={restaurant}
          alt="Restaurant"
        />
        <div className="absolute inset-0 bg-black/80"></div>
        <blockquote className="absolute bottom-6 xl:bottom-10 px-6 xl:px-8 text-lg xl:text-2xl italic text-white">
          "Serve customers the best food with prompt and friendly service in a
          welcoming atmosphere, and they'll keep coming back."
          <br />
          <span className="block mt-3 text-[#f1b135]">
            — Founder of BiteByte
          </span>
        </blockquote>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 xl:w-2/5 min-h-screen bg-[#1a1a1a] px-6 sm:px-8 md:px-10 py-6 sm:py-8 flex flex-col justify-center">

        {/* Logo + Brand + Heading on same row */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-[#f1b135] rounded-full p-1 shrink-0"
          />

          {/* Brand name + Heading stacked */}
          <div className="flex flex-col leading-tight">
            <span
              className="text-xs sm:text-sm font-semibold text-[#ababab] tracking-widest uppercase"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              BiteByte
            </span>
            <h2
              className="text-xl sm:text-2xl xl:text-3xl font-bold text-[#f1b135]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {isRegister ? "Employee Registration" : "Employee Login"}
            </h2>
          </div>
        </div>

        {/* Form */}
        <div>
          {isRegister ? (
            <Register setIsRegister={setIsRegister} />
          ) : (
            <Login />
          )}
        </div>

        {/* Toggle */}
        <div className="flex justify-center mt-4">
          <p className="text-xs sm:text-sm text-[#ababab] text-center">
            {isRegister
              ? "Already have an account?"
              : "Don't have an account?"}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="ml-2 text-[#f1b135] font-semibold hover:underline"
            >
              {isRegister ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;