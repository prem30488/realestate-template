import React, { useEffect } from 'react';

const OurServices = () => {
  useEffect(() => {
    let intervalId;
    const initSlider = () => {
      if (window.$ && window.$.fn.slick) {
        const slider = window.$('.property-slider-2');
        if (slider.hasClass('slick-initialized')) {
          slider.slick('unslick');
        }
        slider.slick({
          arrows: false,
          dots: false,
          autoplay: true,
          autoplaySpeed: 5000,
          slidesToShow: 1,
          slidesToScroll: 1,
        });
        clearInterval(intervalId);
      }
    };

    // Check every 100ms until jQuery and Slick are loaded
    intervalId = setInterval(initSlider, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="our-services-section section" id="our-services">
      <style>{`
        .property-slider-2 .slick-dots {
          display: none !important;
        }
      `}</style>
      <div className="service-section section pt-100 pt-lg-80 pt-md-70 pt-sm-60 pt-xs-50 pb-70 pb-lg-50 pb-md-40 pb-sm-30 pb-xs-20">
        <div className="container">


          <div className="row">
            <div className="col-md-12 mb-60 mb-xs-30">
              <div className="section-title center">
                <h1>Our Services</h1>
              </div>
            </div>
          </div>


          <div className="row row-30 align-items-center">
            <div className="col-lg-5 col-12 mb-30">
              <div className="property-slider-2">
                <div className="property-2">
                  <div className="property-inner">
                    <a href="single-properties.html" className="image"><img src="assets/images/property/property-13.jpg" alt="" /></a>
                    <div className="content">
                      <h4 className="title"><a href="single-properties.html">Friuli-Venezia Giulia</a></h4>
                      <span className="location">568 E 1st Ave, Miami</span>
                      <h4 className="type">Rent <span>$550 <span>Month</span></span></h4>
                      <ul>
                        <li>6 Bed</li>
                        <li>4 Bath</li>
                        <li>3 Garage</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="property-2">
                  <div className="property-inner">
                    <a href="single-properties.html" className="image"><img src="assets/images/property/property-14.jpg" alt="" /></a>
                    <div className="content">
                      <h4 className="title"><a href="single-properties.html">Marvel de Villa</a></h4>
                      <span className="location">450 E 1st Ave, New Jersey</span>
                      <h4 className="type">Rent <span>$550 <span>Month</span></span></h4>
                      <ul>
                        <li>6 Bed</li>
                        <li>4 Bath</li>
                        <li>3 Garage</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-12">
              <div className="row row-20">


                <div className="col-md-6 col-12 mb-30">
                  <div className="service">
                    <div className="service-inner">
                      <div className="head">
                        <div className="icon"><img src="assets/images/service/service-1.png" alt="" /></div>
                        <h4>Buy Property</h4>
                      </div>
                      <div className="content">
                        <p>Khonike - Real Estate Bootstrap 5 Template best theme for elit, seddo eiumod tempor dolor sit.</p>
                      </div>
                    </div>
                  </div>
                </div>



                <div className="col-md-6 col-12 mb-30">
                  <div className="service">
                    <div className="service-inner">
                      <div className="head">
                        <div className="icon"><img src="assets/images/service/service-2.png" alt="" /></div>
                        <h4>Sale Property</h4>
                      </div>
                      <div className="content">
                        <p>Khonike - Real Estate Bootstrap 5 Template best theme for elit, seddo eiumod tempor dolor sit.</p>
                      </div>
                    </div>
                  </div>
                </div>



                <div className="col-md-6 col-12 mb-30">
                  <div className="service">
                    <div className="service-inner">
                      <div className="head">
                        <div className="icon"><img src="assets/images/service/service-3.png" alt="" /></div>
                        <h4>Rent Property</h4>
                      </div>
                      <div className="content">
                        <p>Khonike - Real Estate Bootstrap 5 Template best theme for elit, seddo eiumod tempor dolor sit.</p>
                      </div>
                    </div>
                  </div>
                </div>



                <div className="col-md-6 col-12 mb-30">
                  <div className="service">
                    <div className="service-inner">
                      <div className="head">
                        <div className="icon"><img src="assets/images/service/service-4.png" alt="" /></div>
                        <h4>Mortgage Property</h4>
                      </div>
                      <div className="content">
                        <p>Khonike - Real Estate Bootstrap 5 Template best theme for elit, seddo eiumod tempor dolor sit.</p>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurServices;
