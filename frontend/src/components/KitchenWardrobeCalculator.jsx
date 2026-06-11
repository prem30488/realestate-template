import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './KitchenWardrobeCalculator.css';

const FINISH_LEVELS = {
    Basic: { min: 600, max: 900, label: '₹600–900/sqft' },
    Standard: { min: 900, max: 1400, label: '₹900–1.4k/sqft' },
    Premium: { min: 1400, max: 2200, label: '₹1.4–2.2k/sqft' },
    Luxury: { min: 2200, max: 4000, label: '₹2.2–4k/sqft' },
};

const ADDONS = {
    appliances: { label: 'Appliances & Fittings', min: 15000, max: 60000 },
    plumbing: { label: 'Plumbing & Fixtures', min: 8000, max: 30000 },
};

function fmt(n) { return '₹' + n.toLocaleString('en-IN'); }

export default function KitchenWardrobeCalculator() {
    const navigate = useNavigate();
    const [kitchenArea, setKitchenArea] = useState(150);
    const [wardrobeArea, setWardrobeArea] = useState(80);
    const [level, setLevel] = useState('Standard');
    const [addons, setAddons] = useState({});

    const toggleAddon = (k) => setAddons(a => ({ ...a, [k]: !a[k] }));

    const estimate = useMemo(() => {
        const lvl = FINISH_LEVELS[level] || FINISH_LEVELS.Standard;
        const kitchenMin = Math.round(kitchenArea * lvl.min);
        const kitchenMax = Math.round(kitchenArea * lvl.max);
        const wardrobeMin = Math.round(wardrobeArea * lvl.min * 0.7);
        const wardrobeMax = Math.round(wardrobeArea * lvl.max * 0.7);
        let addMin = 0, addMax = 0;
        Object.keys(ADDONS).forEach(k => {
            if (addons[k]) { addMin += ADDONS[k].min; addMax += ADDONS[k].max; }
        });
        return {
            min: kitchenMin + wardrobeMin + addMin,
            max: kitchenMax + wardrobeMax + addMax,
            breakdown: { kitchenMin, kitchenMax, wardrobeMin, wardrobeMax, addMin, addMax },
        };
    }, [kitchenArea, wardrobeArea, level, addons]);

    /* ── SVG icons ── */
    const KitchenIcon = () => (
        <svg className="kwc-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 3h18v4H3zM3 7v14M21 7v14M8 11v4M12 11v4M16 11v4" />
        </svg>
    );
    const WardrobeIcon = () => (
        <svg className="kwc-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="12" y1="3" x2="12" y2="21" />
            <circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" />
        </svg>
    );

    return (
        <div className="kwc-page">

            {/* ── Hero ── */}
            <section className="kwc-hero">
                <div className="kwc-hero-inner">
                    <div>
                        <div className="kwc-hero-badge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 3h18v4H3zM3 7v14M21 7v14M8 11v4M12 11v4M16 11v4" />
                            </svg>
                            Instant Price Estimator
                        </div>
                        <h1>Kitchen &amp; Wardrobe <span>Price Calculator</span></h1>
                        <p className="kwc-sub">
                            Estimate modular kitchen and wardrobe costs for any finish level —
                            instantly, for free, with no sign-up required.
                        </p>
                    </div>

                    <div className="kwc-hero-cta">
                        <div className="kwc-hero-stat">
                            <span className="kwc-hero-stat-num">300+</span>
                            <span className="kwc-hero-stat-label">Kitchens Installed</span>
                        </div>
                        <div className="kwc-hero-stat">
                            <span className="kwc-hero-stat-num">4.8★</span>
                            <span className="kwc-hero-stat-label">Client Rating</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Main ── */}
            <main className="kwc-main">
                <div className="kwc-left">

                    {/* Input Card */}
                    <div className="kwc-card">
                        <h2 className="kwc-card-title">Enter Project Details</h2>

                        {/* Kitchen + Wardrobe side by side */}
                        <div className="kwc-inputs-row">
                            <div className="kwc-field">
                                <label className="kwc-label">Kitchen Area (sq ft)</label>
                                <div className="kwc-input-icon-wrap">
                                    <KitchenIcon />
                                    <input
                                        type="number" min="10" value={kitchenArea}
                                        onChange={e => setKitchenArea(Math.max(10, Number(e.target.value) || 0))}
                                        className="kwc-input with-icon"
                                        placeholder="e.g. 150"
                                    />
                                </div>
                            </div>
                            <div className="kwc-field">
                                <label className="kwc-label">Wardrobe Area (sq ft)</label>
                                <div className="kwc-input-icon-wrap">
                                    <WardrobeIcon />
                                    <input
                                        type="number" min="0" value={wardrobeArea}
                                        onChange={e => setWardrobeArea(Math.max(0, Number(e.target.value) || 0))}
                                        className="kwc-input with-icon"
                                        placeholder="e.g. 80"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="kwc-field">
                            <label className="kwc-label">Finish Level</label>
                            <div className="kwc-levels">
                                {Object.entries(FINISH_LEVELS).map(([k, v]) => (
                                    <button
                                        key={k}
                                        className={`kwc-level ${k === level ? 'active' : ''}`}
                                        onClick={() => setLevel(k)}
                                    >
                                        {k}
                                        <span className="kwc-level-range">{v.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="kwc-addons-section">
                            <h3>Optional Add-ons</h3>
                            <div className="kwc-addons">
                                {Object.entries(ADDONS).map(([k, v]) => (
                                    <label
                                        key={k}
                                        className={`kwc-addon ${addons[k] ? 'checked' : ''}`}
                                        onClick={() => toggleAddon(k)}
                                    >
                                        <input type="checkbox" checked={!!addons[k]} onChange={() => { }} />
                                        <span className="kwc-addon-checkbox" />
                                        <span className="kwc-addon-text">
                                            <span className="kwc-addon-label">{v.label}</span>
                                            <span className="kwc-addon-range">{fmt(v.min)} – {fmt(v.max)}</span>
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Breakdown Card */}
                    <div className="kwc-card kwc-breakdown">
                        <h2 className="kwc-card-title">Cost Breakdown</h2>

                        <div className="kwc-breakdown-rows">
                            <div className="kwc-row">
                                <span className="kwc-row-label">Modular Kitchen ({kitchenArea} sq ft)</span>
                                <span className="kwc-row-value">{fmt(estimate.breakdown.kitchenMin)} – {fmt(estimate.breakdown.kitchenMax)}</span>
                            </div>
                            <div className="kwc-row">
                                <span className="kwc-row-label">Wardrobes / Storage ({wardrobeArea} sq ft)</span>
                                <span className="kwc-row-value">{fmt(estimate.breakdown.wardrobeMin)} – {fmt(estimate.breakdown.wardrobeMax)}</span>
                            </div>
                            <div className="kwc-row">
                                <span className="kwc-row-label">Selected add-ons</span>
                                <span className="kwc-row-value">
                                    {estimate.breakdown.addMin > 0
                                        ? `${fmt(estimate.breakdown.addMin)} – ${fmt(estimate.breakdown.addMax)}`
                                        : '—'}
                                </span>
                            </div>
                        </div>

                        <div className="kwc-total">
                            <span className="kwc-total-label">Estimated Total Project Cost</span>
                            <span className="kwc-total-amount">{fmt(estimate.min)} – {fmt(estimate.max)}</span>
                        </div>

                        <p className="kwc-note">
                            💡 Ballpark estimate only. Final scope and site evaluation will determine the actual quote.
                        </p>
                    </div>
                </div>

                {/* ── Sidebar ── */}
                <aside className="kwc-right">
                    <div className="kwc-summary">
                        <div className="kwc-summary-header">
                            <h3>How this calculator helps</h3>
                            <p>Budget smarter before you meet a designer.</p>
                        </div>
                        <div className="kwc-summary-body">
                            <ul className="kwc-summary-list">
                                <li>Plan kitchen &amp; wardrobe budgets separately for accurate projections</li>
                                <li>Instantly compare finish levels — Basic to Luxury</li>
                                <li>Include appliances &amp; plumbing for a near-complete picture</li>
                                <li>Share your requirement to get quotes from verified designers</li>
                            </ul>
                        </div>
                        <div className="kwc-side-cta">
                            <button className="kwc-primary" onClick={() => navigate('/share-requirement')}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                                </svg>
                                Request Free Quotes
                            </button>
                        </div>
                    </div>

                    <div className="kwc-trust-card">
                        <h4>Our Track Record</h4>
                        <div className="kwc-trust-badges">
                            <div className="kwc-badge">
                                <span className="kwc-badge-num">300+</span>
                                <span className="kwc-badge-label">Kitchens</span>
                            </div>
                            <div className="kwc-badge">
                                <span className="kwc-badge-num">10+</span>
                                <span className="kwc-badge-label">Years Exp.</span>
                            </div>
                            <div className="kwc-badge">
                                <span className="kwc-badge-num">4.8★</span>
                                <span className="kwc-badge-label">Avg Rating</span>
                            </div>
                            <div className="kwc-badge">
                                <span className="kwc-badge-num">96%</span>
                                <span className="kwc-badge-label">On-Time</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}
