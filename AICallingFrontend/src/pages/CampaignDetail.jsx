import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { campaignAPI, emailAPI } from "../services/api";

const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const [emailBody, setEmailBody] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [logs, setLogs] = useState([]);

  const fetchCampaign = async () => {
    try {
      const res = await campaignAPI.get(`/${id}`);
      setCampaign(res.data);
    } catch (error) {
      console.error("Error fetching campaign details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, [id]);

  useEffect(() => {
  const fetchLogs = async () => {
    try {
      const res = await emailAPI.get("/logs");
      setLogs(res.data);
    } catch (err) {
      console.error("Error fetching logs:", err);
    }
  };

  fetchLogs();
}, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-indigo-600 font-bold tracking-wider animate-pulse">
        Loading Campaign Details...
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <div className="text-gray-500 font-bold text-lg tracking-wider">
          Campaign not found!
        </div>
        <button
          className="bg-white/80 border border-gray-200 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm outline-none"
          onClick={() => navigate("/campaigns")}
        >
          &larr; Back to Campaigns
        </button>
      </div>
    );
  }

  const filteredLeads = (campaign.leads || []).filter(
    (lead) =>
      (lead.name &&
        lead.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.email &&
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.phone && lead.phone.includes(searchTerm)) ||
      (lead.region &&
        lead.region.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredLeads.length / pageSize);
  const currentLeads = filteredLeads.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const goToPage = (page) => {
    if (page >= 0 && page < totalPages) setCurrentPage(page);
  };

  const handleSendEmail = async () => {
    if (!emailBody.trim()) {
      alert("Email body cannot be empty!");
      return;
    }
    setIsSending(true);
    try {
      await campaignAPI.post(`/${id}/start`, {
      emailBody
    });

      const res = await emailAPI.get("/logs");
      setLogs(res.data);

      alert("Emails sent successfully!");
    } catch (error) {
      console.error("Error sending emails:", error);
      alert("Failed to send emails.");
    } finally {
      setIsSending(false);
    }
  };

  const logMap = Object.fromEntries(
  logs.map((l) => [l.email, l])
);

const getStatus = (email) => {
  return logMap[email]?.status || "NOT_SENT";
};

  return (
    <div className="relative z-10 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 drop-shadow-sm">
            {campaign.name}
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-2 tracking-wide">
            Campaign Details
          </p>
        </div>
        <button
          className="w-full sm:w-auto bg-white/80 border border-gray-200 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm outline-none"
          onClick={() => navigate("/campaigns")}
        >
          &larr; Back to Campaigns
        </button>
      </div>

      {/* OVERVIEW */}
      <div className="group relative overflow-hidden bg-white/60 backdrop-blur-3xl border border-white/60 shadow rounded-3xl p-6 md:p-8 mb-8">
        <h2 className="text-lg font-extrabold mb-6">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          <p><b>Start:</b> {campaign.startDate}</p>
          <p><b>End:</b> {campaign.endDate}</p>
          <p><b>Region:</b> {campaign.region}</p>
          <p><b>Language:</b> {campaign.language}</p>
          <p><b>Status:</b> {campaign.status}</p>
        </div>
      </div>

      {/* EMAIL + PREVIEW */}
      <div className="group bg-white/60 border rounded-3xl p-6 mb-8">
        <h2 className="text-lg font-extrabold mb-6">Email Template</h2>

        <div className="grid md:grid-cols-2 gap-6">

          {/* LEFT */}
          <div>
            <textarea
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              placeholder="Write your email..."
              rows={10}
              className="w-full border rounded-xl p-3"
            />

            <button
              onClick={handleSendEmail}
              disabled={isSending}
              className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-xl"
            >
              {isSending ? "Sending..." : "Start Campaign"}
            </button>
          </div>

          {/* RIGHT PREVIEW */}
          <div className="bg-gray-50 border rounded-xl p-4">
            <h3 className="font-bold mb-2">Preview</h3>
            <div className="text-sm whitespace-pre-wrap">
              {emailBody || "Preview will appear here..."}
            </div>
          </div>

        </div>
      </div>

      {/* LEADS */}
      <div className="bg-white p-6 rounded-3xl">
        <h2 className="font-bold mb-4">Leads</h2>

        <input
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 mb-3"
        />

        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Region</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
  {currentLeads.map((lead, i) => {
    const status = getStatus(lead.email);

    return (
      <tr key={i}>
        <td>{lead.name}</td>
        <td>{lead.email}</td>
        <td>{lead.phone}</td>
        <td>{lead.region}</td>

        {/* ✅ ADD THIS */}
        <td>
          {status === "OPENED" && (
            <span className="text-green-600">✅ Opened</span>
          )}
          {status === "NOT_OPENED" && (
            <span className="text-yellow-500">⏳ Not Opened</span>
          )}
          {status === "FAILED" && (
            <span className="text-red-500">❌ Failed</span>
          )}
          {status === "NOT_SENT" && (
            <span className="text-gray-400">—</span>
          )}
        </td>
      </tr>
    );
  })}
</tbody>
        </table>

        <div className="mt-3">
          Page {currentPage + 1} / {totalPages || 1}
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;