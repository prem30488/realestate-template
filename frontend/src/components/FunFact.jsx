import React, { useEffect, useRef, useState } from 'react';

const FunFact = () => {

  return (
    <div className="funfact-section section pt-100 pt-lg-80 pt-md-70 pt-sm-60 pt-xs-50 pb-70 pb-lg-50 pb-md-40 pb-sm-30 pb-xs-20" style={{ backgroundImage: "url(assets/images/bg/cta-bg.jpg)" }}>
      <div className="container">
        <div className="row">

          <div className="single-fact col-lg-3 col-6 mb-30">
            <div className="inner">
              <div className="head">
                <i className="pe-7s-home"></i>
                <h3 className="counter">56</h3>
              </div>
              <p>Complete Project</p>
            </div>
          </div>

          <div className="single-fact col-lg-3 col-6 mb-30">
            <div className="inner">
              <div className="head">
                <i className="pe-7s-graph3"></i>
                <h3 className="counter">35+</h3>
              </div>
              <p>Property Sold</p>
            </div>
          </div>

          <div className="single-fact col-lg-3 col-6 mb-30">
            <div className="inner">
              <div className="head">
                <i className="pe-7s-users"></i>
                <h3 className="counter">25+</h3>
              </div>
              <p>Happy Clients</p>
            </div>
          </div>

          <div className="single-fact col-lg-3 col-6 mb-30">
            <div className="inner">
              <div className="head">
                <i className="pe-7s-medal"></i>
                <h3 className="counter">5+</h3>
              </div>
              <p>Awards Win</p>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default FunFact;
