import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsDetail.css';
import { API_BASE_URL } from '../constants';

const NewsDetail = ({ news: initialNews, onBack }) => {
  const [news, setNews] = useState(initialNews);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFullDetails = async () => {
      if (!initialNews?.id) return;
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/news/${initialNews.id}`);
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching full news details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFullDetails();
  }, [initialNews?.id]);

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
          <div className="col-lg-8">
            <div className="news-detail-content">
              <div className="detail-image">
                <img src={news.image} alt={news.title} />
                <span className={`news-badge ${news.category.toLowerCase().replace(/\s+/g, '-')}`}>
                  {news.category}
                </span>
              </div>
              
              <div className="detail-header">
                <span className="news-date"><i className="fa fa-calendar"></i> {news.date}</span>
                <h1 className="detail-title">{news.title}</h1>
              </div>

              <div className="detail-body">
                <p className="lead">{news.excerpt}</p>
                <div className="main-content">
                  {news.content.split('\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="detail-footer">
                <div className="share-links">
                  <span>Share this article:</span>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=${encodeURIComponent(news.title)}`} target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(news.title)}`} target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.origin)}&title=${encodeURIComponent(news.title)}`} target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-linkedin"></i>
                  </a>
                  {navigator.share && (
                    <a href="#!" onClick={(e) => {
                      e.preventDefault();
                      navigator.share({
                        title: news.title,
                        text: `Check out this article: ${news.title}`,
                        url: window.location.origin
                      });
                    }} style={{ cursor: 'pointer' }}>
                      <i className="fa fa-share-alt"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="author-sidebar">
              <div className="author-card">
                <div className="author-header">
                  <div className="author-avatar">
                    <i className="fa fa-user-circle"></i>
                  </div>
                  <div className="author-info">
                    <h4>Posted By</h4>
                    <h3>{news.author?.username || 'Elite Real Estate'}</h3>
                  </div>
                </div>
                <div className="author-contact">
                  <p><i className="fa fa-envelope"></i> {news.author?.email || 'contact@realestate.com'}</p>
                  <p><i className="fa fa-phone"></i> {news.author?.phoneNumber || '+91 98765 43210'}</p>
                </div>
                <button className="contact-author-btn">Contact Agent</button>
              </div>

              <div className="recent-posts-sidebar mt-4">
                <h3>Related Insights</h3>
                <div className="mini-post">
                  <div className="mini-img"><img src="assets/images/property/property-1.jpg" alt="" /></div>
                  <div className="mini-content">
                    <h5>Market trends in 2024</h5>
                    <span>May 12, 2024</span>
                  </div>
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
