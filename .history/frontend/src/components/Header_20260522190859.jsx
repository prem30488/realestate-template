import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import axios from 'axios';

import CitySelector from './CitySelector';
import { useCity } from '../context/CityContext';
import { COMPANY_INFO } from '../constants/companyInfo';
import { API_BASE_URL } from '../constants';

// Replace {city} placeholder with the selected city
const interpolate = (text, city) => (text || '').replace(/\{city\}/g, city);

// ── Render a link item ───────────────────────────────────────────────────────
const NavLink = ({ item, city, onClickClose }) => {
  const link = interpolate(item.link, city);
  const isInternal = link.startsWith('/');

  const handleClick = () => {
    if (onClickClose) onClickClose();
  };

  return (
    <li onClick={handleClick}>
      {isInternal ? (
        <Link to={link}>
          {interpolate(item.title, city)}
          {item.badge && <span className={`badge-${item.badge.toLowerCase()}`}>{item.badge}</span>}
        </Link>
      ) : (
        <a href={link}>
          {interpolate(item.title, city)}
          {item.badge && <span className={`badge-${item.badge.toLowerCase()}`}>{item.badge}</span>}
        </a>
      )}
    </li>
  );
};

// ── Render one mega-menu column (a section heading + its children) ──────────
const MegaMenuColumn = ({ section, city, onClickClose }) => {
  const isPropertyType = section.title.toLowerCase().includes('property type');

  return (
    <div className={`mega-menu-column ${isPropertyType ? 'column-wide' : ''}`}>
      <h6>{interpolate(section.title, city)}</h6>
      <ul className={isPropertyType ? 'grid-2-cols' : ''}>
        {(section.children || []).map(link => (
          <NavLink key={link.id} item={link} city={city} onClickClose={onClickClose} />
        ))}
      </ul>
    </div>
  );
};

// ── Render a top-level nav item ──────────────────────────────────────────────
const NavItem = ({ item, city, onClickClose }) => {
  const hasChildren = item.children && item.children.length > 0;
  const hasDropdown = item.menuType === 'mega' || item.menuType === 'sub';
  const link = interpolate(item.link, city);
  const isInternal = link.startsWith('/');

  const titleContent = (
    <>
      {interpolate(item.title, city)}
      {item.badge && <span className={`badge-${item.badge.toLowerCase()}`}>{item.badge}</span>}
      {hasDropdown && <i className="pe-7s-angle-down" />}
    </>
  );

  const titleEl = isInternal ? (
    <Link to={link} onClick={onClickClose}>{titleContent}</Link>
  ) : (
    <a href={link} onClick={onClickClose}>{titleContent}</a>
  );

  if (!hasChildren || !hasDropdown) {
    return <li>{titleEl}</li>;
  }

  // Mega menu — children are section headings, each with link children
  if (item.menuType === 'mega') {
    return (
      <li className="has-mega-menu">
        {titleEl}
        <div className="mega-menu">
          {item.children.map(section =>
            section.itemType === 'section' ? (
              <MegaMenuColumn key={section.id} section={section} city={city} onClickClose={onClickClose} />
            ) : (
              // Direct link in mega menu (no section wrapper)
              <div className="mega-menu-column" key={section.id}>
                <ul><NavLink item={section} city={city} onClickClose={onClickClose} /></ul>
              </div>
            )
          )}
        </div>
      </li>
    );
  }

  // Sub menu — children are flat links or section labels
  if (item.menuType === 'sub') {
    return (
      <li className="has-sub-menu">
        {titleEl}
        <ul className="sub-menu">
          {item.children.map(child =>
            child.itemType === 'section' ? (
              <li key={child.id} className="header-item">
                &nbsp;&nbsp;{interpolate(child.title, city)}
              </li>
            ) : (
              <NavLink key={child.id} item={child} city={city} onClickClose={onClickClose} />
            )
          )}
        </ul>
      </li>
    );
  }

  return <li>{titleEl}</li>;
};

