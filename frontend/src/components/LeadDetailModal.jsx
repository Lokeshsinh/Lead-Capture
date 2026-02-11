'use client';

import React from 'react';
import './LeadDetailModal.css';

export default function LeadDetailModal({ lead, onClose }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!lead) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Lead Details</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-group">
            <label>Name</label>
            <p>{lead.name}</p>
          </div>

          <div className="detail-group">
            <label>Email</label>
            <p>
              <a href={`mailto:${lead.email}`}>{lead.email}</a>
            </p>
          </div>

          {lead.phone && (
            <div className="detail-group">
              <label>Phone</label>
              <p>
                <a href={`tel:${lead.phone}`}>{lead.phone}</a>
              </p>
            </div>
          )}

          {lead.company && (
            <div className="detail-group">
              <label>Company</label>
              <p>{lead.company}</p>
            </div>
          )}

          <div className="detail-group">
            <label>Source</label>
            <p>
              <span className={`source-badge source-${lead.source.toLowerCase()}`}>
                {lead.source}
              </span>
            </p>
          </div>

          <div className="detail-group">
            <label>Submitted Date</label>
            <p>{formatDate(lead.created_at)}</p>
          </div>

          {lead.message && (
            <div className="detail-group">
              <label>Message</label>
              <p className="message-text">{lead.message}</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
           <a href={`mailto:${lead.email}`}  className="btn-primary">
            Send Email
          </a> 
        </div>
      </div>
    </div>
  );
}
