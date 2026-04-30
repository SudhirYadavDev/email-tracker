import React from "react";
import {FaBell} from "react-icons/fa";

const Navbar = ({ isOpen, setIsOpen }) => {
  return (
    <div className="relative h-20 bg-white/60 backdrop-blur-3xl border-b border-white/40 flex items-center justify-between px-6 z-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
      
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-indigo-400/20 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="w-16 flex justify-start relative z-10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group p-2.5 text-xl text-gray-500 hover:text-indigo-600 bg-transparent hover:bg-white/80 rounded-2xl transition-all duration-500 ease-out focus:outline-none hover:shadow-[0_8px_16px_rgba(99,102,241,0.1)] border border-transparent hover:border-white/60"
        >
          
        </button>
      </div>

      <div className="text-2xl md:text-3xl font-black text-center flex-1 relative z-10 tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 drop-shadow-sm">
          AI Calling Team
        </span>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3 text-xl w-auto justify-end relative z-10">
        <button className="group relative p-2.5 sm:p-3 rounded-2xl bg-transparent hover:bg-white/80 transition-all duration-500 ease-out border border-transparent hover:border-white/60 cursor-pointer hover:shadow-[0_8px_16px_rgba(99,102,241,0.1)]">
          <FaBell className="text-gray-400 group-hover:text-indigo-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[15deg] origin-top" />
          {/* Notification dot */}
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-gradient-to-tr from-pink-500 to-rose-500 rounded-full shadow-[0_0_12px_rgba(236,72,153,0.8)] border-[1.5px] border-white"></span>
        </button>
        
        <button className="group relative p-1.5 sm:p-2 rounded-2xl bg-transparent hover:bg-white/80 transition-all duration-500 ease-out border border-transparent hover:border-white/60 cursor-pointer flex items-center justify-center hover:shadow-[0_8px_16px_rgba(168,85,247,0.1)]">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 p-[2px] transition-transform duration-500 group-hover:scale-110 shadow-sm">
            <div className="w-full h-full rounded-full bg-white border border-white overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </button>
      </div>

    </div>
  );
};

export default Navbar;