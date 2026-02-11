
import React, { useState, useEffect } from 'react';
import LeadForm from '../components/LeadForm';
import LeadList from '../components/LeadList';
import LeadDetailModal from '../components/LeadDetailModal';
import './Dash.css';
import axios from 'axios'

const API = import.meta.env.VITE_API_URL;

export default function Dash() {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLeadSubmit = (newLead) => {
    const leadWithId = {
      ...newLead,
      id: Date.now(),
      created_at: new Date().toISOString(),
    };
    setLeads([leadWithId, ...leads]);
  };


  


  const fetchLeads = async () => {
    try {
      const response = await axios.get(`${API}/leads`);
      setLeads(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  
  // const handleLeadSubmit = async (newLead) => {
  //   try {
  //     setLoading(true);

  //     const response = await axios.post(API_URL, newLead);

     
  //     setLeads((prev) => [response.data, ...prev]);

  //   } catch (error) {
  //     console.error("Error saving lead:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleViewLead = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseLead = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Lead Capture Dashboard</h1>
        <p>Manage and track all your leads in one place</p>
      </header>

      <div className="dashboard-content">
        <div className="form-section">
          <LeadForm onSubmit={handleLeadSubmit} />
        </div>

        <div className="list-section">
          <LeadList leads={leads} onViewLead={handleViewLead} />
        </div>
      </div>

      {isModalOpen && (
        <LeadDetailModal lead={selectedLead} onClose={handleCloseLead} />
      )}
    </div>
  );
}
