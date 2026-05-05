import React, { useEffect } from 'react';
import './OurBrands.css';

const brands = [
  { id: 1, image: 'assets/images/brands/brand-1.png' },
  { id: 2, image: 'assets/images/brands/brand-2.png' },
  { id: 3, image: 'assets/images/brands/brand-3.png' },
  { id: 4, image: 'assets/images/brands/brand-4.png' },
  { id: 5, image: 'assets/images/brands/brand-5.png' },
  { id: 6, image: 'assets/images/brands/brand-6.png' },
];

const OurBrands = () => {
  useEffect(() => {
    let intervalId;
    const initSlider = () => {
      if (window.$ && window.$.fn.slick) {
        const slider = window.$('.brand-carousel');
        if (slider.hasClass('slick-initialized')) {
          slider.slick('unslick');
        }
        slider.slick({
          arrows: false,
          dots: false,
          autoplay: true,
          autoplaySpeed: 3000,
          slidesToShow: 5,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 4,
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
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
    };

    intervalId = setInterval(initSlider, 100);
    return () => clearInterval(intervalId);
  }, []);

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
                  <img src={brand.image} alt={`Partner ${brand.id}`} />
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
