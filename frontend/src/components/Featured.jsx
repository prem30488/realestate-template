import React from 'react';
import PremiumCard from './PremiumCard';
import './PremiumStyles.css';
import { useHome } from '../context/HomeContext';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const Featured = () => {
  const { featured, loading } = useHome();

  if (loading) return null; // Or a skeleton

  return (
    <section className="featured-section section pt-100 pb-100 dark-theme-bg">
      <div className="container">
        <div className="row mb-50">
          <div className="col-12 text-center">
            <h2 className="premium-heading">Featured Properties</h2>
            <div className="premium-heading-divider"></div>
            <p className="premium-subheading">Discover our curated selection of exclusive real estate with modern architecture and breathtaking views.</p>
          </div>
        </div>
        
        <div className="featured-carousel-wrapper">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="featured-swiper"
          >
            {featured.map(property => (
              <SwiperSlide key={property.id} style={{ height: 'auto' }}>
                <div className="pb-50 h-100">
                  <PremiumCard property={property} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="row mt-20">
          <div className="col-12 text-center">
            <button className="premium-btn secondary-btn outline-glow">View All Properties <i className="fa fa-long-arrow-right"></i></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
