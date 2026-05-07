import React from "react";
import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="relative h-20 bg-white/60 backdrop-blur-3xl border-b border-white/40 flex items-center justify-between px-6 z-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-indigo-400/20 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="w-16 flex justify-start relative z-10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group p-2.5 text-xl text-gray-500 hover:text-indigo-600 bg-transparent hover:bg-white/80 rounded-2xl transition-all duration-500 ease-out focus:outline-none hover:shadow-[0_8px_16px_rgba(99,102,241,0.1)] border border-transparent hover:border-white/60"
        ></button>
      </div>

      <div className="text-2xl md:text-3xl font-black text-center flex-1 relative z-10 tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 drop-shadow-sm">
          AI Calling Team
        </span>
      </div>

      <div className="w-16 flex justify-end relative z-10">
        <button
          onClick={handleLogout}
          className="group p-3 text-lg text-red-500 hover:text-white bg-white/80 hover:bg-red-500 rounded-2xl transition-all duration-300 shadow-sm border border-white/60 hover:shadow-[0_8px_20px_rgba(239,68,68,0.25)]"
        >
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
