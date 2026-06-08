import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Home,
    Search,
    Description as FileText,
    TrendingUp,
    Calculate as Calculator,
    LocationOn as MapPin,
    Gavel,
    CreditCard,
    Lightbulb,
    ArrowForward as ArrowRight,
    PlayCircle,
    BarChart
} from '@mui/icons-material';
import './TipsAndGuides.css';


const TipsAndGuides = () => {
    const categories = [
        {
            title: "Home Buying Guide",
            description: "Everything you need to know from search to possession",
            icon: <Home className="category-icon" />,
            color: "#4f46e5",
            links: ["First-time Homebuyer", "Step-by-step Process", "Budget Planning"]
        },
        {
            title: "Legal & Taxation",
            description: "Expert advice on RERA, legal verification & taxes",
            icon: <Gavel className="category-icon" />,
            color: "#0891b2",
            links: ["RERA Guide", "Property Documents", "Capital Gains Tax"]
        },
        {
            title: "Home Loans",
            description: "Get the best home loan deals and financial tips",
            icon: <CreditCard className="category-icon" />,
            color: "#059669",
            links: ["EMI Calculator", "Eligibility Criteria", "Interest Rates"]
        },
        {
            title: "Investment Tips",
            description: "High ROI locations and smart investment strategies",
            icon: <TrendingUp className="category-icon" />,
            color: "#ea580c",
            links: ["Price Trends", "Hot Localities", "ROI Calculator"]
        },
        {
            title: "Localities & Reviews",
            description: "In-depth reviews of cities and top localities",
            icon: <MapPin className="category-icon" />,
            color: "#dc2626",
            links: ["Locality Reviews", "New Project Reviews", "City Infrastructure"]
        },
        {
            title: "Home Interiors",
            description: "Decor tips and budget-friendly interior designs",
            icon: <Lightbulb className="category-icon" />,
            color: "#9333ea",
            links: ["Modular Kitchen", "Small Home Ideas", "Living Room Decor"]
        }
    ];

    const featuredArticles = [
        {
            id: 1,
            title: "Top 10 Emerging Localities to Invest in 2024",
            category: "Investment",
            image: "https://images.unsplash.com/photo-1582408921715-18e7806367c1?q=80&w=2670&auto=format&fit=crop",
            date: "June 5, 2024"
        },
        {
            id: 2,
            title: "Under-Construction vs Ready-to-Move Units",
            category: "Buying Guide",
            image: "https://images.unsplash.com/photo-1503387762-592dea58ea2a?q=80&w=2662&auto=format&fit=crop",
            date: "May 28, 2024"
        },
        {
            id: 3,
            title: "How to Save on Registration & Stamp Duty",
            category: "Legal",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2670&auto=format&fit=crop",
            date: "May 20, 2024"
        }
    ];

    const journeySteps = [
        { step: "01", title: "Financial Planning", desc: "Budget and loan amount" },
        { step: "02", title: "Property Search", desc: "Shortlist based on needs" },
        { step: "03", title: "Site Verification", desc: "Visit and check amenities" },
        { step: "04", title: "Legal Check", desc: "Verify title and RERA" },
        { step: "05", title: "Booking & Loan", desc: "Pay advance and apply loan" },
        { step: "06", title: "Possession", desc: "Final registration & handover" }
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/guides/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="tips-guides-container">
            {/* Hero Section */}
            <section className="advice-hero">
                <div className="hero-content">
                    <h1>Expert Real Estate <span>Advice</span></h1>
                    <p>Moving you from search to a settled home with confidence</p>
                    <div className="advice-search">
                        <Search className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search for guides, localities, legal tips..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button className="btn-search" onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </section>

            {/* Main Categories */}
            <section className="categories-grid-section">
                <div className="section-header">
                    <h2>Browse by Category</h2>
                    <div className="accent-line"></div>
                </div>
                <div className="categories-grid">
                    {categories.map((cat, idx) => (
                        <div className="category-card" key={idx} style={{ "--accent": cat.color }}>
                            <div className="card-icon-wrapper">
                                {cat.icon}
                            </div>
                            <h3>{cat.title}</h3>
                            <p>{cat.description}</p>
                            <ul className="cat-links">
                                {cat.links.map((link, i) => {
                                    let to = `/guides/${cat.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}/${link.toLowerCase().replace(/ /g, '-')}`;
                                    if (link === "EMI Calculator") to = "/emi-calculator";
                                    if (link === "ROI Calculator") to = "/roi-calculator";
                                    return (
                                        <li key={i}>
                                            <Link to={to}>
                                                {link}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                            <Link to={`/guides/${cat.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="view-all">View All <ArrowRight sx={{ fontSize: 16 }} /></Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Home Buying Journey */}
            <section className="buying-journey">
                <div className="journey-bg"></div>
                <div className="section-header white">
                    <h2>Your Home Buying Journey</h2>
                    <p>A step-by-step roadmap to your dream home</p>
                </div>
                <div className="journey-steps">
                    {journeySteps.map((s, i) => (
                        <div className="step-item" key={i}>
                            <div className="step-number">{s.step}</div>
                            <h4>{s.title}</h4>
                            <p>{s.desc}</p>
                            {i < journeySteps.length - 1 && <div className="step-connector"></div>}
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Articles */}
            <section className="featured-advice">
                <div className="section-header">
                    <h2>Trending Advice</h2>
                    <Link to="/guides/trending" className="btn-text">Explore More Articles <ArrowRight sx={{ fontSize: 20 }} /></Link>
                </div>
                <div className="articles-grid">
                    {featuredArticles.map(article => (
                        <div className="article-card" key={article.id}>
                            <div className="article-image">
                                <img src={article.image} alt={article.title} />
                                <span className="article-tag">{article.category}</span>
                            </div>
                            <div className="article-info">
                                <span className="article-date">{article.date}</span>
                                <h3>{article.title}</h3>
                                <Link to={`/guides/${article.category.toLowerCase().replace(/ /g, '-')}/${article.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')}`} className="read-btn">
                                    Read Full Article
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Smart Tools Section */}
            <section className="advice-tools">
                <div className="tools-container">
                    <div className="tools-text">
                        <h2>Smart Tools for Better Decisions</h2>
                        <p>Use our data-driven calculators and tools to simplify your property search.</p>
                        <div className="tools-list">
                            <Link to="/emi-calculator" className="tool-item">
                                <Calculator />
                                <div>
                                    <h5>EMI Calculator</h5>
                                    <p>Check your monthly outgo</p>
                                </div>
                            </Link>
                            <Link to="/roi-calculator" className="tool-item">
                                <BarChart />
                                <div>
                                    <h5>ROI Calculator</h5>
                                    <p>Calculate your returns</p>
                                </div>
                            </Link>
                            <Link to="/rates-and-trends" className="tool-item">
                                <TrendingUp />
                                <div>
                                    <h5>Rates & Trends</h5>
                                    <p>Track price movements</p>
                                </div>
                            </Link>
                            <Link to="/buy-vs-rent" className="tool-item">
                                <Home />
                                <div>
                                    <h5>Buy vs Rent</h5>
                                    <p>The ultimate verdict</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="tools-image">
                        <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2511&auto=format&fit=crop" alt="Real Estate Tools" />
                    </div>
                </div>
            </section>

            {/* Video Content Section */}
            <section className="video-advice">
                <div className="video-content-wrapper">
                    <div className="section-header">
                        <h2>Expert Video Reviews</h2>
                        <p>Watch in-depth locality and project reviews</p>
                    </div>
                    <div className="video-grid">
                        <div className="video-main">
                            <a href="https://www.youtube.com/results?search_query=Ahmedabad+Real+Estate+Market+Analysis+2024" target="_blank" rel="noopener noreferrer" className="video-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="video-thumbnail">
                                    <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2573&auto=format&fit=crop" alt="Main Video" />
                                    <div className="play-overlay"><PlayCircle sx={{ fontSize: 64 }} /></div>
                                </div>
                                <div className="video-meta">
                                    <h3>Ahmedabad Real Estate Market Analysis 2024</h3>
                                    <p>Expert insights on where to buy and what to avoid.</p>
                                </div>
                            </a>
                        </div>
                        <div className="video-sidebar">
                            {[1, 2, 3].map(i => (
                                <a href="https://www.youtube.com/results?search_query=Real+estate+projects+Gandhinagar" target="_blank" rel="noopener noreferrer" className="video-side-item" key={i} style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
                                    <div className="side-thumb">
                                        <img src={`https://images.unsplash.com/photo-1592595893551-228114243bd4?q=80&w=2670&auto=format&fit=crop`} alt="Video" />
                                        <PlayCircle sx={{ fontSize: 24 }} className="play-mini" />
                                    </div>
                                    <div>
                                        <h6>Top Projects in Gandhinagar</h6>
                                        <span>8:45 mins</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Call to Action */}
            <section className="advice-cta">
                <div className="cta-box">
                    <h2>Still Have Questions?</h2>
                    <p>Get answers from our community of experts and buyers.</p>
                    <div className="cta-buttons">
                        <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                            Ask a Question
                        </Link>
                        <Link to="/guides/trending" className="btn-outline" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                            Browse Forums
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TipsAndGuides;
