import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../constants';
import {
    ArrowBack,
    CalendarToday,
    Person,
    Share,
    BookmarkBorder,
    Facebook,
    Twitter,
    LinkedIn,
    WhatsApp
} from '@mui/icons-material';
import './GuideDetail.css';

import { guidesData, articlesData } from '../data/guidesData';

const GuideDetail = () => {
    const { category, slug } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q');

    const [subEmail, setSubEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!subEmail) {
            toast.error('Please enter an email address');
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${API_BASE_URL}/api/newsletter/subscribe`, { email: subEmail });
            toast.success(res.data.message || 'Thank you for subscribing!');
            setSubEmail('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error subscribing to newsletter');
        } finally {
            setLoading(false);
        }
    };

    const getGuideContent = (category, slug, searchQuery) => {
        // 1. Handle Search
        if (category === 'search') {
            return {
                title: `Search Results for "${searchQuery}"`,
                category: "Search",
                author: "RealEstate Expert",
                date: "June 8, 2024",
                readTime: "-",
                image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2511&auto=format&fit=crop",
                content: `
                    <p>We found several guides and articles related to your search for <strong>"${searchQuery}"</strong>. Explore the curated list below to find the information you need.</p>
                    <p>If you don't find what you're looking for, feel free to <a href="/contact">contact our experts</a> for personalized assistance.</p>
                `
            };
        }

        // 2. Handle Articles (Featured/Trending)
        if (articlesData[slug]) {
            return articlesData[slug];
        }

        // 3. Handle Category/Sub-guide
        const categoryData = guidesData[category];
        if (categoryData) {
            if (slug && categoryData.subGuides && categoryData.subGuides[slug]) {
                return {
                    ...categoryData.subGuides[slug],
                    category: categoryData.title,
                    image: categoryData.image, // Reuse category image for subguides
                    author: "RealEstate Expert",
                    date: "June 8, 2024",
                    readTime: "5 min read"
                };
            }
            return {
                ...categoryData,
                author: "RealEstate Expert",
                date: "June 8, 2024",
                readTime: "10 min read"
            };
        }

        // 4. Default Fallback
        const title = slug
            ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            : category?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || "Real Estate Guide";

        return {
            title: title,
            category: "General Guide",
            author: "RealEstate Expert",
            date: "June 8, 2024",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2573&auto=format&fit=crop",
            content: `<p>Detailed content for <strong>${title}</strong> is currently being curated. Please check back soon for expert insights, step-by-step instructions, and professional advice on this topic.</p>`
        };
    };

    const guide = getGuideContent(category, slug, searchQuery);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category, slug]);

    return (
        <div className="guide-detail-page">
            <div className="guide-header-top">
                <div className="guide-container">
                    <Link to="/tips-and-guides" className="back-link">
                        <ArrowBack /> Back to Tips & Guides
                    </Link>
                </div>
            </div>

            <div className="guide-container main-content">
                <div className="guide-layout">
                    <article className="guide-article">
                        <div className="article-meta">
                            <span className="category-badge">{guide.category}</span>
                            <div className="meta-items">
                                <span><CalendarToday sx={{ fontSize: 16 }} /> {guide.date}</span>
                                <span><Person sx={{ fontSize: 16 }} /> {guide.author}</span>
                                <span>{guide.readTime}</span>
                            </div>
                        </div>

                        <h1>{guide.title}</h1>

                        <div className="article-hero-image">
                            <img src={guide.image} alt={guide.title} />
                        </div>

                        <div className="article-content" dangerouslySetInnerHTML={{ __html: guide.content }}>
                        </div>

                        <div className="article-footer">
                            <div className="share-section">
                                <span>Share this guide:</span>
                                <div className="share-buttons">
                                    <button
                                        className="share-btn fb"
                                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                                    >
                                        <Facebook />
                                    </button>
                                    <button
                                        className="share-btn tw"
                                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(guide.title)}`, '_blank')}
                                    >
                                        <Twitter />
                                    </button>
                                    <button
                                        className="share-btn ln"
                                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                                    >
                                        <LinkedIn />
                                    </button>
                                    <button
                                        className="share-btn wa"
                                        onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(guide.title + ' ' + window.location.href)}`, '_blank')}
                                    >
                                        <WhatsApp />
                                    </button>
                                </div>
                            </div>
                            <button className="save-btn" onClick={() => {
                                const savedGuides = JSON.parse(localStorage.getItem('savedGuides') || '[]');
                                const guidePath = location.pathname;
                                if (!savedGuides.find(g => g.path === guidePath)) {
                                    savedGuides.push({
                                        title: guide.title,
                                        category: guide.category,
                                        image: guide.image,
                                        path: guidePath,
                                        date: new Date().toLocaleDateString()
                                    });
                                    localStorage.setItem('savedGuides', JSON.stringify(savedGuides));
                                    toast.success('Guide saved to your profile!');
                                } else {
                                    toast.error('Guide already saved!');
                                }
                            }}>
                                <BookmarkBorder /> Save for later
                            </button>
                        </div>
                    </article>

                    <aside className="guide-sidebar">
                        <div className="sidebar-card newsletter-card">
                            <h3>Get Latest Updates</h3>
                            <p>Subscribe to our newsletter for weekly real estate insights and guides.</p>
                            <form onSubmit={handleSubscribe}>
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    value={subEmail}
                                    onChange={(e) => setSubEmail(e.target.value)}
                                    disabled={loading}
                                    required
                                />
                                <button type="submit" className="btn-subscribe" disabled={loading}>
                                    {loading ? 'Subscribing...' : 'Subscribe Now'}
                                </button>
                            </form>
                        </div>

                        <div className="sidebar-card related-guides">
                            <h3>Explore More</h3>
                            <div className="related-list">
                                {Object.keys(guidesData).filter(key => key !== category).slice(0, 3).map(key => (
                                    <div className="related-item" key={key}>
                                        <img src={guidesData[key].image} alt={guidesData[key].title} />
                                        <div>
                                            <Link to={`/guides/${key}`}>{guidesData[key].title}</Link>
                                            <span>10 min read</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="sidebar-card promo-card">
                            <div className="promo-content">
                                <h4>Need Expert Advice?</h4>
                                <p>Talk to our real estate consultants for personalized guidance.</p>
                                <Link to="/share-requirement" className="btn-consult" style={{ textDecoration: 'none', display: 'inline-block' }}>
                                    Book Free Consultation
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default GuideDetail;