// ── Static fallback nav (original hardcoded menu) ────────────────────────────
const StaticNav = ({ selectedCity, user, onLogout, onLoginClick }) => (
  <>
    {/* Buy Menu */}
    <li className="has-mega-menu"><Link to="/properties?status=Sell">Buy <i className="pe-7s-angle-down" /></Link>
      <div className="mega-menu">
        <div className="mega-menu-column">
          <h6>Popular Choices</h6>
          <ul>
            <li><Link to={`/properties?status=Sell&city=${selectedCity}`}>Ready to Move</Link></li>
            <li><Link to={`/properties?status=Sell&postedBy=owner&city=${selectedCity}`}>Owner Properties</Link></li>
            <li><Link to={`/properties?status=Sell&maxPrice=5000000&city=${selectedCity}`}>Budget Homes</Link></li>
            <li><Link to={`/properties?status=Sell&minPrice=10000000&city=${selectedCity}`}>Premium Homes</Link></li>
            <li><Link to={`/properties?status=Sell&orderBy=updatedAt&order=DESC&city=${selectedCity}`}>Newly Launched <span className="badge-new">NEW</span></Link></li>
          </ul>
        </div>
        <div className="mega-menu-column">
          <h6>Property Types</h6>
          <ul>
            <li><Link to={`/properties?type=1&status=Sell&city=${selectedCity}`}>Flats in {selectedCity}</Link></li>
            <li><Link to={`/properties?type=2&status=Sell&city=${selectedCity}`}>House for sale in {selectedCity}</Link></li>
            <li><Link to={`/properties?type=5&status=Sell&city=${selectedCity}`}>Villa in {selectedCity}</Link></li>
            <li><Link to={`/properties?type=16&status=Sell&city=${selectedCity}`}>Plot in {selectedCity}</Link></li>
            <li><Link to={`/properties?type=11&status=Sell&city=${selectedCity}`}>Office Space in {selectedCity}</Link></li>
            <li><Link to={`/properties?type=3&status=Sell&city=${selectedCity}`}>Commercial Space in {selectedCity}</Link></li>
          </ul>
        </div>
        <div className="mega-menu-column">
          <h6>Budget</h6>
          <ul>
            <li><Link to="/properties?maxPrice=5000000&status=Sell">Under ₹ 50 Lac</Link></li>
            <li><Link to="/properties?minPrice=5000000&maxPrice=10000000&status=Sell">₹ 50 Lac - ₹ 1 Cr</Link></li>
            <li><Link to="/properties?minPrice=10000000&maxPrice=15000000&status=Sell">₹ 1 Cr - ₹ 1.5 Cr</Link></li>
            <li><Link to="/properties?minPrice=15000000&status=Sell">Above ₹ 1.5 Cr</Link></li>
          </ul>
        </div>
        <div className="mega-menu-column">
          <h6>Explore</h6>
          <ul>
            <li><Link to={`/builders/${selectedCity}`}>Builders in {selectedCity}</Link></li>
            <li><Link to={`/localities/${selectedCity}`}>Localities in {selectedCity}</Link></li>
            <li><Link to={`/projects/${selectedCity}`}>Projects in {selectedCity}</Link></li>
            <li><Link to={`/brokers?city=${selectedCity}`}>Find an Agent in {selectedCity}</Link></li>
          </ul>
        </div>
        <div className="mega-menu-column column-wide">
          <h6>Buying Tools</h6>
          <ul>
            <li><a href="#">Propworth</a></li>
            <li><a href="#">Rates &amp; Trends</a></li>
            <li><a href="#">Buy vs Rent</a></li>
            <li><Link to="/news">Tips and Guides</Link></li>
          </ul>
        </div>
      </div>
    </li>

    {/* Rent Menu */}
    <li className="has-mega-menu"><Link to="/properties?status=Rent">Rent <i className="pe-7s-angle-down" /></Link>
      <div className="mega-menu">
        <div className="mega-menu-column">
          <h6>Popular Choices</h6>
          <ul>
            <li><Link to={`/properties?status=Rent&postedBy=owner&city=${selectedCity}`}>Owner Properties</Link></li>
            <li><Link to={`/properties?status=Rent&city=${selectedCity}`}>Verified Properties</Link></li>
            <li><Link to={`/properties?status=Rent&city=${selectedCity}`}>Furnished Homes</Link></li>
            <li><Link to={`/properties?status=Rent&city=${selectedCity}`}>Bachelor Friendly Homes</Link></li>
            <li><Link to={`/properties?status=Rent&city=${selectedCity}`}>Immediately Available</Link></li>
          </ul>
        </div>
        <div className="mega-menu-column">
          <h6>Property Type</h6>
          <ul>
            <li><Link to={`/properties?type=1&city=${selectedCity}&status=Rent`}>Flat for rent in {selectedCity}</Link></li>
            <li><Link to={`/properties?type=2&city=${selectedCity}&status=Rent`}>House for rent in {selectedCity}</Link></li>
            <li><Link to={`/properties?type=5&city=${selectedCity}&status=Rent`}>Villa for rent in {selectedCity}</Link></li>
            <li><Link to={`/properties?type=1&city=${selectedCity}&status=Rent`}>PG in {selectedCity}</Link></li>
            <li><Link to={`/properties?type=11&city=${selectedCity}&status=Rent`}>Office Space in {selectedCity}</Link></li>
            <li><Link to={`/properties?type=3&city=${selectedCity}&status=Rent`}>Commercial Space in {selectedCity}</Link></li>
            <li><Link to={`/properties?type=1&city=${selectedCity}&status=Rent`}>Coliving Space in {selectedCity}</Link></li>
            <li><Link to={`/properties?type=1&city=${selectedCity}&status=Rent`}>Student Hostels in {selectedCity}</Link></li>
          </ul>
        </div>
        <div className="mega-menu-column">
          <h6>Budget</h6>
          <ul>
            <li><Link to="/properties?maxPrice=10000&status=Rent">Under ₹ 10,000</Link></li>
            <li><Link to="/properties?minPrice=10000&maxPrice=15000&status=Rent">₹ 10,000 - ₹ 15,000</Link></li>
            <li><Link to="/properties?minPrice=15000&maxPrice=25000&status=Rent">₹ 15,000 - ₹ 25,000</Link></li>
            <li><Link to="/properties?minPrice=25000&status=Rent">Above ₹ 25,000</Link></li>
          </ul>
        </div>
        <div className="mega-menu-column">
          <h6>Explore</h6>
          <ul>
            <li><Link to={`/localities/${selectedCity}`}>Localities</Link></li>
            <li><a href="#">Buy Vs Rent</a></li>
            <li><Link to={`/brokers?city=${selectedCity}`}>Find an Agent in {selectedCity}</Link></li>
            <li><a href="#">Share Requirement</a></li>
          </ul>
        </div>
      </div>
    </li>

    {/* Sell Menu */}
    <li className="has-mega-menu"><a href="#">Sell <i className="pe-7s-angle-down" /></a>
      <div className="mega-menu mega-menu-sell">
        <div className="mega-menu-column">
          <h6>For Owner</h6>
          <ul>
            <li><Link to="/my-properties">Post Property <span className="badge-free">FREE</span></Link></li>
            <li><Link to="/dashboard">My Dashboard</Link></li>
          </ul>
          <div className="mega-menu-footer">
            <p className="footer-title">Sell / Rent Ad Packages</p>
            <p className="footer-sub">{COMPANY_INFO.phone1} / {COMPANY_INFO.email}</p>
          </div>
        </div>
        <div className="mega-menu-column">
          <h6>For Agent &amp; Builder</h6>
          <ul>
            <li><Link to="/dashboard">My Dashboard</Link></li>
            <li><a href="#">Ad Packages</a></li>
            <li><a href="#">iAdvantage</a></li>
            <li><a href="#">Developer Lounge</a></li>
            <li><a href="#">Sales Enquiry</a></li>
          </ul>
        </div>
        <div className="mega-menu-column">
          <h6>Selling Tools</h6>
          <ul>
            <li><a href="#">Property Valuation</a></li>
            <li><Link to="/brokers">Find an Agent</Link></li>
            <li><a href="#">Rates and Trends</a></li>
          </ul>
        </div>
      </div>
    </li>

    <li><a href="#">Home Loans <span className="badge-new">NEW</span> <i className="pe-7s-angle-down" /></a></li>

    <li className="has-sub-menu"><a href="#">Home Interiors <span className="badge-new">NEW</span> <i className="pe-7s-angle-down" /></a>
      <ul className="sub-menu">
        <li className="header-item">&nbsp;&nbsp;Explore our services</li>
        <li><a href="#">Home Interior Design Services</a></li>
        <li><a href="#">Design Consultation</a></li>
        <li><a href="#">Full Home Interior Cost Calculator</a></li>
        <li><a href="#">Kitchen/Wardrobe Calculator</a></li>
      </ul>
    </li>

    <li><Link to="/about">About Us</Link></li>
    <li><Link to="/contact">Contact Us</Link></li>

    <li className="has-sub-menu"><a href="#">Help <i className="pe-7s-angle-down" /></a>
      <ul className="sub-menu">
        <li><a href="#">Help Center</a></li>
        <li><a href="#">Sales Enquiry</a></li>
        <li><a href="#">Chat with Us</a></li>
      </ul>
    </li>
  </>
);

