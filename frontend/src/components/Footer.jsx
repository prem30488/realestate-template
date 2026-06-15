import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../constants';
import { COMPANY_INFO } from '../constants/companyInfo';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}/api/newsletter/subscribe`, { email });
      toast.success(res.data.message || 'Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error subscribing to newsletter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer-section section" style={{ backgroundImage: 'url(assets/images/bg/footer-bg.jpg)' }}>
      <div className="footer-top section pt-100 pt-lg-80 pt-md-70 pt-sm-60 pt-xs-50 pb-60 pb-lg-40 pb-md-30 pb-sm-20 pb-xs-10">
        <div className="container">
          <div className="row row-25">
            <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
              <img src={COMPANY_INFO.logoUrl} alt={COMPANY_INFO.name} />
              <p>{COMPANY_INFO.name} - {COMPANY_INFO.seoDescription}</p>
              <div className="footer-social">
                <a href="#" className="facebook"><i className="fa fa-facebook"></i></a>
                <a href="#" className="twitter"><i className="fa fa-twitter"></i></a>
                <a href="#" className="linkedin"><i className="fa fa-linkedin"></i></a>
                <a href="https://www.instagram.com/njrealestate_gandhinagar?igsh=aW9hYTh2Y2I1bWpv" className="instagram"><i className="fa fa-instagram"></i></a>
                <a href="#" className="google"><i className="fa fa-google-plus"></i></a>
                <a href="#" className="pinterest"><i className="fa fa-pinterest-p"></i></a>
              </div>
            </div>
            <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
              <h4 className="title"><span className="text">Contact us</span><span className="shape"></span></h4>
              <ul>
                <li><i className="fa fa-map-o"></i><span>{COMPANY_INFO.address1}, {COMPANY_INFO.address2}</span></li>
                <li><i className="fa fa-phone"></i><span><a href={`tel:${COMPANY_INFO.phone1}`}>{COMPANY_INFO.phone1}</a>{COMPANY_INFO.phone2 && <a href={`tel:${COMPANY_INFO.phone2}`}>{COMPANY_INFO.phone2}</a>}</span></li>
                <li><i className="fa fa-envelope-o"></i><span><a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a><a href={COMPANY_INFO.websiteUrl}>{COMPANY_INFO.websiteUrl.replace(/^https?:\/\//, '')}</a></span></li>
              </ul>
            </div>
            <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
              <h4 className="title"><span className="text">Useful links</span><span className="shape"></span></h4>
              <ul>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Rental Terms of use</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>

            <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
              <h4 className="title"><span className="text">Newsletter</span><span className="shape"></span></h4>

              <p>Subscribe our newsletter and get all latest news about our latest properties, promotions, offers and discount</p>

              <form id="mc-form" className="mc-form footer-newsletter" onSubmit={handleSubscribe}>
                <input
                  id="mc-email"
                  type="email"
                  autoComplete="off"
                  placeholder="Email Here.."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
                <button id="mc-submit" disabled={loading}><i className="fa fa-paper-plane-o"></i></button>
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
                <p>Copyright &copy;{new Date().getFullYear()} <a href="/">{COMPANY_INFO.name}</a>. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </footer>
  );
};

export default Footer;
