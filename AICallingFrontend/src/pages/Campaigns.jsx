import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { campaignAPI } from "../services/api";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    region: "India",
    language: "English",
    status: "Created",
  });
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const navigate = useNavigate();

  // Fetch all campaigns
  const fetchCampaigns = async () => {
    try {
      const res = await campaignAPI.get(""); //Removed the forward slash within the double-inverted commas
      setCampaigns(res.data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      await campaignAPI.post("/", formData);
      setFormData({
        name: "",
        startDate: "",
        endDate: "",
        region: "India",
        language: "English",
        status: "Created",
      });
      fetchCampaigns();
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Failed to create campaign. Please check the console for details.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleStart = async (id) => {
    try {
      await campaignAPI.post(`/${id}/start`);
      fetchCampaigns();
    } catch (error) {
      console.error("Error starting campaign:", error);
    }
  };

  const handleSaveStatus = async () => {
    try {
      if (!editingId) return;
      await campaignAPI.put(`/${editingId}/status`, null, {
        params: { status: formData.status },
      });
      setEditingId(null);
      fetchCampaigns();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleEdit = (campaign) => {
    setEditingId(campaign.id);
    setFormData({ ...formData, status: campaign.status });
  };

  // Shared class for modern inputs and selects
  const baseInputClass = "w-full bg-white/50 border border-white/80 text-gray-800 text-sm font-medium rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:bg-white outline-none px-4 py-2.5 transition-all duration-300 placeholder:text-gray-400 shadow-[0_2px_10px_rgba(0,0,0,0.02)] backdrop-blur-md cursor-pointer";

  return (
    <div className="relative z-10 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 drop-shadow-sm">
          Campaigns Management
        </h1>
        <p className="text-sm font-medium text-gray-500 mt-2 tracking-wide">
          Create, manage, and monitor your AI calling campaigns
        </p>
      </div>

      {/* Create Campaign Form */}
      <div className="group relative overflow-hidden bg-white/60 backdrop-blur-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-3xl p-6 md:p-8 mb-8 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(99,102,241,0.1)]">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-400/10 blur-[50px] rounded-full pointer-events-none transition-all duration-500 group-hover:bg-indigo-400/20"></div>
        
        <h2 className="relative z-10 text-lg font-extrabold text-gray-800 mb-6 tracking-tight">Create New Campaign</h2>
        
        <form className="relative z-10 flex flex-wrap gap-4 items-end" onSubmit={handleCreate}>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Campaign Name</label>
            <input
              type="text"
              name="name"
              placeholder="E.g., Q3 Marketing"
              value={formData.name}
              onChange={handleChange}
              required
              className={`${baseInputClass} !cursor-text`}
            />
          </div>
          <div className="flex-1 min-w-[130px]">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className={baseInputClass}
            />
          </div>
          <div className="flex-1 min-w-[130px]">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className={baseInputClass}
            />
          </div>
          <div className="flex-1 min-w-[120px]">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Region</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className={baseInputClass}
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
          <div className="flex-1 min-w-[120px]">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className={baseInputClass}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
          <div className="flex-1 min-w-[120px]">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={baseInputClass}
            >
              <option value="Created">Created</option>
              <option value="Running">Running</option>
              <option value="Paused">Paused</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <div className="w-full sm:w-auto mt-2">
            <button
              type="submit"
              disabled={isCreating}
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm rounded-xl px-8 py-2.5 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-[1.02] transition-all duration-300 whitespace-nowrap outline-none h-[42px] disabled:opacity-50 disabled:pointer-events-none"
            >
              {isCreating ? "Creating..." : "Create Campaign"}
            </button>
          </div>
        </form>
      </div>

      {/* Campaign Table */}
      <div className="group relative overflow-hidden bg-white/60 backdrop-blur-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-3xl p-6 md:p-8 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(168,85,247,0.08)]">
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-purple-400/10 blur-[50px] rounded-full pointer-events-none transition-all duration-500 group-hover:bg-purple-400/20"></div>
        
        <div className="relative z-10 overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-200/60 text-gray-500 text-[11px] uppercase tracking-wider font-bold">
                <th className="p-4 pl-2">Name</th>
                <th className="p-4">Start Date</th>
                <th className="p-4">End Date</th>
                <th className="p-4">Region</th>
                <th className="p-4">Language</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/60">
              {campaigns.map((camp, index) => (
                <tr key={index} className="hover:bg-indigo-50/40 transition-colors duration-300 group/row">
                  <td className="p-4 pl-2 font-bold text-gray-800">{camp.name}</td>
                  <td className="p-4 font-medium text-gray-600 text-sm">{camp.startDate}</td>
                  <td className="p-4 font-medium text-gray-600 text-sm">{camp.endDate}</td>
                  <td className="p-4 font-medium text-gray-600 text-sm">{camp.region}</td>
                  <td className="p-4 font-medium text-gray-600 text-sm">{camp.language}</td>
                  <td className="p-4">
                    {editingId === camp.id ? (
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="bg-white/70 border border-gray-200 text-gray-800 text-xs font-bold rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm backdrop-blur-md cursor-pointer"
                      >
                        <option value="Created">Created</option>
                        <option value="Running">Running</option>
                        <option value="Paused">Paused</option>
                        <option value="Completed">Completed</option>
                      </select>
                    ) : (
                      <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                        camp.status === 'Running' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                        camp.status === 'Paused' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                        camp.status === 'Completed' ? 'bg-gray-100 text-gray-500 border-gray-200' :
                        'bg-indigo-50 text-indigo-600 border-indigo-200'
                      }`}>
                        {camp.status}
                      </span>
                    )}
                  </td>
                  <td className="p-4 flex gap-2 items-center">
                    <button
                      onClick={() => handleStart(camp.id)}
                      className="bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-300 shadow-sm"
                    >
                      Start
                    </button>
  
                    <button
                      onClick={() => navigate(`/campaigns/${camp.id}`)}
                      className="bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-300 shadow-sm"
                    >
                      View
                    </button>
  
                    {editingId === camp.id ? (
                      <button
                        onClick={handleSaveStatus}
                        className="bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-300 shadow-sm"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(camp)}
                        className="bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-300 shadow-sm"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
