import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OurBrokers.css';
import { COMPANY_INFO } from '../constants/companyInfo';
import { API_BASE_URL } from '../constants';

const OurBrokers = () => {
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/brokers`);
        setBrokers(response.data);
      } catch (error) {
        console.error('Error fetching brokers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrokers();
  }, []);

  return (
    <section className="brokers-section section pt-100 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-60">
            <div className="section-title center">
              <h1 className="premium-heading">Our Expert <span>Brokers</span></h1>
              <div className="premium-heading-divider"></div>
              <p className="premium-subheading">Our team of dedicated professionals is here to guide you through every step of your real estate journey.</p>
            </div>
          </div>
        </div>

        <div className="row">
          {loading ? (
            <div className="col-12 text-center">
              <p>Loading brokers...</p>
            </div>
          ) : brokers.length > 0 ? (
            brokers.map((broker, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-12 mb-30">
                <div className="premium-broker-card">
                  <div className="broker-image">
                    <img src={broker.photo || 'assets/images/agent/agent-1.jpg'} alt={broker.name} />
                    <div className="broker-social">
                      <a href={broker.facebook || '#'} className="facebook"><i className="fa fa-facebook"></i></a>
                      <a href={broker.twitter || '#'} className="twitter"><i className="fa fa-twitter"></i></a>
                      <a href={broker.linkedin || '#'} className="linkedin"><i className="fa fa-linkedin"></i></a>
                      <a href={broker.instagram || '#'} className="instagram"><i className="fa fa-instagram"></i></a>
                    </div>
                  </div>
                  <div className="broker-content">
                    <h4 className="name">{broker.name}</h4>
                    <span className="role">{broker.designation || 'Real Estate Agent'}</span>
                    <div className="contact-info">
                      <p><i className="fa fa-phone"></i> {broker.phoneNumber || COMPANY_INFO.phone1}</p>
                      <p><i className="fa fa-envelope-o"></i> {broker.email || 'contact@realestate.com'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No brokers found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurBrokers;
