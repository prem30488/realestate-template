import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './OurBrokers.css';
import { COMPANY_INFO } from '../constants/companyInfo';
import { API_BASE_URL } from '../constants';

const OurBrokers = () => {
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/brokers?limit=10`);
        // Support both paginated { brokers: [...] } and flat array responses
        const data = response.data?.brokers || response.data || [];
        setBrokers(data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching brokers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrokers();
  }, []);

  const BrokerCard = ({ broker }) => (
    <div className="premium-broker-card">
      <div className="broker-image">
        <img
          src={broker.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(broker.name)}&size=300&background=4facfe&color=fff&bold=true`}
          alt={broker.name}
          onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(broker.name)}&size=300&background=4facfe&color=fff&bold=true`; }}
        />
        <div className="broker-social">
          {broker.facebook && <a href={broker.facebook} target="_blank" rel="noreferrer" className="facebook"><i className="fa fa-facebook" /></a>}
          {broker.twitter  && <a href={broker.twitter}  target="_blank" rel="noreferrer" className="twitter"><i className="fa fa-twitter" /></a>}
          {broker.linkedin && <a href={broker.linkedin} target="_blank" rel="noreferrer" className="linkedin"><i className="fa fa-linkedin" /></a>}
          {broker.instagram && <a href={broker.instagram} target="_blank" rel="noreferrer" className="instagram"><i className="fa fa-instagram" /></a>}
          {!broker.facebook && !broker.twitter && !broker.linkedin && !broker.instagram && (
            <a href={`tel:${broker.phoneNumber || ''}`} className="facebook"><i className="fa fa-phone" /></a>
          )}
        </div>
      </div>
      <div className="broker-content">
        <h4 className="name">{broker.name}</h4>
        <span className="role">{broker.designation || 'Real Estate Agent'}</span>
        <div className="contact-info">
          {broker.phoneNumber && (
            <p><i className="fa fa-phone" /> {broker.phoneNumber}</p>
          )}
          {broker.email && (
            <p><i className="fa fa-envelope-o" /> {broker.email}</p>
          )}
          {!broker.phoneNumber && !broker.email && (
            <p><i className="fa fa-phone" /> {COMPANY_INFO.phone1}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="brokers-section section pt-100 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-60">
            <div className="section-title center">
              <h1 className="premium-heading">Our Expert <span>Brokers</span></h1>
              <div className="premium-heading-divider"></div>
              <p className="premium-subheading">
                Our team of dedicated professionals is here to guide you through every step of your real estate journey.
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="brokers-loading">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="broker-skeleton" />
            ))}
          </div>
        ) : brokers.length === 0 ? (
          <div className="text-center"><p>No brokers found.</p></div>
        ) : (
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={brokers.length > 4}
            breakpoints={{
              576:  { slidesPerView: 2 },
              768:  { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="brokers-swiper"
          >
            {brokers.map((broker, index) => (
              <SwiperSlide key={broker.id || index}>
                <BrokerCard broker={broker} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default OurBrokers;
