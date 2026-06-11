import React, { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../constants/index.jsx';
import './HomeInteriors.css';

const API = API_BASE_URL;

const DEFAULT_CITY = 'Ahmedabad';
const PAGE_SIZE = 20;
const TOP_LIMIT = 10;

const formatBudget = (n) => {
    if (!n) return '';
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)} Cr`;
    if (n >= 100000) return `₹${(n / 100000).toFixed(0)} L`;
    return `₹${n.toLocaleString('en-IN')}`;
};

const StarRating = ({ rating }) => (
    <div className="hi-stars">
        {[1, 2, 3, 4, 5].map(s => (
            <span key={s} className={`hi-star ${s <= Math.floor(rating) ? 'filled' : s - 0.5 <= rating ? 'half' : ''}`}>★</span>
        ))}
    </div>
);

const FALLBACK_CITIES = ['Ahmedabad', 'Gandhinagar', 'Surat', 'Vadodara', 'Rajkot'];
const SPECS = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office', 'Luxury', 'Modular'];

export default function HomeInteriors() {
    const [designers, setDesigners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [topDesigners, setTopDesigners] = useState([]);
    const [articles, setArticles] = useState([]);
    const [cities, setCities] = useState(FALLBACK_CITIES);
    const [selectedCity, setSelectedCity] = useState(DEFAULT_CITY);
    const [searchText, setSearchText] = useState('');
    const [activeSpec, setActiveSpec] = useState('All');
    const [sortBy, setSortBy] = useState('rating');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [carouselIdx, setCarouselIdx] = useState(0);
    const [slidesVisible, setSlidesVisible] = useState(3);

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            setSlidesVisible(w < 768 ? 1 : w < 1024 ? 2 : 3);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    useEffect(() => {
        fetch(`${API}/api/interior-designers?limit=100`)
            .then(r => r.json())
            .then(d => {
                const list = d.designers || d.data || [];
                const unique = [...new Set(list.map(x => x.city).filter(Boolean))].sort();
                if (unique.length) setCities(unique);
            })
            .catch(() => { });
        fetchArticles();
    }, []);

    const fetchDesigners = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ page, limit: PAGE_SIZE, sort: sortBy });
            if (selectedCity) params.append('city', selectedCity);
            if (searchText.trim()) params.append('search', searchText.trim());
            const res = await fetch(`${API}/api/interior-designers?${params}`);
            const data = await res.json();
            setDesigners(data.designers || data.data || []);
            setTotalCount(data.totalCount ?? data.pagination?.total ?? 0);
            setTotalPages(data.totalPages ?? data.pagination?.pages ?? 1);
            setCurrentPage(data.currentPage ?? data.pagination?.currentPage ?? 1);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [selectedCity, searchText, sortBy]);

    const fetchTopDesigners = useCallback(async (city, sort) => {
        try {
            const params = new URLSearchParams({ city: city || DEFAULT_CITY, limit: TOP_LIMIT, sort: sort || '' });
            const res = await fetch(`${API}/api/interior-designers/top?${params}`);
            const data = await res.json();
            setTopDesigners(Array.isArray(data) ? data : (data.data || []));
        } catch (e) {
            console.error(e);
        }
    }, []);

    const resolveImageUrl = (img) => {
        if (!img) return 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80'; // Minimal fallback if null
        if (img.startsWith('http')) return img;
        return `/${img}`;
    };

    const fetchArticles = useCallback(async (category = 'Interiors & Decor') => {
        try {
            // Always request articles in the Interiors & Decor category by default
            let url = `${API}/api/interior-articles?limit=12`;
            if (category && category.toLowerCase() !== 'all') {
                url += `&category=${encodeURIComponent(category)}`;
            }
            const res = await fetch(url);
            const data = await res.json();
            setArticles(data.articles || data.data || []);
            setCarouselIdx(0); // Reset carousel when articles change
        } catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => { fetchDesigners(1); }, [selectedCity, sortBy]);
    useEffect(() => { fetchTopDesigners(selectedCity, sortBy); }, [selectedCity, sortBy, fetchTopDesigners]);
    // Load interior-related articles (Interiors & Decor) for the carousel
    useEffect(() => { fetchArticles(); }, [fetchArticles]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchDesigners(1);
    };

    const handlePageChange = (p) => {
        setCurrentPage(p);
        fetchDesigners(p);
        window.scrollTo({ top: 280, behavior: 'smooth' });
    };

    const maxCarouselIdx = Math.max(0, articles.length - slidesVisible);
    const carouselNext = () => setCarouselIdx(i => (i >= maxCarouselIdx ? 0 : i + 1));
    const carouselPrev = () => setCarouselIdx(i => (i <= 0 ? maxCarouselIdx : i - 1));

    useEffect(() => {
        if (articles.length <= slidesVisible) return undefined;
        const timer = setInterval(() => {
            setCarouselIdx(i => (i >= maxCarouselIdx ? 0 : i + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [articles.length, slidesVisible, maxCarouselIdx]);

    useEffect(() => {
        setCarouselIdx(i => Math.min(i, maxCarouselIdx));
    }, [maxCarouselIdx]);

    const displayed = activeSpec === 'All'
        ? designers
        : designers.filter(d =>
            d.specializations?.some(s => s.toLowerCase().includes(activeSpec.toLowerCase())) ||
            d.tags?.some(t => t.toLowerCase().includes(activeSpec.toLowerCase()))
        );

    const rankClass = (i) => i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
    const rankLabel = (i) => i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;

    return (
        <div className="hi-page">
            <section className="hi-hero">
                <div className="hi-hero-bg-pattern" aria-hidden="true" />
                <div className="hi-hero-inner">
                    <nav className="hi-breadcrumb" aria-label="Breadcrumb">
                        <a href="/">Home</a>
                        <span>/</span>
                        <span>Home Interiors</span>
                        <span>/</span>
                        <span className="hi-breadcrumb-active">Interior Designers in {selectedCity || 'Gujarat'}</span>
                    </nav>
                    <div className="hi-hero-badge">✦ Premium Interior Marketplace</div>
                    <h1 className="hi-hero-title">
                        Interior Designers<br />in <span>{selectedCity || 'Gujarat'}</span>
                    </h1>
                    <p className="hi-hero-sub">
                        Browse verified interior design consultancies, compare ratings &amp; budgets,
                        and book a free consultation — inspired by India's leading home interior platforms.
                    </p>
                    <div className="hi-hero-stats">
                        <div className="hi-hero-stat">
                            <div className="hi-hero-stat-num">{totalCount || '25'}+</div>
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
                            <div className="hi-hero-stat-num">{cities.length}</div>
                            <div className="hi-hero-stat-label">Cities Covered</div>
                        </div>
                    </div>
                </div>
            </section>

            {topDesigners.length > 0 && (
                <section className="hi-top-strip">
                    <div className="hi-top-strip-inner">
                        <div className="hi-top-strip-label">
                            <span className="hi-top-strip-icon">🏆</span>
                            Top {Math.min(TOP_LIMIT, topDesigners.length)} in <strong>{selectedCity}</strong>
                        </div>
                        <div className="hi-top-strip-scroll">
                            {topDesigners.slice(0, TOP_LIMIT).map((d, i) => (
                                <div key={d.id} className="hi-top-strip-card">
                                    <span className={`hi-top-strip-rank ${rankClass(i)}`}>{rankLabel(i)}</span>
                                    <img
                                        src={d.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(d.name)}&size=80`}
                                        alt={d.name}
                                    />
                                    <div className="hi-top-strip-info">
                                        <span className="hi-top-strip-name">{d.name}</span>
                                        <span className="hi-top-strip-rating">★ {d.rating}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

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
                            {cities.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="hi-filter-group hi-filter-grow">
                        <div className="hi-filter-icon">🔍</div>
                        <input
                            className="hi-filter-input"
                            placeholder="Search by name, style or specialty…"
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                        />
                    </div>
                    <div className="hi-filter-group">
                        <div className="hi-filter-icon">⇅</div>
                        <select
                            className="hi-filter-select"
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                        >
                            <option value="rating">Top Rated</option>
                            <option value="featured">Featured First</option>
                            <option value="experience">Most Experienced</option>
                            <option value="projects">Most Projects</option>
                            <option value="name">Name A–Z</option>
                        </select>
                    </div>
                    <button className="hi-filter-btn" type="submit">Search</button>
                </form>
            </div>

            <div className="hi-main">
                <div className="hi-specials">
                    {SPECS.map(s => (
                        <button
                            key={s}
                            type="button"
                            className={`hi-spec-chip ${activeSpec === s ? 'active' : ''}`}
                            onClick={() => setActiveSpec(s)}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                <div className="hi-layout">
                    <div>
                        <div className="hi-section-header">
                            <h2 className="hi-section-title">
                                {selectedCity ? `Designers in ` : 'All '}
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
                                {displayed.map(d => <DesignerCard key={d.id} designer={d} />)}
                            </div>
                        )}

                        {totalPages > 1 && !loading && (
                            <div className="hi-pagination">
                                <button
                                    type="button"
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
                                            ? <span key={`e${i}`} className="hi-page-ellipsis">…</span>
                                            : (
                                                <button
                                                    key={p}
                                                    type="button"
                                                    className={`hi-page-btn ${currentPage === p ? 'active' : ''}`}
                                                    onClick={() => handlePageChange(p)}
                                                >
                                                    {p}
                                                </button>
                                            )
                                    )}
                                <button
                                    type="button"
                                    className="hi-page-btn hi-page-nav"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </div>

                    <aside className="hi-sidebar">
                        <div className="hi-sidebar-card">
                            <div className="hi-sidebar-head">
                                <div className="hi-sidebar-head-title">🏆 Top {TOP_LIMIT} Designers</div>
                                <div className="hi-sidebar-head-sub">
                                    in {selectedCity || 'all cities'} • by rating
                                </div>
                            </div>
                            {topDesigners.slice(0, TOP_LIMIT).map((d, i) => (
                                <div key={d.id} className="hi-top-designer">
                                    <span className={`hi-top-rank ${rankClass(i)}`}>{rankLabel(i)}</span>
                                    <div className="hi-top-logo">
                                        <img
                                            src={d.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(d.name)}&size=80`}
                                            alt={d.name}
                                        />
                                    </div>
                                    <div className="hi-top-info">
                                        <div className="hi-top-name">{d.name}</div>
                                        <div className="hi-top-city">📍 {d.city}</div>
                                    </div>
                                    <div className="hi-top-rating">★ {d.rating}</div>
                                </div>
                            ))}
                        </div>

                        <div className="hi-consult-banner">
                            <div className="hi-consult-icon">🎨</div>
                            <div className="hi-consult-title">Book Free Consultation</div>
                            <div className="hi-consult-sub">
                                Get a complimentary 30-minute design consultation with a verified interior expert.
                            </div>
                            <button type="button" className="hi-consult-btn" onClick={() => { window.location.href = '/share-requirement'; }}>
                                Book Now — It's Free
                            </button>
                        </div>
                    </aside>
                </div>

                {articles.length > 0 && (
                    <section className="hi-news-section">
                        <div className="hi-news-header">
                            <h2 className="hi-news-title">Latest in <span>Interiors &amp; Décor</span></h2>
                            <span className="hi-pill-badge">✦ Latest News</span>
                        </div>

                        <div className="hi-carousel-wrap">
                            <div className="hi-carousel-track">
                                <div
                                    className="hi-carousel-inner"
                                    style={{
                                        transform: `translateX(calc(-${carouselIdx * (100 / slidesVisible)}% - ${carouselIdx * (24 / slidesVisible)}px))`,
                                    }}
                                >
                                    {articles.map(a => (
                                        <div
                                            key={a.id}
                                            className="hi-news-card"
                                            style={{ minWidth: `calc(${100 / slidesVisible}% - ${(24 * (slidesVisible - 1)) / slidesVisible}px)` }}
                                            onClick={() => setSelectedArticle(a)}
                                        >
                                            <div className="hi-news-img">
                                                <img
                                                    src={resolveImageUrl(a.image)}
                                                    alt={a.title}
                                                    loading="lazy"
                                                    crossOrigin="anonymous"
                                                    onError={(e) => {
                                                        console.warn('News image failed to load:', e.target.src);
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
                                                    }}
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
                                <button type="button" className="hi-carousel-btn" onClick={carouselPrev} disabled={articles.length <= slidesVisible}>←</button>
                                <div className="hi-carousel-dots">
                                    {Array.from({ length: maxCarouselIdx + 1 }, (_, i) => (
                                        <div
                                            key={i}
                                            role="button"
                                            tabIndex={0}
                                            className={`hi-dot ${carouselIdx === i ? 'active' : ''}`}
                                            onClick={() => setCarouselIdx(i)}
                                            onKeyDown={e => e.key === 'Enter' && setCarouselIdx(i)}
                                        />
                                    ))}
                                </div>
                                <button type="button" className="hi-carousel-btn" onClick={carouselNext} disabled={articles.length <= slidesVisible}>→</button>
                            </div>
                        </div>
                    </section>
                )}

                {selectedArticle && (
                    <div className="hi-modal-overlay" onClick={() => setSelectedArticle(null)}>
                        <div className="hi-modal-content" onClick={e => e.stopPropagation()}>
                            <button type="button" className="hi-modal-close" onClick={() => setSelectedArticle(null)}>&times;</button>
                            <div className="hi-modal-img">
                                <img
                                    src={resolveImageUrl(selectedArticle.image)}
                                    alt={selectedArticle.title}
                                    loading="lazy"
                                    crossOrigin="anonymous"
                                    onError={(e) => {
                                        console.warn('Modal article image failed to load:', e.target.src);
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/900x400?text=No+Image';
                                    }}
                                />
                                <span className="hi-modal-cat">{selectedArticle.category}</span>
                            </div>
                            <div className="hi-modal-body">
                                <div className="hi-modal-meta">
                                    <span>✍️ {selectedArticle.author}</span>
                                    <span>⏱️ {selectedArticle.readTime}</span>
                                    <span>📅 {new Date(selectedArticle.publishedAt).toLocaleDateString()}</span>
                                </div>
                                <h2 className="hi-modal-title">{selectedArticle.title}</h2>
                                <p className="hi-modal-excerpt">{selectedArticle.excerpt}</p>
                                <div className="hi-modal-text">
                                    {selectedArticle.content || 'Full article content coming soon...'}
                                </div>
                                <div className="hi-modal-footer">
                                    <button type="button" className="hi-modal-btn" onClick={() => setSelectedArticle(null)}>Close Article</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function DesignerCard({ designer: d }) {
    const formatBudgetRange = () => {
        if (d.minBudget && d.maxBudget) return `${formatBudget(d.minBudget)} – ${formatBudget(d.maxBudget)}`;
        if (d.minBudget) return `From ${formatBudget(d.minBudget)}`;
        return 'Contact for pricing';
    };

    return (
        <article className="hi-card">
            <div className="hi-card-cover">
                <img
                    src={d.coverImage || 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80'}
                    alt={d.name}
                    loading="lazy"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80'; }}
                />
                <div className="hi-card-cover-overlay" />
                {d.isFeatured && <span className="hi-card-featured-badge">⭐ Featured</span>}
                {d.isVerified && <span className="hi-card-verified">✔ Verified</span>}
                <div className="hi-card-logo-wrap">
                    <img
                        src={d.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(d.name)}&size=100`}
                        alt=""
                        loading="lazy"
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

                <div className="hi-card-budget">💰 <strong>{formatBudgetRange()}</strong></div>

                <div className="hi-card-actions">
                    <button type="button" className="hi-btn-primary" onClick={() => { window.location.href = '/share-requirement'; }}>
                        Get Quote
                    </button>
                    {d.phone && (
                        <button type="button" className="hi-btn-secondary" onClick={() => window.open(`tel:${d.phone}`, '_self')}>
                            📞 Call
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}
