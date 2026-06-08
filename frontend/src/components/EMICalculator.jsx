import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Slider,
    TextField,
    Grid,
    Paper,
    Divider
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import './EMICalculator.css';

const EMICalculator = () => {
    const [loanAmount, setLoanAmount] = useState(5000000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [tenure, setTenure] = useState(20);

    const [emi, setEmi] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        calculateEMI();
    }, [loanAmount, interestRate, tenure]);

    const calculateEMI = () => {
        const r = interestRate / 12 / 100;
        const n = tenure * 12;
        const emiValue = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        const totalAmt = emiValue * n;
        const totalInt = totalAmt - loanAmount;

        setEmi(Math.round(emiValue));
        setTotalAmount(Math.round(totalAmt));
        setTotalInterest(Math.round(totalInt));
    };

    const formatCurrency = (amt) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amt);
    };

    const data = [
        { name: 'Principal Amount', value: loanAmount },
        { name: 'Total Interest', value: totalInterest },
    ];

    const COLORS = ['#4f46e5', '#f43f5e'];

    return (
        <div className="emi-calculator-page">
            <Container maxWidth="lg">
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="h3" className="calc-title">Home Loan <span>EMI Calculator</span></Typography>
                    <Typography variant="body1" color="text.secondary">
                        Plan your home purchase by calculating your monthly installments accurately.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {/* Input Controls */}
                    <Grid item xs={12} md={7}>
                        <Paper className="calc-card inputs">
                            <Box className="input-group">
                                <div className="input-header">
                                    <Typography variant="h6">Loan Amount</Typography>
                                    <TextField
                                        size="small"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                                        className="amount-input"
                                    />
                                </div>
                                <Slider
                                    value={loanAmount}
                                    min={100000}
                                    max={100000000}
                                    step={100000}
                                    onChange={(e, val) => setLoanAmount(val)}
                                    sx={{ color: '#4f46e5' }}
                                />
                                <div className="range-labels">
                                    <span>₹1 L</span>
                                    <span>₹10 Cr</span>
                                </div>
                            </Box>

                            <Box className="input-group">
                                <div className="input-header">
                                    <Typography variant="h6">Interest Rate (%)</Typography>
                                    <TextField
                                        size="small"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(Number(e.target.value))}
                                        className="rate-input"
                                    />
                                </div>
                                <Slider
                                    value={interestRate}
                                    min={5}
                                    max={15}
                                    step={0.1}
                                    onChange={(e, val) => setInterestRate(val)}
                                    sx={{ color: '#4f46e5' }}
                                />
                                <div className="range-labels">
                                    <span>5%</span>
                                    <span>15%</span>
                                </div>
                            </Box>

                            <Box className="input-group">
                                <div className="input-header">
                                    <Typography variant="h6">Loan Tenure (Years)</Typography>
                                    <TextField
                                        size="small"
                                        value={tenure}
                                        onChange={(e) => setTenure(Number(e.target.value))}
                                        className="tenure-input"
                                    />
                                </div>
                                <Slider
                                    value={tenure}
                                    min={1}
                                    max={30}
                                    step={1}
                                    onChange={(e, val) => setTenure(val)}
                                    sx={{ color: '#4f46e5' }}
                                />
                                <div className="range-labels">
                                    <span>1 Yr</span>
                                    <span>30 Yrs</span>
                                </div>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Results Display */}
                    <Grid item xs={12} md={5}>
                        <Paper className="calc-card results">
                            <Box sx={{ mb: 4, textAlign: 'center' }}>
                                <Typography variant="subtitle1" color="text.secondary">Monthly EMI</Typography>
                                <Typography variant="h3" className="emi-result">{formatCurrency(emi)}</Typography>
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            <div className="result-stats">
                                <div className="stat-item">
                                    <Typography variant="body2" color="text.secondary">Principal Amount</Typography>
                                    <Typography variant="h6">{formatCurrency(loanAmount)}</Typography>
                                </div>
                                <div className="stat-item">
                                    <Typography variant="body2" color="text.secondary">Total Interest</Typography>
                                    <Typography variant="h6">{formatCurrency(totalInterest)}</Typography>
                                </div>
                                <div className="stat-item total">
                                    <Typography variant="body2" color="text.secondary">Total Amount Payable</Typography>
                                    <Typography variant="h6">{formatCurrency(totalAmount)}</Typography>
                                </div>
                            </div>

                            <Box sx={{ height: 250, mt: 4 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip formatter={(val) => formatCurrency(val)} />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                <Box className="calculator-info">
                    <Typography variant="h5">Understanding Home Loan EMIs</Typography>
                    <p>Equated Monthly Installment (EMI) is the fixed amount you pay back to the bank every month until your loan is fully repaid. It consists of both the principal amount and the interest charged on the loan.</p>
                    <p>Lowering your tenure can significantly reduce the total interest you pay, though it increases your monthly EMI. Balancing these two is key to a healthy financial plan.</p>
                </Box>
            </Container>
        </div>
    );
};

export default EMICalculator;
