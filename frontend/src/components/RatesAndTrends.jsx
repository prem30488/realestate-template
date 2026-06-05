import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    Cell
} from 'recharts';
import { useCity } from '../context/CityContext';
import { API_BASE_URL } from '../constants';
import './RatesAndTrends.css';

const RATE_TYPES = [
    { id: 'residential_rate', label: 'Residential', color: '#3b82f6' },
    { id: 'commercial_rate', label: 'Commercial', color: '#10b981' },
    { id: 'office_rate', label: 'Office', color: '#f59e0b' },
    { id: 'industrial_rate', label: 'Industrial', color: '#8b5cf6' },
    { id: 'land_rate', label: 'Land', color: '#ef4444' }
];

const RatesAndTrends = () => {
    const { selectedCity } = useCity();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeRateType, setActiveRateType] = useState('residential_rate');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRates();
    }, [selectedCity]);

    const fetchRates = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/jantri-rates?city=${selectedCity}`);
            setData(response.data);
        } catch (err) {
            console.error('Error fetching rates:', err);
            setError('Failed to fetch rate data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const getActiveRateLabel = () => {
        return RATE_TYPES.find(r => r.id === activeRateType)?.label || '';
    };

    const getActiveRateColor = () => {
        return RATE_TYPES.find(r => r.id === activeRateType)?.color || '#3b82f6';
    };

    // Sort and filter data for chart (top 20 areas to keep it readable if many)
    const chartData = [...data]
        .filter(item => Number(item[activeRateType]) > 0)
        .sort((a, b) => Number(b[activeRateType]) - Number(a[activeRateType]))
        .slice(0, 20);

    if (loading) {
        return (
            <div className="rates-loading">
                <div className="spinner"></div>
                <p>Loading market trends for {selectedCity}...</p>
            </div>
        );
    }

    return (
        <div className="rates-trends-container">
            <div className="rates-header">
                <h1>Property Rates & Trends in {selectedCity}</h1>
                <p className="subtitle">
                    Official Jantri rates and market trends for various localities in {selectedCity}.
                    Select a category to view area-wise comparisons.
                </p>
            </div>

            <div className="rate-type-tabs">
                {RATE_TYPES.map(type => (
                    <button
                        key={type.id}
                        className={`rate-tab ${activeRateType === type.id ? 'active' : ''}`}
                        onClick={() => setActiveRateType(type.id)}
                        style={{
                            '--active-color': type.color,
                            borderColor: activeRateType === type.id ? type.color : 'transparent'
                        }}
                    >
                        {type.label}
                    </button>
                ))}
            </div>

            {error ? (
                <div className="rates-error">
                    <p>{error}</p>
                </div>
            ) : data.length === 0 ? (
                <div className="rates-empty">
                    <p>No rate data found for {selectedCity}.</p>
                </div>
            ) : (
                <div className="rates-content">
                    <div className="graph-section card">
                        <div className="card-header">
                            <h2>{getActiveRateLabel()} Rates Comparison</h2>
                            <p>Top 20 highest rated areas (₹/sq.m)</p>
                        </div>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="area"
                                        angle={-45}
                                        textAnchor="end"
                                        interval={0}
                                        height={80}
                                        stroke="#64748b"
                                        fontSize={12}
                                    />
                                    <YAxis stroke="#64748b" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value) => [`₹ ${value.toLocaleString()}`, getActiveRateLabel()]}
                                    />
                                    <Bar dataKey={activeRateType} radius={[4, 4, 0, 0]}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={getActiveRateColor()} opacity={0.8 + (index % 2) * 0.2} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="table-section card">
                        <div className="card-header">
                            <h2>All Localities in {selectedCity}</h2>
                            <p>Rates are in ₹ per sq.m</p>
                        </div>
                        <div className="table-wrapper">
                            <table className="rates-table">
                                <thead>
                                    <tr>
                                        <th>Area Name</th>
                                        <th>Zone Code</th>
                                        <th className="text-right">{getActiveRateLabel()} Rate</th>
                                        <th className="text-right">Residential</th>
                                        <th className="text-right">Commercial</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td className="font-medium">{item.area}</td>
                                            <td><span className="code-badge">{item.zone_code}</span></td>
                                            <td className="text-right highlight">₹ {parseFloat(item[activeRateType]).toLocaleString()}</td>
                                            <td className="text-right">₹ {parseFloat(item.residential_rate).toLocaleString()}</td>
                                            <td className="text-right">₹ {parseFloat(item.commercial_rate).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            <div className="rates-disclaimer">
                <i className="pe-7s-info"></i>
                <p>
                    <strong>Disclaimer:</strong> This data is for informational purposes only and is derived from
                    the official Jantri Rates published by the Revenue Department, Government of Gujarat.
                    For official transactions, please refer to the latest government gazette or the official portal.
                </p>
            </div>
        </div>
    );
};

export default RatesAndTrends;
