import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import './Testimonials.css';

const staticTestimonials = [
  {
    id: 's1',
    name: 'James Wilson',
    designation: 'Property Investor',
    content: "Working with this team has been a game-changer for my portfolio. Their attention to detail and market insights are second to none. I've never felt more confident in my real estate decisions.",
    photo: 'assets/images/testimonials/user1.png',
    rating: 5
  },
  {
    id: 's2',
    name: 'Sarah Thompson',
    designation: 'Home Owner',
    content: "They found us our dream home in record time! The process was smooth, transparent, and actually enjoyable. Their premium service really stands out from the rest of the market.",
    photo: 'assets/images/testimonials/user2.png',
    rating: 5
  },
  {
    id: 's3',
    name: 'Elena Rodriguez',
    designation: 'Business Executive',
    content: "The level of professionalism and the dashing UI of their platform made my search for a corporate headquarters incredibly efficient. Highly recommended for high-end properties.",
    photo: 'assets/images/testimonials/user3.png',
    rating: 5
  },
  {
    id: 's4',
    name: 'Michael Chen',
    designation: 'Tech Entrepreneur',
    content: "I was looking for a modern smart-home and they delivered exactly what I needed. Their tech-forward approach to property management and search is exactly what the industry needs.",
    photo: 'assets/images/testimonials/user4.png',
    rating: 5
  }
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/testimonials`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setTestimonials(res.data);
        } else {
          setTestimonials(staticTestimonials);
        }
      })
      .catch(err => {
        console.error('Error fetching testimonials:', err);
        setTestimonials(staticTestimonials);
      });
  }, []);

  useEffect(() => {
    let intervalId;
    const initSlider = () => {
      if (window.$ && window.$.fn.slick) {
        const slider = window.$('.testimonial-slider');
        if (slider.hasClass('slick-initialized')) {
          slider.slick('unslick');
        }
        if (testimonials.length > 0) {
          slider.slick({
            arrows: false,
            dots: true,
            autoplay: true,
            autoplaySpeed: 4000,
            slidesToShow: Math.min(3, testimonials.length),
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: Math.min(2, testimonials.length),
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                }
              }
            ]
          });
          clearInterval(intervalId);
        }
      }
    };

    intervalId = setInterval(initSlider, 100);
    return () => clearInterval(intervalId);
  }, [testimonials]);

  return (
    <section className="testimonials-section section">
      {/* Decorative Background Elements */}
      <div className="testimonials-orb testimonials-orb--1"></div>
      <div className="testimonials-orb testimonials-orb--2"></div>

      <div className="testimonials-container">
        <div className="testimonials-header">
          <span className="testimonials-eyebrow">Client Feedback</span>
          <h2 className="testimonials-heading">
            What Our <span>Premium Clients</span> Say
          </h2>
        </div>

        <div className="testimonial-slider-wrapper">
          <div className="testimonial-slider">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-item">
                <div className="testimonial-card">
                  <div className="testimonial-quote-icon">"</div>
                  
                  <div className="testimonial-stars">
                    {[...Array(Math.floor(testimonial.rating || 5))].map((_, i) => (
                      <i key={i} className="fa fa-star"></i>
                    ))}
                  </div>

                  <p className="testimonial-text">{testimonial.content}</p>

                  <div className="testimonial-footer">
                    <img 
                      src={testimonial.photo || 'assets/images/agent/agent-1.jpg'} 
                      alt={testimonial.name} 
                      className="testimonial-avatar" 
                      onError={(e) => { e.target.src = 'assets/images/agent/agent-1.jpg'; }}
                    />
                    <div className="testimonial-info">
                      <span className="testimonial-name">{testimonial.name}</span>
                      <span className="testimonial-role">{testimonial.designation}</span>
                    </div>
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

export default Testimonials;
