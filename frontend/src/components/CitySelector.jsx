import React, { useState, useEffect } from 'react';
import './CitySelector.css';
import { useCity } from '../context/CityContext';
import { API_BASE_URL } from '../constants';

const CitySelector = () => {
  const { selectedCity, setSelectedCity } = useCity();
  const [isOpen, setIsOpen] = useState(false);
  const [cities, setCities] = useState({
    nearby: [],
    popular: [],
    others: []
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/cities`);
        const data = await response.json();
        
        const grouped = {
          nearby: data.filter(c => c.isNearby).map(c => c.name),
          popular: data.filter(c => c.isPopular).map(c => c.name),
          others: data.filter(c => !c.isNearby && !c.isPopular).map(c => c.name)
        };
        
        setCities(grouped);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    
    fetchCities();
  }, []);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <li className="city-selector-wrapper">
      <div className={`city-selector ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span className="selected-city">
          <i className="pe-7s-map-marker"></i> {selectedCity}
          <i className={`pe-7s-angle-down arrow ${isOpen ? 'up' : ''}`}></i>
        </span>
      </div>

      {isOpen && (
        <div className="city-dropdown-mega">
          <div className="city-dropdown-content">
            <div className="city-header">
              <i className="pe-7s-map-marker"></i> INDIA
            </div>

            <div className="city-sections">
              <div className="city-section">
                <h4>Nearby Cities</h4>
                <ul>
                  {cities.nearby.map(city => (
                    <li key={city} onClick={() => handleCitySelect(city)}>{city}</li>
                  ))}
                </ul>
              </div>

              <div className="city-section">
                <h4>Popular Cities</h4>
                <ul className="grid-cols">
                  {cities.popular.map(city => (
                    <li key={city} onClick={() => handleCitySelect(city)}>{city}</li>
                  ))}
                </ul>
              </div>

              <div className="city-section full-width">
                <h4>Other Cities</h4>
                <ul className="grid-cols-many">
                  {cities.others.map(city => (
                    <li key={city} onClick={() => handleCitySelect(city)}>{city}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="dropdown-overlay" onClick={() => setIsOpen(false)}></div>
        </div>
      )}
    </li>
  );
};

export default CitySelector;
