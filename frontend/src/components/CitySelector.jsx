import React, { useState } from 'react';
import './CitySelector.css';
import { useCity } from '../context/CityContext';

const CitySelector = () => {
  const { selectedCity, setSelectedCity } = useCity();
  const [isOpen, setIsOpen] = useState(false);

  const cities = {
    nearby: ['Gandhinagar', 'Ahmedabad', 'Vadodara', 'Surat', 'Rajkot', 'Anand', 'Nadiad', 'Mehsana'],
    popular: [
      'Ahmedabad', 'Bangalore', 'Chennai', 'New Delhi', 'Mumbai',
      'Pune', 'Hyderabad', 'Kolkata', 'Jaipur', 'Lucknow',
      'Noida', 'Gurgaon', 'Thane', 'Indore', 'Bhopal'
    ],
    others: [
      'Agra', 'Amritsar', 'Chandigarh', 'Coimbatore', 'Dehradun',
      'Gwalior', 'Jabalpur', 'Jodhpur', 'Kanpur', 'Kochi',
      'Madurai', 'Mysore', 'Nagpur', 'Nashik', 'Patna',
      'Raipur', 'Ranchi', 'Solapur', 'Udaipur', 'Varanasi',
      'Visakhapatnam', 'Vijayawada'
    ]
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setIsOpen(false);
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
