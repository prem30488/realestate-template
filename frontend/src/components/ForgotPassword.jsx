import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../constants';
import './ForgotPassword.css';

const ForgotPassword = ({ onLoginClick }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setSubmitted(true);
                toast.success('Password reset instructions sent to your email!');
            } else {
                const data = await response.json();
                toast.error(data.message || 'Failed to process request');
            }
        } catch (err) {
            console.error('Forgot password error:', err);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="forgot-password-page">
                <div className="forgot-password-container success">
                    <div className="success-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </div>
                    <h2>Check Your Email</h2>
                    <p>We've sent password reset instructions to <strong>{email}</strong>.</p>
                    <p className="hint">If you don't see it in a few minutes, check your spam folder.</p>
                    <Link to="/" className="back-to-login-btn">Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="forgot-password-page">
            <div className="forgot-password-container">
                <div className="forgot-password-header">
                    <h2>Forgot Password?</h2>
                    <p>No worries! Enter your email address and we'll send you instructions to reset your password.</p>
                </div>

                <form className="forgot-password-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="reset-btn" disabled={loading}>
                        {loading ? 'Sending Instructions...' : 'Send Reset Instructions'}
                    </button>
                </form>

                <div className="forgot-password-footer">
                    <span>Remembered your password?</span>
                    <a href="#" onClick={(e) => { e.preventDefault(); onLoginClick(); }}>Sign In</a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
