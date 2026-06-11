import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import VerifiedIcon from '@mui/icons-material/Verified';
import EcoIcon from '@mui/icons-material/Nature';
import SmartIcon from '@mui/icons-material/SettingsRemote';
import LocationIcon from '@mui/icons-material/LocationOn';
import PoolIcon from '@mui/icons-material/Pool';
import IntegrityIcon from '@mui/icons-material/Gavel';
import ArrowIcon from '@mui/icons-material/ArrowForward';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import StarIcon from '@mui/icons-material/Star';
import BedIcon from '@mui/icons-material/Bed';
import BathIcon from '@mui/icons-material/Bathtub';
import AreaIcon from '@mui/icons-material/SquareFoot';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import './AboutUs.css';
import SEO from '../common/SEO';
import { COMPANY_INFO } from '../constants/companyInfo';

// ─── Animated Counter Subcomponent ───────────────────────────────────────────
const AnimatedCounter = ({ targetString }) => {
  const numericMatch = targetString.match(/\d+/);
  const targetNum = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = targetString.replace(targetNum.toString(), '');

  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds animation
    const increment = targetNum / (duration / 16); // ~60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNum) {
        clearInterval(timer);
        setCount(targetNum);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [targetNum]);

  return <span>{count}{suffix}</span>;
};

