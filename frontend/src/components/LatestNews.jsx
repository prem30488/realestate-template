import React, { useEffect } from 'react';
import './LatestNews.css';

const newsItems = [
  {
    id: 1,
    title: 'Luxury Villa in Beverly Hills Sold for $12M',
    category: 'Recently Sold',
    date: 'May 10, 2024',
    image: 'assets/images/property/property-1.jpg',
    excerpt: 'The stunning 5-bedroom villa features a private pool, state-of-the-art home theater, and panoramic city views.',
    content: 'Full details about the Beverly Hills villa sale... (Longer text here)'
  },
  {
    id: 2,
    title: 'Modern Penthouse in Manhattan Rented for $15k/mo',
    category: 'Recently Rented',
    date: 'May 08, 2024',
    image: 'assets/images/property/property-2.jpg',
    excerpt: 'Located in the heart of NYC, this penthouse offers 360-degree skyline views and exclusive rooftop access.',
    content: 'Full details about the Manhattan penthouse rental... (Longer text here)'
  },
  {
    id: 3,
    title: 'Sustainable Smart Home Sold in Silicon Valley',
    category: 'Recently Sold',
    date: 'May 05, 2024',
    image: 'assets/images/property/property-3.jpg',
    excerpt: 'Equipped with solar panels and AI-driven energy management, this home represents the future of living.',
    content: 'Full details about the Silicon Valley smart home... (Longer text here)'
  },
  {
    id: 4,
    title: 'Beachfront Mansion in Malibu Sold for $25M',
    category: 'Recently Sold',
    date: 'May 02, 2024',
    image: 'assets/images/property/property-4.jpg',
    excerpt: 'This architectural masterpiece offers direct beach access and a stunning infinity pool overlooking the Pacific.',
    content: 'Full details about the Malibu mansion sale... (Longer text here)'
  },
  {
    id: 5,
    title: 'Charming Cottage in Cotswolds Rented Recently',
    category: 'Recently Rented',
    date: 'April 28, 2024',
    image: 'assets/images/property/property-5.jpg',
    excerpt: 'A peaceful retreat featuring a lush garden, traditional stone architecture, and modern interior comforts.',
    content: 'Full details about the Cotswolds cottage rental... (Longer text here)'
  },
  {
    id: 6,
    title: 'High-Rise Apartment in Dubai Sold to Investor',
    category: 'Recently Sold',
    date: 'April 25, 2024',
    image: 'assets/images/property/property-6.jpg',
    excerpt: 'Featuring world-class amenities and a prime location near the Burj Khalifa, this unit was a top pick.',
    content: 'Full details about the Dubai apartment sale... (Longer text here)'
  },
  {
    id: 7,
    title: 'Luxury Loft in Berlin Rented to Tech CEO',
    category: 'Recently Rented',
    date: 'April 20, 2024',
    image: 'assets/images/property/property-7.jpg',
    excerpt: 'This spacious loft combines industrial aesthetics with high-end finishes in the trendy Mitte district.',
    content: 'Full details about the Berlin loft rental... (Longer text here)'
  },
  {
    id: 8,
    title: 'Historical Estate in Tuscany Sold for $8.5M',
    category: 'Recently Sold',
    date: 'April 15, 2024',
    image: 'assets/images/property/property-8.jpg',
    excerpt: 'Nestled among vineyards, this estate features a restored 16th-century villa and its own olive grove.',
    content: 'Full details about the Tuscany estate sale... (Longer text here)'
  },
  {
    id: 9,
    title: 'Skyscraper Suite in Tokyo Rented Record-Fast',
    category: 'Recently Rented',
    date: 'April 10, 2024',
    image: 'assets/images/property/property-9.jpg',
    excerpt: 'In the heart of Shinjuku, this suite offers unparalleled views and ultra-modern Japanese design.',
    content: 'Full details about the Tokyo suite rental... (Longer text here)'
  },
  {
    id: 10,
    title: 'Eco-Friendly Retreat in Costa Rica Sold',
    category: 'Recently Sold',
    date: 'April 05, 2024',
    image: 'assets/images/property/property-10.jpg',
    excerpt: 'A hidden gem surrounded by rainforest, this property is self-sufficient and built with local materials.',
    content: 'Full details about the Costa Rica retreat sale... (Longer text here)'
  }
];

const LatestNews = ({ onSelectNews }) => {
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

    intervalId = setInterval(initSlider, 100);
    return () => clearInterval(intervalId);
  }, []);

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
                    <span className={`news-badge ${news.category.toLowerCase().replace(' ', '-')}`}>
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

export { newsItems }; // Export for use in detail page
export default LatestNews;
