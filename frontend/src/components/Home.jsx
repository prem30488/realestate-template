import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroSlider from './HeroSlider';
import Search from './Search';
import CityMap from './CityMap';
import Featured from './Featured';
import Latest from './Latest';
import WhyUs from './WhyUsFixed';
import OurServices from './OurServices';
import FunFact from './FunFact';
import OurBrokers from './OurBrokers';
import InstagramVideoCarousel from './InstagramVideoCarousel';
import LatestNews from './LatestNews';
import Testimonials from './Testimonials';
import OurBrands from './OurBrands';

import { API_BASE_URL } from '../constants';

const componentMap = {
  HeroSlider,
  Search,
  CityMap,
  Featured,
  Latest,
  WhyUs,
  OurServices,
  FunFact,
  OurBrokers,
  InstagramVideoCarousel,
  LatestNews,
  Testimonials,
  OurBrands
};

const Home = ({ onSelectNews }) => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/home-components`)
      .then(res => setComponents(res.data))
      .catch(err => console.error('Error fetching home components:', err));
  }, []);

  if (components.length === 0) {
    return (
      <>
        <HeroSlider />
        <Search />
        <CityMap />
        <Featured />
        <Latest />
        <WhyUs />
        <OurServices />
        <FunFact />
        <OurBrokers />
        <InstagramVideoCarousel />
        <LatestNews onSelectNews={onSelectNews} />
        <Testimonials />
        <OurBrands />
      </>
    );
  }

  return (
    <>
      {components.map(comp => {
        const Component = componentMap[comp.name];
        if (!Component) return null;

        const props = comp.name === 'LatestNews' ? { onSelectNews } : {};

        return <Component key={comp.id} {...props} />;
      })}
    </>
  );
};

export default Home;
