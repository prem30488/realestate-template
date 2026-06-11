import React, { useState, useEffect, useMemo } from 'react';
import {
    Box,
    Container,
    Typography,
    Slider,
    TextField,
    Grid,
    Paper,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    Tab,
    useTheme,
    alpha,
    Button
} from '@mui/material';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
    Legend,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    AreaChart,
    Area
} from 'recharts';
import './HomeLoanCalculator.css';

const HomeLoanCalculator = () => {
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState(0);

    // Common Inputs
    const [loanAmount, setLoanAmount] = useState(5000000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [tenure, setTenure] = useState(20);

    // Eligibility Inputs
    const [monthlyIncome, setMonthlyIncome] = useState(100000);
    const [existingEMI, setExistingEMI] = useState(0);

    // Prepayment Inputs
    const [prepaymentAmount, setPrepaymentAmount] = useState(200000);
    const [installmentsPaid, setInstallmentsPaid] = useState(40);

    // Rate Change Inputs
    const [newInterestRate, setNewInterestRate] = useState(7.5);

    // Loan Transfer Inputs
    const [transferROI, setTransferROI] = useState(7.2);
    const [processingFee, setProcessingFee] = useState(0.5);

    const formatCurrency = (amt) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amt);
    };

    const handleTabChange = (event, newValue) => setActiveTab(newValue);

    // Helper: Calculate EMI
    const getEMI = (p, r, n) => {
        const rMonthly = r / 12 / 100;
        const nMonths = n * 12;
        return (p * rMonthly * Math.pow(1 + rMonthly, nMonths)) / (Math.pow(1 + rMonthly, nMonths) - 1);
    };

    // Helper: Generate Schedule
    const getSchedule = (principal, rate, years, prepayment = 0, prepaymentMonth = -1) => {
        const schedule = [];
        const monthlyRate = rate / 12 / 100;
        const totalPayments = years * 12;
        const emiValue = getEMI(principal, rate, years);

        let remainingPrincipal = principal;
        for (let i = 1; i <= totalPayments; i++) {
            if (remainingPrincipal <= 0) break;

            const interestPayment = remainingPrincipal * monthlyRate;
            let principalPayment = emiValue - interestPayment;

            let prepay = 0;
            if (i === prepaymentMonth) {
                prepay = prepayment;
                principalPayment += prepay;
            }

            if (principalPayment > remainingPrincipal) principalPayment = remainingPrincipal;
            remainingPrincipal -= principalPayment;

            schedule.push({
                month: i,
                emi: Math.round(emiValue),
                principal: Math.round(principalPayment - prepay),
                interest: Math.round(interestPayment),
                prepayment: Math.round(prepay),
                outstanding: Math.round(remainingPrincipal)
            });
        }
        return schedule;
    };

    // 1. Eligibility Tab
    const eligibilityData = useMemo(() => {
        const maxEMI = (monthlyIncome * 0.5) - existingEMI;
        const r = interestRate / 12 / 100;
        const n = tenure * 12;
        const maxLoan = (maxEMI * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
        return { maxEMI: Math.round(Math.max(0, maxEMI)), maxLoan: Math.round(Math.max(0, maxLoan)) };
    }, [monthlyIncome, existingEMI, interestRate, tenure]);

    const renderEligibility = () => (
        <Box className="tab-container-inner">
            <div className="section-title">Loan Eligibility Calculator</div>
            <Grid container spacing={4}>
                <Grid item xs={12} md={7}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography className="input-label">Home Loan Required (₹)</Typography>
                            <TextField fullWidth size="small" type="number" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography className="input-label">Net income per month (₹)</Typography>
                            <TextField fullWidth size="small" type="number" value={monthlyIncome} onChange={e => setMonthlyIncome(Number(e.target.value))} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography className="input-label">Existing loan commitments (₹)</Typography>
                            <TextField fullWidth size="small" type="number" value={existingEMI} onChange={e => setExistingEMI(Number(e.target.value))} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography className="input-label">Tenure (Yrs)</Typography>
                            <TextField fullWidth size="small" type="number" value={tenure} onChange={e => setTenure(Number(e.target.value))} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography className="input-label">ROI (%)</Typography>
                            <TextField fullWidth size="small" type="number" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
                        </Grid>
                    </Grid>
                    <div className="description-text">
                        <h5>How is eligibility calculated?</h5>
                        <p>Lenders usually restrict the monthly repayments (EMIs) to about 50-60% of your monthly net income. Your eligibility is also impacted by your age, credit score, and existing financial obligations.</p>
                    </div>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Paper className="results-card bg-green" elevation={0}>
                        <Typography variant="overline">You are Eligible for</Typography>
                        <div className="big-value">{formatCurrency(eligibilityData.maxLoan)}</div>
                        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
                        <div className="result-stat">
                            <span>Max EMI you can afford:</span>
                            <span>{formatCurrency(eligibilityData.maxEMI)}</span>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );

    // 2. EMI Tab
    const emiData = useMemo(() => {
        const emi = getEMI(loanAmount, interestRate, tenure);
        const total = emi * tenure * 12;
        return { emi: Math.round(emi), interest: Math.round(total - loanAmount), total: Math.round(total) };
    }, [loanAmount, interestRate, tenure]);

    const renderEMI = () => (
        <Box className="tab-container-inner">
            <div className="section-title">Monthly EMI Calculator</div>
            <Grid container spacing={4}>
                <Grid item xs={12} md={7}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography className="input-label">Loan Amount (₹)</Typography>
                            <TextField fullWidth size="small" type="number" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography className="input-label">Tenure (Yrs)</Typography>
                            <TextField fullWidth size="small" type="number" value={tenure} onChange={e => setTenure(Number(e.target.value))} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography className="input-label">ROI (%)</Typography>
                            <TextField fullWidth size="small" type="number" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
                        </Grid>
                    </Grid>
                    <div className="description-text">
                        <h5>What is Home Loan EMI?</h5>
                        <p>EMI includes both the repayment of the principal amount and a payment of the interest on the outstanding amount of the loan. A longer tenure helps in reducing the EMI.</p>
                    </div>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Paper className="results-card bg-blue" elevation={0}>
                        <Typography variant="overline">Monthly EMI Payable</Typography>
                        <div className="big-value">{formatCurrency(emiData.emi)}</div>
                        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
                        <div className="result-stat">
                            <span>Total Interest:</span>
                            <span>{formatCurrency(emiData.interest)}</span>
                        </div>
                        <div className="result-stat">
                            <span>Total Payable:</span>
                            <span>{formatCurrency(emiData.total)}</span>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );

    // 3. Prepayment Tab
    const prepaySchedule = useMemo(() => getSchedule(loanAmount, interestRate, tenure, prepaymentAmount, installmentsPaid), [loanAmount, interestRate, tenure, prepaymentAmount, installmentsPaid]);
    const normalSchedule = useMemo(() => getSchedule(loanAmount, interestRate, tenure), [loanAmount, interestRate, tenure]);

    const prepaySavings = useMemo(() => {
        const normalInt = normalSchedule.reduce((s, i) => s + i.interest, 0);
        const prepayInt = prepaySchedule.reduce((s, i) => s + i.interest, 0);
        return { savings: normalInt - prepayInt, monthsSaved: normalSchedule.length - prepaySchedule.length };
    }, [normalSchedule, prepaySchedule]);

    const renderPrepayment = () => (
        <Box className="tab-container-inner">
            <div className="section-title">Home Loan Prepayment Calculator</div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography className="input-label">Loan Amount (₹)</Typography>
                            <TextField fullWidth size="small" type="number" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography className="input-label">Tenure (Yrs)</Typography>
                            <TextField fullWidth size="small" type="number" value={tenure} onChange={e => setTenure(Number(e.target.value))} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography className="input-label">ROI (%)</Typography>
                            <TextField fullWidth size="small" type="number" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography className="input-label">Installments Paid (Months)</Typography>
                            <TextField fullWidth size="small" type="number" value={installmentsPaid} onChange={e => setInstallmentsPaid(Number(e.target.value))} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography className="input-label">Prepayment Amount (₹)</Typography>
                            <TextField fullWidth size="small" type="number" value={prepaymentAmount} onChange={e => setPrepaymentAmount(Number(e.target.value))} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper className="results-card bg-orange" elevation={0}>
                        <Typography variant="overline">Total Interest Saved</Typography>
                        <div className="big-value">{formatCurrency(prepaySavings.savings)}</div>
                        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
                        <div className="result-stat">
                            <span>Tenure Shaved Off:</span>
                            <span>{prepaySavings.monthsSaved} Months</span>
                        </div>
                    </Paper>
                </Grid>
            </Grid>

            <Box className="chart-wrapper" sx={{ mt: 4 }}>
                <Typography variant="h6" align="center" gutterBottom>Principal vs Interest Trend</Typography>
                <Box sx={{ height: 350 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={prepaySchedule.filter((_, i) => i % 6 === 0)}>
                            <defs>
                                <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
                            <YAxis tickFormatter={v => `₹${v / 1000}k`} />
                            <Tooltip formatter={v => formatCurrency(v)} />
                            <Legend verticalAlign="top" height={36} />
                            <Area type="monotone" dataKey="principal" stroke="#818cf8" fillOpacity={1} fill="url(#colorPrincipal)" name="Principal Paid" />
                            <Area type="monotone" dataKey="interest" stroke="#f43f5e" fillOpacity={1} fill="url(#colorInterest)" name="Interest Paid" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </Box>

            <TableContainer className="data-table-container" sx={{ mt: 4 }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Instalment No.</TableCell>
                            <TableCell align="right">EMI</TableCell>
                            <TableCell align="right">Principal Amt</TableCell>
                            <TableCell align="right">Interest Amt</TableCell>
                            <TableCell align="right">Outstanding Principal</TableCell>
                            <TableCell align="right">Prepayment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {prepaySchedule.slice(0, 50).map((row) => (
                            <TableRow key={row.month} className={row.prepayment > 0 ? 'highlight-row' : ''}>
                                <TableCell>{row.month}</TableCell>
                                <TableCell align="right">{formatCurrency(row.emi)}</TableCell>
                                <TableCell align="right">{formatCurrency(row.principal)}</TableCell>
                                <TableCell align="right">{formatCurrency(row.interest)}</TableCell>
                                <TableCell align="right">{formatCurrency(row.outstanding)}</TableCell>
                                <TableCell align="right" className={row.prepayment > 0 ? 'prepay-val' : ''}>{formatCurrency(row.prepayment)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );

    // 4. Rate Change Tab
    const rateChangeSaving = useMemo(() => {
        const oldEmi = getEMI(loanAmount, interestRate, tenure);
        const newEmi = getEMI(loanAmount, newInterestRate, tenure);
        return { saving: Math.round(oldEmi - newEmi), newEmi: Math.round(newEmi) };
    }, [loanAmount, interestRate, tenure, newInterestRate]);

    const renderRateChange = () => (
        <Box className="tab-container-inner">
            <div className="section-title">Home Loan Interest Rate Change Calculator</div>
            <Grid container spacing={4}>
                <Grid item xs={12} md={7}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography className="input-label">Loan Amount (₹)</Typography>
                            <TextField fullWidth size="small" type="number" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography className="input-label">Tenure (Yrs)</Typography>
                            <TextField fullWidth size="small" type="number" value={tenure} onChange={e => setTenure(Number(e.target.value))} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography className="input-label">Current ROI (%)</Typography>
                            <TextField disabled fullWidth size="small" type="number" value={interestRate} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography className="input-label">New Rate of Interest (%)</Typography>
                            <TextField fullWidth size="small" type="number" value={newInterestRate} onChange={e => setNewInterestRate(Number(e.target.value))} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Paper className="results-card bg-purple" elevation={0}>
                        <Typography variant="overline">Monthly Saving</Typography>
                        <div className="big-value">{formatCurrency(rateChangeSaving.saving)}</div>
                        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
                        <div className="result-stat">
                            <span>New EMI:</span>
                            <span>{formatCurrency(rateChangeSaving.newEmi)}</span>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );

    // 5. Loan Transfer Tab
    const transferSavings = useMemo(() => {
        const currentEmi = getEMI(loanAmount, interestRate, tenure);
        const currentTotalInt = (currentEmi * tenure * 12) - loanAmount;

        const fee = (loanAmount * processingFee) / 100;
        const newEmi = getEMI(loanAmount, transferROI, tenure);
        const newTotalInt = (newEmi * tenure * 12) - loanAmount;

        return { netSaving: Math.round(currentTotalInt - (newTotalInt + fee)), fee: Math.round(fee) };
    }, [loanAmount, interestRate, tenure, transferROI, processingFee]);

    const renderLoanTransfer = () => (
        <Box className="tab-container-inner">
            <div className="section-title">Home Loan Balance Transfer Calculator</div>
            <Grid container spacing={4}>
                <Grid item xs={12} md={7}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography className="input-label">Loan Amount (₹)</Typography>
                            <TextField fullWidth size="small" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography className="input-label">New Bank ROI (%)</Typography>
                            <TextField fullWidth size="small" value={transferROI} onChange={e => setTransferROI(Number(e.target.value))} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography className="input-label">Processing Fee (%)</Typography>
                            <TextField fullWidth size="small" value={processingFee} onChange={e => setProcessingFee(Number(e.target.value))} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Paper className="results-card bg-indigo" elevation={0}>
                        <Typography variant="overline">Net Savings on Transfer</Typography>
                        <div className="big-value">{formatCurrency(transferSavings.netSaving)}</div>
                        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
                        <div className="result-stat">
                            <span>Processing Fee:</span>
                            <span>{formatCurrency(transferSavings.fee)}</span>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );

    // 6. Repayment Schedule Tab
    const renderAmortization = () => (
        <Box className="tab-container-inner">
            <div className="section-title">Monthly Loan Repayment Schedule</div>
            <Box className="chart-wrapper" sx={{ mb: 4 }}>
                <Typography variant="h6" align="center" gutterBottom>Outstanding Principal Trend</Typography>
                <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={normalSchedule.filter((_, i) => i % 6 === 0)}>
                            <defs>
                                <linearGradient id="colorOutstanding" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" />
                            <YAxis tickFormatter={v => `₹${v / 100000}L`} />
                            <Tooltip formatter={v => formatCurrency(v)} />
                            <Area type="monotone" dataKey="outstanding" stroke="#6366f1" fillOpacity={1} fill="url(#colorOutstanding)" name="Outstanding Balance" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
            <TableContainer className="data-table-container">
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Month</TableCell>
                            <TableCell align="right">EMI</TableCell>
                            <TableCell align="right">Principal</TableCell>
                            <TableCell align="right">Interest</TableCell>
                            <TableCell align="right">Outstanding Principal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {normalSchedule.map((row) => (
                            <TableRow key={row.month} hover>
                                <TableCell>{row.month}</TableCell>
                                <TableCell align="right">{formatCurrency(row.emi)}</TableCell>
                                <TableCell align="right">{formatCurrency(row.principal)}</TableCell>
                                <TableCell align="right">{formatCurrency(row.interest)}</TableCell>
                                <TableCell align="right">{formatCurrency(row.outstanding)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );

    return (
        <div className="advanced-loan-calc">
            <div className="hero-banner">
                <Container maxWidth="lg">
                    <Typography variant="h3">Smart <span>Home Loan</span> Planner</Typography>
                    <Typography variant="body1">Complete financial toolkit to help you make the right property investment decisions.</Typography>
                </Container>
            </div>

            <Container maxWidth="lg" className="calc-body">
                <Paper className="main-paper" elevation={0}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        className="main-tabs"
                    >
                        <Tab label="Loan Eligibility" />
                        <Tab label="EMI" />
                        <Tab label="Prepayment" />
                        <Tab label="Rate Change" />
                        <Tab label="Loan Transfer" />
                        <Tab label="Repayment Schedule" />
                    </Tabs>

                    <Box className="active-tab-panel">
                        {activeTab === 0 && renderEligibility()}
                        {activeTab === 1 && renderEMI()}
                        {activeTab === 2 && renderPrepayment()}
                        {activeTab === 3 && renderRateChange()}
                        {activeTab === 4 && renderLoanTransfer()}
                        {activeTab === 5 && renderAmortization()}
                    </Box>
                </Paper>

                <Box className="info-footer">
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={4}>
                            <h5>Why use our planner?</h5>
                            <p>Our tools are designed to provide the most accurate estimates for your home loan journey. We factor in Indian banking norms and taxation rules to give you reliable data.</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5>Manage your finances</h5>
                            <p>Use the Prepayment and Loan Transfer tools to see how you can save lakhs of rupees on interest by making smart decisions early in your loan tenure.</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5>Expert Guidance</h5>
                            <p>Once you've calculated your eligibility, speak to our financial consultants for personalized advice on choosing the right bank and scheme.</p>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
};

export default HomeLoanCalculator;
