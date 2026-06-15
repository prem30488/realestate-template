import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../constants/index.jsx';
import './DesignConsultation.css';

const FEATURES = [
    { icon: '🎨', title: 'Personalised Moodboards', desc: 'Curated style boards tailored to your taste, space, and lifestyle.' },
    { icon: '📐', title: 'Space Planning', desc: 'Functional layouts that maximise flow, light, and usability.' },
    { icon: '💡', title: 'Material & Lighting', desc: 'Expert guidance on surfaces, finishes, and ambient lighting.' },
    { icon: '📊', title: 'Budget Roadmap', desc: 'Clear cost breakdown so every rupee is accounted for.' },
    { icon: '🏛️', title: 'Architect Review', desc: 'Structural constraints assessed by licensed professionals.' },
    { icon: '🔄', title: 'Follow-up Support', desc: 'Post-consultation Q&A to keep your project on track.' },
];

const STEPS = [
    { num: '01', label: 'Book a Slot', desc: 'Share your requirements and pick a convenient time.' },
    { num: '02', label: 'Brief Call', desc: 'A quick pre-session call to align expectations.' },
    { num: '03', label: 'Consultation', desc: '30–90 min in-depth session with a senior designer.' },
    { num: '04', label: 'Action Plan', desc: 'Receive a personalised plan & optional detailed proposal.' },
];

function SkeletonRow() {
    return (
        <tr className="dc-skeleton-row">
            <td><span className="dc-skel" /></td>
            <td><span className="dc-skel" /></td>
            <td><span className="dc-skel" /></td>
        </tr>
    );
}

export default function DesignConsultation() {
    const [ranges, setRanges] = useState([]);
    const [global, setGlobal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/consultation/prices`);
                if (!res.ok) throw new Error('Failed to load prices');
                const data = await res.json();
                if (!mounted) return;
                setRanges(data.ranges || []);
                setGlobal(data.global || null);
            } catch (e) {
                console.error(e);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    return (
        <div className="dc-page">

            {/* ── Hero ── */}
            <header className="dc-hero">
                <div className="dc-hero-badge">Interior Design · Expert Guidance</div>
                <h1 className="dc-hero-title">
                    Transform Your Space<br />
                    <span className="dc-hero-accent">with a Design Consultation</span>
                </h1>
                <p className="dc-hero-sub">
                    Connect with seasoned interior designers for a focused, personalised session —
                    on-site or virtual, at your convenience.
                </p>
                <div className="dc-hero-actions">
                    <button className="dc-btn-primary" onClick={() => window.location.href = '/share-requirement'}>
                        Book Your Consultation
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                    <span className="dc-hero-trust">✔ No commitment · Free first brief call</span>
                </div>
            </header>

            {/* ── Feature Grid ── */}
            <section className="dc-features-section">
                <div className="dc-section-label">What's Included</div>
                <h2 className="dc-section-title">Everything You Need to Begin</h2>
                <div className="dc-features-grid">
                    {FEATURES.map(f => (
                        <div key={f.title} className="dc-feature-card">
                            <span className="dc-feature-icon">{f.icon}</span>
                            <h3 className="dc-feature-title">{f.title}</h3>
                            <p className="dc-feature-desc">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Process Steps ── */}
            <section className="dc-process-section">
                <div className="dc-section-label">How It Works</div>
                <h2 className="dc-section-title">Your Journey in 4 Steps</h2>
                <div className="dc-steps">
                    {STEPS.map((s, i) => (
                        <React.Fragment key={s.num}>
                            <div className="dc-step">
                                <div className="dc-step-num">{s.num}</div>
                                <div className="dc-step-body">
                                    <h3 className="dc-step-label">{s.label}</h3>
                                    <p className="dc-step-desc">{s.desc}</p>
                                </div>
                            </div>
                            {i < STEPS.length - 1 && <div className="dc-step-connector" />}
                        </React.Fragment>
                    ))}
                </div>
            </section>

            {/* ── Pricing + CTA ── */}
            <section className="dc-pricing-section">
                <div className="dc-pricing-header">
                    <div>
                        <div className="dc-section-label">Transparent Pricing</div>
                        <h2 className="dc-section-title" style={{ marginBottom: 4 }}>Consultation Charges</h2>
                        <p className="dc-pricing-sub">
                            Standard range: <strong>{global ? `₹${Number(global.min).toLocaleString('en-IN')} — ₹${Number(global.max).toLocaleString('en-IN')}` : '₹10,000 — ₹5,00,000'}</strong>
                            &nbsp;· Fees are per engagement and non-refundable once the session begins.
                        </p>
                    </div>
                </div>

                <div className="dc-table-wrap">
                    <table className="dc-table">
                        <thead>
                            <tr>
                                <th>City</th>
                                <th>Min Fee (INR)</th>
                                <th>Max Fee (INR)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading
                                ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                                : ranges.map(r => (
                                    <tr key={r.city}>
                                        <td><span className="dc-city-dot" />{r.city}</td>
                                        <td>₹{Number(r.min).toLocaleString('en-IN')}</td>
                                        <td>₹{Number(r.max).toLocaleString('en-IN')}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <p className="dc-disclaimer">
                    Prices shown are indicative. Final fees are agreed with the designer based on project scope.
                    All quoted ranges are in INR and cover professional consultation fees only — material, travel, and execution costs are extra.
                </p>
            </section>

            {/* ── Final CTA Banner ── */}
            <section className="dc-cta-banner">
                <div className="dc-cta-text">
                    <h2>Ready to Reimagine Your Space?</h2>
                    <p>Share your vision and our team will match you with the perfect designer.</p>
                </div>
                <button className="dc-btn-primary" onClick={() => window.location.href = '/share-requirement'}>
                    Share Requirement
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
            </section>

        </div>
    );
}
