import React, { useEffect } from 'react';
import './LegalPages.css';
import { COMPANY_INFO } from '../constants/companyInfo';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal-page-container">
            <div className="container">
                <div className="legal-card">
                    <header className="legal-header">
                        <span className="last-updated">Active as of: June 1, 2024</span>
                        <h1>Privacy Policy</h1>
                    </header>

                    <div className="legal-body">
                        <section className="legal-content-section">
                            <h2>1. Data Collection</h2>
                            <p>
                                We collect information that you provide directly to us, such as when you create an account, submit a property inquiry, or subscribe to our newsletter. This data may include your name, email address, phone number, and property preferences.
                            </p>
                        </section>

                        <section className="legal-content-section">
                            <h2>2. Use of Information</h2>
                            <p>
                                {COMPANY_INFO.name} uses the collected data to:
                            </p>
                            <ul>
                                <li>Provide and improve our real estate services.</li>
                                <li>Respond to your comments, questions, and requests.</li>
                                <li>Send you technical notices, updates, and security alerts.</li>
                                <li>Communicate with you about properties and services that may interest you.</li>
                            </ul>
                        </section>

                        <section className="legal-content-section">
                            <h2>3. Cookies and Tracking</h2>
                            <p>
                                We use cookies and similar tracking technologies to track the activity on our service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                            </p>
                        </section>

                        <section className="legal-content-section">
                            <h2>4. Data Sharing</h2>
                            <p>
                                We do not sell your personal information to third parties. We may share your information with licensed real estate agents or property developers only when you explicitly request more information about a specific listing or service.
                            </p>
                        </section>

                        <section className="legal-content-section">
                            <h2>5. Data Security</h2>
                            <p>
                                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                            </p>
                        </section>

                        <section className="legal-content-section">
                            <h2>6. Your Rights</h2>
                            <p>
                                You have the right to access, update, or delete the personal information we have on you. Whenever made possible, you can update your personal information directly within your account settings section.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
