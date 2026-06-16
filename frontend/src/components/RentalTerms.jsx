import React, { useEffect } from 'react';
import './LegalPages.css';
import { COMPANY_INFO } from '../constants/companyInfo';

const RentalTerms = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal-page-container">
            <div className="container">
                <div className="legal-card">
                    <header className="legal-header">
                        <span className="last-updated">Last Modified: June 1, 2024</span>
                        <h1>Rental Terms of Use</h1>
                    </header>

                    <div className="legal-body">
                        <section className="legal-content-section">
                            <h2>1. Rental Application Process</h2>
                            <p>
                                All rental applications submitted through {COMPANY_INFO.name} are subject to verification. Applicants must provide accurate information regarding their identity, income, and rental history.
                            </p>
                        </section>

                        <section className="legal-content-section">
                            <h2>2. Security Deposits</h2>
                            <p>
                                Security deposits are required for most rental properties. The amount is typically equal to one or two months' rent. This deposit is held to cover any damages to the property beyond normal wear and tear and will be returned according to the terms of the individual lease agreement.
                            </p>
                        </section>

                        <section className="legal-content-section">
                            <h2>3. Maintenance and Care</h2>
                            <p>
                                Tenants are expected to maintain the property in a clean and safe condition. Any maintenance issues must be reported promptly to the property management or landlord through the {COMPANY_INFO.name} portal or designated contact channels.
                            </p>
                        </section>

                        <section className="legal-content-section">
                            <h2>4. Lease Termination</h2>
                            <p>
                                Termination of a lease agreement must follow the notice period specified in the contract, typically 30 or 60 days. Failure to provide proper notice may result in the forfeiture of the security deposit or additional rent charges.
                            </p>
                        </section>

                        <section className="legal-content-section">
                            <h2>5. Prohibited Activities</h2>
                            <p>
                                Subletting, unauthorized pets, and illegal activities are strictly prohibited within the rental premises. Violation of these terms may lead to immediate eviction proceedings.
                            </p>
                        </section>

                        <section className="legal-content-section">
                            <h2>6. Dispute Resolution</h2>
                            <p>
                                Any disputes between landlords and tenants should first be attempted to be resolved through mediation. If a resolution cannot be reached, the matter will be settled according to local rental laws and regulations.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RentalTerms;
