import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { COMPANY_INFO } from '../constants/companyInfo';
import { API_BASE_URL } from '../constants';
import MailOutlineIcon from '@mui/icons-material/Mail';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import BusinessIcon from '@mui/icons-material/Business';
import LanguageIcon from '@mui/icons-material/Language';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SendIcon from '@mui/icons-material/Send';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: '',
    acceptTerms: false
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Checkbox validation (Display popup error if not checked)
    if (!formData.acceptTerms) {
      toast.error('You must accept the Terms and Services of the website to proceed.', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#ff4d4d',
          color: '#ffffff',
          fontWeight: '600',
          borderRadius: '10px',
        }
      });
      return;
    }

    // 2. Fields validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.comment.trim()) {
      toast.error('Please fill in all the required fields (Name, Email, and Comment).');
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/contact`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        comment: formData.comment,
        toEmail: COMPANY_INFO.email
      });

      toast.success(response.data?.message || 'Message sent successfully!', {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#00cc66',
          color: '#ffffff',
          fontWeight: '600',
          borderRadius: '10px',
        }
      });

      // Clear the form
      setFormData({
        name: '',
        email: '',
        phone: '',
        comment: '',
        acceptTerms: false
      });
    } catch (error) {
      console.error('Contact submit error:', error);
      toast.error(error.response?.data?.error || 'Failed to submit contact message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-us-container">
      {/* --- 1. Contact Banner Header --- */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-subtitle">Get In Touch</span>
          <h1 className="contact-title">Let's Craft Your Next Chapter</h1>
          <p className="contact-text">
            Have questions about our premium residential properties, valuations, or smart landmarks? 
            Reach out to our advisory desk and experience immediate transparency.
          </p>
        </div>
      </section>

      {/* --- 2. Contact Main Section Grid --- */}
      <section className="contact-main-grid-section">
        <div className="contact-layout-wrapper">
          
          {/* Left Panel: Company details & Google Map */}
          <div className="contact-details-panel">
            <h2 className="panel-title">Corporate Headquarters</h2>
            <p className="panel-desc">Visit our corporate workspace or call our helpline for premium assistance.</p>
            
            <div className="info-cards-stack">
              {/* Address */}
              <div className="info-card">
                <div className="info-icon-box"><BusinessIcon /></div>
                <div className="info-content">
                  <h5>Office Address</h5>
                  <p>{COMPANY_INFO.address1}</p>
                  <p>{COMPANY_INFO.address2}</p>
                  <span className="badge-details">{COMPANY_INFO.city}, {COMPANY_INFO.state}</span>
                </div>
              </div>

              {/* Phone */}
              <div className="info-card">
                <div className="info-icon-box"><PhoneInTalkIcon /></div>
                <div className="info-content">
                  <h5>Phone & Helpline</h5>
                  <p className="highlight-text">{COMPANY_INFO.phone1}</p>
                  {COMPANY_INFO.phone2 && <p>{COMPANY_INFO.phone2}</p>}
                  <span className="badge-details">Mon - Sat: 9 AM - 7 PM</span>
                </div>
              </div>

              {/* Email & Web */}
              <div className="info-card">
                <div className="info-icon-box"><MailOutlineIcon /></div>
                <div className="info-content">
                  <h5>Digital Correspondence</h5>
                  <p className="highlight-text">{COMPANY_INFO.email}</p>
                  <a href={COMPANY_INFO.websiteUrl} target="_blank" rel="noopener noreferrer" className="web-link">
                    <LanguageIcon className="inline-icon" /> {COMPANY_INFO.websiteUrl}
                  </a>
                </div>
              </div>

              {/* GSTIN */}
              {COMPANY_INFO.gstin && (
                <div className="info-card">
                  <div className="info-icon-box"><ReceiptIcon /></div>
                  <div className="info-content">
                    <h5>Tax Identification (GSTIN)</h5>
                    <p className="gstin-code">{COMPANY_INFO.gstin}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Google Map Section */}
            {COMPANY_INFO.googleMapLink && (
              <div className="google-map-wrapper">
                <iframe
                  title="Company Location Map"
                  src={COMPANY_INFO.googleMapLink}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}
          </div>

          {/* Right Panel: Sleek Contact Form */}
          <div className="contact-form-panel">
            <h2 className="panel-title">Send A Message</h2>
            <p className="panel-desc">Fill in details below and an asset advisory specialist will correspond within 24 hours.</p>

            <form onSubmit={handleSubmit} className="contact-inquiry-form">
              {/* Name */}
              <div className="form-group-custom">
                <label htmlFor="contact-name">Full Name <span className="req">*</span></label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  required
                />
              </div>

              {/* Email & Phone grid */}
              <div className="form-row-custom">
                <div className="form-group-custom">
                  <label htmlFor="contact-email">Email Address <span className="req">*</span></label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                    required
                  />
                </div>
                
                <div className="form-group-custom">
                  <label htmlFor="contact-phone">Phone Number</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 99999 99999"
                  />
                </div>
              </div>

              {/* Comment */}
              <div className="form-group-custom">
                <label htmlFor="contact-comment">Your Inquiry / Comments <span className="req">*</span></label>
                <textarea
                  id="contact-comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell us about your property requirement, budget, or general query..."
                  required
                ></textarea>
              </div>

              {/* Checkbox (I accept terms) */}
              <div className="terms-checkbox-wrapper">
                <label className="checkbox-container-custom">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                  />
                  <span className="checkmark-custom"></span>
                  <span className="checkbox-label-text">
                    I accept the <a href="#" onClick={(e) => { e.preventDefault(); toast('Our standard Terms and Services protect your data in compliance with general real estate advisory protocols.'); }} className="terms-link">Terms and Services</a> of the website. <span className="req">*</span>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className={`contact-submit-btn ${submitting ? 'submitting' : ''}`}
                disabled={submitting}
              >
                {submitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <SendIcon className="btn-icon" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactUs;
