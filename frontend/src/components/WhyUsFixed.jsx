import React, { useEffect, useRef, useState } from 'react';
import './WhyUs.css';

const features = [
  {
    icon: '💰',
    svgIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v2m0 8v2M9.5 9.5A2.5 2.5 0 0112 8a2.5 2.5 0 010 5 2.5 2.5 0 010 5 2.5 2.5 0 002.5-1.5" />
      </svg>
    ),
    title: 'Best Market Prices',
    description: 'We negotiate the best deals so you get maximum value. Our pricing is always transparent, competitive, and fair.',
    stat: '30%',
    statLabel: 'Below Market Avg',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    glowColor: 'rgba(79, 172, 254, 0.35)',
  },
  {
    icon: '🏛️',
    svgIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'Modern Architecture',
    description: 'Every property in our portfolio is curated for contemporary design, quality construction, and stunning aesthetics.',
    stat: '500+',
    statLabel: 'Premium Listings',
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
    glowColor: 'rgba(167, 139, 250, 0.35)',
  },
  {
    icon: '📡',
    svgIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.12 2.2 2 2 0 012.1 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.28-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    title: 'Expert Marketing',
    description: 'Your property gets maximum exposure through targeted digital campaigns, premium photography, and our vast agent network.',
    stat: '98%',
    statLabel: 'Client Satisfaction',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    glowColor: 'rgba(240, 147, 251, 0.35)',
  },
  {
    icon: '📶',
    svgIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0114.08 0" /><path d="M1.42 9a16 16 0 0121.16 0" />
        <path d="M8.53 16.11a6 6 0 016.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="2.5" />
      </svg>
    ),
    title: 'Smart Connectivity',
    description: 'All our properties come with high-speed fiber connectivity and smart home infrastructure pre-installed.',
    stat: '1Gbps',
    statLabel: 'Fiber Internet',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    glowColor: 'rgba(67, 233, 123, 0.35)',
  },
  {
    icon: '📍',
    svgIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Prime Locations',
    description: 'From urban skylines to serene suburbs, our listings are strategically placed near schools, transit, and lifestyle hubs.',
    stat: '50+',
    statLabel: 'Prime Zones',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    glowColor: 'rgba(250, 112, 154, 0.35)',
  },
  {
    icon: '🛡️',
    svgIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Legally Secure',
    description: 'All transactions are fully verified, RERA compliant, and backed by iron-clad legal documentation for total peace of mind.',
    stat: '100%',
    statLabel: 'Legal Compliance',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #667eea 100%)',
    glowColor: 'rgba(102, 126, 234, 0.35)',
  },
];

const FeatureCard = ({ feature, index }) => {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`whyus-card ${visible ? 'whyus-card--visible' : ''}`}
      style={{ '--delay': `${index * 0.1}s`, '--glow': feature.glowColor }}
    >
      <div className="whyus-card__glow" />
      <div className="whyus-card__icon-wrap" style={{ background: feature.gradient }}>
        <span className="whyus-card__icon-svg">{feature.svgIcon}</span>
      </div>
      <div className="whyus-card__stat" style={{ backgroundImage: feature.gradient }}>
        {feature.stat}
      </div>
      <div className="whyus-card__stat-label">{feature.statLabel}</div>
      <h3 className="whyus-card__title">{feature.title}</h3>
      <p className="whyus-card__desc">{feature.description}</p>
      <div className="whyus-card__line" style={{ background: feature.gradient }} />
    </div>
  );
};

const WhyUs = () => {
  const headingRef = useRef(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeadingVisible(true); },
      { threshold: 0.2 }
    );
    if (headingRef.current) observer.observe(headingRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="whyus-section section" id="why-us">
      {/* Decorative background orbs */}
      <div className="whyus-orb whyus-orb--1" />
      <div className="whyus-orb whyus-orb--2" />
      <div className="whyus-orb whyus-orb--3" />

      <div className="whyus-container">
        {/* Section Header */}
        <div ref={headingRef} className={`whyus-header ${headingVisible ? 'whyus-header--visible' : ''}`}>
          <span className="whyus-eyebrow">Our Advantages</span>
          <h2 className="whyus-heading">
            Why Choose <span className="whyus-heading__accent">Us?</span>
          </h2>
          <div className="whyus-divider">
            <span className="whyus-divider__line" />
            <span className="whyus-divider__diamond" />
            <span className="whyus-divider__line" />
          </div>
          <p className="whyus-subheading">
            We combine cutting-edge technology with decades of real estate expertise to deliver
            an unmatched buying and selling experience.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="whyus-grid">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA Strip */}
        <div className={`whyus-cta ${headingVisible ? 'whyus-cta--visible' : ''}`}>
          <div className="whyus-cta__text">
            <span className="whyus-cta__number">12+</span> Years of Excellence &nbsp;·&nbsp;
            <span className="whyus-cta__number">2,400+</span> Happy Families &nbsp;·&nbsp;
            <span className="whyus-cta__number">₹1500Cr+</span> Properties Sold
          </div>
          <a href="#contact" className="whyus-cta__btn">
            Get a Free Consultation
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
