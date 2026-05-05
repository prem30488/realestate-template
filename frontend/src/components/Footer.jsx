import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-section section" style={{ backgroundImage: 'url(assets/images/bg/footer-bg.jpg)' }}>
      <div className="footer-top section pt-100 pt-lg-80 pt-md-70 pt-sm-60 pt-xs-50 pb-60 pb-lg-40 pb-md-30 pb-sm-20 pb-xs-10">
        <div className="container">
          <div className="row row-25">
            <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
              <img src="assets/images/logo-footer.png" alt="" />
              <p>Khonike - Real Estate Bootstrap 5 Templatethe best theme for elit, sed do to eiumod tempor dolor sit amet, ctetur adipiscing elit seddo dolor sit amet.</p>
              <div className="footer-social">
                <a href="#" className="facebook"><i className="fa fa-facebook"></i></a>
                <a href="#" className="twitter"><i className="fa fa-twitter"></i></a>
                <a href="#" className="linkedin"><i className="fa fa-linkedin"></i></a>
                <a href="#" className="google"><i className="fa fa-google-plus"></i></a>
                <a href="#" className="pinterest"><i className="fa fa-pinterest-p"></i></a>
              </div>
            </div>
            <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
              <h4 className="title"><span className="text">Contact us</span><span className="shape"></span></h4>
              <ul>
                <li><i className="fa fa-map-o"></i><span>256, 1st AVE, Manchester 125 , Noth England</span></li>
                <li><i className="fa fa-phone"></i><span><a href="#">+012 345 678 102</a><a href="#">+012 345 678 101</a></span></li>
                <li><i className="fa fa-envelope-o"></i><span><a href="#">info@example.com</a><a href="#">www.example.com</a></span></li>
              </ul>
            </div>
            <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
              <h4 className="title"><span className="text">Useful links</span><span className="shape"></span></h4>
              <ul>
                <li><a href="#">Rental Builidngs</a></li>
                <li><a href="#">Browe all Categories</a></li>
                <li><a href="#">Top Mortagages Rates</a></li>
                <li><a href="#">RentalTerms of use</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>

            <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
              <h4 className="title"><span className="text">Newsletter</span><span className="shape"></span></h4>

              <p>Subscribe our newsletter and get all latest news about our latest properties, promotions, offers and discount</p>

              <form id="mc-form" className="mc-form footer-newsletter" >
                <input id="mc-email" type="email" autoComplete="off" placeholder="Email Here.." />
                <button id="mc-submit"><i className="fa fa-paper-plane-o"></i></button>
              </form>
              <div className="mailchimp-alerts text-centre">
                <div className="mailchimp-submitting"></div>
                <div className="mailchimp-success"></div>
                <div className="mailchimp-error"></div>
              </div>

            </div>

          </div>
        </div>
      </div>
      <div className="footer-bottom section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="copyright text-center">
                <p>Copyright &copy;2025 <a href="#">Khonike</a>. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </footer>
  );
};

export default Footer;
