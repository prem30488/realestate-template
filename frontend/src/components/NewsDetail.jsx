import React from 'react';
import './NewsDetail.css';

const NewsDetail = ({ news, onBack }) => {
  if (!news) return null;

  return (
    <div className="news-detail-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <button onClick={onBack} className="back-btn">
              <i className="fa fa-angle-left"></i> Back to Insights
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="news-detail-content">
              <div className="detail-image">
                <img src={news.image} alt={news.title} />
                <span className={`news-badge ${news.category.toLowerCase().replace(' ', '-')}`}>
                  {news.category}
                </span>
              </div>
              
              <div className="detail-header">
                <span className="news-date"><i className="fa fa-calendar"></i> {news.date}</span>
                <h1 className="detail-title">{news.title}</h1>
              </div>

              <div className="detail-body">
                <p className="lead">{news.excerpt}</p>
                <p>{news.content}</p>
                <p>
                  Additional dummy content to make it a "detailed" page. 
                  Real estate markets are constantly evolving, and transactions like this one 
                  in {news.title.split(' in ')[1] || 'this location'} highlight the growing 
                  demand for premium properties. Investors and homeowners alike are looking 
                  for unique features, whether it's sustainable technology, architectural 
                  significance, or prime location amenities.
                </p>
                <blockquote>
                  "This transaction marks a significant milestone in the current quarter, 
                  reflecting the robust health of the luxury segment."
                  <cite>— Market Analyst</cite>
                </blockquote>
                <p>
                  Moving forward, we expect to see more interest in properties that offer 
                  a blend of comfort and functionality. Our team remains dedicated to 
                  providing the best service for our clients, ensuring that every deal 
                  is handled with the utmost professionalism.
                </p>
              </div>

              <div className="detail-footer">
                <div className="share-links">
                  <span>Share this article:</span>
                  <a href="#"><i className="fa fa-facebook"></i></a>
                  <a href="#"><i className="fa fa-twitter"></i></a>
                  <a href="#"><i className="fa fa-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
