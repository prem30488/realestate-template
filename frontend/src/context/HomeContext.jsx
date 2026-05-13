import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useCity } from './CityContext';
import { API_BASE_URL } from '../constants';

const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const { selectedCity } = useCity();
  const [homeData, setHomeData] = useState({
    featured: [],
    latest: [],
    news: [],
    heroSliders: [],
    loading: true,
    error: null
  });

  const fetchHomeData = async () => {
    try {
      setHomeData(prev => ({ ...prev, loading: true }));
      const url = selectedCity 
        ? `${API_BASE_URL}/api/home/data?city=${encodeURIComponent(selectedCity)}`
        : `${API_BASE_URL}/api/home/data`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setHomeData({
        ...data,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching home data:', error);
      setHomeData(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load home data'
      }));
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, [selectedCity]);

  return (
    <HomeContext.Provider value={{ ...homeData, refreshData: fetchHomeData }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('useHome must be used within a HomeProvider');
  }
  return context;
};