// ── Main Header component ────────────────────────────────────────────────────
const Header = ({ onLoginClick, user, onLogout }) => {
  const { selectedCity } = useCity();
  const [isSticky, setIsSticky] = useState(false);
  const [menuItems, setMenuItems] = useState(null); // null = loading, [] = failed/empty

  // Sticky scroll
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch dynamic menu
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/menu`)
      .then(res => setMenuItems(res.data))
      .catch(() => setMenuItems([])); // on error fall back to static
  }, []);

  const useDynamic = menuItems && menuItems.length > 0;

  return (
    <>
      <header className={`header header-sticky ${isSticky ? 'is-sticky' : ''}`} style={{ width: '100%' }}>
        <div className="header-bottom menu-center" style={{ width: '100%' }}>
          <div className="container-fluid px-4 px-xl-5" style={{ width: '100%' }}>
            <div className="row justify-content-between align-items-center" style={{ width: '100%' }}>

              {/* Logo */}
              <div className="col-auto">
                <div className="logo">
                  <a href="/"><img src={COMPANY_INFO.logoUrl} alt={COMPANY_INFO.name} /></a>
                </div>
              </div>

              {/* Navigation */}
              <div className="col d-none d-lg-flex justify-content-center">
                <nav className="main-menu">
                  <ul className="d-flex align-items-center">
                    <CitySelector />

                    {useDynamic
                      ? menuItems.map(item => (
                        <NavItem key={item.id} item={item} city={selectedCity} />
                      ))
                      : <StaticNav selectedCity={selectedCity} user={user} onLogout={onLogout} onLoginClick={onLoginClick} />
                    }

                    {/* Admin Panel (always shown for admins regardless of menu DB) */}
                    {(user?.role === 'admin' || user?.role === 'superadmin') && (
                      <li className="has-mega-menu admin-menu">
                        <a href="#" className="admin-link">
                          Admin Panel <span className="badge-admin">ADMIN</span> <i className="pe-7s-angle-down" />
                        </a>
                        <div className="mega-menu mega-menu-admin">
                          <div className="mega-menu-column">
                            <h6>Core Management</h6>
                            <ul>
                              <li><a href="/admin/home"><i className="pe-7s-home" /> Home Manager</a></li>
                              <li><a href="/admin/menu"><i className="pe-7s-menu" /> Menu Manager</a></li>
                              <li><a href="/admin/slider"><i className="pe-7s-photo-gallery" /> Slider Manager</a></li>
                              <li><a href="/admin/search"><i className="pe-7s-search" /> Search Manager</a></li>
                            </ul>
                          </div>
                          <div className="mega-menu-column">
                            <h6>Content Management</h6>
                            <ul>
                              <li><a href="/admin/properties"><i className="pe-7s-map-marker" /> Properties Manager</a></li>
                              <li><a href="/admin/services"><i className="pe-7s-tools" /> Our Service Manager</a></li>
                              <li><a href="/admin/funfacts"><i className="pe-7s-graph1" /> FunFact Manager</a></li>
                              <li><a href="/admin/brokers"><i className="pe-7s-users" /> Broker Manager</a></li>
                            </ul>
                          </div>
                          <div className="mega-menu-column">
                            <h6>Social &amp; Feedback</h6>
                            <ul>
                              <li><a href="/admin/insta"><i className="pe-7s-video" /> Insta Video Manager</a></li>
                              <li><a href="/admin/news"><i className="pe-7s-news-paper" /> News Manager</a></li>
                              <li><a href="/admin/testimonials"><i className="pe-7s-comment" /> Testimonials Manager</a></li>
                              <li><a href="/admin/brands"><i className="pe-7s-medal" /> Brand Manager</a></li>
                            </ul>
                          </div>
                          <div className="mega-menu-column">
                            <h6>System</h6>
                            <ul>
                              <li><a href="/admin/users"><i className="pe-7s-id" /> Privilege/User Manager</a></li>
                              <li><a href="/admin/settings"><i className="pe-7s-config" /> System Settings</a></li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>

              {/* User account */}
              <div className="col-auto ms-auto pe-0 d-none d-lg-block" style={{ float: 'right' }}>
                <div className="header-user">
                  {user ? (
                    <div className="account-menu">
                      <div className="account-toggle">
                        <div className="profile-photo">{user.username.charAt(0).toUpperCase()}</div>
                        <span className="user-name">{user.username}</span>
                        <i className="pe-7s-angle-down" />
                      </div>
                      <ul className="account-dropdown">
                        <li>
                          <Link to="/notifications">
                            <i className="pe-7s-bell" /> Notifications
                            <span className="count">3</span>
                          </Link>
                        </li>
                        <hr />
                        <li className="dropdown-header">
                          <span>&nbsp;&nbsp;My Activity</span>
                          <div className="header-line" />
                        </li>
                        <li><Link to="/dashboard"><i className="pe-7s-graph1" /> Dashboard</Link></li>
                        <li><Link to="/my-properties"><i className="pe-7s-map-marker" /> My Properties</Link></li>
                        <li><Link to="/viewed-properties"><i className="pe-7s-look" /> Viewed Properties</Link></li>
                        <li><Link to="/shortlist"><i className="pe-7s-star" /> Shortlisted Properties</Link></li>
                        <li><a href="#"><i className="pe-7s-search" /> Searches</a></li>
                        <hr />
                        <li><Link to="/profile"><i className="pe-7s-id" /> My Profile</Link></li>
                        <li><Link to="/settings"><i className="pe-7s-config" /> Settings</Link></li>
                        <hr />
                        <li>
                          <a href="#" onClick={e => { e.preventDefault(); onLogout(); }}>
                            <i className="pe-7s-power" /> Logout
                          </a>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <a href="#" className="user-toggle" onClick={e => { e.preventDefault(); onLoginClick(); }}>
                      <i className="pe-7s-user" /><span>Login or Register</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 d-flex d-lg-none">
                <div className="mobile-menu" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
