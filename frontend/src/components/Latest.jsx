import React, { useEffect } from 'react';

const Latest = () => {
  useEffect(() => {
    let intervalId;
    const initCarousel = () => {
      if (window.$ && window.$.fn.slick) {
        const carousel = window.$('.property-carousel');
        if (!carousel.hasClass('slick-initialized')) {
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
        }
        clearInterval(intervalId);
      }
    };

    intervalId = setInterval(initCarousel, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="property-section section bg-gray pt-100 pt-lg-80 pt-md-70 pt-sm-60 pt-xs-50 pb-100 pb-lg-80 pb-md-70 pb-sm-60 pb-xs-50">
      <div className="container">

        <div className="row">
          <div className="col-md-12 mb-60 mb-xs-30">
            <div className="section-title center">
              <h1>Recently Added Properties</h1>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="property-carousel section slider-space-30">
            <div className="property-item col">
              <div className="property-inner">
                <div className="image">
                  <a href="single-properties.html"><img src="assets/images/property/property-1.jpg" alt="" /></a>
                  <ul className="property-feature">
                    <li>
                      <span className="area"><img src="assets/images/icons/area.png" alt="" />550 SqFt</span>
                    </li>
                    <li>
                      <span className="bed"><img src="assets/images/icons/bed.png" alt="" />6</span>
                    </li>
                    <li>
                      <span className="bath"><img src="assets/images/icons/bath.png" alt="" />4</span>
                    </li>
                    <li>
                      <span className="parking"><img src="assets/images/icons/parking.png" alt="" />3</span>
                    </li>
                  </ul>
                </div>
                <div className="content">
                  <div className="left">
                    <h3 className="title"><a href="single-properties.html">Miami</a></h3>
                    <span className="location"><img src="assets/images/icons/marker.png" alt="" />568 E 1st Ave, Miami</span>
                  </div>
                  <div className="right">
                    <div className="type-wrap">
                      <span className="price">$550<span>M</span></span>
                      <span className="type">For Rent</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="property-item col">
              <div className="property-inner">
                <div className="image">
                  <span className="label">Feature</span>
                  <a href="single-properties.html"><img src="assets/images/property/property-2.jpg" alt="" /></a>
                  <ul className="property-feature">
                    <li>
                      <span className="area"><img src="assets/images/icons/area.png" alt="" />550 SqFt</span>
                    </li>
                    <li>
                      <span className="bed"><img src="assets/images/icons/bed.png" alt="" />6</span>
                    </li>
                    <li>
                      <span className="bath"><img src="assets/images/icons/bath.png" alt="" />4</span>
                    </li>
                    <li>
                      <span className="parking"><img src="assets/images/icons/parking.png" alt="" />3</span>
                    </li>
                  </ul>
                </div>
                <div className="content">
                  <div className="left">
                    <h3 className="title"><a href="single-properties.html">Marvel de Villa</a></h3>
                    <span className="location"><img src="assets/images/icons/marker.png" alt="" />450 E 1st Ave, Ahmedabad</span>
                  </div>
                  <div className="right">
                    <div className="type-wrap">
                      <span className="price">$2550</span>
                      <span className="type">For Sale</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="property-item col">
              <div className="property-inner">
                <div className="image">
                  <span className="label">popular</span>
                  <a href="single-properties.html"><img src="assets/images/property/property-3.jpg" alt="" /></a>
                  <ul className="property-feature">
                    <li>
                      <span className="area"><img src="assets/images/icons/area.png" alt="" />550 SqFt</span>
                    </li>
                    <li>
                      <span className="bed"><img src="assets/images/icons/bed.png" alt="" />6</span>
                    </li>
                    <li>
                      <span className="bath"><img src="assets/images/icons/bath.png" alt="" />4</span>
                    </li>
                    <li>
                      <span className="parking"><img src="assets/images/icons/parking.png" alt="" />3</span>
                    </li>
                  </ul>
                </div>
                <div className="content">
                  <div className="left">
                    <h3 className="title"><a href="single-properties.html">Ruposi Bangla Cottage</a></h3>
                    <span className="location"><img src="assets/images/icons/marker.png" alt="" />215 L AH Rod, California</span>
                  </div>
                  <div className="right">
                    <div className="type-wrap">
                      <span className="price">$550<span>M</span></span>
                      <span className="type">For Rent</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="property-item col">
              <div className="property-inner">
                <div className="image">
                  <a href="single-properties.html"><img src="assets/images/property/property-4.jpg" alt="" /></a>
                  <ul className="property-feature">
                    <li>
                      <span className="area"><img src="assets/images/icons/area.png" alt="" />550 SqFt</span>
                    </li>
                    <li>
                      <span className="bed"><img src="assets/images/icons/bed.png" alt="" />6</span>
                    </li>
                    <li>
                      <span className="bath"><img src="assets/images/icons/bath.png" alt="" />4</span>
                    </li>
                    <li>
                      <span className="parking"><img src="assets/images/icons/parking.png" alt="" />3</span>
                    </li>
                  </ul>
                </div>
                <div className="content">
                  <div className="left">
                    <h3 className="title"><a href="single-properties.html">MayaKanon de Villa</a></h3>
                    <span className="location"><img src="assets/images/icons/marker.png" alt="" />12 EA 1st Ave, Washington</span>
                  </div>
                  <div className="right">
                    <div className="type-wrap">
                      <span className="price">$550<span>M</span></span>
                      <span className="type">For Rent</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="property-item col">
              <div className="property-inner">
                <div className="image">
                  <a href="single-properties.html"><img src="assets/images/property/property-5.jpg" alt="" /></a>
                  <ul className="property-feature">
                    <li>
                      <span className="area"><img src="assets/images/icons/area.png" alt="" />550 SqFt</span>
                    </li>
                    <li>
                      <span className="bed"><img src="assets/images/icons/bed.png" alt="" />6</span>
                    </li>
                    <li>
                      <span className="bath"><img src="assets/images/icons/bath.png" alt="" />4</span>
                    </li>
                    <li>
                      <span className="parking"><img src="assets/images/icons/parking.png" alt="" />3</span>
                    </li>
                  </ul>
                </div>
                <div className="content">
                  <div className="left">
                    <h3 className="title"><a href="single-properties.html">Azorex de South Villa</a></h3>
                    <span className="location"><img src="assets/images/icons/marker.png" alt="" />668 L 2nd Ave, Boston</span>
                  </div>
                  <div className="right">
                    <div className="type-wrap">
                      <span className="price">$2550</span>
                      <span className="type">For Sale</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="property-item col">
              <div className="property-inner">
                <div className="image">
                  <span className="label">Feature</span>
                  <a href="single-properties.html"><img src="assets/images/property/property-6.jpg" alt="" /></a>
                  <ul className="property-feature">
                    <li>
                      <span className="area"><img src="assets/images/icons/area.png" alt="" />550 SqFt</span>
                    </li>
                    <li>
                      <span className="bed"><img src="assets/images/icons/bed.png" alt="" />6</span>
                    </li>
                    <li>
                      <span className="bath"><img src="assets/images/icons/bath.png" alt="" />4</span>
                    </li>
                    <li>
                      <span className="parking"><img src="assets/images/icons/parking.png" alt="" />3</span>
                    </li>
                  </ul>
                </div>
                <div className="content">
                  <div className="left">
                    <h3 className="title"><a href="single-properties.html">Radison de Villa</a></h3>
                    <span className="location"><img src="assets/images/icons/marker.png" alt="" />12 1st Ave, New Yourk</span>
                  </div>
                  <div className="right">
                    <div className="type-wrap">
                      <span className="price">$550<span>M</span></span>
                      <span className="type">For Rent</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>


        </div>

      </div>
    </div>
  );
};

export default Latest;
