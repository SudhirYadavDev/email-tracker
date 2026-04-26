import React, { useEffect, useState } from "react";
import { leadAPI, campaignAPI } from "../services/api";
import { FaUser, FaBullhorn } from "react-icons/fa";

const Dashboard = () => {
  const [leadsCount, setLeadsCount] = useState(0);
  const [campaignCount, setCampaignCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const leadsRes = await leadAPI.get("/count");
        setLeadsCount(leadsRes.data.count);

        const campaignRes = await campaignAPI.get("/count");
        setCampaignCount(campaignRes.data.count);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="relative z-10 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 drop-shadow-sm">
          Dashboard Overview
        </h1>
        <p className="text-sm font-medium text-gray-500 mt-2 tracking-wide">Monitor your AI calling workspace</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Leads Metric Card */}
        <div className="group relative overflow-hidden bg-white/60 backdrop-blur-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-3xl p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(99,102,241,0.1)] cursor-default">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-400/10 blur-[30px] rounded-full transition-all duration-500 group-hover:bg-indigo-400/20 group-hover:scale-150"></div>
          <div className="relative z-10 flex items-center justify-between mb-6">
            <h2 className="text-gray-500 font-bold tracking-wider text-xs uppercase">Total Leads</h2>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform duration-500 shadow-sm border border-white">
              <FaUser className="text-xl" />
            </div>
          </div>
          <p className="relative z-10 text-4xl md:text-5xl font-black text-gray-800 tracking-tight drop-shadow-sm">{leadsCount}</p>
        </div>

        {/* Campaigns Metric Card */}
        <div className="group relative overflow-hidden bg-white/60 backdrop-blur-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-3xl p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(168,85,247,0.1)] cursor-default">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-purple-400/10 blur-[30px] rounded-full transition-all duration-500 group-hover:bg-purple-400/20 group-hover:scale-150"></div>
          <div className="relative z-10 flex items-center justify-between mb-6">
            <h2 className="text-gray-500 font-bold tracking-wider text-xs uppercase">Campaigns</h2>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-50 to-white flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform duration-500 shadow-sm border border-white">
              <FaBullhorn className="text-xl" />
            </div>
          </div>
          <p className="relative z-10 text-4xl md:text-5xl font-black text-gray-800 tracking-tight drop-shadow-sm">{campaignCount}</p>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;