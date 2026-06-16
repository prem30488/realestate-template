import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
            <div className="footer-widget col-lg-2 col-md-6 col-12 mb-40">
              <img src={COMPANY_INFO.logoUrl} alt={COMPANY_INFO.name} style={{ maxWidth: '150px' }} />
              <p style={{ fontSize: '13px', lineHeight: '20px', marginTop: '15px' }}>{COMPANY_INFO.name} - {COMPANY_INFO.seoDescription}</p>
              <div className="footer-social">
                <a href="#" className="facebook"><i className="fa fa-facebook"></i></a>
                <a href="#" className="twitter"><i className="fa fa-twitter"></i></a>
                <a href="#" className="linkedin"><i className="fa fa-linkedin"></i></a>
                <a href="https://www.instagram.com/njrealestate_gandhinagar?igsh=aW9hYTh2Y2I1bWpv" className="instagram"><i className="fa fa-instagram"></i></a>
              </div>
            </div>
            <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
              <h4 className="title"><span className="text">Contact us</span><span className="shape"></span></h4>
              <ul style={{ fontSize: '13px' }}>
                <li><i className="fa fa-map-o"></i><span>{COMPANY_INFO.address1}, {COMPANY_INFO.address2}</span></li>
                <li><i className="fa fa-phone"></i><span><a href={`tel:${COMPANY_INFO.phone1}`}>{COMPANY_INFO.phone1}</a>{COMPANY_INFO.phone2 && <><br /><a href={`tel:${COMPANY_INFO.phone2}`}>{COMPANY_INFO.phone2}</a></>}</span></li>
                <li><i className="fa fa-envelope-o"></i><span><a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a><br /><a href={COMPANY_INFO.websiteUrl}>{COMPANY_INFO.websiteUrl.replace(/^https?:\/\//, '')}</a></span></li>
              </ul>
            </div>
            <div className="footer-widget col-lg-2 col-md-6 col-12 mb-40">
              <h4 className="title"><span className="text">Useful links</span><span className="shape"></span></h4>
              <ul style={{ fontSize: '13px' }}>
                <li><Link to="/terms">Terms & Conditions</Link></li>
                <li><Link to="/rental-terms">Rental Terms</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              </ul>
            </div>

            <div className="footer-widget col-lg-2 col-md-6 col-12 mb-40">
              <h4 className="title"><span className="text">Newsletter</span><span className="shape"></span></h4>
              <p style={{ fontSize: '13px', lineHeight: '20px' }}>Subscribe for latest news & offers.</p>
              <form id="mc-form" className="mc-form footer-newsletter" onSubmit={handleSubscribe}>
                <input
                  id="mc-email"
                  type="email"
                  autoComplete="off"
                  placeholder="Email.."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  style={{ padding: '8px 15px' }}
                />
                <button id="mc-submit" disabled={loading} style={{ width: '40px' }}><i className="fa fa-paper-plane-o"></i></button>
              </form>
            </div>

            <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
              <h4 className="title"><span className="text">Our Location</span><span className="shape"></span></h4>
              <div className="footer-map" style={{ borderRadius: '10px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', height: '350px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7335.152012005944!2d72.633916!3d23.18567!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2b3b77cbbfc7%3A0x41648348fe2e2da9!2sN.%20J.%20Property%20realestate!5e0!3m2!1sen!2sin!4v1781602133263!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
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
