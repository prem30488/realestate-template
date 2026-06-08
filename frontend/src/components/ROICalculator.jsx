import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Grid,
    Paper,
    InputAdornment,
    Alert
} from '@mui/material';
import { TrendingUp, BarChart, Payments, Business } from '@mui/icons-material';
import './ROICalculator.css';

const ROICalculator = () => {
    const [purchasePrice, setPurchasePrice] = useState(5000000);
    const [salePrice, setSalePrice] = useState(7500000);
    const [holdingPeriod, setHoldingPeriod] = useState(5);
    const [monthlyRent, setMonthlyRent] = useState(15000);
    const [maintenance, setMaintenance] = useState(2500);

    const [totalProfit, setTotalProfit] = useState(0);
    const [totalRental, setTotalRental] = useState(0);
    const [absoluteROI, setAbsoluteROI] = useState(0);
    const [annualizedROI, setAnnualizedROI] = useState(0);

    useEffect(() => {
        calculateROI();
    }, [purchasePrice, salePrice, holdingPeriod, monthlyRent, maintenance]);

    const calculateROI = () => {
        const rentalIncome = (monthlyRent - maintenance) * 12 * holdingPeriod;
        const capitalGains = salePrice - purchasePrice;
        const netProfit = capitalGains + rentalIncome;

        const absROI = (netProfit / purchasePrice) * 100;
        const annROI = (Math.pow(1 + absROI / 100, 1 / holdingPeriod) - 1) * 100;

        setTotalProfit(Math.round(netProfit));
        setTotalRental(Math.round(rentalIncome));
        setAbsoluteROI(absROI.toFixed(2));
        setAnnualizedROI(annROI.toFixed(2));
    };

    const formatCurrency = (amt) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amt);
    };

    return (
        <div className="roi-calculator-page">
            <Container maxWidth="lg">
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="h3" className="calc-title">Real Estate <span>ROI Calculator</span></Typography>
                    <Typography variant="body1" color="text.secondary">
                        Calculate the potential return on your property investment including capital gains and rentals.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={7}>
                        <Paper className="calc-card inputs">
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Investment Details</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Purchase Price"
                                        fullWidth
                                        type="number"
                                        value={purchasePrice}
                                        onChange={(e) => setPurchasePrice(Number(e.target.value))}
                                        InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Projected Sale Price"
                                        fullWidth
                                        type="number"
                                        value={salePrice}
                                        onChange={(e) => setSalePrice(Number(e.target.value))}
                                        InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Holding Period (Years)"
                                        fullWidth
                                        type="number"
                                        value={holdingPeriod}
                                        onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Expected Monthly Rent"
                                        fullWidth
                                        type="number"
                                        value={monthlyRent}
                                        onChange={(e) => setMonthlyRent(Number(e.target.value))}
                                        InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Monthly Maintenance & Taxes"
                                        fullWidth
                                        type="number"
                                        value={maintenance}
                                        onChange={(e) => setMaintenance(Number(e.target.value))}
                                        InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Paper className="calc-card results">
                            <Typography variant="h6" sx={{ mb: 4, fontWeight: 700 }}>Investment Summary</Typography>

                            <div className="roi-stat-grid">
                                <div className="roi-main-stat">
                                    <Typography variant="subtitle2" color="text.secondary">Absolute ROI</Typography>
                                    <Typography variant="h3" sx={{ color: '#059669', fontWeight: 800 }}>{absoluteROI}%</Typography>
                                </div>
                                <div className="roi-main-stat">
                                    <Typography variant="subtitle2" color="text.secondary">Annualized ROI</Typography>
                                    <Typography variant="h4" sx={{ color: '#4f46e5', fontWeight: 700 }}>{annualizedROI}%</Typography>
                                </div>
                            </div>

                            <Box sx={{ mt: 4 }}>
                                <div className="roi-detail-item">
                                    <div className="icon-wrap"><TrendingUp /></div>
                                    <div>
                                        <Typography variant="body2" color="text.secondary">Total Profit</Typography>
                                        <Typography variant="h6">{formatCurrency(totalProfit)}</Typography>
                                    </div>
                                </div>
                                <div className="roi-detail-item">
                                    <div className="icon-wrap"><Payments /></div>
                                    <div>
                                        <Typography variant="body2" color="text.secondary">Total Rental Income</Typography>
                                        <Typography variant="h6">{formatCurrency(totalRental)}</Typography>
                                    </div>
                                </div>
                                <div className="roi-detail-item">
                                    <div className="icon-wrap"><Business /></div>
                                    <div>
                                        <Typography variant="body2" color="text.secondary">Capital Appreciation</Typography>
                                        <Typography variant="h6">{formatCurrency(salePrice - purchasePrice)}</Typography>
                                    </div>
                                </div>
                            </Box>

                            {annualizedROI > 12 ? (
                                <Alert severity="success" sx={{ mt: 3, borderRadius: '1rem' }}>
                                    This looks like a high-performing investment!
                                </Alert>
                            ) : (
                                <Alert severity="info" sx={{ mt: 3, borderRadius: '1rem' }}>
                                    Consider diversifying if this is below market averages.
                                </Alert>
                            )}
                        </Paper>
                    </Grid>
                </Grid>

                <Box className="calculator-info">
                    <Typography variant="h5">Why Calculate ROI?</Typography>
                    <p>ROI (Return on Investment) helps you evaluate the efficiency of an investment compared to others. In real estate, ROI comes from two sources: Capital Appreciation (increase in property value) and Rental Yield.</p>
                    <p>Our annualized ROI calculation accounts for the power of compounding, giving you a clearer picture of how your money is growing year over year.</p>
                </Box>
            </Container>
        </div>
    );
};

export default ROICalculator;
