import React, { useEffect } from 'react';

const Search = () => {
  useEffect(() => {
    let intervalId;
    const initSearchPlugins = () => {
      if (window.$) {
        if (window.$.fn.niceSelect) {
          window.$('.nice-select').niceSelect();
        }
        if (window.$.fn.slider && window.$('#search-price-range').length) {
          const $searchPriceRange = window.$('#search-price-range');
          // Check if already initialized to avoid re-init bugs
          if (!$searchPriceRange.hasClass('ui-slider')) {
            $searchPriceRange.slider({
              range: true,
              min: 0,
              max: 100000,
              values: [12500, 75000],
              slide: function (event, ui) {
                $searchPriceRange.find('.ui-slider-handle:eq(0)').html('<span>' + '$' + ui.values[0] + '</span>');
                $searchPriceRange.find('.ui-slider-handle:eq(1)').html('<span>' + '$' + ui.values[1] + '</span>');
              }
            });
            $searchPriceRange.find('.ui-slider-handle:eq(0)').html('<span>' + '$' + $searchPriceRange.slider("values", 0) + '</span>');
            $searchPriceRange.find('.ui-slider-handle:eq(1)').html('<span>' + '$' + $searchPriceRange.slider("values", 1) + '</span>');
          }
        }
        clearInterval(intervalId);
      }
    };

    intervalId = setInterval(initSearchPlugins, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="search-section section pt-100 pt-lg-80 pt-md-70 pt-sm-60 pt-xs-50 pb-100 pb-lg-80 pb-md-70 pb-sm-60 pb-xs-50">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-30">
            <div className="section-title text-center">
              <h1>Find Your <span>Dream Home</span></h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="property-search">
              <form action="#">
                <div className="row">


                  <div className="col-lg-3 col-md-6 col-12 mb-25">
                    <div className="search-item">
                      <div className="icon"></div>
                      <input type="text" placeholder="location" />
                    </div>
                  </div>


                  <div className="col-lg-3 col-md-6 col-12 mb-25">
                    <div className="search-item">
                      <select className="nice-select" title="city">
                        <option value="1">Any City</option>
                        <option value="2">New Delhi</option>
                        <option value="3">Mumbai</option>
                        <option value="4">Bangaluru</option>
                        <option value="5">Hyderabad</option>
                        <option value="6">Gurugram</option>
                        <option value="7">Gandhinagar</option>
                        <option value="8">Ahmedabad</option>
                        <option value="9">Surat</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 col-12 mb-25">
                    <div className="search-item">
                      <select className="nice-select" title="Property Type">
                        <option value="1">Any Type</option>
                        <option value="2">Apartment</option>
                        <option value="3">House</option>
                        <option value="4">Commercial</option>
                        <option value="5">Garage</option>
                        <option value="6">Villa</option>
                        <option value="7">Penthouse</option>
                        <option value="8">Townhouse</option>
                        <option value="9">Duplex</option>
                        <option value="10">Studio</option>
                        <option value="11">Restaurent</option>
                        <option value="12">Office</option>
                        <option value="13">Shop</option>
                        <option value="14">Showroom</option>
                        <option value="15">Hotel</option>
                        <option value="16">Building</option>
                        <option value="17">Agriculture</option>
                        <option value="18">Industry</option>
                        <option value="19">Farm House</option>
                        <option value="20">Factory</option>
                        <option value="21">Godown</option>
                        <option value="22">Warehouse</option>
                        <option value="23">Shop-cum-Office</option>

                      </select>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 col-12 mb-25">
                    <div className="search-item">
                      <select className="nice-select" title="Status">
                        <option value="1">Any Status</option>
                        <option value="2">For Rent</option>
                        <option value="3">For Sale</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 col-12 mb-25">
                    <div className="search-item">
                      <select className="nice-select" title="Bedrooms">
                        <option value="1">Bedrooms</option>
                        <option value="2">1</option>
                        <option value="3">2</option>
                        <option value="4">3</option>
                        <option value="5">4</option>
                        <option value="6">5</option>
                        <option value="7">6</option>
                        <option value="8">7</option>
                        <option value="9">8</option>
                        <option value="10">9</option>
                        <option value="11">10+</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 col-12 mb-25">
                    <div className="search-item">
                      <select className="nice-select" title="Bathrooms">
                        <option value="1">Bathrooms</option>
                        <option value="2">1</option>
                        <option value="3">2</option>
                        <option value="4">3</option>
                        <option value="5">4</option>
                        <option value="6">5</option>
                        <option value="7">6</option>
                        <option value="8">7</option>
                        <option value="9">8</option>
                        <option value="10">9</option>
                        <option value="11">10+</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 col-12 mb-25">
                    <div className="search-item">
                      <h4 className="title">Price Range</h4>
                      <div id="search-price-range"></div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 col-12 mb-25 text-center">
                    <button className="btn w-100">Search</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
