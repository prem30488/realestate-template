import React, { useState, useEffect } from 'react';
import {
    Box, Container, Grid, Typography, TextField, Slider, Paper,
    Divider, Card, CardContent, InputAdornment, Button, Tooltip,
    useTheme, useMediaQuery, Fade, Grow
} from '@mui/material';
import {
    Home, AccountBalance, TrendingUp, Compare, InfoOutlined,
    Calculate, AttachMoney, ShutterSpeed, LocalAtm, Percent
} from '@mui/icons-material';
import './BuyVsRentCalculator.css';

const BuyVsRentCalculator = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // State for inputs
    const [params, setParams] = useState({
        propertyPrice: 6000000,
        downPayment: 1200000,
        loanTenure: 20,
        interestRate: 8.5,
        appreciationRate: 5,
        monthlyRent: 20000,
        rentIncrease: 5,
        investmentReturn: 10,
        years: 10
    });

    // State for results
    const [results, setResults] = useState({
        totalBuyCost: 0,
        futurePropertyValue: 0,
        totalRentCost: 0,
        futurePortfolioValue: 0,
        netDifference: 0,
        recommendation: ''
    });

    const handleParamChange = (name, value) => {
        setParams(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    };

    const calculate = () => {
        const {
            propertyPrice, downPayment, loanTenure, interestRate,
            appreciationRate, monthlyRent, rentIncrease,
            investmentReturn, years
        } = params;

        // 1. Buy Logic
        const loanAmount = propertyPrice - downPayment;
        const monthlyInterestRate = (interestRate / 100) / 12;
        const numberOfPayments = loanTenure * 12;

        // Monthly EMI
        const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

        let totalEmiPaid = 0;
        let remainingLoanBalance = loanAmount;

        // Calculate total costs over 'years'
        const calcMonths = years * 12;
        for (let m = 1; m <= calcMonths; m++) {
            if (m <= numberOfPayments) {
                totalEmiPaid += emi;
                const interestPaid = remainingLoanBalance * monthlyInterestRate;
                const principalPaid = emi - interestPaid;
                remainingLoanBalance -= principalPaid;
            }
        }
        if (remainingLoanBalance < 0) remainingLoanBalance = 0;

        const futurePropertyValue = propertyPrice * Math.pow(1 + (appreciationRate / 100), years);
        const maintenanceCost = propertyPrice * 0.01 * years; // Simplified 1% per year
        const buyingBenefit = futurePropertyValue - remainingLoanBalance - (downPayment + totalEmiPaid + maintenanceCost);

        // 2. Rent Logic
        let totalRentPaid = 0;
        let currentRent = monthlyRent;
        for (let y = 1; y <= years; y++) {
            totalRentPaid += (currentRent * 12);
            currentRent *= (1 + (rentIncrease / 100));
        }

        // Opportunity Cost: Down Payment invested
        const finalDownPaymentInvestment = downPayment * Math.pow(1 + (investmentReturn / 100), years);

        // Monthly Savings invested: (EMI + Maintenance - Rent)
        // For simplicity, we assume the average monthly cost difference is invested
        let totalMonthlySavingsInvestment = 0;
        let tempRent = monthlyRent;
        const monthlyMaintenance = (propertyPrice * 0.01) / 12;

        for (let m = 1; m <= calcMonths; m++) {
            const year = Math.floor((m - 1) / 12) + 1;
            const currentYearRent = monthlyRent * Math.pow(1 + (rentIncrease / 100), year - 1);
            const monthlySavings = (emi + monthlyMaintenance) - currentYearRent;

            if (monthlySavings > 0) {
                // Compound monthly
                totalMonthlySavingsInvestment = (totalMonthlySavingsInvestment + monthlySavings) * (1 + (investmentReturn / 100) / 12);
            }
        }

        const rentingBenefit = (finalDownPaymentInvestment + totalMonthlySavingsInvestment) - totalRentPaid;

        setResults({
            totalBuyCost: downPayment + totalEmiPaid + maintenanceCost,
            futureValue: futurePropertyValue,
            remainingLoan: remainingLoanBalance,
            netWorthBuy: futurePropertyValue - remainingLoanBalance,
            totalRentCost: totalRentPaid,
            netWorthRent: finalDownPaymentInvestment + totalMonthlySavingsInvestment,
            recommendation: (futurePropertyValue - remainingLoanBalance) > (finalDownPaymentInvestment + totalMonthlySavingsInvestment) ? 'BUY' : 'RENT'
        });
    };

    useEffect(() => {
        calculate();
    }, [params]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <Box className="calculator-container" sx={{ pt: '100px', pb: 10, background: '#f8fafc' }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="h2" className="gradient-text" sx={{ fontWeight: 800, mb: 2 }}>
                        Buy vs Rent Calculator
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
                        A comprehensive financial tool to help you decide whether buying a home or renting and investing the difference is better for your financial future.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {/* Inputs Section */}
                    <Grid item xs={12} lg={7}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', border: '1px solid #e2e8f0' }}>

                            {/* Property Section */}
                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 3, fontWeight: 700 }}>
                                <Home sx={{ mr: 1, color: '#3b82f6' }} /> Property & Tenure
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Property Price"
                                        value={params.propertyPrice}
                                        onChange={(e) => handleParamChange('propertyPrice', e.target.value)}
                                        InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Comparison Period"
                                        value={params.years}
                                        onChange={(e) => handleParamChange('years', e.target.value)}
                                        InputProps={{ endAdornment: <InputAdornment position="end">Years</InputAdornment> }}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 4 }} />

                            {/* Buying Details */}
                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 3, fontWeight: 700 }}>
                                <AccountBalance sx={{ mr: 1, color: '#10b981' }} /> Buying Details
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Down Payment"
                                        value={params.downPayment}
                                        onChange={(e) => handleParamChange('downPayment', e.target.value)}
                                        InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Interest Rate"
                                        value={params.interestRate}
                                        onChange={(e) => handleParamChange('interestRate', e.target.value)}
                                        InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Appreciation Rate"
                                        value={params.appreciationRate}
                                        onChange={(e) => handleParamChange('appreciationRate', e.target.value)}
                                        InputProps={{ endAdornment: <InputAdornment position="end">% / yr</InputAdornment> }}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 4 }} />

                            {/* Renting Details */}
                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 3, fontWeight: 700 }}>
                                <TrendingUp sx={{ mr: 1, color: '#f59e0b' }} /> Renting & Investment Details
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Monthly Rent"
                                        value={params.monthlyRent}
                                        onChange={(e) => handleParamChange('monthlyRent', e.target.value)}
                                        InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Rent Increase"
                                        value={params.rentIncrease}
                                        onChange={(e) => handleParamChange('rentIncrease', e.target.value)}
                                        InputProps={{ endAdornment: <InputAdornment position="end">% / yr</InputAdornment> }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        fullWidth
                                        label="Return on Investments"
                                        value={params.investmentReturn}
                                        onChange={(e) => handleParamChange('investmentReturn', e.target.value)}
                                        placeholder="Rate if you invest the down payment instead"
                                        InputProps={{ endAdornment: <InputAdornment position="end">% / yr</InputAdornment> }}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Results Section */}
                    <Grid item xs={12} lg={5}>
                        <Box sx={{ position: 'sticky', top: '100px' }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    borderRadius: '24px',
                                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                    color: '#fff',
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
                                }}
                            >
                                <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>The Verdict</Typography>
                                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 4 }}>Based on your inputs after {params.years} years:</Typography>

                                <Grow in={true}>
                                    <Box className={`verdict-badge ${results.recommendation.toLowerCase()}-active`}>
                                        <Typography variant="h3" sx={{ fontWeight: 900 }}>
                                            It's better to <span className="highlight-color">{results.recommendation}</span>
                                        </Typography>
                                    </Box>
                                </Grow>

                                <Box sx={{ mt: 5 }}>
                                    <Box sx={{ mb: 4 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body1">Net Worth if you Buy</Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#34d399' }}>{formatCurrency(results.netWorthBuy)}</Typography>
                                        </Box>
                                        <Box sx={{ height: '8px', bgcolor: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
                                            <Box sx={{ height: '100%', bgcolor: '#10b981', width: `${(results.netWorthBuy / Math.max(results.netWorthBuy, results.netWorthRent)) * 100}%` }} />
                                        </Box>
                                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>Property Value minus remaining loan</Typography>
                                    </Box>

                                    <Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body1">Net Worth if you Rent</Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#fcd34d' }}>{formatCurrency(results.netWorthRent)}</Typography>
                                        </Box>
                                        <Box sx={{ height: '8px', bgcolor: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
                                            <Box sx={{ height: '100%', bgcolor: '#f59e0b', width: `${(results.netWorthRent / Math.max(results.netWorthBuy, results.netWorthRent)) * 100}%` }} />
                                        </Box>
                                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>Down payment + Monthly savings grew at {params.investmentReturn}%</Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ mt: 6, p: 3, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                                    <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <InfoOutlined fontSize="small" sx={{ mr: 1 }} /> Financial Insights
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                                        {results.recommendation === 'BUY'
                                            ? "The appreciation of the property exceeds the potential investment gains from renting. Your equity in the home is building a stronger asset base."
                                            : "The high down payment and loan costs make renting more viable if you discipline yourself to invest the surplus in market-linked assets."}
                                    </Typography>
                                </Box>
                            </Paper>

                            <Card sx={{ mt: 3, borderRadius: '24px', p: 1 }}>
                                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ p: 1.5, bgcolor: '#eff6ff', borderRadius: '12px' }}>
                                        <ShutterSpeed sx={{ color: '#3b82f6' }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Thinking of Buying?</Typography>
                                        <Typography variant="caption" color="text.secondary">Contact our advisors for special mortgage rates.</Typography>
                                    </Box>
                                    <Button variant="text" sx={{ ml: 'auto', fontWeight: 700 }}>Contact</Button>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default BuyVsRentCalculator;
