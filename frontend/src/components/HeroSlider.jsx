import React, { useEffect } from 'react';
import { useHome } from '../context/HomeContext';

const HeroSlider = () => {
  const { heroSliders, loading } = useHome();

  useEffect(() => {
    let intervalId;
    const initSlider = () => {
      if (window.$ && window.$.fn.slick) {
        const slider = window.$('.hero-slider');
        if (slider.hasClass('slick-initialized')) {
          slider.slick('unslick');
        }
        slider.slick({
          infinite: true,
          autoplay: true,
          autoplaySpeed: 5000,
          fade: false,
          dots: false,
          prevArrow: '<button class="slick-prev"><i class="fa fa-angle-left"></i></button>',
          nextArrow: '<button class="slick-next"><i class="fa fa-angle-right"></i></button>',
          responsive: [
            {
              breakpoint: 992,
              settings: {
                dots: true,
                arrows: false,
              }
            },
          ]
        });
        clearInterval(intervalId);
      }
    };

    if (!loading && heroSliders.length > 0) {
      intervalId = setInterval(initSlider, 100);
    }
    return () => clearInterval(intervalId);
  }, [loading, heroSliders]);

  if (loading) return <div className="hero-section section" style={{ height: '600px', background: '#1a1a1a' }}></div>;

  return (
    <>
      <div className="hero-slider section">
        {heroSliders.map((slide, index) => (
          <div key={index} className="hero-item" style={{ backgroundImage: `url(${slide.image})` }}>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="hero-property-content text-center">
                    <h1 className="title"><a href={slide.link || "#"}>{slide.title}</a></h1>
                    <span className="location">
                      <img src="assets/images/icons/hero-marker.png" alt="real-estate" /> {slide.location}
                    </span>
                    <div className="type-wrap">
                      <span className="type">{slide.type}</span>
                      <span className="price">{slide.price} {slide.priceUnit && <span>{slide.priceUnit}</span>}</span>
                    </div>
                    <ul className="property-feature">
                      <li>
                        <img src="assets/images/icons/hero-area.png" alt="real-estate" /><span>{slide.area}</span>
                      </li>
                      {slide.beds && (
                        <li>
                          <img src="assets/images/icons/hero-bed.png" alt="real-estate" /><span>{slide.beds} Bed</span>
                        </li>
                      )}
                      {slide.baths && (
                        <li>
                          <img src="assets/images/icons/hero-bath.png" alt="real-estate" /><span>{slide.baths} Bath</span>
                        </li>
                      )}
                      {slide.garage !== undefined && (
                        <li>
                          <img src="assets/images/icons/hero-parking.png" alt="real-estate" /><span>{slide.garage} Garage</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HeroSlider;