// ─── Main About Us Component ──────────────────────────────────────────────────
const AboutUs = () => {
  const [funfacts, setFunfacts] = useState([]);
  const [properties, setProperties] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  // Fetch data
  useEffect(() => {
    // 1. Fetch FunFacts
    axios.get(`${API_BASE_URL}/api/funfacts`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setFunfacts(res.data);
        } else {
          // Fallback initial data
          setFunfacts([
            { id: 1, title: 'Completed Projects', value: '150+' },
            { id: 2, title: 'Properties Sold', value: '1800+' },
            { id: 3, title: 'Happy Families', value: '1200+' },
            { id: 4, title: 'Industry Awards', value: '25+' }
          ]);
        }
      })
      .catch(() => {
        setFunfacts([
          { id: 1, title: 'Completed Projects', value: '150+' },
          { id: 2, title: 'Properties Sold', value: '1800+' },
          { id: 3, title: 'Happy Families', value: '1200+' },
          { id: 4, title: 'Industry Awards', value: '25+' }
        ]);
      });

    // 2. Fetch properties for slideshow
    axios.get(`${API_BASE_URL}/api/home/data`)
      .then(res => {
        if (res.data && res.data.featured && res.data.featured.length > 0) {
          setProperties(res.data.featured);
        } else {
          // Fallback static high quality properties
          setProperties([
            {
              id: 1,
              title: 'The Grand Sterling Residency',
              location: 'Manhattan, New York',
              price: 3450000,
              no_of_bedrooms: 4,
              no_of_bathrooms: 4.5,
              area: 3200,
              type: { name: 'Penthouse' },
              images: [{ image_path: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' }]
            },
            {
              id: 2,
              title: 'Elysium Smart Eco-Villa',
              location: 'Beverly Hills, Los Angeles',
              price: 5200000,
              no_of_bedrooms: 5,
              no_of_bathrooms: 6,
              area: 5500,
              type: { name: 'Villa' },
              images: [{ image_path: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' }]
            },
            {
              id: 3,
              title: 'Horizon Waterfront Condo',
              location: 'Miami Beach, Florida',
              price: 1850000,
              no_of_bedrooms: 3,
              no_of_bathrooms: 3,
              area: 2100,
              type: { name: 'Condo' },
              images: [{ image_path: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80' }]
            }
          ]);
        }
      })
      .catch(() => {
        setProperties([
          {
            id: 1,
            title: 'The Grand Sterling Residency',
            location: 'Manhattan, New York',
            price: 3450000,
            no_of_bedrooms: 4,
            no_of_bathrooms: 4.5,
            area: 3200,
            type: { name: 'Penthouse' },
            images: [{ image_path: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' }]
          },
          {
            id: 2,
            title: 'Elysium Smart Eco-Villa',
            location: 'Beverly Hills, Los Angeles',
            price: 5200000,
            no_of_bedrooms: 5,
            no_of_bathrooms: 6,
            area: 5500,
            type: { name: 'Villa' },
            images: [{ image_path: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' }]
          },
          {
            id: 3,
            title: 'Horizon Waterfront Condo',
            location: 'Miami Beach, Florida',
            price: 1850000,
            no_of_bedrooms: 3,
            no_of_bathrooms: 3,
            area: 2100,
            type: { name: 'Condo' },
            images: [{ image_path: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80' }]
          }
        ]);
      });

    // 3. Fetch visionary team dynamically
    axios.get(`${API_BASE_URL}/api/team-members`)
      .then(res => {
        setTeamMembers(res.data);
      })
      .catch(err => {
        console.error('Error fetching team members:', err);
      });
  }, []);

  return (
    <div className="about-us-container">
      <SEO
        title={`About Us | ${COMPANY_INFO.name}`}
        description={`${COMPANY_INFO.seoDescription}`}
        keywords={`${COMPANY_INFO.seoKeywords}`}
        image="/images/logo.png"
      />
      {/* ─── 1. Hero Company Vision Section ──────────────────────────────── */}
      <section className="vision-hero">
        <div className="vision-content">
          <span className="vision-subtitle">Our Vision</span>
          <h1 className="vision-title">Redefining Spaces. Elevating Lives.</h1>
          <p className="vision-text">
            "To be the most trusted, innovative, and customer-centric real estate partner, crafting architectural masterpieces and enabling prosperous communities through transparent, state-of-the-art property solutions."
          </p>
        </div>
      </section>

      {/* ─── 2. Fun Facts Section ────────────────────────────────────────── */}
      <section className="funfacts-section">
        <span className="section-tag">Our Achievements</span>
        <h2 className="section-title">Antigravity In Numbers</h2>
        <div className="funfacts-grid">
          {funfacts.map((fact) => (
            <div className="funfact-card" key={fact.id}>
              <div className="funfact-icon-wrapper">
                <StarIcon fontSize="large" />
              </div>
              <div className="funfact-value">
                <AnimatedCounter targetString={fact.value || '0'} />
              </div>
              <div className="funfact-title">{fact.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 3. Nice Photos of Properties Slideshow ────────────────────────── */}
      <section className="properties-slideshow-section">
        <span className="section-tag">Featured Landmarks</span>
        <h2 className="section-title">Architectural Showpieces</h2>
        <div className="slideshow-container">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="featured-swiper"
          >
            {properties.map((property) => {
              const image = property.images?.[0]?.image_path || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80';
              const fullImagePath = image.startsWith('http') ? image : `${API_BASE_URL}/${image}`;
              return (
                <SwiperSlide key={property.id}>
                  <div className="property-slide-card">
                    <div className="property-slide-image">
                      <span className="property-slide-badge">{property.type?.name || 'Luxury'}</span>
                      <img src={fullImagePath} alt={property.title} />
                      <span className="property-slide-price">
                        ${property.price ? property.price.toLocaleString() : 'P.O.A.'}
                      </span>
                    </div>
                    <div className="property-slide-info">
                      <h3 className="property-slide-title">{property.title}</h3>
                      <div className="property-slide-location">
                        <LocationIcon fontSize="small" />
                        <span>{property.location}</span>
                      </div>
                      <div className="property-slide-details">
                        <div className="property-detail-item">
                          <BedIcon fontSize="small" />
                          <span>{property.no_of_bedrooms} Beds</span>
                        </div>
                        <div className="property-detail-item">
                          <BathIcon fontSize="small" />
                          <span>{property.no_of_bathrooms} Baths</span>
                        </div>
                        <div className="property-detail-item">
                          <AreaIcon fontSize="small" />
                          <span>{property.area} sqft</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>

      {/* ─── 4. Key Quality Features of Real Estate ────────────────────────── */}
      <section className="quality-features-section">
        <span className="section-tag">Quality Framework</span>
        <h2 className="section-title">Built On Absolute Standards</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-box"><VerifiedIcon /></div>
            <div className="feature-content">
              <h4>Premium Architectural Design</h4>
              <p>Merging modernist functional designs with organic architecture to deliver timeless, high-aesthetic masterpieces.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-box"><EcoIcon /></div>
            <div className="feature-content">
              <h4>Sustainability Standards</h4>
              <p>Embodying net-zero emissions practices, sustainable high-quality materials, and efficient water harvesting systems.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-box"><SmartIcon /></div>
            <div className="feature-content">
              <h4>Smart Home Automation</h4>
              <p>Seamlessly integrated centralized controls, intelligent climate monitoring, and automated high-security lockouts.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-box"><LocationIcon /></div>
            <div className="feature-content">
              <h4>Prime Strategic Localities</h4>
              <p>Choosing premium micro-markets with outstanding connectivity, continuous capital appreciation, and immediate convenience.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-box"><PoolIcon /></div>
            <div className="feature-content">
              <h4>State-of-the-Art Amenities</h4>
              <p>Lush infinity swimming pools, fully equipped fitness spaces, and tranquil private relaxation gardens.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-box"><IntegrityIcon /></div>
            <div className="feature-content">
              <h4>Structural & Legal Integrity</h4>
              <p>Comprehensive seismic durability standards, absolute regulatory compliance, and fully verified title deeds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. Why Are We Different ─────────────────────────────────────── */}
      <section className="different-section">
        <div className="different-container">
          <div className="different-image-panel">
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" alt="Why We Are Different" />
            <div className="different-experience-badge">
              <h3>10+</h3>
              <p>Years of Legacy</p>
            </div>
          </div>
          <div className="different-content-panel">
            <span className="section-tag" style={{ textAlign: 'left' }}>The Antigravity Edge</span>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '20px' }}>Why Are We Different?</h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: '1.8' }}>
              Unlike traditional brokerage operations, we function as asset advisory experts. We marry deep analytical insights with architectural passion to unlock unparalleled investment options.
            </p>
            <div className="diff-list">
              <div className="diff-item">
                <div className="diff-num">1</div>
                <div className="diff-info">
                  <h5>Absolute Transparency</h5>
                  <p>Zero hidden broker commissions, complete transparency in title checks, and escrowed legal document management.</p>
                </div>
              </div>
              <div className="diff-item">
                <div className="diff-num">2</div>
                <div className="diff-info">
                  <h5>Tailored Personalization</h5>
                  <p>Our algorithms and consultants match properties to your exact design taste and lifestyle parameters, not just size.</p>
                </div>
              </div>
              <div className="diff-item">
                <div className="diff-num">3</div>
                <div className="diff-info">
                  <h5>Data-Driven Valuations</h5>
                  <p>Advanced statistical evaluations ensure you invest at the mathematically perfect valuation point.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Our Evolution Timeline (Tree Year & Photos) ───────────────── */}
      <section className="evolution-section">
        <span className="section-tag">Our Timeline</span>
        <h2 className="section-title">The Evolution Tree</h2>
        <div className="timeline">
          <div className="timeline-container left">
            <div className="timeline-card">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80" alt="2020 Genesis" className="timeline-img" />
              <div className="timeline-body">
                <span className="timeline-year">2020</span>
                <h4>The Genesis</h4>
                <p>We began our operations with just five design and engineering enthusiasts in a small, cozy co-working space. Our core goal was to build a digitized, completely friction-free search layout for home buyers.</p>
              </div>
            </div>
          </div>
          <div className="timeline-container right">
            <div className="timeline-card">
              <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=500&q=80" alt="2022 Breaking Ground" className="timeline-img" />
              <div className="timeline-body">
                <span className="timeline-year">2022</span>
                <h4>Breaking Ground</h4>
                <p>Scaling our coverage across 5 premium metropolitan hubs. We branched out into smart home engineering, integrating comprehensive automation systems into all residential contracts.</p>
              </div>
            </div>
          </div>
          <div className="timeline-container left">
            <div className="timeline-card">
              <img src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=500&q=80" alt="2024 Eco Landmarks" className="timeline-img" />
              <div className="timeline-body">
                <span className="timeline-year">2024</span>
                <h4>Eco Landmarks</h4>
                <p>Delivered our flagship Net-Zero carbon architectural residence. We reached the milestone of enabling over 1,200 beautiful families to settle into premium smart apartments.</p>
              </div>
            </div>
          </div>
          <div className="timeline-container right">
            <div className="timeline-card">
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80" alt="2026 Global Horizons" className="timeline-img" />
              <div className="timeline-body">
                <span className="timeline-year">2026</span>
                <h4>Global Horizons & Beyond</h4>
                <p>Expanding our developments globally, deploying full-scale immersive Virtual Reality tours, and establishing international advisory desks for expat clients.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. The Visionary Team (Dynamic CRUD) ────────────────────────── */}
      <section className="team-section">
        <span className="section-tag">Visionary Leadership</span>
        <h2 className="section-title">Meet The Minds Behind</h2>
        <div className="team-grid">
          {teamMembers.filter(m => !m.isDeleted).sort((a, b) => a.order - b.order).map((member) => {
            const photo = member.photo || 'assets/images/agent/agent-1.jpg';
            const fullPhotoPath = photo.startsWith('http') || photo.startsWith('assets') ? photo : `${API_BASE_URL}/${photo}`;
            return (
              <div className="team-card" key={member.id}>
                <div className="team-photo-wrapper">
                  <img src={fullPhotoPath} alt={member.name} />
                  <div className="team-social-overlay">
                    <a href={member.facebook || '#'} className="team-social-btn"><FacebookIcon fontSize="small" /></a>
                    <a href={member.twitter || '#'} className="team-social-btn"><TwitterIcon fontSize="small" /></a>
                    <a href={member.linkedin || '#'} className="team-social-btn"><LinkedInIcon fontSize="small" /></a>
                    <a href={member.instagram || '#'} className="team-social-btn"><InstagramIcon fontSize="small" /></a>
                  </div>
                </div>
                <div className="team-info">
                  <h4 className="team-name">{member.name}</h4>
                  <span className="team-designation">{member.designation}</span>
                  <p className="team-bio">{member.bio || 'Co-crafting the future of next-generation premium smart homes.'}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
