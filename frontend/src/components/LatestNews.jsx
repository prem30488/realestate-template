import React, { useEffect } from 'react';
import './LatestNews.css';
import { useHome } from '../context/HomeContext';

const LatestNews = ({ onSelectNews }) => {
  const { news: newsItems, loading } = useHome();

  useEffect(() => {
    let intervalId;
    const initSlider = () => {
      if (window.$ && window.$.fn.slick) {
        const slider = window.$('.news-carousel');
        if (slider.hasClass('slick-initialized')) {
          slider.slick('unslick');
        }
        slider.slick({
          arrows: true,
          dots: false,
          autoplay: true,
          autoplaySpeed: 4000,
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
                arrows: false,
                dots: true,
              }
            }
          ]
        });
        clearInterval(intervalId);
      }
    };

    if (!loading && newsItems.length > 0) {
      intervalId = setInterval(initSlider, 100);
    }
    return () => clearInterval(intervalId);
  }, [loading, newsItems]);

  if (loading) return null;

  return (
    <section className="latest-news-section section pt-100 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-60">
            <div className="section-title center">
              <h1 className="premium-heading">Market <span>Insights</span></h1>
              <div className="premium-heading-divider"></div>
              <p className="premium-subheading">Explore our latest success stories and significant transactions across the globe.</p>
            </div>
          </div>
        </div>

        <div className="news-carousel-wrapper">
          <div className="news-carousel">
            {newsItems.map((news) => (
              <div key={news.id} className="news-item-padding">
                <div className="news-card">
                  <div className="news-image">
                    <img src={news.image} alt={news.title} />
                    <span className={`news-badge ${news.category.toLowerCase().replace(/\s+/g, '-')}`}>
                      {news.category}
                    </span>
                  </div>
                  <div className="news-content">
                    <span className="news-date"><i className="fa fa-calendar"></i> {news.date}</span>
                    <h4 className="news-title">
                      <button onClick={() => onSelectNews(news)} className="news-link-btn">{news.title}</button>
                    </h4>
                    <p className="news-excerpt">{news.excerpt}</p>
                    <button onClick={() => onSelectNews(news)} className="read-more-btn">
                      Read Details <i className="fa fa-angle-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
