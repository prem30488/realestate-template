import React, { useEffect } from 'react';
import './LegalPages.css';
import { COMPANY_INFO } from '../constants/companyInfo';

const TermsAndConditions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal-page-container">
            <div className="container">
                <div className="legal-card">
                    <header className="legal-header">
                        <span className="last-updated">Effective Date: June 1, 2024</span>
                        <h1>Terms & Conditions</h1>
                    </header>

                    <div className="legal-body">
                        <section className="legal-content-section">
                            <h2>1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using the {COMPANY_INFO.name} website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
                            </p>
                        </section>

                        <section className="legal-content-section">
                            <h2>2. Use of Site</h2>
                            <p>
                                All content provided on this website is for informational purposes only. You may use our site for personal, non-commercial purposes related to seeking real estate information. You agree not to:
                            </p>
                            <ul>
                                <li>Use the site for any fraudulent or unlawful purpose.</li>
                                <li>Attempt to interfere with the proper working of the site.</li>
                                <li>Scrape or collect data from our listings without explicit permission.</li>
                            </ul>
                        </section>

                        <section className="legal-content-section">
                            <h2>3. Intellectual Property</h2>
                            <p>
                                All materials on this site, including text, graphics, logos, and images, are the property of {COMPANY_INFO.name} and are protected by applicable copyright and trademark laws. Unauthorized use of any material on this site may violate copyright, trademark, and other laws.
                            </p>
                        </section>

                        <section className="legal-content-section">
                            <h2>4. Limitation of Liability</h2>
                            <p>
                                {COMPANY_INFO.name} shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the site or for the cost of procurement of substitute services.
                            </p>
                        </section>

                        <section className="legal-content-section">
                            <h2>5. Governing Law</h2>
                            <p>
                                These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which {COMPANY_INFO.name} operates, without regard to its conflict of law provisions.
                            </p>
                        </section>

                        <section className="legal-content-section">
                            <h2>6. Contact Us</h2>
                            <p>
                                If you have any questions about these Terms & Conditions, please contact us at {COMPANY_INFO.email}.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
