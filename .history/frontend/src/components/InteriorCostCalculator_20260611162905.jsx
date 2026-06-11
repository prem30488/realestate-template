import React, { useState, useMemo } from 'react';
import './InteriorCostCalculator.css';

const FINISH_LEVELS = {
  Basic: { min: 600, max: 900 },
  Standard: { min: 900, max: 1400 },
  Premium: { min: 1400, max: 2200 },
  Luxury: { min: 2200, max: 4000 },
};

const ADDONS = {
  kitchen: { label: 'Modular Kitchen', min: 80000, max: 200000 },
  wardrobe: { label: 'Wardrobes / Storage', min: 20000, max: 80000 },
  falseCeiling: { label: 'False Ceiling', min: 8000, max: 35000 },
  painting: { label: 'Premium Painting', min: 6000, max: 25000 },
};

export default function InteriorCostCalculator() {
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
      if (addons[k]) {
        addMin += ADDONS[k].min;
        addMax += ADDONS[k].max;
      }
    });

    return {
      min: baseMin + addMin,
      max: baseMax + addMax,
      breakdown: { baseMin, baseMax, addMin, addMax },
    };
  }, [area, level, addons]);

  return (
    <div className="icc-page">
      <section className="icc-hero">
        <div className="icc-hero-inner">
          <div>
            <h1>Full Home Interior Cost Calculator</h1>
            <p className="icc-sub">Get an instant ballpark estimate for your full-home interior, including kitchen, wardrobes and key finishes.</p>
          </div>
          <div className="icc-hero-cta">
            <button className="icc-primary" onClick={() => window.location.href = '/share-requirement'}>Share Requirement</button>
          </div>
        </div>
      </section>

      <main className="icc-main">
        <div className="icc-left">
          <div className="icc-card">
            <h2>Enter project details</h2>

            <label className="icc-label">Built-up area (sq ft)</label>
            <input type="number" min="100" value={area} onChange={e => setArea(Number(e.target.value || 0))} className="icc-input" />

            <label className="icc-label">No. of rooms</label>
            <select value={rooms} onChange={e => setRooms(Number(e.target.value))} className="icc-select">
              {[1,2,3,4,5,6,7].map(n=> <option key={n} value={n}>{n}</option>)}
            </select>

            <label className="icc-label">Finish level</label>
            <div className="icc-levels">
              {Object.keys(FINISH_LEVELS).map(k => (
                <button key={k} className={`icc-level ${k===level ? 'active':''}`} onClick={() => setLevel(k)}>{k}</button>
              ))}
            </div>

            <h3 style={{marginTop:18}}>Add-ons (optional)</h3>
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
            <h2>Estimate breakdown</h2>
            <div className="icc-row">
              <div>Base cost ({area} sq ft)</div>
              <div>₹{estimate.breakdown.baseMin.toLocaleString()} — ₹{estimate.breakdown.baseMax.toLocaleString()}</div>
            </div>
            <div className="icc-row">
              <div>Add-ons</div>
              <div>₹{estimate.breakdown.addMin.toLocaleString()} — ₹{estimate.breakdown.addMax.toLocaleString()}</div>
            </div>
            <div className="icc-total">
              <div>Estimated project cost</div>
              <div className="icc-total-amount">₹{estimate.min.toLocaleString()} — ₹{estimate.max.toLocaleString()}</div>
            </div>
            <p className="icc-note">This is a ballpark estimate. Final quotes depend on scope, materials and site conditions.</p>
          </div>
        </div>

        <aside className="icc-right">
          <div className="icc-summary">
            <h3>Why use this calculator?</h3>
            <ul>
              <li>Fast ballpark estimates to plan your budget</li>
              <li>Choose finish level to see how costs change</li>
              <li>Share requirement to get detailed quotes from verified designers</li>
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
