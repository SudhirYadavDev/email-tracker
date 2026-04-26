import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} />
    
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;