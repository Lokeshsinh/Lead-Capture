

import React, { useState } from 'react';
import './LeadForm.css';
import axios from "axios"
const API = import.meta.env.VITE_API_URL;


export default function LeadForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    source: 'Website',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
        
      await axios.post(`${API}/leads/`, formData);
      // setMessage("Lead submitted successfully!");
    
      onSubmit(formData);

     
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        source: 'Website',
      });

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Failed to capture lead. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <h2>Capture New Lead</h2>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-error">{errorMessage}</div>}

      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 000-0000"
          className={errors.phone ? 'input-error' : ''}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your Company"
        />
      </div>

      <div className="form-group">
        <label htmlFor="source">Source *</label>
        <select
          id="source"
          name="source"
          value={formData.source}
          onChange={handleChange}
        >
          <option value="Website">Website</option>
          <option value="Instagram">Instagram</option>
          <option value="Referral">Referral</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us more about your interest..."
          rows="4"
        ></textarea>
      </div>

      <button type="submit" className="submit-button" disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="spinner"></span>
            Submitting...
          </>
        ) : (
          'Submit Lead'
        )}
      </button>
    </form>
  );
}
