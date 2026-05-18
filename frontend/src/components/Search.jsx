import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCity } from '../context/CityContext';
import { API_BASE_URL } from '../constants';

const Search = () => {
  const { selectedCity } = useCity();
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);

  const [filters, setFilters] = useState({
    location: '',
    city: '',
    type: '',
    status: '',
    bedrooms: '',
    bathrooms: '',
  });

  // Pre-fill city from CityContext whenever selectedCity changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, city: selectedCity }));
  }, [selectedCity]);

  // Fetch cities and property types from API
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cities`)
      .then(r => r.json())
      .then(data => setCities(data))
      .catch(() => {});

    fetch(`${API_BASE_URL}/api/property-types`)
      .then(r => r.json())
      .then(data => setPropertyTypes(data))
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.location) params.set('search', filters.location);
    if (filters.city)     params.set('city', filters.city);
    if (filters.type)     params.set('type', filters.type);
    if (filters.status)   params.set('status', filters.status);
    if (filters.bedrooms) params.set('bedrooms', filters.bedrooms);
    if (filters.bathrooms) params.set('bathrooms', filters.bathrooms);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="search-section section pt-100 pt-lg-80 pt-md-70 pt-sm-60 pt-xs-50 pb-100 pb-lg-80 pb-md-70 pb-sm-60 pb-xs-50">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-30">
            <div className="section-title text-center">
              <h1>Find Your <span>Dream Home</span></h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="property-search">
              <form onSubmit={handleSearch}>
                <div className="row">

                  {/* Location Text */}
                  <div className="col-lg-3 col-md-6 col-12 mb-25">
                    <div className="search-item">
                      <div className="icon"></div>
                      <input
                        type="text"
                        name="location"
                        placeholder="Location / Title"
                        value={filters.location}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* City — pre-filled from CityContext */}
                  <div className="col-lg-3 col-md-6 col-12 mb-25">
                    <div className="search-item">
                      <select
                        name="city"
                        value={filters.city}
                        onChange={handleChange}
                        style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '15px', color: '#666', cursor: 'pointer' }}
                      >
                        <option value="">Any City</option>
                        {cities.length > 0
                          ? cities.map(c => (
                              <option key={c.id} value={c.name}>{c.name}</option>
                            ))
                          : (
                            // Fallback static list if API not available
                            <>
                              <option value="Gandhinagar">Gandhinagar</option>
                              <option value="Ahmedabad">Ahmedabad</option>
                              <option value="Surat">Surat</option>
                              <option value="Mumbai">Mumbai</option>
                              <option value="New Delhi">New Delhi</option>
                              <option value="Bengaluru">Bengaluru</option>
                              <option value="Hyderabad">Hyderabad</option>
                              <option value="Gurugram">Gurugram</option>
                            </>
                          )
                        }
                      </select>
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="col-lg-3 col-md-6 col-12 mb-25">
                    <div className="search-item">
                      <select
                        name="type"
                        value={filters.type}
                        onChange={handleChange}
                        style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '15px', color: '#666', cursor: 'pointer' }}
                      >
                        <option value="">Any Type</option>
                        {propertyTypes.length > 0
                          ? propertyTypes.map(t => (
                              <option key={t.id} value={t.id}>{t.name}</option>
                            ))
                          : (
                            <>
                              <option value="1">Apartment</option>
                              <option value="2">House</option>
                              <option value="3">Commercial</option>
                              <option value="5">Villa</option>
                              <option value="11">Office</option>
                              <option value="16">Plot</option>
                            </>
                          )
                        }
                      </select>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-lg-3 col-md-6 col-12 mb-25">
                    <div className="search-item">
                      <select
                        name="status"
                        value={filters.status}
                        onChange={handleChange}
                        style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '15px', color: '#666', cursor: 'pointer' }}
                      >
                        <option value="">Any Status</option>
                        <option value="Rent">For Rent</option>
                        <option value="Sell">For Sale</option>
                      </select>
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div className="col-lg-3 col-md-6 col-12 mb-25">
                    <div className="search-item">
                      <select
                        name="bedrooms"
                        value={filters.bedrooms}
                        onChange={handleChange}
                        style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '15px', color: '#666', cursor: 'pointer' }}
                      >
                        <option value="">Bedrooms</option>
                        {[1,2,3,4,5,6,7,8,9].map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                        <option value="10">10+</option>
                      </select>
                    </div>
                  </div>

                  {/* Bathrooms */}
                  <div className="col-lg-3 col-md-6 col-12 mb-25">
                    <div className="search-item">
                      <select
                        name="bathrooms"
                        value={filters.bathrooms}
                        onChange={handleChange}
                        style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '15px', color: '#666', cursor: 'pointer' }}
                      >
                        <option value="">Bathrooms</option>
                        {[1,2,3,4,5,6,7,8,9].map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                        <option value="10">10+</option>
                      </select>
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="col-lg-3 col-md-6 col-12 mb-25 text-center" style={{ display: 'flex', alignItems: 'center' }}>
                    <button type="submit" className="btn w-100">Search</button>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
