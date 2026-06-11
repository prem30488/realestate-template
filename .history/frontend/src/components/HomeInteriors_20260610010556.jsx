import React, { useState, useEffect, useRef, useCallback } from 'react';
import './HomeInteriors.css';

const API = 'http://localhost:5000';

/* ── helpers ──────────────────────────────────────────── */
const formatBudget = (n) => {
    if (!n) return '';
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)} Cr`;
    if (n >= 100000) return `₹${(n / 100000).toFixed(0)} L`;
    return `₹${n.toLocaleString('en-IN')}`;
};

const StarRating = ({ rating }) => {
    const stars = [1, 2, 3, 4, 5];
    return (
        <div className="hi-stars">
            {stars.map(s => (
                <span key={s} className={`hi-star ${s <= Math.floor(rating) ? 'filled' : s - 0.5 <= rating ? 'half' : ''}`}>★</span>
            ))}
        </div>
    );
};

const CITIES = ['Ahmedabad', 'Gandhinagar', 'Surat', 'Vadodara', 'Rajkot'];
const SPECS = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office', 'Luxury', 'Modular'];

/* ═══════════════════════════════════════════════════════ */
export default function HomeInteriors() {
    /* designers state */
    const [designers, setDesigners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    /* top designers */
    const [topDesigners, setTopDesigners] = useState([]);

    /* articles */
    const [articles, setArticles] = useState([]);

    /* filter state */
    const [selectedCity, setSelectedCity] = useState('');
    const [searchText, setSearchText] = useState('');
    const [activeSpec, setActiveSpec] = useState('All');

    /* carousel state */
    const [carouselIdx, setCarouselIdx] = useState(0);
    const carouselRef = useRef(null);
    const SLIDES_VISIBLE = 3;

    /* ── Seed + Fetch on mount ───────────────────────────── */
    useEffect(() => {
        seedDataIfNeeded();
        fetchArticles();
    }, []);

    useEffect(() => {
        fetchDesigners(1);
    }, [selectedCity]);

    useEffect(() => {
        if (selectedCity) fetchTopDesigners(selectedCity);
        else fetchTopDesigners('');
    }, [selectedCity]);

    const seedDataIfNeeded = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await fetch(`${API}/api/admin/seed-interior-data`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
        } catch (_) { }
    };

    const fetchDesigners = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ page, limit: 20 });
            if (selectedCity) params.append('city', selectedCity);
            if (searchText.trim()) params.append('search', searchText.trim());
            const res = await fetch(`${API}/api/public/interior-designers?${params}`);
            const data = await res.json();
            setDesigners(data.data || []);
            setTotalCount(data.pagination?.total || 0);
            setTotalPages(data.pagination?.pages || 1);
            setCurrentPage(data.pagination?.currentPage || 1);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [selectedCity, searchText]);

    const fetchTopDesigners = async (city) => {
        try {
            const cityParam = city || 'Ahmedabad';
            const res = await fetch(`${API}/api/public/interior-designers/featured/${cityParam}?limit=10`);
            const data = await res.json();
            setTopDesigners(data.data || []);
        } catch (e) { }
    };

    const fetchArticles = async () => {
        try {
            const res = await fetch(`${API}/api/public/interior-articles/latest?limit=10`);
            const data = await res.json();
            setArticles(data.data || []);
        } catch (e) { }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchDesigners(1);
    };

    const handlePageChange = (p) => {
        setCurrentPage(p);
        fetchDesigners(p);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    /* ── Carousel ────────────────────────────────────────── */
    const maxCarouselIdx = Math.max(0, articles.length - SLIDES_VISIBLE);

    const carouselNext = () => setCarouselIdx(i => Math.min(i + 1, maxCarouselIdx));
    const carouselPrev = () => setCarouselIdx(i => Math.max(i - 1, 0));

    /* ── Filtered designers by spec ─────────────────────── */
    const displayed = activeSpec === 'All'
        ? designers
        : designers.filter(d =>
            d.specializations?.some(s => s.toLowerCase().includes(activeSpec.toLowerCase())) ||
            d.tags?.some(t => t.toLowerCase().includes(activeSpec.toLowerCase()))
        );

    /* ── Rank styling ───────────────────────────────────── */
    const rankClass = (i) => i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
    const rankLabel = (i) => i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;

    /* ── Format date ─────────────────────────────────────── */
    const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

    return (
        <div className="hi-page">

            {/* ── HERO ──────────────────────────────────────────── */}
            <section className="hi-hero">
                <div className="hi-hero-inner">
                    <div className="hi-hero-badge">✦ Premium Interior Marketplace</div>
                    <h1 className="hi-hero-title">
                        Find the Best<br /><span>Interior Designers</span><br />Near You
                    </h1>
                    <p className="hi-hero-sub">
                        Discover verified, award-winning interior designers, decorators and consultants
                        across all major cities. Transform your space with confidence.
                    </p>
                    <div className="hi-hero-stats">
                        <div className="hi-hero-stat">
                            <div className="hi-hero-stat-num">500+</div>
                            <div className="hi-hero-stat-label">Verified Designers</div>
                        </div>
                        <div className="hi-hero-stat">
                            <div className="hi-hero-stat-num">25K+</div>
                            <div className="hi-hero-stat-label">Projects Completed</div>
                        </div>
                        <div className="hi-hero-stat">
                            <div className="hi-hero-stat-num">4.7★</div>
                            <div className="hi-hero-stat-label">Average Rating</div>
                        </div>
                        <div className="hi-hero-stat">
                            <div className="hi-hero-stat-num">5</div>
                            <div className="hi-hero-stat-label">Cities Covered</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FILTERS ───────────────────────────────────────── */}
            <div className="hi-filters-wrap">
                <form className="hi-filters-card" onSubmit={handleSearch}>
                    <div className="hi-filter-group">
                        <div className="hi-filter-icon">📍</div>
                        <select
                            className="hi-filter-select"
                            value={selectedCity}
                            onChange={e => { setSelectedCity(e.target.value); setCurrentPage(1); }}
                        >
                            <option value="">All Cities</option>
                            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="hi-filter-group" style={{ flex: 2 }}>
                        <div className="hi-filter-icon">🔍</div>
                        <input
                            className="hi-filter-input"
                            placeholder="Search by name, style or specialty…"
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                        />
                    </div>
                    <button className="hi-filter-btn" type="submit">
                        🔎 Search
                    </button>
                </form>
            </div>

            {/* ── MAIN CONTENT ──────────────────────────────────── */}
            <div className="hi-main">

                {/* Specialization chips */}
                <div className="hi-specials">
                    {SPECS.map(s => (
                        <button key={s} className={`hi-spec-chip ${activeSpec === s ? 'active' : ''}`} onClick={() => setActiveSpec(s)}>
                            {s}
                        </button>
                    ))}
                </div>

                <div className="hi-layout">

                    {/* ── LEFT: Designer Grid ──────────────────────── */}
                    <div>
                        <div className="hi-section-header">
                            <h2 className="hi-section-title">
                                {selectedCity ? `Interior Designers in ` : 'All '}
                                <span>{selectedCity || 'Gujarat'}</span>
                            </h2>
                            <span className="hi-section-count">{totalCount} Found</span>
                        </div>

                        {loading ? (
                            <div className="hi-loading">
                                <div className="hi-spinner" />
                                <div className="hi-loading-text">Loading designers…</div>
                            </div>
                        ) : displayed.length === 0 ? (
                            <div className="hi-empty">
                                <div className="hi-empty-icon">🏠</div>
                                <h3>No designers found</h3>
                                <p>Try changing the city or search term.</p>
                            </div>
                        ) : (
                            <div className="hi-grid">
                                {displayed.map(d => (
                                    <DesignerCard key={d.id} designer={d} />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && !loading && (
                            <div className="hi-pagination">
                                <button
                                    className="hi-page-btn hi-page-nav"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    ← Prev
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                                    .reduce((acc, p, i, arr) => {
                                        if (i > 0 && p - arr[i - 1] > 1) acc.push('…');
                                        acc.push(p);
                                        return acc;
                                    }, [])
                                    .map((p, i) =>
                                        p === '…'
                                            ? <span key={`e${i}`} style={{ color: '#999', padding: '0 4px' }}>…</span>
                                            : <button key={p} className={`hi-page-btn ${currentPage === p ? 'active' : ''}`} onClick={() => handlePageChange(p)}>{p}</button>
                                    )
                                }

                                <button
                                    className="hi-page-btn hi-page-nav"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </div>

                    {/* ── RIGHT: Sidebar ───────────────────────────── */}
                    <aside className="hi-sidebar">

                        {/* Top Designers */}
                        <div className="hi-sidebar-card">
                            <div className="hi-sidebar-head">
                                <div className="hi-sidebar-head-title">
                                    🏆 Top {topDesigners.length} Designers
                                </div>
                                <div className="hi-sidebar-head-sub">
                                    {selectedCity ? `in ${selectedCity}` : 'across all cities'} • by rating
                                </div>
                            </div>
                            {topDesigners.slice(0, 10).map((d, i) => (
                                <div key={d.id} className="hi-top-designer">
                                    <span className={`hi-top-rank ${rankClass(i)}`}>{rankLabel(i)}</span>
                                    <div className="hi-top-logo">
                                        <img src={d.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(d.name)}&size=80`} alt={d.name} />
                                    </div>
                                    <div className="hi-top-info">
                                        <div className="hi-top-name">{d.name}</div>
                                        <div className="hi-top-city">📍 {d.city}</div>
                                    </div>
                                    <div className="hi-top-rating">
                                        ★ {d.rating}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Free Consultation */}
                        <div className="hi-consult-banner">
                            <div className="hi-consult-icon">🎨</div>
                            <div className="hi-consult-title">Book Free Consultation</div>
                            <div className="hi-consult-sub">
                                Get a complimentary 30-minute design consultation with a verified interior expert.
                            </div>
                            <button className="hi-consult-btn" onClick={() => window.location.href = '/share-requirement'}>
                                Book Now — It's Free
                            </button>
                        </div>
                    </aside>
                </div>

                {/* ── NEWS ARTICLES CAROUSEL ─────────────────────── */}
                {articles.length > 0 && (
                    <section className="hi-news-section">
                        <div className="hi-news-header">
                            <h2 className="hi-news-title">Latest in <span>Interiors & Décor</span></h2>
                            <span className="hi-pill-badge">✦ Latest News</span>
                        </div>

                        <div className="hi-carousel-wrap">
                            <div className="hi-carousel-track" ref={carouselRef}>
                                <div
                                    className="hi-carousel-inner"
                                    style={{ transform: `translateX(calc(-${carouselIdx * (100 / SLIDES_VISIBLE)}% - ${carouselIdx * 8}px))` }}
                                >
                                    {articles.map(a => (
                                        <div key={a.id} className="hi-news-card">
                                            <div className="hi-news-img">
                                                <img
                                                    src={a.image || `https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80`}
                                                    alt={a.title}
                                                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80'; }}
                                                />
                                                <span className="hi-news-cat">{a.category}</span>
                                            </div>
                                            <div className="hi-news-body">
                                                <div className="hi-news-meta">
                                                    <span className="hi-news-author">✍️ {a.author || 'Editorial'}</span>
                                                    <span className="hi-news-read">{a.readTime || '5 min'}</span>
                                                </div>
                                                <div className="hi-news-headline">{a.title}</div>
                                                <div className="hi-news-excerpt">{a.excerpt}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="hi-carousel-controls">
                                <button className="hi-carousel-btn" onClick={carouselPrev} disabled={carouselIdx === 0}>←</button>
                                <div className="hi-carousel-dots">
                                    {Array.from({ length: maxCarouselIdx + 1 }, (_, i) => (
                                        <div key={i} className={`hi-dot ${carouselIdx === i ? 'active' : ''}`} onClick={() => setCarouselIdx(i)} />
                                    ))}
                                </div>
                                <button className="hi-carousel-btn" onClick={carouselNext} disabled={carouselIdx >= maxCarouselIdx}>→</button>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

/* ── DESIGNER CARD COMPONENT ────────────────────────────── */
function DesignerCard({ designer: d }) {
    const formatBudgetRange = () => {
        if (d.minBudget && d.maxBudget)
            return `${formatBudget(d.minBudget)} – ${formatBudget(d.maxBudget)}`;
        if (d.minBudget) return `From ${formatBudget(d.minBudget)}`;
        return 'Contact for pricing';
    };

    return (
        <div className="hi-card">
            <div className="hi-card-cover">
                <img
                    src={d.coverImage || `https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80`}
                    alt={d.name}
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80'; }}
                />
                <div className="hi-card-cover-overlay" />
                {d.isFeatured && <span className="hi-card-featured-badge">⭐ Featured</span>}
                {d.isVerified && <span className="hi-card-verified">✔ Verified</span>}
                <div className="hi-card-logo-wrap">
                    <img
                        src={d.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(d.name)}&size=100`}
                        alt={d.name}
                        onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(d.name)}&size=100`; }}
                    />
                </div>
            </div>

            <div className="hi-card-body">
                <div className="hi-card-name">{d.name}</div>
                <div className="hi-card-city">📍 {d.city}{d.address ? `, ${d.address.split(',')[0]}` : ''}</div>

                <div className="hi-card-rating-row">
                    <StarRating rating={d.rating || 4} />
                    <span className="hi-rating-val">{(d.rating || 4).toFixed(1)}</span>
                    <span className="hi-reviews">({(d.reviewCount || 0).toLocaleString('en-IN')} reviews)</span>
                </div>

                {d.specializations?.length > 0 && (
                    <div className="hi-card-tags">
                        {d.specializations.slice(0, 3).map(s => <span key={s} className="hi-tag">{s}</span>)}
                    </div>
                )}

                <div className="hi-card-stats">
                    <div className="hi-card-stat">
                        <div className="hi-card-stat-val">{d.yearsExperience || 1}+</div>
                        <div className="hi-card-stat-label">Yrs Exp</div>
                    </div>
                    <div className="hi-card-stat">
                        <div className="hi-card-stat-val">{d.projectsCompleted || 0}+</div>
                        <div className="hi-card-stat-label">Projects</div>
                    </div>
                    <div className="hi-card-stat">
                        <div className="hi-card-stat-val">{(d.rating || 4).toFixed(1)}</div>
                        <div className="hi-card-stat-label">Rating</div>
                    </div>
                </div>

                <div className="hi-card-budget">
                    💰 <strong>{formatBudgetRange()}</strong>
                </div>

                <div className="hi-card-actions">
                    <button
                        className="hi-btn-primary"
                        onClick={() => window.location.href = '/share-requirement'}
                    >
                        Get Quote
                    </button>
                    {d.phone && (
                        <button
                            className="hi-btn-secondary"
                            onClick={() => window.open(`tel:${d.phone}`, '_self')}
                        >
                            📞 Call
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
