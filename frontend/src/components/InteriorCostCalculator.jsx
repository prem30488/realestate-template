import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './InteriorCostCalculator.css';

const FINISH_LEVELS = {
    Basic: { min: 600, max: 900, label: '₹600–900/sqft' },
    Standard: { min: 900, max: 1400, label: '₹900–1.4k/sqft' },
    Premium: { min: 1400, max: 2200, label: '₹1.4–2.2k/sqft' },
    Luxury: { min: 2200, max: 4000, label: '₹2.2–4k/sqft' },
};

const ADDONS = {
    kitchen: { label: 'Modular Kitchen', min: 80000, max: 200000 },
    wardrobe: { label: 'Wardrobes / Storage', min: 20000, max: 80000 },
    falseCeiling: { label: 'False Ceiling', min: 8000, max: 35000 },
    painting: { label: 'Premium Painting', min: 6000, max: 25000 },
};

function fmt(n) { return '₹' + n.toLocaleString('en-IN'); }

export default function InteriorCostCalculator() {
    const navigate = useNavigate();
    const [area, setArea] = useState(800);
    const [rooms, setRooms] = useState(3);
    const [level, setLevel] = useState('Standard');
    const [addons, setAddons] = useState({});

    const toggleAddon = (k) => setAddons(a => ({ ...a, [k]: !a[k] }));

    const estimate = useMemo(() => {
        const lvl = FINISH_LEVELS[level] || FINISH_LEVELS.Standard;
        const baseMin = Math.round(area * lvl.min);
        const baseMax = Math.round(area * lvl.max);
        let addMin = 0, addMax = 0;
        Object.keys(ADDONS).forEach(k => {
            if (addons[k]) { addMin += ADDONS[k].min; addMax += ADDONS[k].max; }
        });
        return {
            min: baseMin + addMin, max: baseMax + addMax,
            breakdown: { baseMin, baseMax, addMin, addMax }
        };
    }, [area, level, addons]);

    return (
        <div className="icc-page">

            {/* ── Hero ── */}
            <section className="icc-hero">
                <div className="icc-hero-inner">
                    <div>
                        <div className="icc-hero-badge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                            Free Instant Estimator
                        </div>
                        <h1>Full Home Interior <span>Cost Calculator</span></h1>
                        <p className="icc-sub">
                            Get an instant ballpark estimate for your full-home interior —
                            kitchen, wardrobes, ceilings and all key finishes included.
                        </p>
                    </div>

                    <div className="icc-hero-cta">
                        <div className="icc-hero-stat">
                            <span className="icc-hero-stat-num">500+</span>
                            <span className="icc-hero-stat-label">Projects Completed</span>
                        </div>
                        <div className="icc-hero-stat">
                            <span className="icc-hero-stat-num">4.9★</span>
                            <span className="icc-hero-stat-label">Client Rating</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Main ── */}
            <main className="icc-main">
                <div className="icc-left">

                    {/* Input Card */}
                    <div className="icc-card">
                        <h2 className="icc-card-title">Enter Project Details</h2>

                        <div className="icc-field">
                            <label className="icc-label">Built-up Area (sq ft)</label>
                            <input
                                type="number" min="100" value={area}
                                onChange={e => setArea(Math.max(100, Number(e.target.value) || 0))}
                                className="icc-input"
                                placeholder="e.g. 1200"
                            />
                        </div>

                        <div className="icc-field">
                            <label className="icc-label">Number of Rooms</label>
                            <select value={rooms} onChange={e => setRooms(Number(e.target.value))} className="icc-select">
                                {[1, 2, 3, 4, 5, 6, 7].map(n => (
                                    <option key={n} value={n}>{n} {n === 1 ? 'Room' : 'Rooms'}</option>
                                ))}
                            </select>
                        </div>

                        <div className="icc-field">
                            <label className="icc-label">Finish Level</label>
                            <div className="icc-levels">
                                {Object.entries(FINISH_LEVELS).map(([k, v]) => (
                                    <button
                                        key={k}
                                        className={`icc-level ${k === level ? 'active' : ''}`}
                                        onClick={() => setLevel(k)}
                                    >
                                        {k}
                                        <span className="icc-level-range">{v.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="icc-addons-section">
                            <h3>Add-ons (optional)</h3>
                            <div className="icc-addons">
                                {Object.entries(ADDONS).map(([k, v]) => (
                                    <label
                                        key={k}
                                        className={`icc-addon ${addons[k] ? 'checked' : ''}`}
                                        onClick={() => toggleAddon(k)}
                                    >
                                        <input type="checkbox" checked={!!addons[k]} onChange={() => { }} />
                                        <span className="icc-addon-checkbox" />
                                        <span className="icc-addon-text">
                                            <span className="icc-addon-label">{v.label}</span>
                                            <span className="icc-addon-range">{fmt(v.min)} – {fmt(v.max)}</span>
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Breakdown Card */}
                    <div className="icc-card icc-breakdown">
                        <h2 className="icc-card-title">Estimate Breakdown</h2>

                        <div className="icc-breakdown-rows">
                            <div className="icc-row">
                                <span className="icc-row-label">Base cost ({area.toLocaleString('en-IN')} sq ft × {level})</span>
                                <span className="icc-row-value">{fmt(estimate.breakdown.baseMin)} – {fmt(estimate.breakdown.baseMax)}</span>
                            </div>
                            <div className="icc-row">
                                <span className="icc-row-label">Selected add-ons</span>
                                <span className="icc-row-value">
                                    {estimate.breakdown.addMin > 0
                                        ? `${fmt(estimate.breakdown.addMin)} – ${fmt(estimate.breakdown.addMax)}`
                                        : '—'}
                                </span>
                            </div>
                        </div>

                        <div className="icc-total">
                            <span className="icc-total-label">Estimated Total Project Cost</span>
                            <span className="icc-total-amount">{fmt(estimate.min)} – {fmt(estimate.max)}</span>
                        </div>

                        <p className="icc-note">
                            💡 This is a ballpark estimate. Final quotes depend on scope, materials and site conditions.
                        </p>
                    </div>
                </div>

                {/* ── Sidebar ── */}
                <aside className="icc-right">
                    <div className="icc-summary">
                        <div className="icc-summary-header">
                            <h3>Why use this calculator?</h3>
                            <p>Plan smarter before you meet a designer.</p>
                        </div>
                        <div className="icc-summary-body">
                            <ul className="icc-summary-list">
                                <li>Instant ballpark figures to set your budget before talking to designers</li>
                                <li>Switch finish levels to see how costs scale instantly</li>
                                <li>Add kitchen, ceilings & wardrobes for a more accurate total</li>
                                <li>Share your requirement to get detailed quotes from verified designers</li>
                            </ul>
                        </div>
                        <div className="icc-side-cta">
                            <button className="icc-primary" onClick={() => navigate('/share-requirement')}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                                </svg>
                                Request Free Quotes
                            </button>
                        </div>
                    </div>

                    <div className="icc-trust-card">
                        <h4>Our Track Record</h4>
                        <div className="icc-trust-badges">
                            <div className="icc-badge">
                                <span className="icc-badge-num">500+</span>
                                <span className="icc-badge-label">Projects Done</span>
                            </div>
                            <div className="icc-badge">
                                <span className="icc-badge-num">12+</span>
                                <span className="icc-badge-label">Years Exp.</span>
                            </div>
                            <div className="icc-badge">
                                <span className="icc-badge-num">4.9★</span>
                                <span className="icc-badge-label">Avg Rating</span>
                            </div>
                            <div className="icc-badge">
                                <span className="icc-badge-num">98%</span>
                                <span className="icc-badge-label">On-Time</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}
