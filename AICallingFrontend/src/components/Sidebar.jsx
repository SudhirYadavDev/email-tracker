import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaBullhorn, FaCog, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/" },
    { name: "Leads", icon: <FaUser />, path: "/leads" },
    { name: "Campaigns", icon: <FaBullhorn />, path: "/campaigns" },
  ];

  return (
    <div
      className={`relative h-[100vh] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[8px_0_40px_rgba(0,0,0,0.04)] z-40 ${
        isOpen ? "w-72" : "w-[88px]"
      } bg-white/40 border-r border-white/60 backdrop-blur-2xl`}
    >
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-0 w-full h-64 bg-indigo-500/10 blur-[100px] rounded-full -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-64 bg-purple-500/10 blur-[100px] rounded-full translate-y-1/2 pointer-events-none"></div>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-4 top-10 bg-white/90 backdrop-blur-md border border-white shadow-[0_8px_20px_rgba(99,102,241,0.15)] rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:scale-110 transition-all duration-300 z-50 cursor-pointer outline-none"
      >
        {isOpen ? <FaChevronLeft className="text-[10px]" /> : <FaChevronRight className="text-[10px]" />}
      </button>

      {/* Logo */}
      <div
        className={`relative flex items-center transition-all duration-500 ease-out ${
          isOpen ? "p-6 h-28" : "p-4 h-24 justify-center"
        }`}
      >
        <div
          className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-blue-600 shadow-[0_8px_30px_rgba(79,70,229,0.4)] transition-all duration-500 z-10 overflow-hidden shrink-0 group ${
            isOpen ? "w-12 h-12" : "w-10 h-10"
          }`}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay"></div>
          <span className="text-white font-black text-xl tracking-tighter relative z-10">AI</span>
        </div>
        
        <div 
          className={`flex flex-col ml-4 transition-all duration-500 ease-out overflow-hidden ${
            isOpen ? "opacity-100 translate-x-0 w-32" : "opacity-0 -translate-x-4 w-0 hidden"
          }`}
        >
          <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight leading-none">
            Calling
          </span>
          <span className="text-[9px] font-bold text-indigo-500 tracking-[0.3em] uppercase mt-1">
            Workspace
          </span>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 flex flex-col px-3 py-4 space-y-2 overflow-y-auto relative z-10 scrollbar-hide">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`group relative flex items-center ${
                isOpen ? "px-4 py-3.5" : "justify-center p-3 mx-auto w-12 h-12"
              } rounded-2xl cursor-pointer transition-all duration-400 ease-out border-none outline-none focus:outline-none`}
            >
              {/* Active Background & Glow */}
              <div
                className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                  isActive
                    ? "bg-gradient-to-br from-indigo-500/15 via-purple-500/5 to-fuchsia-500/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] border border-white/80 backdrop-blur-md"
                    : "bg-transparent hover:bg-white/50 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)] border border-transparent hover:border-white/40"
                }`}
              ></div>

              {/* Active Left Pill */}
              <div
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-r-full transition-all duration-500 shadow-[0_0_12px_rgba(99,102,241,0.6)] ${
                  isActive ? "h-8 opacity-100" : "h-0 opacity-0"
                }`}
              ></div>

              {/* Icon */}
              <span
                className={`relative z-10 flex items-center justify-center transition-all duration-500 ${
                  isActive
                    ? "text-indigo-600 scale-110 drop-shadow-[0_0_10px_rgba(99,102,241,0.4)] text-lg"
                    : "text-gray-400 group-hover:text-indigo-500 group-hover:scale-110 text-lg"
                }`}
              >
                {item.icon}
              </span>

              {/* Label */}
              <span
                className={`relative z-10 font-semibold text-sm tracking-wide transition-all duration-500 whitespace-nowrap ${
                  isOpen ? "ml-4 opacity-100 translate-x-0" : "opacity-0 -translate-x-4 w-0 hidden"
                } ${isActive ? "text-indigo-900" : "text-gray-500 group-hover:text-gray-800"}`}
              >
                {item.name}
              </span>

              {/* Modern Tooltip for collapsed state */}
              {!isOpen && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-gray-800/90 backdrop-blur-xl border border-white/10 text-white text-xs font-bold rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-x-2 group-hover:translate-x-0 transition-all duration-300 shadow-2xl whitespace-nowrap z-50 flex items-center">
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800/90 rotate-45 border-b border-l border-white/10"></div>
                  {item.name}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;