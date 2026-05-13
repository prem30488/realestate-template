import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { COMPANY_INFO } from '../constants/companyInfo';
import { API_BASE_URL } from '../constants';

const OurServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/services`);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (services.length === 0) return;

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
  }, [services]);

  return (
    <section className="our-services-section section" id="our-services">
      <style>{`
        .property-slider-2 .slick-dots {
          display: none !important;
        }
        .service-inner .icon img {
          width: 40px;
          height: 40px;
          object-fit: contain;
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
                    <a href="#" className="image"><img src="assets/images/property/property-13.jpg" alt="" /></a>
                    <div className="content">
                      <h4 className="title"><a href="#">Premium Service</a></h4>
                      <span className="location">Gandhinagar, Gujarat</span>
                      <h4 className="type">Explore <span><span>Now</span></span></h4>
                    </div>
                  </div>
                </div>
                <div className="property-2">
                  <div className="property-inner">
                    <a href="#" className="image"><img src="assets/images/property/property-14.jpg" alt="" /></a>
                    <div className="content">
                      <h4 className="title"><a href="#">Expert Advice</a></h4>
                      <span className="location">Ahmedabad, Gujarat</span>
                      <h4 className="type">Explore <span><span>Now</span></span></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-12">
              <div className="row row-20">
                {loading ? (
                  <div className="col-12 text-center">
                    <p>Loading services...</p>
                  </div>
                ) : services.length > 0 ? (
                  services.map((service) => (
                    <div key={service.id} className="col-md-6 col-12 mb-30">
                      <div className="service">
                        <div className="service-inner">
                          <div className="head">
                            <div className="icon">
                              {service.image ? (
                                <img src={service.image} alt={service.title} />
                              ) : (
                                <img src={`assets/images/service/service-${(service.id % 4) + 1}.png`} alt="" />
                              )}
                            </div>
                            <h4>{service.title}</h4>
                          </div>
                          <div className="content">
                            <p>{service.description || `${COMPANY_INFO.name} provides professional ${service.title} services for your real estate needs.`}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    {/* Fallback to static if no services in DB */}
                    <div className="col-md-6 col-12 mb-30">
                      <div className="service">
                        <div className="service-inner">
                          <div className="head">
                            <div className="icon"><img src="assets/images/service/service-1.png" alt="" /></div>
                            <h4>Buy Property</h4>
                          </div>
                          <div className="content">
                            <p>{COMPANY_INFO.name} - Expert guidance in finding and purchasing your dream property.</p>
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
                            <p>{COMPANY_INFO.name} - Maximize your returns with our strategic property selling services.</p>
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
                            <p>{COMPANY_INFO.name} - Seamless rental solutions for both landlords and tenants.</p>
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
                            <p>{COMPANY_INFO.name} - Helping you secure the best financing for your real estate investments.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
