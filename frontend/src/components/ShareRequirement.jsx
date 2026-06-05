import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { COMPANY_INFO } from '../constants/companyInfo';
import { API_BASE_URL } from '../constants';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MessageIcon from '@mui/icons-material/Message';
import SendIcon from '@mui/icons-material/Send';
import './ShareRequirement.css';

const ShareRequirement = () => {
    const [formData, setFormData] = useState({
        userType: 'Owner', // Owner, Dealer, Builder
        name: '',
        email: '',
        phone: '',
        companyName: '',
        city: '',
        query: ''
    });

    const [cities, setCities] = useState([]);
    const [isCityModalOpen, setIsCityModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/cities`);
                const data = await response.json();
                setCities(data.map(c => c.name));
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };
        fetchCities();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCitySelect = (city) => {
        setFormData(prev => ({ ...prev, city }));
        setIsCityModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || !formData.city || !formData.query) {
            toast.error('Please fill in all required fields.');
            return;
        }

        setSubmitting(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/contact`, {
                ...formData,
                comment: `[Share Requirement - ${formData.userType}] ${formData.query}${formData.companyName ? ` (Company: ${formData.companyName})` : ''}`,
                toEmail: COMPANY_INFO.email
            });

            toast.success('Your requirement has been shared successfully!');
            setFormData({
                userType: 'Owner',
                name: '',
                email: '',
                phone: '',
                companyName: '',
                city: '',
                query: ''
            });
        } catch (error) {
            console.error('Submit error:', error);
            toast.error('Failed to share requirement. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="share-requirement-page">
            <div className="share-requirement-container">
                <div className="form-header">
                    <h1>Share Your Requirement</h1>
                    <p>Tell us what you are looking for, and our experts will help you find the best property.</p>
                </div>

                <div className="form-card">
                    <form onSubmit={handleSubmit}>
                        {/* User Type Toggle */}
                        <div className="form-group user-type-group">
                            <label>You are</label>
                            <div className="segmented-control">
                                {['Owner', 'Dealer', 'Builder'].map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        className={formData.userType === type ? 'active' : ''}
                                        onClick={() => setFormData(prev => ({ ...prev, userType: type }))}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Name */}
                        <div className="form-group">
                            <label htmlFor="name">Name <span className="required">*</span></label>
                            <div className="input-with-icon">
                                <PersonIcon className="input-icon" />
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label htmlFor="email">Email <span className="required">*</span></label>
                            <div className="input-with-icon">
                                <EmailIcon className="input-icon" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                            <div className="input-with-icon phone-input-wrapper">
                                <span className="country-code">+91</span>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="Enter mobile number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Company Name (Optional) */}
                        <div className="form-group">
                            <label htmlFor="companyName">Company Name (Optional)</label>
                            <div className="input-with-icon">
                                <BusinessIcon className="input-icon" />
                                <input
                                    id="companyName"
                                    name="companyName"
                                    type="text"
                                    placeholder="Enter company name"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* City */}
                        <div className="form-group">
                            <label htmlFor="city">City <span className="required">*</span></label>
                            <div
                                className="input-with-icon city-selector-input"
                                onClick={() => setIsCityModalOpen(true)}
                            >
                                <LocationCityIcon className="input-icon" />
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    placeholder="Select city"
                                    value={formData.city}
                                    readOnly
                                    required
                                />
                                <i className="pe-7s-angle-down arrow-icon"></i>
                            </div>
                        </div>

                        {/* Query */}
                        <div className="form-group">
                            <label htmlFor="query">Type your query <span className="required">*</span></label>
                            <div className="input-with-icon textarea-wrapper">
                                <MessageIcon className="input-icon textarea-icon" />
                                <textarea
                                    id="query"
                                    name="query"
                                    placeholder="Describe your property requirements, budget, location etc."
                                    value={formData.query}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`submit-btn ${submitting ? 'loading' : ''}`}
                            disabled={submitting}
                        >
                            {submitting ? 'Sending...' : 'Send Request'}
                            {!submitting && <SendIcon className="btn-icon" />}
                        </button>
                    </form>
                </div>

                {/* Support Section */}
                <div className="support-footer">
                    <p>Get in touch</p>
                    <div className="phone-contact">
                        <PhoneIcon className="phone-icon" />
                        <span>Call us on our toll free number <strong>{COMPANY_INFO.phone1}</strong></span>
                    </div>
                </div>
            </div>

            {/* City Selection Modal */}
            {isCityModalOpen && (
                <div className="city-modal-overlay" onClick={() => setIsCityModalOpen(false)}>
                    <div className="city-modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Select City</h3>
                            <button
                                className="close-btn"
                                onClick={() => setIsCityModalOpen(false)}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="city-list">
                            {cities.length > 0 ? (
                                cities.map(city => (
                                    <div
                                        key={city}
                                        className={`city-option ${formData.city === city ? 'selected' : ''}`}
                                        onClick={() => handleCitySelect(city)}
                                    >
                                        {city}
                                    </div>
                                ))
                            ) : (
                                <p className="no-cities">Loading cities...</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShareRequirement;
