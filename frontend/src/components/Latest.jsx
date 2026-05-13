import React, { useEffect } from 'react';
import { useHome } from '../context/HomeContext';

const Latest = () => {
  const { latest, loading } = useHome();

  useEffect(() => {
    let intervalId;
    const initCarousel = () => {
      if (window.$ && window.$.fn.slick) {
        const carousel = window.$('.property-carousel');
        if (carousel.hasClass('slick-initialized')) {
          carousel.slick('unslick');
        }
        carousel.slick({
          infinite: true,
          arrows: true,
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          prevArrow: '<button class="slick-prev"><i class="fa fa-angle-left"></i></button>',
          nextArrow: '<button class="slick-next"><i class="fa fa-angle-right"></i></button>',
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              }
            }
          ]
        });
        clearInterval(intervalId);
      }
    };

    if (!loading && latest.length > 0) {
      intervalId = setInterval(initCarousel, 100);
    }
    return () => clearInterval(intervalId);
  }, [loading, latest]);

  if (loading) return null;

  return (
    <div className="property-section section bg-gray pt-100 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-60">
            <div className="section-title center">
              <h1>Recently Added Properties</h1>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="property-carousel section slider-space-30">
            {latest.map((property) => (
              <div key={property.id} className="property-item col">
                <div className="property-inner">
                  <div className="image">
                    <a href="#">
                      <img src={property.images?.[0]?.imageUrl || 'assets/images/property/property-1.jpg'} alt={property.title} />
                    </a>
                    <ul className="property-feature">
                      <li>
                        <span className="area"><img src="assets/images/icons/area.png" alt="" />{property.area} SqFt</span>
                      </li>
                      <li>
                        <span className="bed"><img src="assets/images/icons/bed.png" alt="" />{property.no_of_bedrooms}</span>
                      </li>
                      <li>
                        <span className="bath"><img src="assets/images/icons/bath.png" alt="" />{property.no_of_bathrooms}</span>
                      </li>
                      <li>
                        <span className="parking"><img src="assets/images/icons/parking.png" alt="" />{property.no_of_garage}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="content">
                    <div className="left">
                      <h3 className="title"><a href="#">{property.title}</a></h3>
                      <span className="location"><img src="assets/images/icons/marker.png" alt="" />{property.location}</span>
                    </div>
                    <div className="right">
                      <div className="type-wrap">
                        <span className="price" style={{ backgroundColor: "yellow", color: "blue", borderRadius: "4px", fontSize: "0.8rem" }}>${property.price.toLocaleString()}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="type">{property.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Latest;
