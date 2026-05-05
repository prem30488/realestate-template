import React, { useEffect } from 'react';

const HeroSlider = () => {
  useEffect(() => {
    let intervalId;
    const initSlider = () => {
      if (window.$ && window.$.fn.slick) {
        const slider = window.$('.hero-slider');
        if (!slider.hasClass('slick-initialized')) {
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
        }
        clearInterval(intervalId);
      }
    };

    // Check every 100ms until jQuery and Slick are loaded
    intervalId = setInterval(initSlider, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="hero-slider section">
        <div className="hero-item" style={{ backgroundImage: "url(assets/images/hero/hero-1.jpg)" }}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="hero-property-content text-center">

                  <h1 className="title"><a href="single-properties.html">Friuli-Venezia Giulia</a></h1>
                  <span className="location"><img src="assets/images/icons/hero-marker.png" alt="real-estate" /> 568 E 1st Ave, Miami</span>
                  <div className="type-wrap">
                    <span className="type">For Rent</span>
                    <span className="price">$550 <span>Month</span></span>
                  </div>
                  <ul className="property-feature">
                    <li>
                      <img src="assets/images/icons/hero-area.png" alt="real-estate" /><span>550 SqFt</span>
                    </li>
                    <li>
                      <img src="assets/images/icons/hero-bed.png" alt="real-estate" /><span>6 Bed</span>
                    </li>
                    <li>
                      <img src="assets/images/icons/hero-bath.png" alt="real-estate" /><span>4 Bath</span>
                    </li>
                    <li>
                      <img src="assets/images/icons/hero-parking.png" alt="real-estate" /><span>3 Garage</span>
                    </li>
                  </ul>


                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="hero-item" style={{ backgroundImage: "url(assets/images/hero/hero-3.jpg)" }}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="hero-property-content text-center">

                  <h1 className="title"><a href="single-properties.html">Friuli-Venezia Giulia</a></h1>
                  <span className="location"><img src="assets/images/icons/marker.png" alt="real-estate" /><img src="assets/images/icons/hero-marker.png" alt="real-estate" /> 568 E 1st Ave, Miami</span>
                  <div className="type-wrap">
                    <span className="type">For Rent</span>
                    <span className="price">$550 <span>Month</span></span>
                  </div>
                  <ul className="property-feature">
                    <li>
                      <img src="assets/images/icons/hero-area.png" alt="real-estate-img" /><span>550 SqFt</span>
                    </li>
                    <li>
                      <img src="assets/images/icons/hero-bed.png" alt="real-estate-img" /><span>6 Bed</span>
                    </li>
                    <li>
                      <img src="assets/images/icons/hero-bath.png" alt="real-estate-img" /><span>4 Bath</span>
                    </li>
                    <li>
                      <img src="assets/images/icons/hero-parking.png" alt="real-estate-img" /><span>3 Garage</span>
                    </li>
                  </ul>


                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default HeroSlider;
