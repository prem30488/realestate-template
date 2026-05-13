import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import './OurBrands.css';

const staticBrands = [
  { id: 's1', image: 'assets/images/brands/brand-1.png' },
  { id: 's2', image: 'assets/images/brands/brand-2.png' },
  { id: 's3', image: 'assets/images/brands/brand-3.png' },
  { id: 's4', image: 'assets/images/brands/brand-4.png' },
  { id: 's5', image: 'assets/images/brands/brand-5.png' },
  { id: 's6', image: 'assets/images/brands/brand-6.png' },
];

const OurBrands = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/brands`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setBrands(res.data);
        } else {
          setBrands(staticBrands);
        }
      })
      .catch(err => {
        console.error('Error fetching brands:', err);
        setBrands(staticBrands);
      });
  }, []);

  useEffect(() => {
    let intervalId;
    const initSlider = () => {
      if (window.$ && window.$.fn.slick) {
        const slider = window.$('.brand-carousel');
        if (slider.hasClass('slick-initialized')) {
          slider.slick('unslick');
        }
        if (brands.length > 0) {
          slider.slick({
            arrows: false,
            dots: false,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: Math.min(5, brands.length),
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: Math.min(4, brands.length),
                }
              },
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: Math.min(3, brands.length),
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: Math.min(2, brands.length),
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                }
              }
            ]
          });
          clearInterval(intervalId);
        }
      }
    };

    intervalId = setInterval(initSlider, 100);
    return () => clearInterval(intervalId);
  }, [brands]);

  return (
    <section className="brands-section section pb-100">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-50">
            <div className="section-title center">
              <h1 className="premium-heading">Trusted <span>Partners</span></h1>
              <div className="premium-heading-divider"></div>
            </div>
          </div>
        </div>
        
        <div className="brand-carousel-wrapper">
          <div className="brand-carousel">
            {brands.map((brand) => (
              <div key={brand.id} className="brand-item">
                <div className="brand-inner">
                  <img src={brand.image} alt={brand.name || 'Partner'} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurBrands;
