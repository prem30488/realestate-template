import React from 'react';
import './OurBrokers.css';

const brokers = [
  {
    name: 'Donald S. Jenkins',
    role: 'Real Estate Agent',
    image: 'assets/images/agent/agent-1.jpg',
    phone: '+012 345 678 102',
    email: 'donald@example.com',
    social: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      google: '#',
    }
  },
  {
    name: 'Elizaeth J. Ohara',
    role: 'Real Estate Agent',
    image: 'assets/images/agent/agent-2.jpg',
    phone: '+012 345 678 102',
    email: 'elizaeth@example.com',
    social: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      google: '#',
    }
  },
  {
    name: 'Marilyn M. Gills',
    role: 'Real Estate Agent',
    image: 'assets/images/agent/agent-3.jpg',
    phone: '+012 345 678 102',
    email: 'marilyn@example.com',
    social: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      google: '#',
    }
  },
  {
    name: 'Robert C. Edwards',
    role: 'Real Estate Agent',
    image: 'assets/images/agent/agent-4.jpg',
    phone: '+012 345 678 102',
    email: 'robert@example.com',
    social: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      google: '#',
    }
  },
];

const OurBrokers = () => {
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
          {brokers.map((broker, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-12 mb-30">
              <div className="premium-broker-card">
                <div className="broker-image">
                  <img src={broker.image} alt={broker.name} />
                  <div className="broker-social">
                    <a href={broker.social.facebook} className="facebook"><i className="fa fa-facebook"></i></a>
                    <a href={broker.social.twitter} className="twitter"><i className="fa fa-twitter"></i></a>
                    <a href={broker.social.linkedin} className="linkedin"><i className="fa fa-linkedin"></i></a>
                    <a href={broker.social.google} className="google"><i className="fa fa-google-plus"></i></a>
                  </div>
                </div>
                <div className="broker-content">
                  <h4 className="name">{broker.name}</h4>
                  <span className="role">{broker.role}</span>
                  <div className="contact-info">
                    <p><i className="fa fa-phone"></i> {broker.phone}</p>
                    <p><i className="fa fa-envelope-o"></i> {broker.email}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurBrokers;
