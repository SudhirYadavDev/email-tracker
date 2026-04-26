import React, { useEffect, useState, useRef } from "react";
import { leadAPI } from "../services/api";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5; // can adjust as needed

  const fetchLeads = async (page = 0) => {
    try {
      const res = await leadAPI.get(`?page=${page}&size=${pageSize}`);
      setLeads(res.data.content);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Axios and Fetch automatically set the correct Content-Type with the required `boundary` for FormData.
      // Manually setting "Content-Type": "multipart/form-data" strips the boundary and breaks the upload.
      await leadAPI.post("/upload", formData);
      
      setFile(null); // Clear selected file in state
      if (fileInputRef.current) fileInputRef.current.value = ""; // Clear file input UI
      
      fetchLeads(currentPage); // refresh current page after upload
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const goToPage = (page) => {
    if (page >= 0 && page < totalPages) {
      fetchLeads(page);
    }
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 drop-shadow-sm">
          Leads Management
        </h1>
        <p className="text-sm font-medium text-gray-500 mt-2 tracking-wide">
          Import and manage your contacts for AI calling
        </p>
      </div>

      <div className="group relative overflow-hidden bg-white/60 backdrop-blur-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-3xl p-6 md:p-8 mb-8 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(99,102,241,0.1)]">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-400/10 blur-[50px] rounded-full pointer-events-none transition-all duration-500 group-hover:bg-indigo-400/20"></div>
        
        <h2 className="relative z-10 text-lg font-extrabold text-gray-800 mb-4 tracking-tight">Upload Contacts</h2>
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
          <input 
            type="file" 
            ref={fileInputRef}
            accept=".csv"
            onChange={handleFileChange} 
            className="block w-full sm:w-auto text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-wider file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 transition-all cursor-pointer bg-white/50 border border-white/80 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] backdrop-blur-md outline-none"
          />
          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm rounded-xl px-8 py-2.5 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-[1.02] transition-all duration-300 whitespace-nowrap outline-none disabled:opacity-50 disabled:pointer-events-none"
          >
            {isUploading ? "Uploading..." : "Upload CSV"}
          </button>
        </div>
      </div>

      <div className="group relative overflow-hidden bg-white/60 backdrop-blur-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-3xl p-6 md:p-8 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(168,85,247,0.08)]">
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-purple-400/10 blur-[50px] rounded-full pointer-events-none transition-all duration-500 group-hover:bg-purple-400/20"></div>
        
        <div className="relative z-10 overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-200/60 text-gray-500 text-[11px] uppercase tracking-wider font-bold">
                <th className="p-4 pl-2">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/60">
              {leads.map((lead, index) => (
                <tr key={index} className="hover:bg-indigo-50/40 transition-colors duration-300 group/row">
                  <td className="p-4 pl-2 font-bold text-gray-800">{lead.name}</td>
                  <td className="p-4 font-medium text-gray-600 text-sm">{lead.email}</td>
                  <td className="p-4 font-medium text-gray-600 text-sm">{lead.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200/60">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Page {currentPage + 1} of {totalPages || 1}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 0}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed bg-white/80 border border-gray-200 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 outline-none"
              >
                Previous
              </button>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage + 1 >= totalPages}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed bg-white/80 border border-gray-200 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 outline-none"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;