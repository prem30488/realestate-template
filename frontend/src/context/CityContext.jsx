import React, { createContext, useState, useContext, useEffect } from 'react';

const CityContext = createContext();

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
};

export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCityState] = useState(() => {
    const savedCity = localStorage.getItem('selectedCity');
    return savedCity || 'Gandhinagar';
  });

  const setSelectedCity = (city) => {
    setSelectedCityState(city);
    localStorage.setItem('selectedCity', city);
  };

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};
