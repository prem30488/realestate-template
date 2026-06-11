import React, { useState, useMemo } from 'react';
import './InteriorCostCalculator.css';

const FINISH_LEVELS = {
    Basic: { min: 600, max: 900 },
    Standard: { min: 900, max: 1400 },
    Premium: { min: 1400, max: 2200 },
    Luxury: { min: 2200, max: 4000 },
};

const ADDONS = {
    appliances: { label: 'Appliances & Fittings', min: 15000, max: 60000 },
    plumbing: { label: 'Plumbing & Fixtures', min: 8000, max: 30000 },
};

export default function KitchenWardrobeCalculator() {
    const [kitchenArea, setKitchenArea] = useState(150);
    const [wardrobeArea, setWardrobeArea] = useState(80);
    const [level, setLevel] = useState('Standard');
    const [addons, setAddons] = useState({});

    const toggleAddon = (k) => setAddons(a => ({ ...a, [k]: !a[k] }));

    const estimate = useMemo(() => {
        const lvl = FINISH_LEVELS[level] || FINISH_LEVELS.Standard;
        const kitchenMin = Math.round(kitchenArea * lvl.min);
        const kitchenMax = Math.round(kitchenArea * lvl.max);
        const wardrobeMin = Math.round(wardrobeArea * (lvl.min * 0.7));
        const wardrobeMax = Math.round(wardrobeArea * (lvl.max * 0.7));

        let addMin = 0, addMax = 0;
        Object.keys(ADDONS).forEach(k => {
            if (addons[k]) {
                addMin += ADDONS[k].min;
                addMax += ADDONS[k].max;
            }
        });

        return {
            min: kitchenMin + wardrobeMin + addMin,
            max: kitchenMax + wardrobeMax + addMax,
            breakdown: { kitchenMin, kitchenMax, wardrobeMin, wardrobeMax, addMin, addMax },
        };
    }, [kitchenArea, wardrobeArea, level, addons]);

    return (
        <div className="icc-page">
            <section className="icc-hero">
                <div className="icc-hero-inner">
                    <div>
                        <h1>Kitchen & Wardrobe Price Calculator</h1>
                        <p className="icc-sub">Estimate modular kitchen and wardrobe costs quickly.</p>
                    </div>
                    <div className="icc-hero-cta">
                        <button className="icc-primary" onClick={() => window.location.href = '/share-requirement'}>Share Requirement</button>
                    </div>
                </div>
            </section>

            <main className="icc-main">
                <div className="icc-left">
                    <div className="icc-card">
                        <h2>Project inputs</h2>

                        <label className="icc-label">Kitchen area (sq ft)</label>
                        <input type="number" min="10" value={kitchenArea} onChange={e => setKitchenArea(Number(e.target.value || 0))} className="icc-input" />

                        <label className="icc-label">Wardrobe area (sq ft)</label>
                        <input type="number" min="0" value={wardrobeArea} onChange={e => setWardrobeArea(Number(e.target.value || 0))} className="icc-input" />

                        <label className="icc-label">Finish level</label>
                        <div className="icc-levels">
                            {Object.keys(FINISH_LEVELS).map(k => (
                                <button key={k} className={`icc-level ${k === level ? 'active' : ''}`} onClick={() => setLevel(k)}>{k}</button>
                            ))}
                        </div>

                        <h3 style={{ marginTop: 18 }}>Optional add-ons</h3>
                        <div className="icc-addons">
                            {Object.keys(ADDONS).map(k => (
                                <label key={k} className="icc-addon">
                                    <input type="checkbox" checked={!!addons[k]} onChange={() => toggleAddon(k)} />
                                    <span>{ADDONS[k].label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="icc-card icc-breakdown">
                        <h2>Estimate</h2>
                        <div className="icc-row">
                            <div>Kitchen</div>
                            <div>₹{estimate.breakdown.kitchenMin.toLocaleString()} — ₹{estimate.breakdown.kitchenMax.toLocaleString()}</div>
                        </div>
                        <div className="icc-row">
                            <div>Wardrobes</div>
                            <div>₹{estimate.breakdown.wardrobeMin.toLocaleString()} — ₹{estimate.breakdown.wardrobeMax.toLocaleString()}</div>
                        </div>
                        <div className="icc-row">
                            <div>Add-ons</div>
                            <div>₹{estimate.breakdown.addMin.toLocaleString()} — ₹{estimate.breakdown.addMax.toLocaleString()}</div>
                        </div>
                        <div className="icc-total">
                            <div>Total estimated cost</div>
                            <div className="icc-total-amount">₹{estimate.min.toLocaleString()} — ₹{estimate.max.toLocaleString()}</div>
                        </div>
                        <p className="icc-note">Ballpark estimate only; final scope and site evaluation will determine the actual quote.</p>
                    </div>
                </div>

                <aside className="icc-right">
                    <div className="icc-summary">
                        <h3>How this helps</h3>
                        <ul>
                            <li>Plan budget for kitchen & storage separately</li>
                            <li>Compare finish levels to choose value</li>
                            <li>Share requirement to get verified designer quotes</li>
                        </ul>
                        <div className="icc-side-cta">
                            <button className="icc-primary" onClick={() => window.location.href = '/share-requirement'}>Request Quotes</button>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}
