import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../constants/index.jsx';
import './DesignConsultation.css';

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
      <header className="dc-hero">
        <h1>Design Consultation</h1>
        <p className="dc-sub">Book an expert interior design consultation to kickstart your project.</p>
      </header>

      <main className="dc-main">
        <section className="dc-about">
          <h2>Overview & Services</h2>
          <p>
            Our Design Consultation service connects you with experienced interior designers for a focused, practical
            consultation. Services typically include an initial requirement review, budget discussion, moodboard suggestions,
            scope outline, and a next-steps estimate. Consultations may be conducted on-site or virtually depending on the
            client's preference.
          </p>

          <h3>What's included in a consultation</h3>
          <ul>
            <li>30–90 minute interview with a senior designer</li>
            <li>Review of architectural constraints and goals</li>
            <li>Initial budget estimate and scope suggestions</li>
            <li>High-level material, lighting and furniture guidance</li>
            <li>Suggested next steps and an optional detailed proposal</li>
          </ul>

          <h3>Important Terms</h3>
          <ul>
            <li>Consultation fees are charged per engagement and are non-refundable once the session begins.</li>
            <li>Prices shown are indicative ranges; final fees are agreed with the designer based on scope.</li>
            <li>Quoted ranges are in INR and include only professional consultation fees (material, travel or execution costs are extra).</li>
            <li>All consultations require prior scheduling and confirmation.</li>
          </ul>
        </section>

        <section className="dc-prices">
          <h2>Consultation Charges</h2>
          <p className="dc-note">Standard consultation range: {global ? `₹${(global.min).toLocaleString()} — ₹${(global.max).toLocaleString()}` : '₹10,000 — ₹500,000'}</p>

          <div className="dc-table-wrap">
            {loading ? (
              <div>Loading city-wise ranges…</div>
            ) : (
              <table className="dc-table">
                <thead>
                  <tr>
                    <th>City</th>
                    <th>Min Fee (INR)</th>
                    <th>Max Fee (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  {ranges.map(r => (
                    <tr key={r.city}>
                      <td>{r.city}</td>
                      <td>₹{Number(r.min).toLocaleString('en-IN')}</td>
                      <td>₹{Number(r.max).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="dc-cta">
            <p>Ready to book? Click below to share your requirements and request available designers.</p>
            <button className="dc-btn" onClick={() => window.location.href = '/share-requirement'}>Share Requirement</button>
          </div>
        </section>
      </main>
    </div>
  );
}
