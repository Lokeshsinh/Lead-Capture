
import React, { useState } from 'react';
import './LeadList.css';

export default function LeadList({ leads, onViewLead }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSource, setFilterSource] = useState('All');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterSource === 'All' || lead.source === filterSource;

    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const sources = ['All', 'Website', 'Instagram', 'Referral', 'Other'];

  return (
    <div className="lead-list-container">
      <div className="list-header">
        <h2>Leads ({filteredLeads.length})</h2>
        <p>View and manage all captured leads</p>
      </div>

      <div className="filters-section">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="filter-buttons">
          {sources.map((source) => (
            <button
              key={source}
              className={`filter-btn ${filterSource === source ? 'active' : ''}`}
              onClick={() => setFilterSource(source)}
            >
              {source}
            </button>
          ))}
        </div>
      </div>

      {filteredLeads.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">📭</p>
          <p className="empty-text">
            {leads.length === 0
              ? 'No leads yet. Submit a form to get started!'
              : 'No leads match your search or filter.'}
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="leads-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Source</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td className="name-cell">{lead.name}</td>
                  <td className="email-cell">{lead.email}</td>
                  <td>
                    <span className={`source-badge source-${lead.source.toLowerCase()}`}>
                      {lead.source}
                    </span>
                  </td>
                  <td>{formatDate(lead.created_at)}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => onViewLead(lead)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
