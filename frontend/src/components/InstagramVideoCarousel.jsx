import { useState, useEffect } from "react";
import axios from 'axios';
import "./instagramvideocaousel.css";
import { API_BASE_URL } from "../constants";

/**
 * Converts any Instagram post/reel/p URL into the native embed iframe URL.
 * Supports:
 *   https://www.instagram.com/p/{shortcode}/
 *   https://www.instagram.com/reel/{shortcode}/
 *   https://www.instagram.com/reels/{shortcode}/
 *   https://instagr.am/p/{shortcode}/
 */
const toEmbedUrl = (url = '') => {
  const match = url.match(/instagram\.com\/(?:p|reel|reels)\/([A-Za-z0-9_-]+)/);
  if (match) return `https://www.instagram.com/p/${match[1]}/embed/`;
  // fallback – try instagr.am short links
  const short = url.match(/instagr\.am\/p\/([A-Za-z0-9_-]+)/);
  if (short) return `https://www.instagram.com/p/${short[1]}/embed/`;
  return url; // return as-is; will show broken iframe rather than crash
};

const InstagramVideoCarousel = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/instareels`);
        // Map backend fields to frontend expectations if necessary
        const mappedReels = response.data.map(reel => ({
          url: reel.videoUrl,
          tag: "Elite Property", // Default tag
          caption: reel.title,
          active: true
        }));
        setReels(mappedReels);
      } catch (error) {
        console.error('Error fetching reels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  if (loading && reels.length === 0) {
    return (
      <div className="ivc-section text-center py-5">
        <p>Loading elite reels...</p>
      </div>
    );
  }

  if (reels.length === 0) {
    return (
      <div className="ivc-section text-center py-5">
        <p>No reels to display at the moment.</p>
      </div>
    );
  }

  const goTo = (index) => {
    setActiveIndex(index);
  };

  const prev = () => {
    setActiveIndex((i) => (i === 0 ? reels.length - 1 : i - 1));
  };

  const next = () => {
    setActiveIndex((i) => (i === reels.length - 1 ? 0 : i + 1));
  };

  return (
    <section className="ivc-section">
      {/* Header */}
      <div className="ivc-header">
        <span className="ivc-subtitle">FOLLOW OUR JOURNEY</span>
        <h2 className="ivc-title">Elite Properties on Reels</h2>
        <p className="ivc-desc">
          Take a virtual tour of our most exclusive listings and stay updated with the latest in real estate.
        </p>
      </div>

      {/* Carousel */}
      <div className="ivc-carousel-wrapper">
        {/* Prev Button */}
        <button className="ivc-nav ivc-nav--prev" onClick={prev} aria-label="Previous reel">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Slides */}
        <div className="ivc-track">
          {reels.map((reel, index) => {
            const offset = index - activeIndex;
            let slideClass = "ivc-slide";
            if (offset === 0) slideClass += " ivc-slide--active";
            else if (offset === -1 || (activeIndex === 0 && index === reels.length - 1))
              slideClass += " ivc-slide--prev";
            else if (offset === 1 || (activeIndex === reels.length - 1 && index === 0))
              slideClass += " ivc-slide--next";
            else slideClass += " ivc-slide--hidden";

            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className={slideClass}
                onClick={() => offset !== 0 && goTo(index)}
              >
                {/* Native Instagram iframe embed — works without an API token */}
                <div className="ivc-embed-wrapper">
                  {isActive ? (
                    <iframe
                      key={`embed-${index}`}
                      src={toEmbedUrl(reel.url)}
                      width="328"
                      height="560"
                      frameBorder="0"
                      scrolling="no"
                      allowTransparency="true"
                      allow="encrypted-media"
                      title={reel.caption || `Instagram reel ${index + 1}`}
                      style={{ borderRadius: '12px', border: 'none', display: 'block' }}
                    />
                  ) : (
                    <div className="ivc-embed-placeholder">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36" style={{ opacity: 0.4 }}>
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span style={{ marginTop: '10px', color: '#94a3b8', fontSize: '0.8rem' }}>{reel.tag}</span>
                    </div>
                  )}
                </div>

                {/* Caption Card */}
                <div className="ivc-caption-card">
                  <span className="ivc-caption-tag">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    {reel.tag}
                  </span>
                  <p className="ivc-caption-text">{reel.caption}</p>
                  <a
                    href={reel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ivc-caption-link"
                  >
                    View on Instagram →
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Button */}
        <button className="ivc-nav ivc-nav--next" onClick={next} aria-label="Next reel">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="ivc-dots">
        {reels.map((_, i) => (
          <button
            key={i}
            className={`ivc-dot${i === activeIndex ? " ivc-dot--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to reel ${i + 1}`}
          />
        ))}
      </div>

      {/* Reel counter */}
      <p className="ivc-counter">
        <span>{activeIndex + 1}</span> / {reels.length}
      </p>
    </section>
  );
};

export default InstagramVideoCarousel;
